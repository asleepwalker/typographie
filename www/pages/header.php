<!DOCTYPE html>
<html class="<?= $page ?>">
	<head>
		<title><?php if (isset($title)) echo $title.' — '; ?>Typographie</title>
		<meta charset="utf-8">
		<link rel="icon" href="/favicon.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Сервис «Typographie» автоматизирует подготовку текстов к веб-публикации. Вам больше не понадобится запоминать alt-коды и заботиться о неразрывных пробелах: вы пишете текст в привычном для себя формате, получаете — готовый к публикации.">
		<meta name="keywords" content="типограф, типографика, спецсимволы, подготовка, публикация, typographie">
		<meta property="og:title" content="<?= isset($title) ? $title.' — Typographie' : 'Typographie — подготовка текстов к веб-публикации онлайн' ?>">
		<meta property="og:description" content="Сервис «Typographie» автоматизирует подготовку текстов к веб-публикации. Вам больше не понадобится запоминать alt-коды и заботиться о неразрывных пробелах: вы пишете текст в привычном для себя формате, получаете — готовый к публикации.">
		<meta property="og:image" content="http://typographie.ru/i/logo.png">
		<meta property="og:locale" content="ru_RU">
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="Typographie">
		<meta property="og:url" content="http://typographie.ru<?= $_SERVER[REQUEST_URI] ?>">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<!--[if IE]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-43342800-4', 'auto');
			ga('send', 'pageview');
		</script>
	</head>
	<body>
		<header>
			<nav><ul>
				<li><a href="?specials">Таблица спецсимволов</a></li>
				<li><a href="?contacts">Связаться с автором</a></li>
			</ul></nav>
			<div id="logo">&laquo;<a href="/">Typographie</a>&raquo;&nbsp;&mdash; подготовка текстов к веб-публикации онлайн</div>
		</header>
		<div id="wrap">
