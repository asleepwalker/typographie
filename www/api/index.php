<?php

	/*
	*	Typographie, v1.2.1
	*	(c) 2014–2015 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
	*	https://github.com/asleepwalker/typographie
	*/

	$rules = json_decode(file_get_contents('rules.json'), true);
	require_once('../engine/typographie.class.php');

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

	if (($in == 'plain') && ($out == 'plain')) {
		$engine = new Typographie($actions);
	} else {
		require_once('../engine/converter.class.php');
		$engine = new TypographieModes($actions);
		$engine->mode($in, $out);
	}
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