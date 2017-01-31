var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

module.exports = Backbone.View.extend({
	el: $('#input_mode'),
	events: {
		'click LI': 'switchInput',
	},
	initialize: function() {
		this.model.bind('change:in', _.bind(this.render, this));
	},
	switchInput: function(e) {
		var mode = e.target.getAttribute('data-mode');
		this.model.set({in: mode});
	},
	render: function() {
		$('.active', this.$el[0])[0].removeAttribute('class');
		$('[data-mode='+this.model.get('in')+']', this.$el[0])[0].className = 'active';
	}
});
