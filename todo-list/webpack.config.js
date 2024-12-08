const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'dist'),  // This replaces `contentBase`
    open: true,  // Automatically open the browser
    hot: true,   // Enable Hot Module Replacement (HMR)
    port: 8080,  // Specify the port for the dev server
  },
};
