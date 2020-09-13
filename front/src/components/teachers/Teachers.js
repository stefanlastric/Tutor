import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Table from '../table/Table';
import { getTeachers, suspendedTeacher } from '../../actions/teachers';
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
      subjects: [],
    };
  }
  componentDidMount() {
    this.getTeachers();
  }

  componentDidUpdate(prevProps) {
    const { isLoading, suspended } = this.props;
    if (
      prevProps.isLoading &&
      !isLoading &&
      suspended &&
      !prevProps.suspended
    ) {
      console.log(suspended);
      console.log('test');
      this.getTeachers();
    }
  }

  getTeachers = () => {
    const { getTeachers } = this.props;
    getTeachers();
  };
  suspendedTeacher = (id) => {
    const { suspendedTeacher } = this.props;
    suspendedTeacher(id);
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
        actions: {
          component: (rowData) =>
            isAdmin() && (
              <div>
                {rowData.suspended ? (
                  'Suspended'
                ) : (
                  <button onClick={() => this.suspendedTeacher(rowData._id)}>
                    Suspend Teacher
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
        suspended: {
          component: (rowData) => {
            return <div>{formatYesNo(rowData.suspended)}</div>;
          },
        },
      },
    };

    return options;
  };
  render() {
    const { teachers, isLoading } = this.props;

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
  suspendedTeacher: (id) => dispatch(suspendedTeacher(id)),
});

const mapStateToProps = (state) => ({
  teachers: state.teachers.teachers,
  isLoading: state.teachers.loading,
  suspended: state.teachers.suspended,
});

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
