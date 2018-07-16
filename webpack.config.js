const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	//entry: path.resolve(__dirname, "src/js/index.js"), 
	entry: path.resolve(__dirname, "src", "js", "index.js"), 
	output: {
		path: path.resolve(__dirname, "dist"), 
		filename: "bundle.js",
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: [
					/node_modules/
				]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			} ,
		],	
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"), 
			inject: 'body'
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets', to: 'assets'}	
		]),
		//new UglifyJSPlugin(),
	],
}

