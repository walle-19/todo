const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        entry: ['./src/main.js'],
        output: {
            path: path.join(__dirname, '/dist'),
			publicPath: 'auto',
        },
		
		// devServer: {
			// hot: true,
		// },
		
		module: {
            rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                   }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                    ],
					sideEffects: true,
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: [
                        {
							loader: 'url-loader',
							options: {
								limit: 4096,
								name: 'img/[name][hash:8].[ext]',
							},
                        }
                    ]
                },
				{
                    test: /\.html$/,
                    loader: 'html-loader',
                }
            ]
        },
		plugins: [
			//new webpack.HotModuleReplacementPlugin(),
			new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
				template: 'public/index.html'
			}),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
        ]
    }

    return config;
}


