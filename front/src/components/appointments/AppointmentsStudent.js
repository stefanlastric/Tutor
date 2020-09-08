import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import {
  getAppointmentsStudent,
  cancelAppointment,
} from '../../actions/appointment';
import './Appointments.css';
import Moment from 'react-moment';
const headers = [
  {
    key: 'subject',
    label: 'Subject',
  },
  {
    key: 'users.teacher',
    label: 'Teacher',
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
    key: 'canceled',
    label: 'Canceled',
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
    this.getAppointmentsStudent();
  }

  getAppointmentsStudent = () => {
    const { getAppointmentsStudent } = this.props;
    getAppointmentsStudent();
  };
  cancelAppointment = () => {
    const { cancelAppointment } = this.state;
    cancelAppointment();
  };
  getTableOptions = () => {
    const {} = this.props;
    const options = {
      customComponents: {
        actions: {
          component: (rowData) => (
            <div>
              <button onClick={() => cancelAppointment(rowData._id)}>
                Cancel Appointment
              </button>
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
  getAppointmentsStudent: () => dispatch(getAppointmentsStudent()),
  cancelAppointment: (id) => dispatch(cancelAppointment(id)),
});

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments,
  isLoading: state.appointments.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
