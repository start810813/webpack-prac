const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TarWebpackPlugin = require('tar-webpack-plugin').default
const ImageminPlugin =  require('imagemin-webpack-plugin').default

const config = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
            // 不壓縮 HTML
          },
          {
            loader: 'pug-html-loader',
            options: { 
              pretty: true,
              data: {
                TITLE: 'Webpack Practice'
              }
            }
            // 美化 HTML 的編排 (不壓縮HTML的一種)
          }
        ]
      }
    ],
  },
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, 'dist'),
    // },
    port: 10000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      inject: true,
      chunks: ['main'],  // 根據 entry 的名字而定
      minify: {
        sortAttributes: true,
        collapseWhitespace: false, // 折疊空白字元就是壓縮Html
        collapseBooleanAttributes: true, // 折疊布林值属性，例:readonly checked
        removeComments: true, // 移除註釋
        removeAttributeQuotes: true // 移除屬性的引號
      }
    }),
    new MiniCssExtractPlugin(),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i
    })
  ],
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors'
        }
      }
    }
  }
}

module.exports = (env, argv) => {
  console.log(env, argv)
  if (env.PACK) {
    const zipPlugin = new TarWebpackPlugin({
      action: 'c',
      gzip: true,
      file: 'package.tgz',
      fileList: ['dist'],
      delSource: true
    })
    return { 
      ...config,
      plugins: [...config.plugins, zipPlugin]
    }
  } else {
    return config
  }
}
