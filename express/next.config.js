const webpack = require('webpack');
const path = require('path');
// const NextWorkbox = require('./webpack/plugins/next-workbox');
const withCSS = require('@zeit/next-css');
const webpackConfig = require('./webpack.config');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = withCSS({
  useFileSystemPublicRoutes: false,

  // webpack: (config, { isServer, dev, buildId, config: { distDir } }) => {
  webpack: config => {
    // Unshift polyfills in main entrypoint.
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
        entries['main.js'].unshift(path.resolve(__dirname, 'polyfills.js'));
      }
      return entries;
    };

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.DATA_API_URL': JSON.stringify(process.env.DATA_API_URL),
        'process.env.SITE_NAME': JSON.stringify(process.env.SITE_NAME),
        'process.env.FACEBOOK_APP_ID': JSON.stringify(process.env.FACEBOOK_APP_ID),
        'process.env.GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID),
        'process.env.LINKEDIN_APP_ID': JSON.stringify(process.env.LINKEDIN_APP_ID),
        'process.env.GOOGLE_MAP_API_KEY': JSON.stringify(process.env.GOOGLE_MAP_API_KEY),
        'process.env.MAPBOX_API_KEY': JSON.stringify(process.env.MAPBOX_API_KEY)
        // 'process.env.BUGSNAG_CLIENT_KEY': JSON.stringify(process.env.BUGSNAG_CLIENT_KEY)
      })
    );
    config.module.rules.push(
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=20000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=20000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=20000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=20000&mimetype=image/svg+xml'
      }
    );

    // config.resolve = webpackConfig.resolve;

    config.resolve.alias = {
      ...webpackConfig.resolve.alias,
      ...config.resolve.alias
    };

    return config;
  }
});
