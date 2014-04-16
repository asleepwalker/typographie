<?php

	/*
		Typographie, v1.0
		https://github.com/asleepwalker/typographie

		by Artyom "Sleepwalker" Fedosov, 2014
		http://me.asleepwalker.ru/
		mail@asleepwalker.ru
	*/

	$raw = $_POST['raw'];
	require_once('../typographie.php');
	$engine = new typographie('plain', 'editor');
	$text = $engine->process($raw);
	echo json_encode(array('response' =>  str_replace("\n", "<br>\n", $text)));

?>