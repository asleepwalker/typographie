<?php $title = 'О сервисе'; include('header.php'); ?>
<div id="help">
	<?php include('help.php') ?>
		<article>
		 	<p>Сервис <b>«Typographie»</b> предназначен для тех, кому лень запоминать и постоянно вводить alt-коды для получения такой банальной штуки как специальные символы. Однако, если в личной переписке допустимо, например, вместо тире написать обитающий на клавиатуре символ «дефис», то публикуемый в Сети текст должен быть лишён подобных изъянов. А поскольку делать это вручную <a href="?contacts">вашему покорному слуге</a> было ещё более лень, чем вводить alt-коды, то возникла идея раз и навсегда автоматизировать этот процесс.</p>
			<p>Идея проста: вы пишете текст в привычном для себя формате, получаете — готовый к публикации. Для вставки спецсимволов достаточно конструкции из доступных на клавиатуре знаков (например, <nobr>+- превращается в ±</nobr>). При этом можно «типографировать» как обычный текст, так и с HTML-тэгами, или даже конвертировать из одного формата в другой. При желании можно настроить список действий, которые будет совершать <b>«Typographie»</b> над вашим бедным текстом.</p>
			<p>Полный список манипуляций, совершаемых скриптом, выглядит следующим образом (<a href="?history">версия 1.2.1</a>):</p>
			<ul>
				<li>Замена программистских кавычек <nobr>("")</nobr> на традиционные кавычки-ёлочки <nobr>(«»)</nobr></li>
				<li>Замена вложенных кавычек <nobr>(««»» → «„“»)</nobr> или, в зависимости от настроек, слияние с повторяющими</li>
				<li>Замена дефисов на тире в тексте и на минус в цифровых конструкциях</li>
				<li>Замена звёздочек и кавычек у чисел на знаки градуса, фута, дюйма и т.д.</li>
				<li>Исправление дублирующих пробелов</li>
				<li>Замена многоточия на спецсимвол троеточия</li>
				<li>Добавление специальных символов через конструкции (например, <nobr>{ss} → §</nobr>)</li>
				<li>Исправление ошибок в пунктуации, таких как неправильная отбивка пробелами или дублирующие запятые</li>
				<li>Исправление отступов вокруг спецсимволов (например, <nobr>§5 → § 5</nobr>, а вот <nobr>25 % → 25%</nobr>)</li>
				<li«Склеивание» коротких слов с последующими («давай с нами» не разорвётся на «давай с / нами»), привязка тире к предшествующему слову></li>
			</ul>
			<p>Напоминаю, в настройках можно включить или выключить любое из этих действий.</p>
			<p>Кроме того, если вы постоянно используете сервис, то можно упростить себе жизнь и воспользоваться <a href="?api">API</a> или скачать&nbsp;<a href="?sources">исходники</a>.</p>
		</article>
	</div>
</div>
<?php include('footer.php') ?>