import React from 'react'
import { Route} from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelves from './Shelves'
import SearchResults from './SearchResults'

class BooksApp extends React.Component {

  state = {
    books: [],
    query: '',
    searchResults: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((resp) => 
      this.setState({ books: resp}));
  }

  // Update state when books are moved from one shelf to another
  updateShelves = (currentBook, shelfMovedTo) => {
    let updatedBooks = [];
    
    BooksAPI.update(currentBook, shelfMovedTo).then(() => {
      currentBook.shelf = shelfMovedTo;

      //check if book exists in the shelf already
      if (this.state.books.filter((book) => book.id === currentBook.id) !== []){
        //update the shelf of the existing book, to move it to
        //another shelf.
        updatedBooks = this.state.books.map((book)=> {
            if (book.id === currentBook.id){
              book.shelf = shelfMovedTo;
            }
            return book;
        })
      } else {
        //if a book doesn't exist in the book shelves, then
        //add that new book to the shelf.
        updatedBooks.concat([currentBook]);
      }
      this.setState(state => ({books: updatedBooks}));
    })
  }

  // Reset search page input field value and page search results
  resetQuery = () => {
    this.setState({ query: ''})
    this.setState({ searchResults: []})
  }

  updateQuery = (query) => {
    let updatedResults = [];
    this.setState({ query })

    //Update search results state only if there is a query and
    //if there is no error
    if (query){
      BooksAPI.search(query).then((queryResults) => {
        if (queryResults.error) {
          this.setState({searchResults: []})
        } else {
          // Update the shelf category of books in search results, for all 
          // books already on particular shelves. If not set it to 
          // "none"
          queryResults = 
          queryResults.map( searchResult => {
              searchResult.shelf = "none";
              this.state.books.map(book => {
                if (book.id === searchResult.id){
                  searchResult.shelf = book.shelf;
                }
                return searchResult;
              })
              return searchResult;
            });
          this.setState({ searchResults: queryResults});
        }
      })
      this.setState({searchResults : updatedResults});
    } else {
      this.setState({searchResults: []});
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render = {() => (
          <div className="search-books">
          <div className="search-books-bar">
            <Link 
              to="/" 
              className="close-search"
              //Reset the query value and results when back is clicked
              onClick={this.resetQuery}>Close</Link>
            <div className="search-books-input-wrapper">
              <input 
                type="text"
                className='search-form'
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <SearchResults
              updateSearchResults = {this.updateShelves}
              searchResults = {this.state.searchResults}
            />
          </div>
          </div>
        )}/>
        <Route exact path="/" render = {() => (
          <Shelves
            books = {this.state.books}
            updateShelves = {this.updateShelves}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp