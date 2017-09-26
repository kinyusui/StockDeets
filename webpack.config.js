var path = require('path');
var SRC_DIR = path.join(__dirname, '/frontend/src');  //
var DIST_DIR = path.join(__dirname, '/frontend/dist');  //bundle in dist with index.html

module.exports = {
  entry: `${SRC_DIR}/home.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR  //path to distributed files
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR, //include jsx components
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};