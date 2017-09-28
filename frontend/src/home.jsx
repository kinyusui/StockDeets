import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Display from './Display.jsx';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      symbols: ["TSLA", "ATVI", "SNE", "SSNLF", "GRUB", "NVDA", "AMD", "INTC", "AMZN", "GOOGL", "GOOG", "IBM", "MBLY", "MSFT", "CRM", "IMMU", "OPNT", "HTHT"],
      data: [],
      stream: []
    }
  }
  componentDidMount () {
    axios.post('/markets', {
      symbols: this.state.symbols
    })
    .then((result) => {
      console.log('home.jsx result is ', result.data.quotes.quote);
      this.setState({
        data: result.data.quotes.quote
      })
    })

    // axios.post('/stream')
    // .then(result => {
    //   this.setState({
    //     stream: result.stream
    //   })
    // })
  }
  render () {
    return (
      <div>
        <div className='title'>Step Towards Paying Off HR</div>
        <Display data={this.state.data}/>
      </div>
    )
  }
}

ReactDom.render(<Home/>, document.getElementById('Home'));

// search function
// A stock page that renders for a specific stock
// watchlist


//["TSLA", "ATVI", " UBI", "SNE", "SSNLF", "GRUB", "NVDA", "AMD", "INTC", "AMZN", "GOOGL", "GOOG", "IBM", "MBLY", "MSFT", "CRM", "IMMU", "OPNT", "HTHT"]