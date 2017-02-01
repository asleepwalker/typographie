var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

module.exports = Backbone.View.extend({
	el: $('#editor'),
	initialize: function() {
		this.model.bind('change:in', _.bind(this.process, this));
		this.model.bind('change:out', _.bind(this.process, this));
		this.model.bind('change:highlight', _.bind(this.process, this));
		this.model.get('options').bind('change', _.bind(this.process, this));
	},
	events: {
		'click #input .controls #submit': 'process',
		'change #input #raw_input': 'liveProcess',
		'keyup #input #raw_input': 'liveProcess'
	},
	liveProcess: function() {
		if (this.model.get('options').where({ name: 'live', active: true }).length) {
			this.process();
		}
	},
	process: function() {
		var result = this.model.process($('#raw_input')[0].value);
		result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		this.render(result);
	},
	render: function(result) {
		$('#display').html(result);
	}
});
