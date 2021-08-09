const path = require('path')
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const rootPath = path.resolve(__dirname, '..')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map',
  entry: path.resolve(rootPath, 'main.ts'),
  target: 'electron-main',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1']
    }),
  ],
  plugins: [new webpack.HotModuleReplacementPlugin(),],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  node: {
    __dirname: false
  },
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].js'
  }
}