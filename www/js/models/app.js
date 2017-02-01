var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');
var Typographie = require('typographie');

module.exports = Backbone.Model.extend({
	defaults: {
		in: 'plain',
		out: 'plain',
		highlight: true,
	},
	initialize: function() {
		this.engine = new Typographie([]);
		this.updateActions();

		this.bind('change:in change:out', _.bind(this.updateMode, this));
		this.get('options').bind('update change:active', _.bind(this.updateActions, this));
	},
	updateActions: function(e) {
		var actionlist = this.get('options')
			.where({ send: true, active: true })
			.map(function (model) {
				return model.get('name');
			});
		this.engine.actions(actionlist);
	},
	updateMode: function() {
		var input = this.get('in');
		var output = this.get('out');
		this.engine.mode(input, output);
	},
	process: function(raw) {
		return this.engine.process(raw);
	}
});
