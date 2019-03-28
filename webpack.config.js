module.exports = {
	entry: './src/index.js',
	output: {
	  path: __dirname + '/dist',
	  publicPath: '/',
	  filename: 'bundle.js'
	},
	devServer: {
	  contentBase: './dist',
	},
	devtool: 'inline-source-map',
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
  };