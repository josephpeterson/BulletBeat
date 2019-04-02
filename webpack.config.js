const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
	output: {
	  path: __dirname + '/dist',
	  publicPath: '/',
	  filename: 'bundle.js'
	},
	devServer: {
	  contentBase: './dist',
	},
	module: {
	  rules: [
	  {
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: ['babel-loader']
		},
		{
			test:/\.css$/,
			use:['style-loader','css-loader']
	}
	  ]
    },
    plugins: [new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' })]
  };