const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [ // or "loaders" for webpack 1.x
      { test: /\.g(raph)?ql$/,
        use: [
          { loader: 'webpack-graphql-loader' }
        ]
      }
    ]
  },
  externals: [nodeExternals()],
  mode: 'development'
};
