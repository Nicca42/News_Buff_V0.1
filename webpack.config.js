const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => ({
    entry: {
        index: ['./src/index.jsx'],
    },
    output: {
        path: path.resolve('./dist/'),
    },
    devtool: env === 'production' ? false : 'source-map',
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ],
        rules: [
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // new TypeScript configuration
            { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' },
        ]
    },
    resolve: {
        // we also need to add *.tsx here
        extensions: ['.js', '.jsx', '.ts', '.tsx', '*.ts', '*.tsx'],
    },
    plugins: [
        new HtmlWebPackPlugin({ template: './src/index.html' }),
    ],
});