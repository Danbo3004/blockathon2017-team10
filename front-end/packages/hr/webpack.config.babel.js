import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const env = process.env.NODE_ENV || 'production';

let plugins = [
  new CopyWebpackPlugin([{ from: './public' }]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env),
    },
  }),
];

const loaderOptionsConfig = {
  options: {
    sassLoader: {
      includePaths: ['./node_modules'],
    },
  },
};

const devConfig = {};
if (env === 'production') {
  loaderOptionsConfig.minimize = true;
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
  );
} else {
  plugins = plugins.concat([new webpack.HotModuleReplacementPlugin()]);
  devConfig.devtool = 'cheap-module-source-map';
  devConfig.entry = [require.resolve('react-dev-utils/webpackHotDevClient'), './src/js/index.js'];
  devConfig.devServer = {
    compress: true,
    clientLogLevel: 'none',
    contentBase: path.resolve('./dist'),
    publicPath: '/',
    quiet: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: true,
  };
}

plugins.push(new webpack.LoaderOptionsPlugin(loaderOptionsConfig));

// bundle react build
plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'react-build',
    minChunks(module) {
      let context = module.context;
      context = context && context.replace(/\\/g, '/');
      return (
        context &&
        (context.indexOf('node_modules/react/') >= 0 ||
          context.indexOf('node_modules/react-dom/') >= 0 ||
          context.indexOf('node_modules/react-loadable/') >= 0)
      );
    },
  }),
);

// catch all - anything used in more than one place
plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    async: 'used-twice',
    minChunks(module, count) {
      return count >= 2;
    },
  }),
);

// specifically bundle these large things after seeing from analyzer
const asyncBundle = (name, { nodePaths = [], resources = [] }) =>
  new webpack.optimize.CommonsChunkPlugin({
    name: 'main',
    async: name,
    minChunks({ context, resource }) {
      if (!context) return false;
      const resourcePath = context.replace(/\\/g, '/');

      return (
        (resourcePath.indexOf('node_modules') >= 0 &&
          (nodePaths.find(t => new RegExp(`/${t}/`, 'i').test(resourcePath)) ||
            nodePaths.find(t => new RegExp(`/${t}$`, 'i').test(resourcePath)))) ||
        (resource &&
          (resources.find(r => !path.relative(`${r}.js`, resource)) ||
            resources.find(r => !path.relative(`${r}.ts`, resource)) ||
            resources.find(r => !path.relative(`${r}.tsx`, resource))))
      );
    },
  });

// example of manually bundle large library
plugins.push(asyncBundle('bluebird', { nodePaths: ['bluebird'] }));

// generate HTML file and inject JS scripts
plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './public/index.html',
    inject: true,
  }),
);

// plugins.push(
//   new BundleAnalyzerPlugin({
//     analyzerMode: 'static',
//   }),
// );

plugins.push(
  // Moment.js is an extremely popular library that bundles large locale files
  // by default due to how Webpack interprets its code. This is a practical
  // solution that requires the user to opt into importing specific locales.
  // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
  // You can remove this if you don't use Moment.js:
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
);

export default Object.assign(
  {
    entry: ['./src/js/index.js'],
    output: {
      path: path.resolve('./dist'),
      filename: '[name].[hash:8].js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.scss', '.css', '.json'],
      alias: {
        pages: path.resolve(__dirname, 'src/js/pages'),
        containers: path.resolve(__dirname, 'src/js/containers'),
        components: path.resolve(__dirname, 'src/js/components'),
        stores: path.resolve(__dirname, 'src/js/stores'),
        shared: path.resolve(__dirname, 'src/js/shared'),
        constants: path.resolve(__dirname, 'src/js/constants'),
        i18n: path.resolve(__dirname, 'i18n'),
      },
    },
    plugins,
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          // Preprocess our own .css files
          // This is the place to add your own loaders (e.g. sass/less etc.)
          // for a list of loaders, see https://webpack.js.org/loaders/#styling
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          // Preprocess 3rd party .css files located in node_modules
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                includePaths: [path.join(__dirname, 'node_modules')],
              },
            },
          ],
        },
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          use: [{ loader: 'file-loader' }],
        },
      ],
    },
  },
  devConfig,
);
