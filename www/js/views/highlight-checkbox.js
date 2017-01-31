var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

module.exports = Backbone.View.extend({
	el: $('#highlight'),
	events: {
		'click': 'toggleHighlight',
	},
	initialize: function() {
		this.model.bind('change:highlight', _.bind(this.render, this));
	},
	toggleHighlight: function() {
		this.model.set({'highlight': !this.model.get('highlight')});
	},
	render: function() {
		if (this.model.get('highlight')) $('#hcheckbox')[0].setAttribute('checked', '')
		else $('#hcheckbox')[0].removeAttribute('checked');
	}
});
