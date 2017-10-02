const mysql = require('mysql');
const mysqlConfig = require('../config.js').mysqlConfig || {
  user: process.env.user,
  database: process.env.database
};

const connection = mysql.createConnection(mysqlConfig);

const getWatchList = (callback) => {
  let sql = `SELECT stockSymbol FROM watches`; //gonna have to modify this;
  connection.query(sql, function(err, result, field) {
    if (err) {
      console.log('line 10 mysql.js err',err);
      throw err;
      return;
    }
    callback(result);
  })
}

const addToWatchList = (stock, callback) => {
  let sql = `INSERT INTO watches (stockSymbol) VALUES (?)`; //gonna have to modify this;
  connection.query(sql, stock, function(err, result, field) {
    if (err) {
      console.log('line 22 mysql.js err',err);
      throw err;
      return;
    }
    callback(result);
  })
}

const removeFromWatchList = (stock, callback) => {
  let sql = `DELETE FROM watches WHERE stockSymbol = ?`; //gonna have to modify this;
  connection.query(sql, stock, function(err, result, field) {
    if (err) {
      console.log('line 34 mysql.js err',err);
      throw err;
      return;
    }
    callback(result);
  })
}

module.exports = {
  getWatchList,
  addToWatchList,
  removeFromWatchList
};

// Reference
// const getBudgetCategories = function(callback) {
//   let sql = `SELECT * FROM categories`; //gonna have to modify this;
//   connection.query(sql,function(err, result, field) {
//     console.log('err',err);
//     if (err) {
//       throw err;
//       return;
//     }
//     callback(err, result);
//   })
// }


// const addBudgetCategory = function(params, callback) {
//   let sql = `INSERT INTO categories (name, budget) VALUES (?, ?)`;
//   connection.query(sql, params, function(err, result) {
//     if (err) {
//       throw err;
//       return;
//     }
//     callback(err, result);
//   })
// }

// const update = function(params, callback) {
//   let sql = `UPDATE transactions SET category = ?, category_id = (SELECT id FROM categories WHERE name = ?) WHERE id = ?`;
//   connection.query(sql, params, function(err, result) {
//     console.log('update completed')
//     if (err) {
//       throw err;
//       return;
//     }
//     callback(err, result);
//   });
// }