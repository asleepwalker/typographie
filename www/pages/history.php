<?php $title = 'История изменений'; include('header.php'); ?>
<div id="help">
	<?php include('help.php') ?>
		<article>
			<p><b>27.03.2015</b>: Вышла версия <b>1.2.1</b>: Добавлены спецсимволы умножения, деления и суммирования</p>
			<p><b>24.03.2015</b>: Вышла версия <b>1.2.0</b>:
				<ul>
					<li>Добавлено автоматическое тестирование</li>
					<li>Ядро сервиса доступно для установки через <a href="https://packagist.org/packages/asleepwalker/typographie" rel="nofollow">Composer</a></li>
					<li>Обработка теперь происходит поэтапно, отдельный проход для каждого действия</li>
					<li>Добавлена опция типографирования кавычек вообще</li>
					<li>Исправлены баги со вложенным цитированием</li>
					<li>Исправлены баги со комбинацией исправления пунктуации и типографирования тире</li>
					<li>Исправлен баг с игнорированием неправильного многоточия</li>
				</ul>
			</p>
			<p><b>16.08.2014</b>: Вышла версия <b>1.1</b>:
				<ul>
					<li>Конвертирование в отдельном классе</li>
					<li>«Typographie» адаптируется под высоту окна браузера</li>
					<li>Не «исправляет» пунктуацию в URL</li>
					<li>Не «исправляет» пунктуацию в e-mail</li>
					<li>Не «ломает» смайлики корректором пунктуации</li>
					<li>Не «ломает» дроби корректором пунктуации</li>
					<li>Не добавляет пробел перед тире в начале строки</li>
				</ul>
			</p>
			<p><b>04.06.2014</b>: Релиз сервиса <b>«Typographie»</b>, версия <b>1.0</b>.</p>
		</article>
	</div>
</div>
<?php include('footer.php') ?>