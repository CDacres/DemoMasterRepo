/* eslint-disable camelcase */

const webpack = require('webpack');
const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const devEnv = nodeEnv === 'development';
const isVerbose = process.argv.includes('--verbose');

const MODULE_CSS_LOADER = 'css-loader?sourceMap&modules';

const output = {
    path: path.resolve(__dirname, 'dist/public/assets'),
    publicPath: '/dist/public/assets/',
    sourcePrefix: '  ',
    pathinfo: isVerbose
};

const plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery/src/jquery',
        jQuery: 'jquery/src/jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'shared',
        chunks: [
            'common',
            'pages',
            'landing_pages',
            'search',
            'search_bar',
            'payments',
            'spaces',
            'users',
            'venues',
            'administrator'
        ],
        minChunks: 2
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest'
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
];

if (!devEnv) {
    output.filename = '[name].[chunkhash].min.js';
    output.chunkFilename = '[name].[chunkhash].min.js';
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: isVerbose,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        })
        // new ExtractTextPlugin({
        //     filename: '[name].[chunkhash].min.css'
        // })
    );
} else {
    output.filename = '[name].js';
    output.chunkFilename = '[name].js';
    plugins.push(
        new DashboardPlugin()
    );
}

module.exports = {
    devtool: devEnv ? 'cheap-module-source-map' : 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
        vendor: [
            'jquery',
            'bootstrap',
            'ramda'
        ],
        common: './common',
        pages: './pages',
        landing_pages: './landing_pages',
        search: './search',
        search_bar: './search_bar',
        payments: './payments',
        spaces: './spaces',
        users: './users',
        venues: './venues',
        administrator: './administrator'
    },
    output,
    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.less$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/
                ],
                loader: 'url'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, './src')
                ],
                exclude: /(node_modules)/,
                query: {
                    retainLines: true,
                    cacheDirectory: devEnv,
                    babelrc: false,
                    presets: [
                        'env',
                        'stage-0',
                        'react',
                        ...devEnv ? [] : ['react-optimize']
                    ],
                    plugins: [
                        'transform-runtime',
                        'transform-async-to-generator',
                        'transform-class-properties',
                        'transform-decorators-legacy',
                        'syntax-dynamic-import',
                        'ramda',
                        [
                            'import',
                            [
                                {
                                    libraryName: 'antd',
                                    style: true
                                }
                            ]
                        ],
                        ...!devEnv ? [] : [
                            'transform-react-jsx-source',
                            'transform-react-jsx-self'
                        ]
                    ]
                }
            },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         loader: [
            //             {
            //                 loader: 'css-loader',
            //                 query: {
            //                     localIdentName: '[hash:8]',
            //                     modules: true
            //                 }
            //             }
            //         ]
            //     })
            // },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    MODULE_CSS_LOADER
                ]
            },
            {
                test: /\.css\?global$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader?{modifyVars:{"@primary-color":"#33d1ff", "@font-family":"Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif", "@font-size-base":"14px"}}'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: devEnv ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]'
                }
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader?jQuery!expose-loader?$'
            },
            {
                test: /bootstrap-sass(\\|\/)assets(\\|\/)javascripts(\\|\/)/,
                loader: 'imports?$=jquery,jQuery=jquery,this=>window'
            },
            {
                enforce: 'pre',
                test: /\.js$/, loader: 'source-map-loader'
            }
        ]
    },
    resolve: {
        alias: {
            Common: path.resolve(__dirname, 'src/common'),
            CommonFunctions: path.resolve(__dirname, 'src/common_functions'),
            LandingPages: path.resolve(__dirname, 'src/landing_pages'),
            Lang: path.resolve(__dirname, 'src/lang'),
            Pages: path.resolve(__dirname, 'src/pages'),
            Payments: path.resolve(__dirname, 'src/payments'),
            Polyfills: path.resolve(__dirname, 'src/polyfills'),
            Search: path.resolve(__dirname, 'src/search'),
            Spaces: path.resolve(__dirname, 'src/spaces'),
            Venues: path.resolve(__dirname, 'src/venues'),
            Users: path.resolve(__dirname, 'src/users'),
            jquery: 'jquery/src/jquery'
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    plugins
};
