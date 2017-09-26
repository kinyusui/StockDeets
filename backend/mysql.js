



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