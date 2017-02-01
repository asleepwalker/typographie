var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

var OptionView = require('./option');

module.exports = Backbone.View.extend({
	el: $('#options'),
	initialize: function() {
		this.model.get('options').bind('update', _.bind(this.render, this));
		$('#show_options').on('click', _.bind(this.showDialog, this));
		$('.hide_options').on('click', _.bind(this.hideDialog, this));
	},
	showDialog: function() {
		$('#dialog_wrapper')[0].style.display = 'block';
	},
	hideDialog: function(e) {
		if (/hide_options/.test(e.target.className)) {
			$('#dialog_wrapper')[0].style.display = 'none';
		}
	},
	render: function() {
		var prevOptionGroup;
		_.each(this.model.get('options').models, function(option) {
			var optionView = new OptionView({model: option});
			var optionElement = optionView.render().el;

			if (prevOptionGroup && prevOptionGroup != option.get('group')) {
				optionElement.className = 'first_in_group';
			}
			prevOptionGroup = option.get('group');

			this.el.appendChild(optionElement);
		}, this);
	}
});
