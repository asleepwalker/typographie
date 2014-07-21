<?php

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
	$out = 'plain'; if (isset($_POST['out'])) $in = $_POST['out'];
	$actions = implode(',',$rules['actions']); if (isset($_POST['actions'])) $actions = $_POST['actions'];

	$engine = new typographie($in, $out);
	$engine->actions($actions);
	$raw = $engine->convert($_POST['raw']);
	$result = $engine->process($raw);
	returnResult($result);

	function returnResult($text) {
		$result = array('version' => $GLOBALS['rules']['version'],
		                'result'  => $text);
		echo json_encode($result);
	}

	function returnError($code) {
		die(json_encode(array('error' => $GLOBALS['rules']['errors'][$code])));
	}

?>