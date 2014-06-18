<?php

	$raw = 'Сервис "Typographie" - подготовка текстов к веб-публикации онлайн (с) 2014';

	require_once('typographie.class.php');
	$engine = new typographie('plain', 'html');
	$engine->actions('inquot,dashes,specials,paragraphs');
	$raw = $engine->convert($raw);
	$result = $engine->process($raw);

	// > Сервис «Typographie» — подготовка текстов к веб-публикации онлайн © 2014
	echo $result;

?>