var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob_entries = require('webpack-glob-entries');

module.exports = {
  entry: glob_entries('./src/js/**/*.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  performance: {
    hints: false
  },
  plugins: [new ExtractTextPlugin('[name].css')],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png$/,
        include: path.join(__dirname, 'src'),
        use: [{ loader: 'file-loader' }]
      }
    ]
  }
};
