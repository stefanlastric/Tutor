import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getAppointmentsStudent } from '../../actions/appointment';
import './Appointments.css';
import Moment from 'react-moment';
const headers = [
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'price',
    label: 'Price',
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
    key: 'users.createdby',
    label: 'Created by',
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
  return value === 0 ? 'No' : 'Yes';
}

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }
  componentDidMount() {
    this.getAppointmentsStudent();
  }

  getAppointmentsStudent = () => {
    const { getAppointmentsStudent } = this.props;
    getAppointmentsStudent();
  };

  getTableOptions = () => {
    const {} = this.props;
    const options = {
      customComponents: {
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
        approved: {
          component: (rowData) => {
            return <div>{formatYesNo(rowData.approved)}</div>;
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
  getAppointmentsStudent: () => dispatch(getAppointmentsStudent()),
});

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments,
  isLoading: state.appointments.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
