<?php
    require_once('Typographie.php');
    use asleepwalker\typographie\Typographie;

	$raw = 'Сервис "Typographie" - подготовка текстов к веб-публикации онлайн (с) 2014-2017';

	$engine = new Typographie('quotes,dashes,specials,paragraphs');
	$result = $engine->process($raw);

	echo $result;
	// > Сервис «Typographie» — подготовка текстов к веб-публикации онлайн © 2014–2017
