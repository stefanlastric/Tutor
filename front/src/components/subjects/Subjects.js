import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getSubjects } from '../../actions/subject';
import './Subjects.css';
import Moment from 'react-moment';
import Select from 'react-select';
import { createAppointment } from '../../actions/appointment';
import { isStudent } from '../../utils/helpers';
import { getCategory } from '../../actions/category';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

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
    };
  }
  componentDidMount() {
    this.getSubjects();
    this.getCategory();
  }

  createAppointment = (subject) => {
    const { createAppointment, history } = this.props;

    const data = {
      subjectId: subject._id,
      teacherId: subject.createdby,
    };
    createAppointment(data, history);
  };

  nextPath(path) {
    this.props.history.push(path);
  }

  getSubjects = () => {
    const { getSubjects } = this.props;
    getSubjects();
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
            <div>
              {isStudent() && (
                <button onClick={() => this.createAppointment(data)}>
                  Request Appointment
                </button>
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

  render() {
    const { subjects, isLoading, categories } = this.props;

    return (
      <div className='subjects_table'>
        {isLoading && <div>Loading..</div>}

        {subjects && (
          <div>
            {categories.length > 0 && (
              <Select
                options={this.mapOptions()}
                onChange={(selectedOption) => {
                  this.setState({ selectedOption });
                }}
              />
            )}
            <Table
              data={subjects}
              headers={headers}
              options={this.getTableOptions()}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSubjects: () => dispatch(getSubjects()),
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
