/*
	Typographie, v1.0
	https://github.com/asleepwalker/typographie

	by Artyom "Sleepwalker" Fedosov, 2014
	http://me.asleepwalker.ru/
	mail@asleepwalker.ru
*/

var App = {};
App.in = 'plain';
App.out = 'editor';
App.state('free');

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
	data.raw = document.getElementById('raw_input').value;
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send('in='+data.in+'&out='+data.out+'&raw='+encodeURIComponent(data.raw));
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
			if (window.App.out != 'plain') {
				//disable editor
			} else {
				//if (editor) window.App.out = 'editor';
			}
		}
	};
}