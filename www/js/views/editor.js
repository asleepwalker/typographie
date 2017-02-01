var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');
var jsdiff = require('diff');

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
		var raw = $('#raw_input')[0].value;
		var result = this.model.process(raw);
		this.render(raw, result);
	},
	clean: function(text) {
		return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	},
	diff: function(raw, text) {
		var clean = this.clean;
		var chanks = jsdiff.diffChars(raw, text);
		return chanks.map(function(chank) {
			if (chank.removed) {
				return '';
			} else if (chank.added) {
				return '<span class="fix">' + clean(chank.value) + '</span>';
			} else {
				return clean(chank.value);
			}
			return ;
		}).join('');
	},
	render: function(raw, result) {
		if (this.model.get('highlight')) {
			result = this.diff(raw, result);
		} else {
			result = this.clean(result);
		}

		if (this.model.get('out') == 'html') {
			result = result.replace(/(&lt;.+?&gt;)/gi, '<span class="html">$1</span>');
		}

		$('#display').html(result);
	}
});
