<?php $title = 'Исходники'; include('header.php'); ?>
<div id="help">
	<?php include('help.php') ?>
		<article>
			<p>Сервис <b>«Typographie»</b> — это open-source проект.</p>
			<p>Любой человек может принять участие в разработке и улучшении проекта, или же воспользоваться исходными кодами в своих целях. Смотрите <a href="http://github.com/asleepwalker/typographie/" nofollow>Typographie на GitHub</a>.</p>
			<h2>Структура репозитория</h2>
			<b><a href="http://github.com/asleepwalker/typographie/tree/master/lib" nofollow>lib</a></b> — Standalone-библиотека Typographie.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/lib/typographie.class.php" nofollow>typographie.class.php</a></b><br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/lib/example.php" nofollow>example.php</a></b> — Пример использования класса.<br>
			<b><a href="http://github.com/asleepwalker/typographie/tree/master/www" nofollow>www</a></b> — Исходники typographie.ru<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/tree/master/api" nofollow>api</a></b> — Исходники api.typographie.ru<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/api/index.php" nofollow>index.php</a></b> — Обработчик запросов к API.<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/api/rules.json" nofollow>rules.json</a></b> — Правила, которыми руководствуется API.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/tree/master/www/engine" nofollow>engine</a></b> — Серверные скрипты сервиса.<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/www/engine/main.php" nofollow>main.php</a></b> — Менеджер, обрабатывающий AJAX-запросы сервиса.<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/www/engine/typographie.class.php" nofollow>typographie.class.php</a></b> — Ядро веб-сервиса.<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/www/engine/converter.class.php" nofollow>converter.class.php</a></b> — Расширение для конвертирования Plain ↔ HTML.<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/www/engine/finediff.class.php" nofollow>finediff.class.php</a></b> — Модифицированный <a href="http://github.com/gorhill/PHP-FineDiff" nofollow>PHP-FineDiff</a> для подсветки изменений.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/tree/master/www/i" nofollow>i</a></b> — Графика сайта.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/tree/master/www/js" nofollow>js</a></b> — Скрипты сайта.<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/www/js/editor.js" nofollow>js/app.js</a></b> — Frontend-ядро сервиса.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/tree/master/www/pages" nofollow>pages</a></b> — Страницы сайта.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/www/index.php" nofollow>index.php</a></b> — Роутер страниц сайта.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/www/style.css" nofollow>style.css</a></b> — Общая каскадная таблица стилей.<br>
			&nbsp;&nbsp;&nbsp;<b><a href="http://github.com/asleepwalker/typographie/blob/master/www/defaults.json" nofollow>defaults.json</a></b> — Конфигурация сервиса.<br>
			<b><a href="http://github.com/asleepwalker/typographie/blob/master/.travis.yml" nofollow>.travis.yml</a></b> — Конфигурация для системы автоматического тестирования <a href="https://travis-ci.org/asleepwalker/typographie" rel="nofollow">Travis CI</a>.<br>
			<b><a href="http://github.com/asleepwalker/typographie/blob/master/composer.json" nofollow>composer.json</a></b> — Конфигурация для репозитория PHP-пакетов <a href="https://packagist.org/packages/asleepwalker/typographie" rel="nofollow">Composer</a>.<br>
			<b><a href="http://github.com/asleepwalker/typographie/blob/master/LICENSE" nofollow>LICENSE</a></b> — Лицензия MIT об условиях распространения и использования.<br>
			<b><a href="http://github.com/asleepwalker/typographie/blob/master/README.md" nofollow>README.md</a></b> — Readme-файл для GitHub.</p>
			<h2>Участие в проекте</h2>
			<p>Активно приветствуется. :) Для того, чтобы предложить изменение/дополнение — выполните <a href="http://github.com/asleepwalker/typographie/pulls" nofollow>pull-request</a> на GitHub.</p>
		</article>
	</div>
</div>
<?php include('footer.php') ?>