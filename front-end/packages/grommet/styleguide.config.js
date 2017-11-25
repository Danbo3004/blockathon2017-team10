const path = require('path');

module.exports = {
  title: 'My Great Style Guide',
  components: './src/js/components/**/*.js',
  serverPort: 4000,
  skipComponentsWithoutExample: true,
  webpackConfig: {
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
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.join(__dirname, 'node_modules')]
              }
            }
          ]
        },
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png$/,
          include: path.join(__dirname, 'src'),
          use: [{ loader: 'file-loader' }]
        }
      ]
    },
    entry: [path.join(__dirname, 'src/scss/magneto/index.scss')]
  },
  require: [
    'babel-polyfill',
    path.join(__dirname, 'src/scss/magneto/index.scss')
  ],
  getExampleFilename(componentPath) {
    return componentPath
      .replace(/src\/js\/components/, 'examples')
      .replace(/\.jsx?$/, '.md');
  }
};
