const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const TerserPlugin            = require('terser-webpack-plugin');
const webpack                 = require('webpack');
const common                  = require('./webpack.common.js');
const merge                   = require('webpack-merge');
const path                    = require('path');

module.exports = merge(common, {
	mode: 'production',
	devtool: false, 
	output: {
		filename: '[contenthash].js',
		path: path.resolve(__dirname, './build')
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
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
		new MiniCssExtractPlugin({
			filename: '[contenthash].css',
			chunkFilename: '[contenthash].css'
		}),
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": "'production'"
			}
		})
	],
	optimization: {
		minimizer: [new TerserPlugin({
			terserOptions: {
				output: {
					comments: false,
				},
			},
		}), new OptimizeCssAssetsPlugin({
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
		})]
	},
	devServer: {
		hot: false,
		inline: true,
		liveReload: false,
		injectHot: true,
		injectClient: false
	}
});