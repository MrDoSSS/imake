const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (env, argv) => {
  return {
    context: __dirname,
    mode: env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.slm$/,
          use: [
            {
              loader: 'html-loader',
            },
            {
              loader: 'slm-loader',
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ttf|woff2|mp4)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
            publicPath: env.NODE_ENV === 'development' ? 'assets' : '/public/master/assets',
            esModule: false
          },
        },
        {
          test: /\.(scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer']
                }

              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.scss', '.slm'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@a': path.resolve(__dirname, 'src/assets/'),
        '@i': path.resolve(__dirname, 'src/assets/img'),
        '@s': path.resolve(__dirname, 'src/assets/scss'),
      }
    },
    entry: {
      // main: './src/index.js',
      profile: './src/profile.js'
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: env.NODE_ENV === 'development' ? '/' : '/public/master/',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 3000,
      hot: true,
      historyApiFallback: true
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: './src/views/index.slm',
      //   scriptLoading: 'defer',
      //   chunks: ['main']
      // }),
      new HtmlWebpackPlugin({
        filename: 'profile.html',
        template: './src/views/profile.slm',
        scriptLoading: 'defer',
        chunks: ['profile']
      }),
      new MiniCssExtractPlugin()
    ],
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
  }
}
