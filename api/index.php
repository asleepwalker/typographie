<?php

	/*
	*	Typographie, v1.3.0
	*	(c) 2014–2017 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
	*	https://github.com/asleepwalker/typographie
	*/

	require __DIR__.'/../vendor/autoload.php';

	use asleepwalker\typographie\Typographie;

	$rules = json_decode(file_get_contents('rules.json'), true);

	if (!isset($_POST['raw'])) returnError(1);
	if (isset($_POST['actions']) && ($_POST['actions'] == '')) returnError(2);
	if (isset($_POST['actions']))
		foreach (explode(',', $_POST['actions']) as $action)
			if (!in_array($action, $rules['actions'])) returnError(3);
	if (isset($_POST['in']) && (!in_array($_POST['in'], $rules['modes']))) returnError(4);
	if (isset($_POST['out']) && (!in_array($_POST['out'], $rules['modes']))) returnError(5);


	$in = 'plain'; if (isset($_POST['in'])) $in = $_POST['in'];
	$out = 'plain'; if (isset($_POST['out'])) $out = $_POST['out'];
	$actions = implode(',',$rules['actions']); if (isset($_POST['actions'])) $actions = $_POST['actions'];

	$engine = new Typographie($actions, $in, $out);
	$result = $engine->process($_POST['raw']);
	returnResult($result);

	function returnResult($text) {
		$result = array('version' => $GLOBALS['rules']['version'],
		                'result'  => $text);
		echo json_encode($result);
	}

	function returnError($code) {
		die(json_encode(array('error' => $GLOBALS['rules']['errors'][$code])));
	}