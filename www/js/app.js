/*
	Typographie, v1.1
	https://github.com/asleepwalker/typographie

	by Artyom "Sleepwalker" Fedosov, 2014
	http://me.asleepwalker.ru/
	mail@asleepwalker.ru
*/

window.onload = function() {

	var OptionsCollection = Backbone.Collection.extend({
		url: 'defaults.json',
		initialize: function() { this.fetch(); }
	});

	var TypographieModel = Backbone.Model.extend({
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
			if (this.model.get('options').where({ name: 'live', active: true }).length) {
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
			this.model.set({'highlight': !this.model.get('highlight')});
		},
		render: function() {
			if (this.model.get('highlight')) $('#hcheckbox')[0].setAttribute('checked', '')
			else $('#hcheckbox')[0].removeAttribute('checked');
		}
	});

	var OptionView = Backbone.View.extend({
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
		}
	});

	var OptionsDialogView = Backbone.View.extend({
		el: $('#options'),
		initialize: function() {
			$('#show_options').on('click', _.bind(this.showDialog, this));
			$('.hide_options').on('click', _.bind(this.hideDialog, this));
		},
		showDialog: function() {
			this.render();
			var wrapper = $('#dialog_wrapper')[0];
			if (!wrapper.hasAttribute('shown')) {
				wrapper.style.display = 'block';
				wrapper.style.opacity = 0;
				var last = +new Date();
				var tick = function() {
					wrapper.style.opacity = +wrapper.style.opacity + (new Date() - last) / 400;
					last = +new Date();
					if (+wrapper.style.opacity < 1) {
						(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 10)
					} else wrapper.setAttribute('shown', '');
				};
				tick();
			}
		},
		hideDialog: function(e) {
			var wrapper = $('#dialog_wrapper')[0];
			if ((e.target.className.indexOf('hide_options') != -1) && wrapper.hasAttribute('shown')) {
				var last = +new Date();
				var tick = function() {
					wrapper.style.opacity = +wrapper.style.opacity - (new Date() - last) / 400;
					last = +new Date();

					if (+wrapper.style.opacity > 0) {
						(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
					} else {
						wrapper.style.display = 'none';
						wrapper.removeAttribute('shown');
					}
				};
				tick();
			}
		},
		render: function() {
			var prev;
			this.$el.html(''); // Todo: Clear via views destroying
			_.each(this.model.get('options').models, function(option) {
				if (prev && (prev != option.get('group'))) this.el.appendChild($('<hr>')[0]);
				prev = option.get('group');

				var optionView = new OptionView({model: option});
				this.el.appendChild(optionView.render().el);
			}, this);
		}
	});

	var LoadingView = Backbone.View.extend({
		el: $('#loader'),
		initialize: function() {
			this.model.bind('change:in_state', _.bind(this.render, this));
		},
		render: function() {
			switch (this.model.get('in_state')) {
				case 'free': this.el.removeAttribute('data-mode'); break;
				case 'typing': this.el.setAttribute('data-mode', 'typing'); break;
				case 'loading': this.el.setAttribute('data-mode', 'loading'); break;
			}
		}
	});

	var optionsCollection = new OptionsCollection();
	var typographieModel = new TypographieModel({options: optionsCollection});
	var editorView = new EditorView({model: typographieModel});
	var inputSwitcherView = new InputSwitcherView({model: typographieModel});
	var outputSwitcherView = new OutputSwitcherView({model: typographieModel});
	var highlightCheckboxView = new HighlightCheckboxView({model: typographieModel});
	var optionsDialogView = new OptionsDialogView({model: typographieModel, options: optionsCollection});
	var loadingView = new LoadingView({model: typographieModel});

	function adaptationResize() {
		var w = window,
		    d = document,
		    e = d.documentElement,
		    g = d.getElementsByTagName('body')[0],
		    y = w.innerHeight|| e.clientHeight || g.clientHeight;
		h = y/2;
		if (h > (y-300)) h = y-300;
		if (h < 200) h = 200;
		document.getElementById('input').style.height = h+'px';
		document.getElementById('output').style.height = h+'px';
		document.getElementById('raw_input').style.height = (h-40)+'px';
		document.getElementById('display').style.height = (h-40)+'px';
	}
	window.onresize = adaptationResize;
	adaptationResize();

};