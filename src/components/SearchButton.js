import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchButton extends Component {
    render() {
        return(//Search Button
<div className="open-search">
<Link  to='/search'> 
<button onClick={(()=>this.props.resetShowingBooks())} title={'Go search'}>Search for book</button> 
{/* this to confirm each time we have blank page at start by using reset showing books  */}
</Link>
</div>
        )
    }
} 

export default SearchButton;
