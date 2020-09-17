import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getTeachers } from '../../actions/teachers';
import './Teachers.css';
import Moment from 'react-moment';
import Modal from '../modal/Modal';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-times';
import { createAppointment } from '../../actions/appointment';
import Select from 'react-select';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

const headers = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'surname',
    label: 'Surname',
  },
  {
    key: 'education',
    label: 'Education',
  },
  {
    key: 'qualification',
    label: 'Qualification',
  },
  {
    key: 'age',
    label: 'Age',
  },
  {
    key: 'suspended',
    label: 'Suspended',
  },

  {
    key: 'date',
    label: 'Date created',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

function formatYesNo(value) {
  return !value ? 'No' : 'Yes';
}
class Teachers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      modalVisible: false,
      selectedTeacher: null,
      selectedDate: null,
      selectedTime: '10:00',
      selectedSubject: null,
    };
  }
  componentDidMount() {
    this.getTeachers();
  }
  createAppointment = () => {
    const { createAppointment, history } = this.props;
    const {
      selectedTeacher,
      selectedDate,
      selectedTime,
      selectedSubject,
    } = this.state;

    const date = new Date(
      selectedDate.getUTCFullYear(),
      selectedDate.getUTCMonth(),
      selectedDate.getUTCDate() + 1,
      selectedTime.hour,
      selectedTime.minute,
      0,
      0
    );
    const data = {
      subjectId: selectedSubject.value,
      teacherId: selectedTeacher._id,
      requestedDate: date,
    };

    createAppointment(data, history);
  };

  getTeachers = () => {
    const { getTeachers } = this.props;
    getTeachers();
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
        actions: {
          component: (data) => (
            <div>
              <button
                className='btn btn-secondary'
                onClick={() =>
                  this.setState({
                    modalVisible: true,
                    selectedTeacher: data,
                  })
                }
              >
                Request Appointment
              </button>
            </div>
          ),
        },
        date: {
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
        suspended: {
          component: (rowData) => {
            return <div>{formatYesNo(rowData.suspended)}</div>;
          },
        },
      },
    };

    return options;
  };

  handleDateChange = (selectedDate) => {
    this.setState({ selectedDate });
  };

  handleTimeChange = (selectedTime) => {
    this.setState({ selectedTime });
  };

  mapTeacherSubjects = (subjects) =>
    subjects.map((subject) => ({
      value: subject._id,
      label: subject.title,
    }));

  handleSelectChange = (selectedSubject) => {
    this.setState({ selectedSubject });
  };

  renderModal = () => {
    const { selectedDate, selectedTime, selectedTeacher } = this.state;
    return (
      <div className='appointment_date_modal'>
        <span>Choose subject</span>
        {selectedTeacher && (
          <Select
            options={
              selectedTeacher.subject && selectedTeacher.subject.length > 0
                ? this.mapTeacherSubjects(selectedTeacher.subject)
                : []
            }
            onChange={this.handleSelectChange}
          />
        )}
        <span>Choose Date:</span>
        <DatePicker selected={selectedDate} onChange={this.handleDateChange} />
        <span>Choose Time:</span>
        <TimePicker
          time={selectedTime && `${selectedTime.hour}:${selectedTime.minute}`}
          onTimeChange={this.handleTimeChange}
          theme='classic'
          timeMode='24' // use 24 or 12 hours mode, default 24
        />
      </div>
    );
  };
  render() {
    const { teachers, isLoading } = this.props;
    const {
      modalVisible,
      selectedTeacher,
      selectedDate,
      selectedTime,
      selectedSubject,
    } = this.state;

    return (
      <div className='subjects_table'>
        {isLoading && <div>Loading..</div>}
        {teachers && (
          <div>
            <Table
              data={teachers}
              headers={headers}
              options={this.getTableOptions()}
            />
            {modalVisible && (
              <Modal
                show
                handleClose={() =>
                  this.setState({
                    modalVisible: false,
                    selectedTeacher: null,
                    selectedDate: null,
                    selectedTime: null,
                    selectedSubject: null,
                  })
                }
                onConfirm={() => this.createAppointment()}
                onConfirmDisabled={
                  !selectedDate || !selectedTime || !selectedSubject
                }
                title='Select date for appointment'
              >
                {this.renderModal()}
              </Modal>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTeachers: () => dispatch(getTeachers()),
  createAppointment: (data, history) =>
    dispatch(createAppointment(data, history)),
});

const mapStateToProps = (state) => ({
  teachers: state.teachers.teachers,
  isLoading: state.teachers.loading,
  suspended: state.teachers.suspended,
});

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
