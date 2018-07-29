const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Promise = require('es6-promise').Promise;

config = {
	//entry: path.resolve(__dirname, "src/js/index.js"), 
	entry: {
		index: path.resolve(__dirname, "src", "js", "index.js"),
		glitch: path.resolve(__dirname, "src", "glitch", "glitch.js"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]_bundle.js",
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					'babel-loader',
					'eslint-loader'
				],
				exclude: [
					/node_modules/
				]
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader",   // translates CSS into CommonJS
					"sass-loader"   // compiles Sass to CSS
				]
			},
			{
				test: /(htm|html|xhtml|hbs|handlebars|php|ejs)$/,
				loader: 'htmllint-loader',
				exclude: /(node_modules)/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			}
		],
	},
	plugins: [
		//new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
			inject: 'body',
			chunks: ["index"],
			excludeChunks: ["glitch"]
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "glitch", "glitch.html"),
			inject: 'body',
			filename: "glitch.html",
			//chunks: [path.resolve("glitch/glitch")]
			chunks: ["glitch"],
			excludeChunks: ["index"]
		}), 
		//new UglifyJSPlugin(),
		//new webpack.HotModuleReplacementPlugin(),
	],
}

if (fs.existsSync(path.resolve(__dirname, "src", "static"))) {
	config.plugins.push(
		new CopyWebpackPlugin([
			{ from: 'src/static', to: 'static' }
		]),
	);
}

module.exports = config
