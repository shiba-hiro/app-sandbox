const path = require('path');
const nodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mode: process.env.NODE_ENV ?? "production",
  entry: './src/index.ts',
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: [
          /node_modules/
        ],
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
