// Resources used to create config:
// http://survivejs.com/webpack_react/developing_with_webpack/
// http://survivejs.com/webpack_react/webpack_and_react/
// https://github.com/kriasoft/react-starter-kit

const webpack = require('webpack'),
        HtmlWebpackPlugin  = require('html-webpack-plugin'),
        CleanWebpackPlugin = require('clean-webpack-plugin'),
        merge              = require('webpack-merge'),
        path               = require('path'),
        autoprefixer       = require('autoprefixer'),
        precss             = require('precss'),
        TARGET             = process.env.npm_lifecycle_event,
        PATHS              = {};

PATHS.root           = path.join(__dirname);
PATHS.src            = path.join(PATHS.root,      'src');
PATHS.build          = path.join(PATHS.root,      'build'); // DO NOT CHANGE ACCIDENTLY. EVERYTHING THING HERE GETS DELETED RECURSIVELY DURING BUILD.
PATHS.styles         = path.join(PATHS.src,       'styles');
PATHS.components     = path.join(PATHS.src,       'components');

process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        /*There is one slight problem with the current approach. The generated app.js and app.css belong to the same chunk. This means that if the contents associated JavaScript or CSS change, so do the hashes. This isn't ideal as it can invalidate our cache even if we don't want it to.
        
        One way to solve this issue is to push styling to a chunk of its own. This breaks the dependency and fixes caching. To achieve this we need to decouple styling from it current chunk and define a custom chunk for it through configuration: */
        app: path.join(PATHS.src, 'entry.jsx'),
        style: path.join(PATHS.styles, 'global.scss')
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles'        : PATHS.styles,
            'components'    : PATHS.components
        }
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        preLoaders: [
            // Only lint src files
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: [PATHS.src]
            },
            {
                test: /\.(sass|scss)$/,
                loaders: ['stylelint-loader'],
                include: [PATHS.src]
            }
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader'
            }, 
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000'
            }, 
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Gallary',
            devServer: process.env.PORT,
            inject: true,
            filename: 'index.html',
            template: path.join(PATHS.src, 'template.html')
        })
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        cache  : true,
        debug  : true,
        module: {
            loaders: [
                {
                    test   : /\.(sass|scss)$/,
                    loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader?sourceMap'],
                    include: [PATHS.src]
                },
                {
                    test   : /\.jsx?$/,
                    loaders: ['react-hot', 'babel?cacheDirectory'],
                    include: [PATHS.src]
                }
            ]
        },
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            //
            // If you use Vagrant or Cloud9, set
            // host: process.env.HOST || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices unlike default
            // localhost
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    });
}

if (TARGET === 'build' || TARGET === 'stats') {
    module.exports = merge(common, {
            entry: {
                vendor: []
            },
            output: {
                path         : PATHS.build,
                filename     : '[name].js',
                library      : 'ColorPanel',
                libraryTarget: 'umd2'
            },
            externals: {
                react: {
                    root: 'React',
                    commonjs: 'react',
                    commonjs2: 'react',
                    amd: 'react'
                },
                'react-dom': {
                    root: 'ReactDOM',
                    commonjs: 'react-dom',
                    commonjs2: 'react-dom',
                    amd: 'react-dom'
                }
            },
            module: {
                loaders: [
                    // Only compile source files
                    {
                        // Works with JS too
                        test: /\.jsx?$/,
                        // Enable caching for improved performance during development
                        // It uses default OS directory by default. If you need something
                        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
                        
                        // It's a good idea to keep in mind that Webpack loaders are always evaluated from right to left and from bottom to top (separate definitions).
                        loaders: ['babel?cacheDirectory'],
                        // Parse only app files! Without this it will go through entire project.
                        // In addition to being slow, that will most likely result in an error.
                        include: [PATHS.src]
                    },
                    {
                        test   : /\.(sass|scss)$/,
                        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader?sourceMap'],
                        include: [PATHS.src]
                    }
                ]
            },
            plugins: [
                //new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                new CleanWebpackPlugin([PATHS.build]),
                // Extract vendor and manifest files
                new webpack.optimize.CommonsChunkPlugin({
                    names: ['vendor', 'style']
                })
            ]
    });
}
