var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
	url: 'defaults.json',
	initialize: function() { this.fetch(); }
});
