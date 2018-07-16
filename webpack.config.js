const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, "src/js/index.js"), 
	output: {
		path: path.resolve(__dirname, "dist"), 
		filename: "bundle.js",
	}, 
	module: {
		rules: [],	
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, "src/index.html"), 
			inject: 'body'
		})	
	],
}

