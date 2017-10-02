const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const axios = require('axios'); //automatically transforms JSON data
const config = require('./config.js') || {
  ACCESSTOKEN:process.env.ACCESSTOKEN,
  mysqlConfig: {
    user: process.env.user,
    database: process.env.database
  }
};
const db = require('./mysql/mysql.js');
const key = config.ACCESSTOKEN;
// const session = require('express-session'); worry about login at the end



const app = express(); //sends endpoints to server
// const marketsRouter = require('./routes/marketsRouter.js');   not very complex yet may use outside routers later
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../frontend/dist'));  
//must include __dirname for nodemon to work
// and also __dirname + '/'   the link must start with /   or else nodemon won't work;


app.post(`/markets`, (req, res) => {
  //console.log('got client side request ', req.body)
  var symbols = req.body.symbols;
  console.log('symbols is ',symbols);
  axios({
    method: 'GET',
    url: `https://sandbox.tradier.com/v1/markets/quotes`,
    params: { symbols: symbols},
    headers: {
      Accept: `application/json`,
      Authorization: `Bearer ${key}`
    }
  })
  .then(result => {
    console.log(result);
    res.send(result.data);
  })
  .catch(err => {
    console.log(err);
    res.end();
  })
});

app.post('/liveSales', (req, res) => {
  var params = {};
  for (var key1 in (req.body)) {
    params[key1] = req.body[key1];
  }
  var testparams = Object.assign({},params);
  testparams.start = `2017-09-26T09:30`;
  testparams.end = `2017-09-26T16:00`;
  //console.log('params ',params, testparams);
  axios({
    method: 'GET',
    url: `https://sandbox.tradier.com/v1/markets/timesales`,
    params: testparams,// use params on live
    headers: {
      Accept: `application/json`,
      Authorization: `Bearer ${key}`
    }
  })
  .then(result => {
    console.log('timesales result ',result);
    res.send(result.data.series.data);
  })
  .catch(err => {
    console.log('line 109 err', err);
    return;
  })
})

app.post(`/stream`, (req, res) => {
  axios({
    method: 'POST',
    url: `https://sandbox.tradier.com/v1/markets/events/session`,
    headers: {
      Accept: `application/json`,
      Authorization: `Bearer ${key}`
    }
  })
  .then(result => {
    console.log('stream ',result);
    res.send(result.data);
  })
  .catch(err => {
    console.log(err);
    res.end();
  })
})

app.get('/watchList', (req, res) => {
  db.getWatchList(result => {
    var symbols = result.map(stock => stock.stockSymbol);
    res.send(symbols);
  })
})

app.post('/watchListAdd', (req, res) => {
  var stock = req.body.stock;
  console.log('server.js line 77',req,stock);
  db.addToWatchList(stock, result => {
    res.send(result);
  })
})

app.post('/watchListDelete', (req, res) => {
  var stock = req.body.stock;
  db.removeFromWatchList(stock, result => {
    res.send(result);
  })
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// app.get('/', (req, res) => {
//   res.send(`home`);
// })
// app.get(`/markets`, (req,res) => {
//   res.end(`got request at markets`);
// })

// https://sandbox.tradier.com/v1/
// TSLA
// ATVI 
// UBI
// SNE
// SSNLF
// GRUB
// NVDA
// AMD
// INTC
// AMZN
// GOOGL
// GOOG
// IBM
// MBLY
// MSFT
// CRM

// IMMU
// OPNT
// HTHT








































