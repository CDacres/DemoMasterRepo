// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const BASE_CSS_LOADER = 'css-loader?sourceMap&modules';

module.exports = {
    plugins: [
        // your custom plugins
    ],
    module: {
        entry: {
            app: ['bootstrap-loader']
        },
        loaders: [
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    BASE_CSS_LOADER,
                    'sass-loader?sourceMap'
                ],
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    BASE_CSS_LOADER
                ],
            },
            {
                test: /\.css\?global$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader'
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader?jQuery!expose-loader?$',
            },
            {
                test: /bootstrap-sass(\\|\/)assets(\\|\/)javascripts(\\|\/)/,
                loader: 'imports-loader?$=jquery,jQuery=jquery,this=>window'
            }
        ],
    },
};
