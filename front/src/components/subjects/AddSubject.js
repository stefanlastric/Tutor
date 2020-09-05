import React, { Component } from 'react';

import { Form, Button } from 'react-bootstrap';

import Axios from 'axios';
import './AddSubject.css';

class AddSubject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      priceperhour: '',
      timelimit: '',
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
        description: this.state.description,
        priceperhour: this.state.priceperhour,
        timelimit: this.state.timelimit,
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
              placeholder='Enter subject title.'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              name='description'
              onChange={this.handleChange}
              type='text'
              placeholder='Enter subject description.'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price per hour:</Form.Label>
            <Form.Control
              name='priceperhour'
              onChange={this.handleChange}
              type='text'
              placeholder='What is the price per hour ?'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time Limit:</Form.Label>
            <Form.Control
              name='timelimit'
              onChange={this.handleChange}
              type='text'
              placeholder='What is the daily timelimit ?'
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
