const webpack = require('webpack');
const aliases = require('../aliases.js');

module.exports = async ({ config, mode }) => {

  // console.log({ config, mode });

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.GOOGLE_MAP_API_KEY': JSON.stringify(process.env.GOOGLE_MAP_API_KEY),
      'process.env.MAPBOX_API_KEY': JSON.stringify(process.env.MAPBOX_API_KEY),
    })
  );
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            configFileName: './src/tsconfig.json',
            // transpileOnly: true,
            errorsAsWarnings: true
          }
        }
      ]
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }
  );
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = aliases;

  return config;
};
