<?php $title = 'API'; include('header.php'); ?>
<div id="help">
	<?php include('help.php') ?>
		<article>
			<p>API сервиса <b>«Typographie»</b> позволяет воспользоваться его преимуществами, независимо от того, пишите вы веб-приложение, десктопное или для мобильных устройств: всё, что вам понадобится — это доступ к интернету.</p>
			<p>Для того, чтобы «оттипографировать» текст, вам необходимо выполнить HTTP-запрос методом POST на адрес <b><a href="https://api.typographie.ru/">https://api.typographie.ru/</a></b>.</p>
			<h2>Параметры</h2>
			<p><b><i>raw</i></b> (обязательный) : Текст, нуждающийся в обработке.<br>
			<b><i>actions</i></b> : Список совершаемых операций, через запятую (по умолчанию — все).<br>
			<b><i>in</i></b> : Тип вводимого текста, <b>plain</b> (по умолчанию) или <b>html</b>.<br>
			<b><i>out</i></b> : Тип получаемого текста, <b>plain</b> (по умолчанию) или <b>html</b>.</p>
			<p>Рабочая кодировка — <b>UTF-8</b>.</p>
			<h2>Действия (actions)</h2>
			<p><b><i>quotes</i></b> : Замена кавычек: "" на «».<br>
			<b><i>inquot</i></b> (требует <b><i>quotes</i></b>): Вложенные кавычки: «„“» (иначе — дублирующие кавычки «склеиваются»).<br>
			<b><i>dashes</i></b> : По необходимости заменять дефисы на тире и минусы.<br>
			<b><i>angles</i></b> : Заменять звёздочки и кавычки на градусы, футы, дюймы.<br>
			<b><i>dblspace</i></b> : Исправлять дублирующиеся пробелы в тексте.<br>
			<b><i>specials</i></b> : Вставлять специальные символы (из <a href="?specials">таблицы символов</a>).<br>
			<b><i>mathchars</i></b> : Вставлять математические символы (из той же таблицы).<br>
			<b><i>punctuation</i></b> : Исправлять ошибки в пунктуации, например, пробелы перед запятыми.<br>
			<b><i>specialspaces</i></b> : Исправлять неправильную отбивку спецсимволов пробелами.<br>
			<b><i>nbsp</i></b> : «Приклеивать» короткие слова к следующим в тексте.<br>
			<b><i>hellip</i></b> : Исправлять многоточия на символ «троеточие».<br>
			<b><i>paragraphs</i></b> : Расставлять параграфы (<tt>&lt;p&gt;</tt>) при конвертации в HTML (через пустые строки).<br>
			<b><i>safehtml</i></b> : Не обрабатывать текст внутри HTML-тэгов <tt>&lt;code&gt;</tt> и <tt>&lt;pre&gt;</tt>.</p>
			<p>Список действий перечисляется через запятую, вида <i><tt>action1,action2,action3</tt></i>.</p>
			<h2>Пример ответа</h2>
			<p>Ответ приходит в формате JSON.</p>
			<code>{"version":"1.3.0","result":"Your text."}</code>
			<h2>Коды ошибок</h2>
			<p><b><tt>BAD_REQUEST</tt></b> : Не получен обязательный параметр — текст для обработки (<b><i>raw</i></b>).<br>
			<b><tt>ACTIONLIST_EMPTY</tt></b> : Не указано ни одно действие. Все действия — не передавайте <b><i>actions</i></b> вообще<br>
			<b><tt>ACTIONLIST_INVALID</tt></b> : В списке действий найдены несуществующие.<br>
			<b><tt>INPUT_MODE_INVALID</tt></b> : Неверный тип входного текста.<br>
			<b><tt>OUTPUT_MODE_INVALID</tt></b> : Неверный тип получаемого текста.</p>
		</article>
	</div>
</div>
<?php include('footer.php') ?> 