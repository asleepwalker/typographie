window.onload = function() {
	var OptionsCollection = require('./collections/options');
	var TypographieModel = require('./models/app');
	var EditorView = require('./views/editor');
	var InputSwitcherView = require('./views/input-switcher');
	var OutputSwitcherView = require('./views/output-switcher');
	var HighlightCheckboxView = require('./views/highlight-checkbox');
	var OptionsDialogView = require('./views/options-dialog');
	var LoadingView = require('./views/loading');

	var optionsCollection = new OptionsCollection();
	var typographieModel = new TypographieModel({options: optionsCollection});
	var editorView = new EditorView({model: typographieModel});
	var inputSwitcherView = new InputSwitcherView({model: typographieModel});
	var outputSwitcherView = new OutputSwitcherView({model: typographieModel});
	var highlightCheckboxView = new HighlightCheckboxView({model: typographieModel});
	var optionsDialogView = new OptionsDialogView({model: typographieModel});
	var loadingView = new LoadingView({model: typographieModel});
};
