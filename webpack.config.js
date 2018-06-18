const webpack = require('webpack');
const path = require('path');

module.exports = {
  dev: {
    devtool: 'cheap-module-source-map',
    entry: {
      client: [
        'webpack-hot-middleware/client',
        './src/client/index.js',
      ],
    },
    output: {
      filename: 'bundle-[name].js',
      path: path.resolve(__dirname, '.public'),
      publicPath: '/',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
  production: {
    entry: {
      client: [
        './src/client/index.js',
      ],
    },
    output: {
      filename: 'bundle-[name].js',
      path: path.resolve(__dirname, '.public'),
      publicPath: '/',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true
        },
        output: {
          comments: false,
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    ],
  }
}
