import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book';

class SearchResults extends React.Component {
  render() {
    return(
      <ol className="books-grid">
        { this.props.searchResults.map(searchResult => {
            return (
            <li key={searchResult.id}>
              <Book
                book={searchResult}
                updateBook={this.props.updateSearchResults}
              />
            </li>);
        })}
      </ol>
    )
  }
}

SearchResults.propTypes = {
  updateSearchResults: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired
};

export default SearchResults;