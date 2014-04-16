<?php

	$raw = $_POST['raw'];
	require_once('../typographie.php');
	$engine = new typographie('plain', 'editor');
	$text = $engine->process($raw);
	echo json_encode(array('response' =>  str_replace("\n", "<br>\n", $text)));

?>