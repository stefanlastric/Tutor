import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getMySubjects } from '../../actions/subject';
import './Subjects.css';

import Moment from 'react-moment';
const headers = [
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'priceperhour',
    label: 'Price per hour',
  },
  {
    key: 'studentlimit',
    label: 'Weekly student limit',
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
  }

  getMySubjects = () => {
    const { getMySubjects } = this.props;
    getMySubjects();
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
        actions: {
          component: (rowData) => (
            <div>
              <button
                onClick={() => {
                  console.log('from edit: ', rowData);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  console.log('from delete: ', rowData);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  console.log('from delete: ', rowData);
                }}
              >
                Not Available
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
});

const mapStateToProps = (state) => ({
  subjects: state.subjects.subjects,
  isLoading: state.subjects.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
