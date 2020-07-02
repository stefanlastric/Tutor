import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import Axios from 'axios';
import './AddSubject.css';

class AddSubject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      priceperhour: '',
      studentlimit: '',
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addNewSubjects = (event) => {
    event.preventDefault();
    Axios.post(
      '/subjects',
      {
        title: this.state.title,
        priceperhour: this.state.priceperhour,
        studentlimit: this.state.studentlimit,
      },
      { headers: { Authorization: 'myJwtToken' } }
    )
      .then((response) => {
        console.log('Subject successfully added.');
        alert('Subject successfully added.');
        this.props.history.push('/subjects');
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        console.log('Request completed.');
      });
  };

  render() {
    console.log(this.props);
    return (
      <div className='add-subject'>
        <Form onSubmit={this.addNewProduct}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name='title'
              onChange={this.handleChange}
              type='text'
              placeholder='Enter subject title'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price per hour:</Form.Label>
            <Form.Control
              name='priceperhour'
              onChange={this.handleChange}
              type='text'
              placeholder='What is the price per hour for this subject?'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Student Limit:</Form.Label>
            <Form.Control
              name='studentlimit'
              onChange={this.handleChange}
              type='text'
              placeholder='What is the weekly limit of students?'
            />
          </Form.Group>

          <Button variant='success' type='submit' onClick={this.addNewSubjects}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
export default AddSubject;
