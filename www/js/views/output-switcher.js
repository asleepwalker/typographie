var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

module.exports = Backbone.View.extend({
	el: $('#output_mode'),
	events: {
		'click LI': 'switchOutput',
	},
	initialize: function() {
		this.model.bind('change:out', _.bind(this.render, this));
	},
	switchOutput: function(e) {
		var mode = e.target.getAttribute('data-mode');
		this.model.set({out: mode});
	},
	render: function() {
		$('.active', this.$el[0])[0].removeAttribute('class');
		$('[data-mode='+this.model.get('out')+']', this.$el[0])[0].className = 'active';
	}
});
