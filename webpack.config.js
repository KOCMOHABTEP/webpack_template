const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [
        path.join(__dirname, "/src/template/index.pug"),
        path.join(__dirname, "/src/js/script.js"),
        path.join(__dirname, "/src/css/style.pcss"),
    ],
    output: {
        filename: 'js/[name].js',
        publicPath: '',
        path: path.join(__dirname, "dist"),
    },
    mode: "development",
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/template/index.pug'
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "pug-loader",
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                ],
            },
            {
                test: /\.(p)?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "./img/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "./fonts/[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        hot: true,
        contentBase: "dist/",
        watchContentBase: true,
    },
};