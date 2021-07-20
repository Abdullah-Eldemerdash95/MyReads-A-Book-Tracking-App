import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelves from './components/Shelves.js';
import Search from './components/Search';
import SearchButton from './components/SearchButton';
import {Route, Switch} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],// this one to contain data that we will use from api
    showingBooks: [],
    query: "" // this one to contain input value of search bar
  }

  
 updateQuery = (query) => {// this is the function responsible for updating value of search bar input in state
  this.setState(() => ({
    query: query
  }))
}

clearQuery = () => {// this is the function responsible for clearing value of search bar input in state
  this.setState(() => ({query: ""}))
}

 componentDidMount () { // we use componentDidMount when we need to fetch data this data needs state so we will create one
  BooksAPI.getAll()
  .then((response) =>  //console.log(response) // to know details about data that i need
  this.setState({books: response})
  // all new data of books needed to be send to shelves comp so we will pass it as props
  )}

changeShelf = (chosenBook, shelf) => {
  BooksAPI.update(chosenBook, shelf).then(res => {
   console.log(res)});
   chosenBook.shelf = shelf; // if not there we create it if there we give the wanted value
   this.setState((prevState) => ({ books: prevState.books.filter(
     (book) => (book.id !== chosenBook.id))
     .concat(chosenBook)}))}

// search functionality for search bar

searchForBooks = query => {
if (query.length > 0) {
    BooksAPI.search(query).then(books => {
      if (books.error) { // to handle invaild queries 
        this.setState({ showingBooks: [] });
        } else {// the book.map for fixing search page auto value of selected shelves by check books that coming from api if any of it is in main we update shelf attribute 
  books.map(book => {if (this.state.books.some(b => b.id === book.id)){book.shelf = this.state.books.find(x => x.id === book.id).shelf} return book});
  books.filter((b) => (b.title.toLowerCase().includes(query.toLowerCase()))||(b.authors.join(',').toLowerCase().includes(query.toLowerCase())));
  this.setState({ showingBooks: books });
        }
      });
    } else {
      this.setState({ showingBooks: [] });
    }}

    handleChange = (e) => {
      if(e.target.value === '') 
      {this.setState({showingBooks: []})} else {this.searchForBooks(this.state.query);};
      this.updateQuery(e.target.value);
    }

    resetShowingBooks= () => {
      this.setState({showingBooks: []})
    }

  render() {
    return (
      <div className="app">
        <Switch>{/* switch is for to tell the router to stop matching further once it matches a route */}
       <Route exact path='/search' render={() => (
       <Search  
       showingBooks={this.state.showingBooks}  
       query={this.state.query} 
       changeShelfInSearch={this.changeShelf}
       handleChange={this.handleChange}
       clearQuery={this.clearQuery} /* we called for this clearquery func so each time we go back to home with this button it clears query */
       />)}/>

       <Route
       exact path='/' render={() => (
       <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
       <Shelves data={this.state.books} changeShelfInShels={this.changeShelf}/>
       <SearchButton resetShowingBooks={this.resetShowingBooks} />
      
     </div>)}/>  
          </Switch>

      </div>
    )
  }
}

export default BooksApp

