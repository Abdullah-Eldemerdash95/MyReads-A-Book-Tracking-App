import React, {Component} from 'react';
import Shelf from './Shelf.js';

class Shelves extends Component {
    render() {
        const Books = this.props.data; // we have property key called shelf determine each book refer to what shelf
        return(
            <div className="list-books-content">
                <div> {/* we used heading of shelf cause if i want take book shelf will make it to me harder to edit on it  */}
                    <Shelf usedBooks={Books.filter((book) => book.shelf === "currentlyReading")} headingOfShelf='Currently Reading' changeShelfValue={this.props.changeShelfInShels} />  {/*this filter to send books only belong to Currently Reading shelf*/}
                    <Shelf usedBooks={Books.filter((book) => book.shelf === "wantToRead")} headingOfShelf='Want To Read' changeShelfValue={this.props.changeShelfInShels}/>    {/* this filter to send books only belong toWant to Read shelf*/}
                    <Shelf usedBooks={Books.filter((book) => book.shelf === "read")} headingOfShelf='Read' changeShelfValue={this.props.changeShelfInShels}/>  {/* this filter to send books only belong to Read shelf*/} 
                </div>
            </div>

        )
    }
}

export default Shelves;