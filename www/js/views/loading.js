var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

module.exports = Backbone.View.extend({
	el: $('#loader'),
	initialize: function() {
		this.model.bind('change:in_state', _.bind(this.render, this));
	},
	render: function() {
		console.log(this);
		switch (this.model.get('in_state')) {
			case 'free': this.$el[0].removeAttribute('data-mode'); break;
			case 'typing': this.$el[0].setAttribute('data-mode', 'typing'); break;
			case 'loading': this.$el[0].setAttribute('data-mode', 'loading'); break;
		}
	}
});
