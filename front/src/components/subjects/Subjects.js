import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getSubjects } from '../../actions/subject';
import './Subjects.css';
import Moment from 'react-moment';
import Select from 'react-select';
import { createAppointment } from '../../actions/appointment';
import { isAdmin, isTeacher } from '../../utils/helpers';
import { getCategory } from '../../actions/category';

import Modal from '../modal/Modal';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-times';

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

const headers = [
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'category',
    label: 'Category',
  },
  {
    key: 'priceperhour',
    label: 'Price per hour',
  },
  {
    key: 'createdby',
    label: 'Teacher',
  },
  {
    key: 'available',
    label: 'Available',
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
class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      selectedOption: null,
      modalVisible: false,
      selectedSubject: null,
      selectedDate: null,
      selectedTime: '10:00',
    };
  }
  componentDidMount() {
    this.getSubjects();
    this.getCategory();
  }

  createAppointment = () => {
    const { createAppointment, history } = this.props;
    const { selectedSubject, selectedDate, selectedTime } = this.state;

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
      subjectId: selectedSubject._id,
      teacherId: selectedSubject.createdby,
      requestedDate: date,
    };
    createAppointment(data, history);
  };
  deleteSubject = (id) => {
    const { deleteSubject } = this.props;
    deleteSubject(id);
  };

  // za redirekt
  nextPath(path) {
    this.props.history.push(path);
  }

  getSubjects = () => {
    const { getSubjects } = this.props;
    const { selectedOption } = this.state;

    let params;
    if (selectedOption) {
      params = {
        category: selectedOption.value,
      };
    }

    getSubjects(params);
  };

  getCategory = () => {
    const { getCategory } = this.props;
    getCategory();
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
        actions: {
          component: (data) => (
            <div className='subjects_actions'>
              {!isTeacher() && (
                <div>
                  <button
                    className='btn btn-secondary'
                    onClick={() =>
                      this.setState({
                        modalVisible: true,
                        selectedSubject: data,
                      })
                    }
                  >
                    Request Appointment
                  </button>
                </div>
              )}

              {isAdmin() && (
                <div>
                  <button
                    onClick={() => this.deleteSubject(data._id)}
                    type='button'
                    className='btn btn-danger spacingl5'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ),
        },
        available: {
          component: (rowData) => {
            return <div>{formatYesNo(rowData.available)}</div>;
          },
        },
        datecreated: {
          component: (rowData) => {
            return (
              <div>
                <Moment format='DD/MMM/YYYY hh:mm:ss'>
                  {rowData.createdAt}
                </Moment>
              </div>
            );
          },
        },
        category: {
          component: (rowData) => {
            return <div>{rowData.category && rowData.category.title}</div>;
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

  mapOptions = () => {
    const { categories } = this.props;
    return categories.map((category) => ({
      label: category.title,
      value: category.title,
    }));
  };

  handleOptionChange = (selectedOption) => {
    this.setState({ selectedOption }, () => this.getSubjects());
  };

  handleDateChange = (selectedDate) => {
    this.setState({ selectedDate });
  };

  handleTimeChange = (selectedTime) => {
    console.log(selectedTime);
    this.setState({ selectedTime });
  };

  renderModal = () => {
    const { selectedDate, selectedTime } = this.state;
    return (
      <div className='appointment_date_modal'>
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
    const { subjects, isLoading, categories } = this.props;
    const {
      modalVisible,
      selectedSubject,
      selectedDate,
      selectedTime,
    } = this.state;

    // console.log(selectedDate && selectedDate.toISOString());
    // console.log(selectedTime);

    return (
      <div className='subjects_table'>
        {isLoading && <div>Loading..</div>}

        {subjects && (
          <div>
            {categories.length > 0 && (
              <Select
                options={this.mapOptions()}
                onChange={(selectedOption) =>
                  this.handleOptionChange(selectedOption)
                }
              />
            )}
            <Table
              data={subjects}
              headers={headers}
              options={this.getTableOptions()}
            />
            {modalVisible && (
              <Modal
                show
                handleClose={() =>
                  this.setState({
                    modalVisible: false,
                    selectedSubject: null,
                    selectedDate: null,
                    selectedTime: null,
                  })
                }
                onConfirm={() => this.createAppointment()}
                onConfirmDisabled={!selectedDate || !selectedTime}
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
  getSubjects: (params) => dispatch(getSubjects(params)),
  getCategory: () => dispatch(getCategory()),
  createAppointment: (data, history) =>
    dispatch(createAppointment(data, history)),
});

const mapStateToProps = (state) => ({
  subjects: state.subjects.subjects,
  isLoading: state.subjects.loading,
  categories: state.category.category,
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
