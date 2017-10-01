import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      stock: '',
      time: [],
      high: [],
      low: []
    }
  }
  componentDidMount () {
    //console.log('this.props.searchTerm ', this.props.searchTerm);
    var today = new Date().toISOString().substring(0,16);
    var start = today.substring(0,11) + '09:30';
    axios.post(`/markets`, {
      symbols: this.props.searchTerm
    })
    .then(result => {
      console.log('Search.jsx result is ', result.data.quotes.quote);
      this.setState({
        stock: result.data.quotes.quote
      })
    })


    axios.post(`/liveSales`, {
      symbol: this.props.searchTerm,
      start: start,
      end: today,
      interval: `5min`
    })
    .then(result => {
      var data = result.data;
      //var time = data.map(block => block.time.substring(11,16));
      var time = data.map(block => block.time);
      var high = data.map(block => block.high);
      var low = data.map(block => block.low);
      
      var xaxis = [];
      for (var i = 0; i < time.length; i+=6) {
        xaxis.push(time[i]);
      }
      this.setState({
        time: time,
        high: high,
        low: low,
        xaxis: xaxis
      });
    })
    .then(result => {
      console.log(this.state);
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          xFormat: '%H:%M',
          columns: [
            ['x', ...this.state.time],
            ['high', ...this.state.high],
            ['low', ...this.state.low]
          ],
          colors: {
            high: 'blue',
            low: 'red'
          }
        },
        axis: {
          label: {
            text: 'Time'
          },
          x: {
            type: 'timeseries',
            tick: {
              format: '%H:%M',
              values: [...this.state.xaxis]
            }
          }
        }
      });
    })
  }



  render () {
    var infos = [];
    var stock = this.state.stock;
    for (var key in stock) {
      infos.push(<div key={key}>{`${key}: ${stock[key]}`}</div>);
    }
    return (
      <div className='lookUp'>
        <Link to='/'>
          <button type="button">
            Home
          </button>
        </Link>
        <br/>
        <div className='addDeleteContainer'>
          <button type='button'
            className='addToWatchList' 
            onClick={(e) => {
              e.preventDefault();
              this.props.watchListAdd(this.state.stock.symbol)
            }}>
            Add To Watchlist
          </button>

          <button type='button'
            className='deleteFromWatchList' 
            onClick={(e) => {
              e.preventDefault();
              this.props.watchListDelete(this.state.stock.symbol)
            }}>
            Delete From Watchlist
          </button>
        </div>
        <br/>
        <div id='chart'>No Chart Yet</div>
        {infos}
      </div>
    )
  }
}

export default Search;

// app.post('/watchListAdd', (req, res) => {
//   var stock = req.body.stock;
//   db.addToWatchList(stock, result => {
//     res.send(result);
//   })
// })

// app.post('/watchListDelete', (req, res) => {
//   var stock = req.body.stock;
//   db.removeFromWatchList(stock, result => {
//     res.send(result);
//   })
// })



// app.post(`/markets`, (req, res) => {
//   console.log('got client side request ', req.body)
//   var symbols = req.body.symbols.splice(1,3);
//   axios({
//     method: 'GET',
//     url: `https://sandbox.tradier.com/v1/markets/quotes`,
//     params: { symbols: symbols},
//     headers: {
//       Accept: `application/json`,
//       Authorization: `Bearer ${key}`
//     }
//   })
//   .then(result => {
//     console.log(result);
//     res.send(result.data);
//   })
//   .catch(err => {
//     console.log(err);
//     res.end();
//   })
// });