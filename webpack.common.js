const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin      = require('copy-webpack-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const WriteFilePlugin        = require('write-file-webpack-plugin'); 
const webpack                = require('webpack');
const path                   = require('path');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: './index.tsx',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.(svg|gif|png|jpg)$/,
				use: 'file-loader'
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	plugins: [
		new CleanWebpackPlugin(),
		// new CopyWebpackPlugin([{
		// 	from: path.resolve(__dirname, './public')
		// }]),
		new HtmlWebpackPlugin({
			template: './index.html',
			title: 'test'
		}),
		new WriteFilePlugin({ test: /^((?!hot-update).)*$/g }),
		new webpack.HashedModuleIdsPlugin()
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) { return 'npm.' + module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] }
				}
			}
		}
	},
	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, './build'),
		overlay: {
			warnings: true,
			errors: true
		}
	}
};