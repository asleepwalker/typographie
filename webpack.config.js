module.exports = {
	context: __dirname + '/www/js',
	entry: './entry.js',
	output: {
		path: __dirname + '/www',
		filename: 'app.js'
	},
	resolve: {
		alias: {
			'jquery': 'backbone.native'
		}
	}
}
