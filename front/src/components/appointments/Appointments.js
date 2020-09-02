import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getAppointments } from '../../actions/appointment';
import { approveTeacher } from '../../actions/teachers';
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
    key: 'canceled',
    label: 'Canceled',
  },
  {
    key: 'users.canceledby',
    label: 'Canceled by',
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
    this.getAppointments();
  }

  getAppointments = () => {
    const { getAppointments } = this.props;
    getAppointments();
  };
  approveTeacher = () => {
    const { approveTeacher } = this.state;
    approveTeacher();
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
        actions: {
          component: (rowData) => (
            <div>
              <button onClick={() => approveTeacher(rowData._id)}>
                Approve Teacher
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
  getAppointments: () => dispatch(getAppointments()),

  approveTeacher: (id) => dispatch(approveTeacher(id)),
});

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments,
  isLoading: state.appointments.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
