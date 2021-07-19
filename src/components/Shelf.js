import React, {Component} from 'react';

class Shelf extends Component {
   
    render() {
        const {usedBooks, headingOfShelf} = this.props; //console.log(usedBooks, headingOfShelf) // to confirm that i did it right
        // this solution will lead to too much edit on word  and for this i will give the HeadingOfShelf to component as props passed to here  
        //const HeadingOfShelf = (usedBooks.map((book) => {return ( book.shelf)}))[0]; 
        const allShelfBooks = usedBooks.map((book) => {return (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, 
                backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'No image'})` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => this.props.changeShelfValue(book, e.target.value)}> {/* (e) =>console.log(e.target.value) */} 
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Unknown Author'}</div>{/* failed when i tried to search[...(book.authors)]*/}
            {/* we used b.authors.join(',') to convert from array to string elements separted by comma so we can query on it */}
          </div>
          </li>
    )})
        return(

    <div className="bookshelf-books">
        <h2> {headingOfShelf}  </h2>
        <ol className="books-grid" >
        {allShelfBooks}
        </ol>
        </div>
       
        )
    }
}

export default Shelf;