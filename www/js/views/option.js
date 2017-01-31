var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
	tagName: 'li',
	itemTemplate: _.template('<div><div class="checkbox"<% if(active) { %> checked<% } %>>&nbsp;</div><label><%= caption %></label></div>'),
	events: {
		'click DIV': 'toggleOption',
	},
	initialize: function() {
		this.model.bind('change:active', _.bind(this.render, this));
	},
	toggleOption: function() {
		this.model.set({'active': !this.model.get('active')});
	},
	render: function() {
		this.$el.html(this.itemTemplate(this.model.toJSON()));
		return this;
	},
	destroy: function() {
		this.model.off('change:active');
		this.el.remove();
	}
});
