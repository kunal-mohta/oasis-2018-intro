const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, "src/js/index.js"), 
	output: {
		path: path.resolve(__dirname, "dist"), 
		filename: "bundle.js",
	}, 
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: [
					/node_modules/	
				]
			}
		],	
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src/index.html"), 
			inject: 'body'
		})	
	],
}

