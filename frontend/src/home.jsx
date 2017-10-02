import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Display from './Display.jsx';
import Search from './Search.jsx';
import WatchList from './WatchList.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // symbols: [`TSLA`, `ATVI`, `NVDA`],
      symbols: ["TSLA", "ATVI", "SNE", "SSNLF", "GRUB", "NVDA", "AMD", "INTC", "AMZN", "GOOGL", "GOOG", "IBM", "MBLY", "MSFT", "CRM", "IMMU", "OPNT", "HTHT"],
      data: [],
      stream: [],
      searchTerm: '',
      display: 'Chart',
      watchListDisplay: 'Chart',
      watchList: [],
      watchStocks: []
    }
    this.sendSearch = this.sendSearch.bind(this);
    this.changeHomeDisplay = this.changeHomeDisplay.bind(this);
    this.getFromMarket = this.getFromMarket.bind(this);
    this.watchListAdd = this.watchListAdd.bind(this);
    this.watchListDelete = this.watchListDelete.bind(this);
    this.getWatchList = this.getWatchList.bind(this);
    //this.getWatchList = this.getWatchList.bind(this);
  }
  componentDidMount () {
    var market = this.state.symbols;
    this.getFromMarket(market);

    this.getWatchList();
    // axios.post('/stream')
    // .then(result => {
    //   this.setState({
    //     stream: result.stream
    //   })
    // })
  }

  getFromMarket (symbols){
    axios.post('/markets', {
      symbols: symbols
    })
    .then((result) => {
      console.log('home.jsx line 59 result is ', result.data.quotes.quote);
      this.setState({
        data: result.data.quotes.quote
      })
    })
  }

  getWatchList () {
    axios.get('/watchList')
    .then(result => {
      var watchlist = result.data;
      if (watchlist.length > 0) {
        console.log('watchlist on home is ', result);
        axios.post('/markets', {
          symbols: watchlist
        })
        .then(result => {
          console.log('home.jsx line 40 result is ', result);
          this.setState({
            watchStocks: [].concat(result.data.quotes.quote)
          })
        })
      } else {
        console.log('empty watchlist');
        this.setState({
          watchStocks:[]
        })
      }
    })
  }

  watchListAdd (stock) {
    axios.post('/watchListAdd', {
      stock: stock
    })
    .then(result => {
      this.getWatchList();
    })
  }

  watchListDelete (stock) {
    axios.post('/watchListDelete', {
      stock: stock
    })
    .then(result => {
      console.log('deleted result is ',result);
      this.getWatchList();
    })
  }

  changeHomeDisplay (display, displaytype) {
    this.setState({
      [displaytype]: display
    })
  }

  sendSearch (searchTerm) {
    //console.log('searchTerm ', searchTerm)
    this.setState({
      searchTerm: searchTerm
    })
  }

  render () {
    return (
      <div> 
        <div className='title'>Step Towards Paying Off HR</div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'
              render={ () => (
                <Display data={this.state.data} 
                  sendSearch={this.sendSearch} 
                  display={this.state.display} 
                  changeHomeDisplay={this.changeHomeDisplay}/>
              )}
            />
            <Route path='/search'
              render={  () => (
                <Search 
                  searchTerm={this.state.searchTerm}
                  watchListAdd={this.watchListAdd}
                  watchListDelete={this.watchListDelete}/>
              )}
            />
            <Route path='/watch'
              render={ () => (
                <WatchList data={this.state.watchStocks} 
                  sendSearch={this.sendSearch}
                  display={this.state.display}
                  changeHomeDisplay={this.changeHomeDisplay}/>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

ReactDom.render(<Home/>, document.getElementById('Home'));

// search function
// A stock page that renders for a specific stock
// watchlist


//["TSLA", "ATVI", " UBI", "SNE", "SSNLF", "GRUB", "NVDA", "AMD", "INTC", "AMZN", "GOOGL", "GOOG", "IBM", "MBLY", "MSFT", "CRM", "IMMU", "OPNT", "HTHT"]