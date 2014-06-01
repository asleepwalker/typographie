<?php $title = 'Исходники'; include('header.php'); ?>
<div id="help">
	<?php include('help.php') ?>
		<article>
			<p>Сервис <b>«Typographie»</b> — это open-source проект, то есть проект с открытыми исходными кодами.</p>
			<p>Любой человек может принять участие в разработке и улучшении проекта, или же воспользоваться исходными кодами в своих целях. Смотрите <a href="http://github.com/asleepwalker/typographie/" nofollow>Typographie на GitHub</a>.</p>
			<h2>Структура репозитория</h2>
			<p><b><a href="http://github.com/asleepwalker/typographie/tree/master/api" nofollow>api</a></b> — Исходники api.typographie.ru<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/api/index.php" nofollow>index.php</a></b> — Главный скрипт API<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/api/rules.json" nofollow>rules.json</a></b> — Правила, которыми руководствуется API<br>
			<b><a href="http://github.com/asleepwalker/typographie/tree/master/src" nofollow>src</a></b> — Исходники typographie.ru<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/tree/master/src/engine" nofollow>engine</a></b> — Серверные скрипты сервиса.<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/src/engine/finediff.class.php" nofollow>finediff.class.php</a></b> — Модифицированный под UTF-8 <a href="http://github.com/gorhill/PHP-FineDiff" nofollow>PHP-FineDiff</a> для подсветки изменений.<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/src/engine/main.php" nofollow>main.php</a></b> — Менеджер, обрабатывающий AJAX-запросы сервиса.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/tree/master/src/i" nofollow>i</a></b> — Графика сайта.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/src/js/editor.js" nofollow>js/editor.js</a></b> — Обработчик событий, связывающий сервис с ядром.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/tree/master/src/pages" nofollow>pages</a></b> — Страницы сайта.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/src/index.php" nofollow>index.php</a></b> — Роутер страниц сайта.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/src/style.css" nofollow>style.css</a></b> — Общая каскадная таблица стилей.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/src/typographie.class.php" nofollow>typographie.class.php</a></b> — Ядро, копия оного в корне репозитория.<br>
			<b><a href="http://github.com/asleepwalker/typographie/blob/master/LICENSE" nofollow>LICENSE</a></b> — Лицензия MIT об условиях распространения и использования.<br>
			<b><a href="http://github.com/asleepwalker/typographie/blob/master/README.md" nofollow>README.md</a></b> — Readme-файл для GitHub.<br>
			<b><a href="http://github.com/asleepwalker/typographie/blob/master/typographie.class.php" nofollow>typographie.class.php</a></b> — Последняя версия ядра Typographie.</p>
			<h2>Участие в проекте</h2>
			<p>Активно приветствуется. :) Для того, чтобы предложить изменение/дополнение — выполните <a href="http://github.com/asleepwalker/typographie/pulls" nofollow>pull-request</a> на GitHub.</p>
		</article>
	</div>
</div>
<?php include('footer.php') ?>