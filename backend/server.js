const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const axios = require('axios');
const config = require('./config.js');
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


app.post(`/markets`, function(req, res) {
  console.log('got client side request ', req.body)
  var symbols = req.body.symbols.splice(1,3);
  axios({
    method: 'GET',
    url: `https://sandbox.tradier.com/v1/markets/quotes`,
    params: { symbols: symbols},
    headers: {
      Accept: `application/json`,
      Authorization: `Bearer ${key}`
    }
  })
  .then((result) => {
    console.log(result);
    res.send(result.data);
  })
  .catch(err => {
    console.log(err);
    res.end();
  })
});




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








































