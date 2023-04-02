const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const StylelintBarePlugin = require('stylelint-bare-webpack-plugin');

const pagesDir = './src/pug/pages';
const filenames = fs.readdirSync(pagesDir);
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';
const isDev = !isProd;

const PATH = '/';

console.log(process.env.NODE_ENV);

module.exports = {
  mode: isDev,
  devtool: isDev ? 'source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: false,
    port: 8090,
  },
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src/assets/'),
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/js/[name].js',
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name][ext][query]`;
    },
  },
  plugins: [
    ...filenames.map((file) => {
      console.log(file);
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, pagesDir, file),
        filename: `${path.parse(file).name}.html`,
        minify: false,
        path: isProd ? `/${PATH}` : '',
      });
    }),
    new ESLintPlugin(),
    new StylelintBarePlugin({}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        fill: '#fff',
        class: 'svg-icon',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico|mp4)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.svg$/i,
        include: /.*_sprite\.svg/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'sprite.svg',
              runtimeCompat: true,
            },
          },
          {
            loader: 'svgo-loader',
          },
        ],
      },
    ],
  },
};
