var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('backbone.native');

module.exports = Backbone.Model.extend({
	defaults: {
		in: 'plain',
		out: 'plain',
		highlight: true,
		in_state: 'free',
	},
	state: function(state) {
		this.set({in_state: state});
	},
	process: function(raw, callback) {
		var core = this;
		$.ajax({
			beforeSend: function() {
				core.state('loading');
			},
			data: {
				in: core.get('in'),
				out: core.get('out'),
				highlight: core.get('highlight') ? 'enabled' : 'disabled',
				actions: (function() {
					var actions = new Backbone.Collection(core.get('options').where({ send: true,  active: true }));
					return actions.pluck('name').join(',');
				}()),
				raw: raw
			},
			type: 'POST',
			url: 'engine/main.php',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			success: function(data) {
				core.state('free');
				callback(data);
			},
			error: this.error,
			timeout: 5000
		});
	},
	error: function() {
		this.state('free');
		alert('Ошибка соединения. Попробуйте ещё раз или обратитесь к администратору.');
	}
});
