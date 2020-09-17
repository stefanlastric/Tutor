import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Table from '../table/Table';
import {
  getAppointmentsStudent,
  cancelAppointment,
  createAppointment,
} from '../../actions/appointment';
import './Appointments.css';
import Moment from 'react-moment';
import Modal from '../modal/Modal';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  {
    key: 'requestedDate',
    label: 'Date requested',
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
      modalVisible: false,
    };
  }
  componentDidMount() {
    this.getAppointmentsStudent();
  }

  componentDidUpdate(prevProps) {
    const { isLoading, approved, canceled } = this.props;
    if (
      prevProps.isLoading &&
      !isLoading &&
      (!isEmpty(approved) || !isEmpty(canceled))
    ) {
      this.getAppointmentsStudent();
    }
  }
  getAppointmentsStudent = () => {
    const { getAppointmentsStudent } = this.props;
    getAppointmentsStudent();
  };
  cancelAppointment = () => {
    const { cancelAppointment } = this.props;
    const { selectedAppointment } = this.state;
    cancelAppointment(selectedAppointment._id);
  };
  getTableOptions = () => {
    const {} = this.props;
    const options = {
      customComponents: {
        actions: {
          component: (rowData) => (
            <div>
              {rowData.canceled ? (
                'Canceled'
              ) : (
                <button
                  className='btn btn-secondary'
                  onClick={() =>
                    this.setState({
                      modalVisible: true,
                      selectedAppointment: rowData,
                    })
                  }
                >
                  Cancel Appointment
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
        requestedDate: {
          component: (rowData) => {
            return (
              <div>
                <Moment format='DD/MMM/YYYY hh:mm:ss'>
                  {rowData.requestedDate}
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
    const { modalVisible, selectedAppointment } = this.state;
    return (
      <div className='appointments_table'>
        {isLoading && <div>Loading..</div>}
        {appointments && (
          <div>
            <Table
              data={appointments}
              headers={headers}
              options={this.getTableOptions()}
            />
            {modalVisible && (
              <Modal
                show
                handleClose={() =>
                  this.setState({
                    modalVisible: false,
                    selectedAppointment: null,
                  })
                }
                onConfirm={() => this.cancelAppointment()}
                title='Are you sure ?'
              ></Modal>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAppointmentsStudent: () => dispatch(getAppointmentsStudent()),
  cancelAppointment: (id) => dispatch(cancelAppointment(id)),
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
