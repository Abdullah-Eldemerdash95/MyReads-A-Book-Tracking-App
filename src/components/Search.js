import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Search extends Component {
render() {
        const { query, handleChange , showingBooks, clearQuery } = this.props  
      // the condition here for if no authours don't bug
      // we used b.authors.join(',') to convert from array to string elements separted by comma so we can query on it */
        return(
  <div className="search-books">
    <div className="search-books-bar">
    <Link  to='/'> 
    <button className="close-search" onClick={clearQuery}>Close</button> 
    </Link>
      <div className="search-books-input-wrapper">

        <input type="text" placeholder="Search by title or author"
        className='search-books'
        value={query}
        onChange={handleChange}
        onKeyUp={handleChange}
        />

      </div>
    </div>
  <div className="search-books-results">
    <ol className="books-grid">
   {showingBooks.map((book) => {return (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, 
                backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'No image'})` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => this.props.changeShelfInSearch(book, e.target.value)}> {/* (e) =>console.log(e.target.value) */} 
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join(',') : 'Unknown Author'}</div>
          </div>
          </li>
    )})}
  </ol>
</div>
</div>
        )
    }
} 

export default Search;
 