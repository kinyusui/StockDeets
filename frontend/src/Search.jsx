import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      stock: ''
    }
  }
  componentDidMount () {
    //console.log('this.props.searchTerm ', this.props.searchTerm);
    axios.post(`/markets`, {
      symbols: this.props.searchTerm
    })
    .then(result => {
      console.log('Search.jsx result is ', result.data.quotes.quote);
      this.setState({
        stock: result.data.quotes.quote
      })
    })

    var today = new Date().toISOString().substring(0,16);
    var start = today.subString(0,11) + '09:30';
    axios.post(`/timeSales `, {
      symbol: this.stock.symbol,
      start: start,
      end: today,
      interval: `1min`
    })
    .then(result => {
      var time = result.map(block => block.time)
    })
  }



  render () {
    // var chart = c3.generate({
    //   data: {
    //     x: 'x',
    //     columns: [
    //       ['x', 30, 50, 100, 230, 300, 310],
    //       ['data1', 30, 200, 100, 400, 150, 250],
    //       ['data2', 130, 300, 200, 300, 250, 450]
    //     ]
    //   }
    // });

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
        <button type='button' onClick={(e) => {
          e.preventDefault();
          this.props.watchListAdd(this.state.stock.symbol)
        }}>
          Add To Watchlist
        </button>

        <button type='button' onClick={(e) => {
          e.preventDefault();
          this.props.watchListDelete(this.state.stock.symbol)
        }}>
          Delete From Watchlist
        </button>
        <br/>
        <div id="chart"></div>
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