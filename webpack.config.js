const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties'
          ]
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|bmp|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: '../images/'
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/images', to: './assets/images' },
      ],
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html')
    }),
    new HTMLWebpackPlugin({
      filename: 'contacts.html',
      template: path.resolve(__dirname, './src/contacts.html')
    }), 
    new HTMLWebpackPlugin({
      filename: 'catalog.html',
      template: path.resolve(__dirname, './src/catalog.html')
    }),
    new HTMLWebpackPlugin({
      filename: 'catalog-prod.html',
      template: path.resolve(__dirname, './src/catalog-prod.html')
    }), 
    new HTMLWebpackPlugin({
      filename: 'card.html',
      template: path.resolve(__dirname, './src/card.html')
    }), 
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 3000
  }
}

module.exports = config