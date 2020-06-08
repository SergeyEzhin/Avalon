const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV = 'development';
const pages = ['index', 'articles', 'faq', 'vacancies-list', 'current-article', 'main', 'service-rules', 'access-account', 'password-recovery', 'registration', 'companies-list',
'vacancies-map', 'companies-map', 'current-vacancy', 'current-company', '404', 'profile', 'profile-editing', 'my-resumes', 'favorites-vacancies-list',
'favorites-vacancies-map', 'response', 'response-resume', 'response-vacancy', 'response-vacancy-not-reg', 'subscription',
'post-resume-step1', 'post-resume-step2', 'post-resume-step3', 'post-resume-step4', 'current-resume', 'index-employer'];

const webpackConfig = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill','./js/main.js'],
    output: {
        filename: "./js/bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: [path.resolve(__dirname, "dist"), path.resolve(__dirname, "src")],
        historyApiFallback: true,
        noInfo:true,
        overlay: true,
        port: 4200,
        hot: true
    },
    devtool: isDev ? 'source-map': '',
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: './img',
                    to: './img'
                }
            ]
        ),
        new MiniCssExtractPlugin({
            filename: './css/style.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test:  /\.(png|jpg|svg|csv|xml|gif)$/,
                use: [
                    {
                        loader: 'file-loader?name=./img/[name].[ext]'
                    }
                ]
            },
            {
                test:  /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {

                            name: '[name].[ext]',
                            outputPath: '/fonts',
                            publicPath: '../fonts'
                        }

                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    // {
                    //     loader: 'eslint-loader'
                    // },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                ],
                exclude: '/node_modules/'
            }

        ]
    }
}

allPages = () =>
{
    pages.forEach((file) => {
        webpackConfig.plugins.push(
            new HTMLWebpackPlugin({
                filename: `${file}.html`,
                template: `./${file}.html`
            })
        );
    });
}

allPages();

module.exports = webpackConfig;

