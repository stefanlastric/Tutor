import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getTeachers } from '../../actions/teachers';
import './Tutors.css';

import Moment from 'react-moment';
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
    key: 'contactnumber',
    label: 'Contact',
  },
  {
    key: 'email',
    label: 'Email',
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
    key: 'appointments',
    label: 'Appointments',
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
  return value === 0 ? 'No' : 'Yes';
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

  getTeachers = () => {
    const { getTeachers } = this.props;
    getTeachers();
  };

  getTableOptions = () => {
    const options = {
      customComponents: {
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
            return <div>{formatYesNo(rowData.approved)}</div>;
          },
        },
        appointments: {
          component: (rowData) => {
            console.log(rowData);
            return <div className='clickable'>{rowData.appointments}</div>;
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
});

const mapStateToProps = (state) => ({
  teachers: state.teachers.teachers,
  isLoading: state.teachers.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
