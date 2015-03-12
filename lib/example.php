<?php

	$raw = 'Сервис "Typographie" - подготовка текстов к веб-публикации онлайн (с) 2014-2015';

	require_once('typographie.class.php');
	$engine = new Typographie('inquot,dashes,specials,paragraphs');
	$result = $engine->process($raw);

	echo $result;
	// > Сервис «Typographie» — подготовка текстов к веб-публикации онлайн © 2014–2015
