import React from 'react';
import { Link } from 'react-router-dom';

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
          <div className='head'>Symbol <br/>
            (click buttons below for details)
          </div>
          <div className='head'>Description</div>
          <div className='head'>Ask Price</div>
          <div className='head'>Bid Price</div>
          <div className='head'>Volume</div>
          <div className='headend'>Average Volume</div>
        </div>
        {
          this.props.data.map((stock, i) => {
            return (
              (i === this.props.data.length-1) 
              ? 
              (<div className='stock' key={i}>
                <div className='infoend'> 
                  <Link to='/search' className='linkToStock'>
                    <button type='button'
                      className='stockNameButton' 
                      value={stock.symbol} 
                      onClick={(e)=>{
                        this.props.sendSearch(e.target.value);
                      }}>{stock.symbol}</button>
                  </Link> 
                </div>
                <div className='infoend'> {stock.description} </div>
                <div className='infoend'> {stock.ask || `null`} </div>
                <div className='infoend'> {stock.bid || `null`} </div>
                <div className='infoend'> {stock.volume} </div>
                <div className='infoended'> {stock.average_volume} </div>
              </div>)
              :
              (<div className='stock' key={i}>
                <div className='info'> 
                  
                  <Link to='/search' className='linkToStock'>
                    <button type='button'
                      className='stockNameButton' 
                      value={stock.symbol} 
                      onClick={(e)=>{
                        this.props.sendSearch(e.target.value);
                      }}>{stock.symbol}</button>
                  </Link> 
                </div>
                <div className='info'> {stock.description} </div>
                <div className='info'> {stock.ask || `null`} </div>
                <div className='info'> {stock.bid || `null`} </div>
                <div className='info'> {stock.volume} </div>
                <div className='infoed'> {stock.average_volume} </div>
              </div>)
            )
          })
        }
      </div>
    )
  }
}

export default Chart;