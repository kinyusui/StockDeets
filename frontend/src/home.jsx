import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      symbols: ["TSLA", "ATVI", "SNE", "SSNLF", "GRUB", "NVDA", "AMD", "INTC", "AMZN", "GOOGL", "GOOG", "IBM", "MBLY", "MSFT", "CRM", "IMMU", "OPNT", "HTHT"],
      data: []
    }
  }
  componentDidMount () {
    axios.post('/markets', {
      symbols: this.state.symbols
    })
    .then((result) => {
      console.log('home.jsx result is ', result.data.quotes.quote);
      //quotes: quote
      this.setState({
        data: result.data.quotes.quote
      })
    })
  }
  render () {
    return (
      <div>
        <Display data={this.state.data}/>
      </div>
    )
  }
}

ReactDom.render(<Home/>, document.getElementById('Home'));



//["TSLA", "ATVI", " UBI", "SNE", "SSNLF", "GRUB", "NVDA", "AMD", "INTC", "AMZN", "GOOGL", "GOOG", "IBM", "MBLY", "MSFT", "CRM", "IMMU", "OPNT", "HTHT"]