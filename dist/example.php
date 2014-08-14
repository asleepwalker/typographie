<?php

	$raw = 'Сервис "Typographie" - подготовка текстов к веб-публикации онлайн (с) 2014';

	require_once('typographie.class.php');
	$engine = new Typographie('inquot,dashes,specials,paragraphs');
	$engine->actions('inquot,dashes,specials,paragraphs');
	$result = $engine->process($raw);

	// > Сервис «Typographie» — подготовка текстов к веб-публикации онлайн © 2014
	echo $result;

?>