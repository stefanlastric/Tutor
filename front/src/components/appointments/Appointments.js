import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Table from '../table/Table';
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
    key: 'createdby',
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

  componentDidUpdate(prevProps) {
    const { isLoading, approved, canceled } = this.props;
    if (
      prevProps.isLoading &&
      !isLoading &&
      (!isEmpty(approved) || !isEmpty(canceled))
    ) {
      this.getAppointments();
    }
  }
  getAppointments = () => {
    const { getAppointments } = this.props;
    getAppointments();
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
        datecreated: {
          component: (rowData) => {
            return (
              <div>
                <Moment format='DD/MMM/YYYY hh:mm'>
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
            if (rowData.subject != null)
              return <div>{rowData.subject.title}</div>;
          },
        },
        teacher: {
          component: (rowData) => {
            return (
              <div>{rowData && rowData.teacher && rowData.teacher.name}</div>
            );
          },
        },
        createdby: {
          component: (rowData) => {
            return (
              <div>
                {rowData && rowData.createdby && rowData.createdby.name}
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
  createAppointments: (data, history) =>
    dispatch(createAppointment(data, history)),
});

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments,
  isLoading: state.appointments.loading,
  approved: state.appointments.approved,
  canceled: state.appointments.canceled,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
