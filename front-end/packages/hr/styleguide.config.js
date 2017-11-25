const path = require('path');
module.exports = {
  title: 'My Style Guide',
  components: './src/js/**/*.js',
  serverPort: 4000,
  skipComponentsWithoutExample: true,
  updateWebpackConfig(webpackConfig) {
    const dir = path.join(__dirname, 'src');
    webpackConfig.module.loaders.push(
      {
        test: /\.js/,
        include: dir,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: dir,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
              includePaths: [path.join(__dirname, 'node_modules')]
            }
          }
        ]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        include: dir,
        use: [{ loader: 'file-loader' }]
      }
    );
    webpackConfig.entry.push(path.join(__dirname, 'src/scss/index.scss'));
    return webpackConfig;
  }
};