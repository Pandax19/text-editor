const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: 
      [new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Output',
    }),
      new WebpackPwaManifest({
        name: 'Jate',
        short_name: 'Jate',
        description: 'code editor for the web',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('images', 'logo')


          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024' // you can also use the specifications pattern


          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024',
            purpose: 'maskable'
          }
        ]



      }),
      new InjectManifest({
        swDest: 'src-sw.js',
        swSrc: './src-sw.js',
      })
      ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],

            }
          }
        }
      ],
    },
  };
};
