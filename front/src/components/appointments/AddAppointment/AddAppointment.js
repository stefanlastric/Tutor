import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import Axios from 'axios';
import './AddAppointment.css';

class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: '',
      timelimit: '',
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className='add-appointment'>
        <Form onSubmit={this.addNewProduct}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name='title'
              onChange={this.handleChange}
              type='text'
              placeholder='Enter appointment title'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price per hour:</Form.Label>
            <Form.Control
              name='price'
              onChange={this.handleChange}
              type='text'
              placeholder='What is the price for this appointment?'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time Limit:</Form.Label>
            <Form.Control
              name='timelimit'
              onChange={this.handleChange}
              type='text'
              placeholder='What is the time limit of students?'
            />
          </Form.Group>

          <Button
            variant='success'
            type='submit'
            onClick={this.addNewAppointments}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
export default AddAppointment;
