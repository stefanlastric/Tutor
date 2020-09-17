import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import './Category.css';
import { getCategory, deleteCategory } from '../../actions/category';
import { isAdmin } from '../../utils/helpers';

const headers = [
  {
    key: 'title',
    label: 'Name',
  },
  {
    key: 'description',
    label: 'Description',
  },

  {
    key: 'actions',
    label: 'Actions',
  },
];

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }
  componentDidMount() {
    this.getCategory();
  }

  getCategory = () => {
    const { getCategory } = this.props;
    getCategory();
  };

  deleteCategory = (id) => {
    const { deleteCategory } = this.props;
    deleteCategory(id);
  };
  getTableOptions = () => {
    const {} = this.props;
    const options = {
      customComponents: {
        actions: {
          component: (rowData) => (
            <div>
              {/* <button onClick={() => this.goToCategory(rowData._id)}>
                Go to category
              </button> */}
              {isAdmin() && (
                <button
                  className='btn btn-danger '
                  onClick={() => this.deleteCategory(rowData._id)}
                >
                  Delete Category
                </button>
              )}
            </div>
          ),
        },
      },
    };
    return options;
  };
  render() {
    const { category, isLoading } = this.props;
    return (
      <div className='category_table'>
        {isLoading && <div>Loading..</div>}
        {category && (
          <Table
            data={category}
            headers={headers}
            options={this.getTableOptions()}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCategory: () => dispatch(getCategory()),
  deleteCategory: (id) => dispatch(deleteCategory(id)),
});

const mapStateToProps = (state) => ({
  category: state.category.category,
  isLoading: state.category.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
