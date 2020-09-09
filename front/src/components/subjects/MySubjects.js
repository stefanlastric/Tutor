import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import Table from '../table/Table';
import {
  getMySubjects,
  notAvailableSubject,
  availableSubject,
  deleteSubject,
} from '../../actions/subject';
import './Subjects.css';

import { getCategory } from '../../actions/category';
import Moment from 'react-moment';
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
    };
  }
  componentDidMount() {
    this.getMySubjects();
    this.getCategory();
  }

  componentDidUpdate(prevProps) {
    const { isLoading, setAvailableData } = this.props;
    if (
      prevProps.isLoading &&
      !isLoading &&
      // (
      !isEmpty(setAvailableData)
      // ||
      //   !isEmpty(setNotAvailableData) ||
      //   !isEmpty(deleteSubjectData))
    ) {
      console.log('test');
      this.getMySubjects();
    }
  }

  getMySubjects = () => {
    const { getMySubjects } = this.props;
    getMySubjects();
  };
  availableSubject = (id) => {
    const { availableSubject } = this.props;
    availableSubject(id);
  };
  notAvailableSubject = (id) => {
    const { notAvailableSubject } = this.props;
    notAvailableSubject(id);
  };
  deleteSubject = (id) => {
    const { deleteSubject } = this.props;
    deleteSubject(id);
  };
  getCategory = () => {
    const { getCategory } = this.props;
    getCategory();
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
        actions: {
          component: (rowData) => (
            <div>
              <button onClick={() => this.availableSubject(rowData._id)}>
                Available
              </button>

              <button onClick={() => this.notAvailableSubject(rowData._id)}>
                Not Available
              </button>
              <button onClick={() => this.deleteSubject(rowData._id)}>
                Delete
              </button>
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
                {' '}
                <Moment format='DD/MMM/YYYY hh:mm:ss'>
                  {rowData.datecreated}
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
  render() {
    const { subjects, isLoading } = this.props;
    return (
      <div className='subjects_table'>
        {isLoading && <div>Loading..</div>}
        {subjects && (
          <Table
            data={subjects}
            headers={headers}
            options={this.getTableOptions()}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMySubjects: () => dispatch(getMySubjects()),
  notAvailableSubject: (id) => dispatch(notAvailableSubject(id)),
  availableSubject: (id) => dispatch(availableSubject(id)),
  deleteSubject: (id) => dispatch(deleteSubject(id)),
  getCategory: () => dispatch(getCategory()),
});

const mapStateToProps = (state) => ({
  subjects: state.subjects.subjects,
  isLoading: state.subjects.loading,
  setAvailableData: state.subjects.setAvailableData,
  categories: state.category.category,
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
