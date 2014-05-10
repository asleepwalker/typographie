<?php

	/*
		Typographie, v1.0
		https://github.com/asleepwalker/typographie

		by Artyom "Sleepwalker" Fedosov, 2014
		http://me.asleepwalker.ru/
		mail@asleepwalker.ru
	*/

	if (!(isset($_POST['raw']) && isset($_POST['actions']) && isset($_POST['in']) && isset($_POST['out']) && isset($_POST['highlight']))) {
		echo json_encode(array('error' => '1'));
		exit;
	}

	require_once('../typographie.php');
	$engine = new typographie($_POST['in'], $_POST['out']);
	$engine->actions($_POST['actions']);
	$result = $engine->process($_POST['raw']);

	if ($_POST['highlight'] == 'enabled') {
		require_once('finediff.class.php');
		$in = mb_convert_encoding($_POST['raw'], 'HTML-ENTITIES', 'UTF-8');
		$out = mb_convert_encoding($result, 'HTML-ENTITIES', 'UTF-8');
		$opcodes = FineDiff::getDiffOpcodes($in, $out);
		$pre = FineDiff::renderDiffToHTMLFromOpcodes($in, $opcodes);
		$result = mb_convert_encoding($pre, 'UTF-8', 'HTML-ENTITIES');
		$result = preg_replace('/<del>.*?<\/del>(.*?)<ins>(.*?)<\/ins>/u', '<span class="fix">$1$2</span>', $result);
		$result = preg_replace('/<del>(.*?)<\/del>/u', '', $result);
		$result = preg_replace('/<ins>(.*?)<\/ins>/u', '<span class="fix">$1</span>', $result);
	}

	echo json_encode(array('response' => $result));
?>