/*
	Typographie, v1.0
	https://github.com/asleepwalker/typographie

	by Artyom "Sleepwalker" Fedosov, 2014
	http://me.asleepwalker.ru/
	mail@asleepwalker.ru
*/

var App = {};
App.in = 'plain';
App.out = 'plain';
App.editor = 'enabled';
App.actions = {'list':['inquot','dash','dblspace','special','math','crrctpunc','crrctspecial','nbsp','hellip','safehtml']};

App.send = function() {
	request = new XMLHttpRequest();
	request.open('POST', 'engine/main.php', true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) window.App.show(JSON.parse(request.responseText));
		else window.App.error();
	};
	request.onerror = window.App.error;

	var data = {};
	data.in = window.App.in;
	data.out = window.App.out;
	data.editor = window.App.editor;
	data.raw = document.getElementById('raw_input').value;
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send('in='+data.in+'&out='+data.out+'&editor='+data.editor+'&raw='+encodeURIComponent(data.raw));
	window.App.state('loading');
};

App.show = function(data) {
	window.App.state('free');
	document.getElementById('display').innerHTML = data.response;
	//enabling editor if need
};

App.error = function() {
	window.App.state('free');
	//error message
};

App.state = function(state) {
	window.App.now_state = state;
	//visual
}; App.state('free');

App.actions.add = function(action) {
	if (App.actions.list.indexOf(action) == -1)
		App.actions.list.push(action);
};

App.actions.remove = function(action) {
	if (App.actions.list.indexOf(action) != -1)
		App.actions.list.splice(App.actions.list.indexOf(action), 1);
};

document.getElementById('submit').onclick = App.send;
var input_modes = document.getElementById('input_mode').getElementsByTagName('li');
for (var i = 0; i < input_modes.length; i++) {
	input_modes[i].onclick = function() {
		if (this.className != 'active') {
			for (var i = 0; i < input_modes.length; i++) { input_modes[i].className = ''; }
			this.className = 'active';
			window.App.in = this.getAttribute('data-mode');
		}
	};
}
var output_modes = document.getElementById('output_mode').getElementsByTagName('li');
for (var i = 0; i < output_modes.length; i++) {
	output_modes[i].onclick = function() {
		if (this.className != 'active') {
			for (var i = 0; i < output_modes.length; i++) { output_modes[i].className = ''; }
			this.className = 'active';
			window.App.out = this.getAttribute('data-mode');
		}
	};
}
document.getElementById('editor_checkbox').onclick = function() {
	if (window.App.editor == 'enabled') {
		document.getElementById('ec_input').className = 'checkbox';
		window.App.editor = 'disabled';
	} else {
		document.getElementById('ec_input').className = 'checkbox checked';
		window.App.editor = 'enabled';
	}
};