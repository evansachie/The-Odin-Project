const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    static: './dist',
    open: true,
  },
};