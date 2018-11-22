import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'


class Shelves extends React.Component {
  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
            books = {this.props.books}
            updateShelves={this.props.updateShelves}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

Shelves.propTypes = {
  updateShelves: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
};

export default Shelves;