import React from 'react';
import { Col } from 'react-bootstrap';

class Display extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className='display'>
        <div className='stock'>
          <div className='info'>Symbol</div>
          <div className='info'>Description</div>
          <div className='info'>Ask Price</div>
          <div className='info'>Bid Price</div>
          <div className='info'>Volume</div>
          <div className='info'>Average Volume</div>
        </div>
        {
          this.props.data.map((stock, i) => {
            <div className='stock'>
              <div className='info'></div>
              <div className='info'></div>
              <div className='info'></div>
              <div className='info'></div>
            </div>
          })
        }
      </div>
    )
  }
}

export default Display;


// var date = new Date(x);
// var hour = date.getHours();
// var minute= date.getMinutes();
// var second = date.getSeconds();
// var year = date.getFullYear();
// var date1 = date.getDate();
// var month = date.getMonth();



//Reference
// ask:63.5
// ask_date:1506551516000
// askexch:"Q"
// asksize:1
// average_volume:5988878
// bid:62.64
// bid_date:1506552909000
// bidexch:"Q"
// bidsize:2
// change:1.34
// change_percentage:2.16
// close:63.09
// description:"Activision Blizzard Inc"
// exch:"Q"
// high:63.45
// last:63.09
// last_volume:366614
// low:61.99
// open:62
// prevclose:61.76
// root_symbols:"ATVI"
// symbol:"ATVI"
// trade_date:1506542400000
// type:"stock"
// volume:5001724
// week_52_high:66.58
// week_52_low:35.12