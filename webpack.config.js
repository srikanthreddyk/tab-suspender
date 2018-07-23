const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		//vendors: ['react','react-dom'],
		popup: './src/popup.jsx',
		background: './src/background.js',
		settings: './src/settings.jsx',
		suspended: './src/suspended.jsx',
		tabMonitor: './src/tabMonitor.js',
	},
	output: {
		pathinfo: true,
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [
				path.resolve(__dirname, './src'),
				/pretty-bytes/
				],
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
				use: 'file-loader?limit=100000'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?limit=100000',
					{
						loader: 'img-loader',
						options: {
							enabled: true,
							optipng: true
						}
					}
				]
			}
		]
	},
	stats: {
		children: false,
		chunks: false,
		chunkModules: false,
		chunkOrigins: false,
		modules: false
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
		new HtmlWebpackPlugin({
			inject: true,
			chunks: ['vendors', 'popup',],
			filename: 'popup.html',
			template: './src/popup.html'
		}),
		new HtmlWebpackPlugin({
			inject: true,
			chunks: ['vendors', 'settings',],
			filename: 'settings.html',
			template: './src/settings.html'
		}),
		new HtmlWebpackPlugin({
			inject: true,
			chunks: ['vendors', 'suspended'],
			filename: 'suspended.html',
			template: './src/suspended.html'
		}),
		// copy extension manifest and icons
		new CopyWebpackPlugin([
			{ from: './src/manifest.json' },
			{ from: './src/assets', to: 'assets' }
		])
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: path.resolve(__dirname, "node_modules"),
					name: "vendors",
					enforce: true
				}
			}
		}
	},
	devtool: 'cheap-module-source-map' // for dev
	//devtool: 'hidden-source-map' // for prod
}
