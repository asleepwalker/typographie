<?php

	/*
	*	Typographie, v1.2.2
	*	(c) 2014–2017 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
	*	https://github.com/asleepwalker/typographie
	*/

	if (!(isset($_POST['raw']) && isset($_POST['actions']) && isset($_POST['in']) && isset($_POST['out']) && isset($_POST['highlight']))) {
		echo json_encode(array('error' => '1'));
		exit;
	}

	require_once('typographie.class.php');
	require_once('converter.class.php');
	$engine = new TypographieModes($_POST['actions']);
	$engine->mode($_POST['in'], $_POST['out']);
	$result = $engine->process($_POST['raw']);

	if ($_POST['highlight'] == 'enabled') {
		require_once('finediff.class.php');
		$opcodes = FineDiff::getDiffOpcodes($_POST['raw'], $result); $result = '';
		FineDiff::renderFromOpcodes($_POST['raw'], $opcodes, function($opcode, $from, $from_offset, $from_len) use (&$result) {
			if ($opcode === 'c') $result .= htmlspecialchars(mb_substr($from, $from_offset, $from_len));
			else if ($opcode === 'i') $result .= '<span class="fix">'.htmlspecialchars(mb_substr($from, $from_offset, $from_len), ENT_QUOTES).'</span>';
		});
	}
	else $result = htmlspecialchars($result, ENT_QUOTES, 'UTF-8');
	if ($_POST['out'] == 'html') $result = preg_replace('/(&lt;.+?&gt;)/ui', '<span class="html">$1</span>', $result);

	echo json_encode(array('response' => $result));