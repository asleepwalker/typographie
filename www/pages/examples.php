<?php $title = 'Примеры кода'; include('header.php'); ?>
<div id="help">
	<?php include('help.php') ?>
		<article>
			<p>Чтобы упростить задачу обращения к API, я написал примеры на нескольких наиболее популярных у веб-разработчиков языках (а если честно, то просто тех, которые я из этой области знаю).</p>
			<h2>PHP</h2>
			<code>function typographie($data) {<br>
&nbsp;&nbsp;$context = stream_context_create(array(<br>
&nbsp;&nbsp;&nbsp;&nbsp;'http' => array(<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'method' => 'POST',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'header' => 'Content-Type: application/x-www-form-urlencoded',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'content' => http_build_query($data)<br>
&nbsp;&nbsp;&nbsp;&nbsp;)<br>
&nbsp;&nbsp;));<br>
&nbsp;&nbsp;return json_decode(file_get_contents('http://api.typographie.ru/', false, $context))->result;<br>
}<br>
<br>
echo typographie(array('raw'=>'Your text.'));</code>
			<h2>Python</h2>
			<code>#!/usr/bin/env python<br>
# -*- coding: utf8 -*-<br>
<br>
import urllib<br>
url = "http://api.typographie.ru/"<br>
params = urllib.urlencode({"raw":"Your text."})<br>
f = urllib.urlopen(url, params)<br>
print f.read()</code>
			<h2>Parser3</h2>
			<code>@typographie[sRaw][jResponse;oResponse;result]<br>
&nbsp;&nbsp;^curl:session{<br>
&nbsp;&nbsp;&nbsp;&nbsp;^curl:options[<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$.url[http://api.typographie.ru/]<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$.charset[UTF-8]<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$.timeout(10)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$.ssl_verifypeer(0)<br>
&nbsp;&nbsp;&nbsp;&nbsp;]<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$jResponse[^curl:load[<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$.url[http://api.typographie.ru/]<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$.postfields[raw=$sRaw]<br>
&nbsp;&nbsp;&nbsp;&nbsp;]]<br>
&nbsp;&nbsp;&nbsp;&nbsp;$oResponse[^json:parse[^untaint{$jResponse.text};<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$.double(false)<br>
&nbsp;&nbsp;&nbsp;&nbsp;]]<br>
&nbsp;&nbsp;&nbsp;&nbsp;$result[$oResponse.result]<br>
&nbsp;&nbsp;}<br>
<br>
^typographie[Your text.]</code>
			<h2>Linux bash через cURL</h2>
			<code>curl -d "raw=Your%20text." http://api.typographie.ru/</code>
		</article>
	</div>
</div>
<?php include('footer.php') ?>
