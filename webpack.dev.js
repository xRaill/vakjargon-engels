const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack              = require('webpack');
const common               = require('./webpack.common.js');
const merge                = require('webpack-merge');
const path                 = require('path');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-source-map', 
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './build')
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true
						}
					},
					{
						loader: 'css-modules-typescript-loader'
					},
					{
						loader: 'css-loader',
						ident: '[name]_[local]_[hash:base64:5]',
						options: {
							modules: true,
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": "'development'"
			}
		})
	],
	devServer: {
		hot: true
	}
});