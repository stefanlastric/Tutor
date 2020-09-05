import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getTeachers, approveTeacher } from '../../actions/teachers';
import './Teachers.css';
import Moment from 'react-moment';

import { isAdmin } from '../../utils/helpers';

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
    key: 'approved',
    label: 'Approved',
  },
  {
    key: 'subject',
    label: 'Subjects',
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
      subjects: [],
    };
  }
  componentDidMount() {
    this.getTeachers();
  }
  nextPath(path) {
    this.props.history.push(path);
  }

  getTeachers = () => {
    const { getTeachers } = this.props;
    getTeachers();
  };
  approveTeacher = (id) => {
    const { approveTeacher } = this.props;
    approveTeacher(id);
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
        actions: {
          component: (rowData) =>
            isAdmin() && (
              <div>
                {rowData.approved ? (
                  'Approved'
                ) : (
                  <button onClick={() => this.approveTeacher(rowData._id)}>
                    Approve Teacher
                  </button>
                )}
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
        approved: {
          component: (rowData) => {
            console.log(rowData.approved);
            return <div>{formatYesNo(rowData.approved)}</div>;
          },
        },
        subjects: {
          component: (rowData) => {
            return <div className='clickable'>{rowData.subjects}</div>;
          },
        },
      },
    };

    return options;
  };
  render() {
    const { teachers, isLoading } = this.props;
    console.log(teachers);
    return (
      <div className='subjects_table'>
        {isLoading && <div>Loading..</div>}
        {teachers && (
          <Table
            data={teachers}
            headers={headers}
            options={this.getTableOptions()}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTeachers: () => dispatch(getTeachers()),
  approveTeacher: (id) => dispatch(approveTeacher(id)),
});

const mapStateToProps = (state) => ({
  teachers: state.teachers.teachers,
  isLoading: state.teachers.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
