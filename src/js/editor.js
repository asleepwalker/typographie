/*
	Typographie, v1.0
	https://github.com/asleepwalker/typographie

	by Artyom "Sleepwalker" Fedosov, 2014
	http://me.asleepwalker.ru/
	mail@asleepwalker.ru
*/

document.getElementById('submit').onclick = function() {
	request = new XMLHttpRequest();
	request.open('POST', 'engine/main.php', true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400){
			var data = JSON.parse(request.responseText);
			document.getElementById('display').innerHTML = data.response;
		} else {
			//error
		}
	};

	request.onerror = function() {
		//error
	};

	var data = {};
	data.raw = document.getElementById('raw_input').value;
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send('raw='+encodeURIComponent(data.raw));
};