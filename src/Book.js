import React from 'react'
import PropTypes from 'prop-types'
import fallBackImgUrl from './img/blank_cover.jpg'

class Book extends React.Component {
  render() {
    //Check if url to book cover image exists else use 
    //a default url
    let bookCoverImgUrl = '';

    if (this.props.book.imageLinks){
      bookCoverImgUrl = this.props.book.imageLinks.thumbnail;
    } else{
      bookCoverImgUrl = fallBackImgUrl;
    }

    return(
      <div className="book">
        <div className="book-top">
          <div 
            className="book-cover" 
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${bookCoverImgUrl})`
          }}
          />
          <div className="book-shelf-changer">
            <select 
              value={this.props.book.shelf}
              onChange={event =>
                this.props.updateBook(this.props.book, event.target.value)
              }
            >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {/* //If book author name does not exist then it is set to 'Unknown' */}
        <div className="book-authors">{this.props.book.authors || 'Unknown'}</div>
      </div>
    )
  }
}

Book.propTypes = {
  updateBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
};

export default Book;




