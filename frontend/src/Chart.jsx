import React from 'react';

class Chart extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    }
  }
  render () {
    return (
      <div className='table'>
        <div className='stock'>
          <div className='head'>Symbol</div>
          <div className='head'>Description</div>
          <div className='head'>Ask Price</div>
          <div className='head'>Bid Price</div>
          <div className='head'>Volume</div>
          <div className='head'>Average Volume</div>
        </div>
        {
          this.props.data.map((stock, i) => {
            return (
              (i === this.props.data.length-1) 
              ? 
              (<div className='stock' key={i}>
                <div className='infoend'> {stock.symbol} </div>
                <div className='infoend'> {stock.description} </div>
                <div className='infoend'> {stock.ask || `null`} </div>
                <div className='infoend'> {stock.bid || `null`} </div>
                <div className='infoend'> {stock.volume} </div>
                <div className='infoend'> {stock.average_volume} </div>
              </div>)
              :
              (<div className='stock' key={i}>
                <div className='info'> {stock.symbol} </div>
                <div className='info'> {stock.description} </div>
                <div className='info'> {stock.ask || `null`} </div>
                <div className='info'> {stock.bid || `null`} </div>
                <div className='info'> {stock.volume} </div>
                <div className='info'> {stock.average_volume} </div>
              </div>)
            )
          })
        }
      </div>
    )
  }
}

export default Chart;