const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    plugins: [new TsconfigPathsPlugin({})],
    extensions: [".js", ".ts", ".tsx", ".css", "png", ".jsx", ".json", ".scss", ".svg"],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "assets/scripts/[name].bundle.[fullhash:8].js",
    chunkFilename: "assets/scripts/[name].[fullhash:8].js",
    publicPath: "/",
  },

  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name() {
                return "./assets/images/[fullhash].[ext]";
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name() {
                return "./assets/webfonts/[fullhash].[ext]";
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // favicon: './public/favicon.png',
    }),
    new MiniCssExtractPlugin({}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/images",
          to: "images",
        },
      ],
    }),
  ],
};
