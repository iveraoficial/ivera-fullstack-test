import {
    Configuration
} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const configuration: Configuration = {
    entry: {
        app: path.resolve(__dirname,'../src')
    },
    output: {
        path: path.resolve(__dirname,'../public')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts','.tsx','.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'index.html')
        })
    ]
};

export default configuration;
