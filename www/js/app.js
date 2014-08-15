/*
	Typographie, v1.1
	https://github.com/asleepwalker/typographie

	by Artyom "Sleepwalker" Fedosov, 2014
	http://me.asleepwalker.ru/
	mail@asleepwalker.ru
*/

window.onload = function() {

	var TypographieModel = Backbone.Model.extend({
		defaults: {
			in: 'plain',
			out: 'plain',
			highlight: 'enabled',
			in_state: 'free',
			actions: {
				'live':          { send: false, active: true },
				'inquot':        { send: true,  active: true },
				'dashes':        { send: true,  active: true },
				'angles':        { send: true,  active: true },
				'dblspace':      { send: true,  active: true },
				'specials':      { send: true,  active: true },
				'mathchars':     { send: true,  active: true },
				'punctuation':   { send: true,  active: true },
				'specialspaces': { send: true,  active: true },
				'nbsp':          { send: true,  active: true },
				'hellip':        { send: true,  active: true },
				'paragraphs':    { send: true,  active: true },
				'safehtml':      { send: true,  active: true }
			}
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
					highlight: core.get('highlight'),
					actions: (function() {
						var actions = [];
						_.map(core.get('actions'), function(action, id) {
							if (action.send && action.active)
								actions.push(id);
						});
						return actions;
					}()).join(','),
					raw: raw
				},
				type: 'POST',
				url: 'engine/main.php',
				dataType: 'json',
				success: callback,
				error: this.error,
				timeout: 5000
			});
		},
		error: function() {
			this.state('free');
			alert('Ошибка соединения. Попробуйте ещё раз или обратитесь к администратору.');
		}
	});

	var EditorView = Backbone.View.extend({
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
			if (this.model.get('actions').live.active) {
				var editor = this;
				this.model.state('typing');
				clearTimeout(this.model.get('live'));
				this.model.set({'live': window.setTimeout(function() { editor.process(); }, 1000)});
			}
		},
		process: function() {
			this.model.process($('#raw_input')[0].value, this.render);
			this.model.state('free');
		},
		render: function(data) {
			$('#display').html(data.response);
		}
	});

	var InputSwitcherView = Backbone.View.extend({
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

	var OutputSwitcherView = Backbone.View.extend({
		el: $('#output_mode'),
		events: {
			'click LI': 'switchOutput',
		},
		initialize: function() {
			this.model.bind('change:out', _.bind(this.render, this));
		},
		switchOutput: function(e) {
			var mode = e.target.getAttribute('data-mode');
			this.model.set({out: mode});
		},
		render: function() {
			$('.active', this.$el[0])[0].removeAttribute('class');
			$('[data-mode='+this.model.get('out')+']', this.$el[0])[0].className = 'active';
		}
	});

	var HighlightCheckboxView = Backbone.View.extend({
		el: $('#highlight'),
		events: {
			'click': 'toggleHighlight',
		},
		initialize: function() {
			this.model.bind('change:highlight', _.bind(this.render, this));
		},
		toggleHighlight: function() {
			if (this.model.get('highlight') == 'disabled') this.model.set({highlight: 'enabled'});
			else this.model.set({highlight: 'disabled'});
		},
		render: function() {
			if (this.model.get('highlight') == 'disabled') $('#hcheckbox')[0].className = 'checkbox';
			else $('#hcheckbox')[0].className = 'checkbox checked';
		}
	});

	var LoadingView = Backbone.View.extend({
		el: $('#loader'),
		initialize: function() {
			this.model.bind('change:in_state', _.bind(this.render, this));
		},
		render: function() {
			switch (this.model.get('in_state')) {
				case 'free': this.el.className = ''; break;
				case 'typing': this.el.className = 'sub visible'; break;
				case 'loading': this.el.className = 'visible'; break;
			}
		}
	});

	var typographieModel = new TypographieModel;
	var editorView = new EditorView({model: typographieModel});
	var inputSwitcherView = new InputSwitcherView({model: typographieModel});
	var outputSwitcherView = new OutputSwitcherView({model: typographieModel});
	var highlightCheckboxView = new HighlightCheckboxView({model: typographieModel});
	var loadingView = new LoadingView({model: typographieModel});

};