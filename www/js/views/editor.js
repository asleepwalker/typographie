var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

module.exports = Backbone.View.extend({
	el: $('#editor'),
	initialize: function() {
		this.model.bind('change:in', _.bind(this.process, this));
		this.model.bind('change:out', _.bind(this.process, this));
		this.model.bind('change:highlight', _.bind(this.process, this));
	},
	events: {
		'click #input .controls #submit': 'process',
		'change #input #raw_input': 'liveProcess',
		'keyup #input #raw_input': 'liveProcess'
	},
	liveProcess: function() {
		if (this.model.get('options').where({ name: 'live', active: true }).length) {
			var editor = this;
			this.model.state('typing');
			clearTimeout(this.model.get('live'));
			this.model.set({'live': window.setTimeout(function() { editor.process(); }, 1000)});
		}
	},
	process: function() {
		this.model.process($('#raw_input')[0].value, this.render);
	},
	render: function(data) {
		$('#display').html(data.response);
	}
});
