import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends React.Component {
  render() {
    const shelfTitle = [ "Currently Reading", "Want to Read", "Read"];
    const shelfCat = ["currentlyReading", "wantToRead", "read"];

    return(
      // Map through all shelf categories
      shelfCat.map((currentShelf, index) => {
        return(
          <div className="bookshelf" key={currentShelf}>
            <h2 className="bookshelf-title" >{shelfTitle[index]}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {/* Iterate through all books and place them in their respective
               / shelves */}
                { this.props.books.filter(book => book.shelf === currentShelf)
                .map(book => {
                  return (
                    <li key={book.id}>
                      <Book 
                        book={book}
                        updateBook={this.props.updateShelves}
                      />
                    </li>
                  )
                })
                }
              </ol>
            </div>
          </div>
        )
      })
    )
  }
}

Shelf.propTypes = {
  updateShelves: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
};

export default Shelf;