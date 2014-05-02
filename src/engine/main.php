<?php

	/*
		Typographie, v1.0
		https://github.com/asleepwalker/typographie

		by Artyom "Sleepwalker" Fedosov, 2014
		http://me.asleepwalker.ru/
		mail@asleepwalker.ru
	*/

	if (!(isset($_POST['raw']) && isset($_POST['actions']) && isset($_POST['in']) && isset($_POST['out']) && isset($_POST['editor']))) {
		echo json_encode(array('error' => '1'));
		exit;
	}

	require_once('../typographie.php');
	$engine = new typographie($_POST['in'], $_POST['out'], $_POST['editor']);
	$engine->actions($_POST['actions']);
	echo json_encode(array('response' => $engine->process($_POST['raw'])));
?>