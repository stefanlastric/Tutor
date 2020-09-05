import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import {
  getAppointmentsTeacher,
  approveAppointment,
  cancelAppointment,
} from '../../actions/appointment';
import './Appointments.css';
import Moment from 'react-moment';
const headers = [
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'price',
    label: 'Price',
  },
  {
    key: 'timelimit',
    label: 'Timelimit',
  },
  {
    key: 'approved',
    label: 'Approved',
  },
  {
    key: 'users.createdby',
    label: 'Created by',
  },
  {
    key: 'datecreated',
    label: 'Date Created',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

function formatYesNo(value) {
  return value == 0 ? 'No' : 'Yes';
}

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }
  componentDidMount() {
    this.getAppointmentsTeacher();
  }

  getAppointmentsTeacher = () => {
    const { getAppointmentsTeacher } = this.props;
    getAppointmentsTeacher();
  };

  approveAppointment = (id) => {
    const { approveAppointment } = this.props;
    approveAppointment(id);
  };

  cancelAppointment = (id) => {
    const { cancelAppointment } = this.props;
    cancelAppointment(id);
  };

  getTableOptions = () => {
    const { approveAppointment } = this.props;
    const options = {
      customComponents: {
        actions: {
          component: (rowData) => (
            <div>
              {rowData.canceled ? (
                'Canceled!'
              ) : rowData.approved ? (
                <button onClick={() => this.cancelAppointment(rowData._id)}>
                  Cancel Appointment
                </button>
              ) : (
                <button onClick={() => this.approveAppointment(rowData._id)}>
                  Approve Appointment
                </button>
              )}
            </div>
          ),
        },
        datecreated: {
          component: (rowData) => {
            return (
              <div>
                <Moment format='DD/MMM/YYYY hh:mm:ss'>
                  {rowData.datecreated}
                </Moment>
              </div>
            );
          },
        },
        approved: {
          component: (rowData) => {
            return <div>{formatYesNo(rowData.approved)}</div>;
          },
        },
        canceled: {
          component: (rowData) => {
            return <div>{formatYesNo(rowData.canceled)}</div>;
          },
        },
      },
    };

    return options;
  };
  render() {
    const { appointments, isLoading } = this.props;
    return (
      <div className='appointments_table'>
        {isLoading && <div>Loading..</div>}
        {appointments && (
          <Table
            data={appointments}
            headers={headers}
            options={this.getTableOptions()}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAppointmentsTeacher: () => dispatch(getAppointmentsTeacher()),
  approveAppointment: (id) => dispatch(approveAppointment(id)),
  cancelAppointment: (id) => dispatch(cancelAppointment(id)),
});

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments,
  isLoading: state.appointments.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
