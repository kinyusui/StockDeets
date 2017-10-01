import React from 'react';
import Chart from './Chart.jsx';
import Ticket from './Ticket.jsx';
import { Col, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class WatchList extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      watchList: props.watchList,
      watchListDisplay: props.display,
      searchTerm: ''
    }
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  updateSearchTerm (e) {
    var term = e.target.value;
    this.setState({
      searchTerm: term
    })
  }

  changeDisplay (e) {
    e.preventDefault();
    var newDisplay;
    this.state.watchListDisplay === 'Chart' ? newDisplay = 'Ticket' : newDisplay = 'Chart';
    console.log('newDisplay ',newDisplay);
    this.props.changeHomeDisplay(newDisplay, 'watchListDisplay');
    this.setState({
      watchListDisplay: newDisplay
    })
  }
  
  render () {
    return (
      <div className='display'> 
        <div className='marketTitle'>Watchlist Display: {this.state.watchListDisplay}</div>
        <FormGroup>
          <FormControl type='text' 
            placeholder='Enter a search term!' 
            value={this.state.seachTerm} 
            onChange={this.updateSearchTerm}/>
        </FormGroup>{' '}
        <Link to='/search'>
          <button type="button" onClick={ (event) => {
            this.props.sendSearch(this.state.searchTerm);
          }}>
            Search
          </button>
        </Link>
        <div className='rowOfButtons'>
          <button className='changeDisplay' 
            type='button' 
            onClick={this.changeDisplay} 
            value='Change Display'>
            Change Display Style
          </button>
          <Link to='/'>
            <button className='toHome' type="button">
              Home
            </button>
          </Link>
        </div>
      {
        (this.state.watchListDisplay === 'Chart') ?
        (<Chart data={this.props.data} sendSearch={this.props.sendSearch}/>)
        :
        (<Ticket data={this.props.data} sendSearch={this.props.sendSearch}/>)
      }
      </div>
    )
  }
}

export default WatchList;


