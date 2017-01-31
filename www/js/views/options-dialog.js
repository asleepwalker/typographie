var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

var OptionView = require('./option');

module.exports = Backbone.View.extend({
	el: $('#options'),
	initialize: function() {
		$('#show_options').on('click', _.bind(this.showDialog, this));
		$('.hide_options').on('click', _.bind(this.hideDialog, this));
	},
	optionViewList: [],
	showDialog: function() {
		this.render();
		$('#dialog_wrapper')[0].style.display = 'block';
	},
	hideDialog: function(e) {
		$('#dialog_wrapper')[0].style.display = 'none';
		this.optionViewList.forEach(function(view) {
			view.destroy();
		});
	},
	render: function() {
		var prevOptionGroup;

		_.each(this.model.get('options').models, function(option) {
			var optionView = new OptionView({model: option}),
			    optionElement = optionView.render().el;
			this.optionViewList.push(optionView);

			if (prevOptionGroup && (prevOptionGroup != option.get('group')))
				optionElement.className = 'first_in_group';
			prevOptionGroup = option.get('group');

			this.el.appendChild(optionElement);
		}, this);
	}
});
