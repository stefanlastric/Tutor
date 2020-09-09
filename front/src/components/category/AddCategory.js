import React, { Component } from 'react';

import { Form, Button } from 'react-bootstrap';

import Axios from 'axios';
import './AddCategory.css';

class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addNewCategory = (event) => {
    event.preventDefault();
    Axios.post(
      '/category',
      {
        title: this.state.title,
        description: this.state.description,
      },
      { headers: { Authorization: 'myJwtToken' } }
    )
      .then((response) => {
        console.log('Category successfully added.');
        alert('Category successfully added.');
        this.props.history.push('/category');
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        console.log('Request completed.');
      });
  };

  render() {
    return (
      <div className='add-category'>
        <Form onSubmit={this.addNewProduct}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name='title'
              onChange={this.handleChange}
              type='text'
              placeholder='Enter category title.'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              name='description'
              onChange={this.handleChange}
              type='text'
              placeholder='Enter category description.'
            />
          </Form.Group>

          <Button variant='success' type='submit' onClick={this.addNewCategory}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddCategory;
