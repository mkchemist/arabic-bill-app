const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const { ProvidePlugin } = require("webpack")

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        filename:"app.bundle.js",
        path: path.resolve(__dirname, "../app")
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react']
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                type: 'asset/resource'   
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "app.css"
        }),
        new ProvidePlugin({
            'React' : 'react',
            'ReactDOm' : 'react-dom'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}