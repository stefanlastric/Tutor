import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { approveTeacher } from '../../actions/teachers';
import { getAppointments, createAppointment } from '../../actions/appointment';
import './Appointments.css';
import Moment from 'react-moment';
const headers = [
  {
    key: 'subject',
    label: 'Subject',
  },
  {
    key: 'teacher',
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
    key: 'canceled',
    label: 'Canceled',
  },

  {
    key: 'datecreated',
    label: 'Date Created',
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
  approveTeacher = (id) => {
    const { approveTeacher } = this.props;
    approveTeacher(id);
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
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
        subject: {
          component: (rowData) => {
            return <div>{rowData.subject.title}</div>;
          },
        },
        teacher: {
          component: (rowData) => {
            return (
              <div>
                {rowData &&
                  rowData.users &&
                  rowData.users[0] &&
                  rowData.users[0].teacher &&
                  rowData.users[0].teacher.name}
              </div>
            );
          },
        },
      },
    };

    return options;
  };
  render() {
    const { appointments, isLoading } = this.props;
    console.log(appointments);
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
  createAppointments: (data, history) =>
    dispatch(createAppointment(data, history)),
});

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments,
  isLoading: state.appointments.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
