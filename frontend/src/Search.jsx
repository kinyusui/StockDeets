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
  }
  render () {
    var infos = [];
    var stock = this.state.stock;
    for (var key in stock) {
      infos.push(<div key={key}>{`${key}: ${stock[key]}`}</div>);
    }
    return (
      <div>
        <Link to='/'>
          <button type="button">
            Home
          </button>
        </Link>
        {infos}
      </div>
    )
  }
}

export default Search;

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