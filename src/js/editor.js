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
	data.actions = window.App.actions.list.join(',');
	data.raw = document.getElementById('raw_input').value;
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send('in='+data.in+'&out='+data.out+'&editor='+data.editor+'&actions='+data.actions+'&raw='+encodeURIComponent(data.raw));
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

/* Submit button */
document.getElementById('submit').onclick = App.send;

/* Input mode change */
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

/* Output mode change */
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

/* Output editor turning on/off */
document.getElementById('editor_checkbox').onclick = function() {
	if (window.App.editor == 'enabled') {
		document.getElementById('ec_input').className = 'checkbox';
		window.App.editor = 'disabled';
	} else {
		document.getElementById('ec_input').className = 'checkbox checked';
		window.App.editor = 'enabled';
	}
};

/* Showing options dialog */
document.getElementById('show_options').onclick = function() {
	var el = document.getElementById('dialog_wrapper');
	el.style.display = 'block';
	el.style.opacity = 0;
	
	var last = +new Date();
	var tick = function() {
		el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
		last = +new Date();
		if (+el.style.opacity < 1) {
			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 10)
		} else {
			var blackzones = document.getElementsByClassName('blackzone');
			for (var i = 0; i < blackzones.length; i++) {
				blackzones[i].style.display = 'block';
			}
		}
	};

	tick();
	window.resizeDialog();
	window.onresize = window.resizeDialog;
};
function resizeDialog() {
	var bounds = document.getElementById('dialog_box').getBoundingClientRect();
	document.getElementById('bz_top').style.height = bounds.top+'px';
	document.getElementById('bz_left').style.top = bounds.top+'px';
	document.getElementById('bz_left').style.height = bounds.height+'px';
	document.getElementById('bz_left').style.width = bounds.left+'px';
	document.getElementById('bz_right').style.top = bounds.top+'px';
	document.getElementById('bz_right').style.height = bounds.height+'px';
	document.getElementById('bz_right').style.left = bounds.right+'px';
	document.getElementById('bz_bottom').style.top = bounds.bottom+'px';
}

/* Hiding options dialog */
var blackzones = document.getElementsByClassName('bz');
for (var i = 0; i < blackzones.length; i++) {
	blackzones[i].onclick = function() {
		var el = document.getElementById('dialog_wrapper');
		var last = +new Date();
		var tick = function() {
			el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
			last = +new Date();

			if (+el.style.opacity > 0) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
			} else {
				el.style.display = 'none';
				var blackzones = document.getElementsByClassName('blackzone');
				for (var i = 0; i < blackzones.length; i++) {
					blackzones[i].style.display = 'none';
				}
			}
		};
		tick();
	};
}

/* Turning on/off options */
var options = document.getElementById('options').getElementsByTagName('li');
for (var i = 0; i < options.length; i++) {
	options[i].getElementsByTagName('div')[0].onclick = function() {
		var option = this.getAttribute('data-option');
		if (window.App.actions.list.indexOf(option) == -1) {
			window.App.actions.add(option);
			this.getElementsByTagName('div')[0].className = 'checkbox checked';
		} else {
			window.App.actions.remove(option);
			this.getElementsByTagName('div')[0].className = 'checkbox';
		}
	};
}