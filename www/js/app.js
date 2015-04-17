/*
*	Typographie, v1.2.2
*	(c) 2014–2015 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
*	https://github.com/asleepwalker/typographie
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
		},
		destroy: function() {
			this.model.off('change:active');
			this.el.remove();
		}
	});

	var OptionsDialogView = Backbone.View.extend({
		el: $('#options'),
		initialize: function() {
			$('#show_options').on('click', _.bind(this.showDialog, this));
			$('.hide_options').on('click', _.bind(this.hideDialog, this));
		},
		optionViewList: [],
		showDialog: function() {
			this.render();
			$('#dialog_wrapper').fadeInIfNotShown();
		},
		hideDialog: function(e) {
			var dialogView = this;
			$('#dialog_wrapper').fadeOutIfShown(e, function() {
				dialogView.optionViewList.forEach(function(view) {
					view.destroy();
				});
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
	var optionsDialogView = new OptionsDialogView({model: typographieModel});
	var loadingView = new LoadingView({model: typographieModel});

};

//-------------------------------------------------------------------
// DIRTY WORK

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

$.prototype.fadeInIfNotShown = function(callback) {
	var el = this[0];
	if (!el.hasAttribute('shown')) {
		el.style.display = 'block';
		el.style.opacity = 0;
		var last = +new Date();
		var tick = function() {
			el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
			last = +new Date();
			if (+el.style.opacity < 1) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 10)
			} else {
				el.setAttribute('shown', '');
				if (typeof callback == 'function') callback();
			}
		};
		tick();
	}
};

$.prototype.fadeOutIfShown = function(e, callback) {
	var el = this[0];
	if ((e.target.className.indexOf('hide_options') != -1) && el.hasAttribute('shown')) {
		var last = +new Date();

		var tick = function() {
			el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
			last = +new Date();

			if (+el.style.opacity > 0) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
			} else {
				el.style.display = 'none';
				el.removeAttribute('shown');
				if (typeof callback == 'function') callback();
			}
		};
		tick();
	}
};