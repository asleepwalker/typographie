<?php $title = 'Typographie'; include('header.php'); ?>
<div id="top"></div>
<div id="editor">
	<div id="input">
		<textarea id="raw_input" autofocus></textarea>
		<div class="controls">
			<ul id="input_mode" class="mode radiobox">
				<li class="active" data-mode="plain">Текст</li>
				<li data-mode="html">HTML</li>
			</ul>
			<button id="submit" class="button submit">Обработать</button>
			<button id="show_options" class="button text"><span class="icon">Настройки</span></button>
		</div>
	</div>
	<div id="output">
		<pre id="display"></pre>
		<div class="controls">
			<ul id="output_mode" class="mode radiobox">
				<li class="active" data-mode="plain">Текст</li>
				<li data-mode="html">HTML</li>
			</ul>
			<div id="highlight"><div id="hcheckbox" class="checkbox checked">&nbsp;</div><label>Подсветить правки</label></div>
		</div>
	</div>
</div>
<div id="dialog_wrapper" style="display: none">
	<div id="dialog_box"><div id="dialog_body">
		<ul id="options">
			<li><div data-option="live"><div class="checkbox checked">&nbsp;</div><label>«Живое» типографирование</label></div></li>
			<hr>
			<li><div data-option="inquot"><div class="checkbox checked">&nbsp;</div><label>Вложенные кавычки: «„“»</label></div></li>
			<li><div data-option="dashes"><div class="checkbox checked">&nbsp;</div><label>Тире, минус, интервал вместо дефиса</label></li>
			<li><div data-option="dblspace"><div class="checkbox checked">&nbsp;</div><label>Исправлять двойные+ пробелы</label></div></li>
			<li><div data-option="specials"><div class="checkbox checked">&nbsp;</div><label>Условные знаки: <b>(с)</b> <small>&gt;</small> <b>©</b>, <b>(тм)</b> <small>&gt;</small> <b>™</b>, <b>{*}</b> <small>&gt;</small> <b>°</b>...</label></div></li>
			<li><div data-option="mathchars"><div class="checkbox checked">&nbsp;</div><label>Математические знаки: <b>+-</b> <small>&gt;</small> <b>&plusmn;</b>, <b>{^2}</b> <small>&gt;</small> <b>&sup2;</b>, <b>{!=}</b> <small>&gt;</small> <b>≠</b> ...</label></div></li>
			<li><div data-option="punctuation"><div class="checkbox checked">&nbsp;</div><label>Исправлять отступы в пунктуации</label></div></li>
			<li><div data-option="specialspaces"><div class="checkbox checked">&nbsp;</div><label>Исправлять отступы вокруг спецсимволов</label></div></li>
			<li><div data-option="nbsp"><div class="checkbox checked">&nbsp;</div><label>Не «отрывать» короткие слова</label></div></li>
			<li><div data-option="hellip"><div class="checkbox checked">&nbsp;</div><label>Исправлять многоточие на спецсимвол</label></div></li>
			<hr>
			<li><div data-option="paragraphs"><div class="checkbox checked">&nbsp;</div><label>Разбивать на абзацы (<tt>&lt;p&gt;</tt>) пустой строкой</label></div></li>
			<li><div data-option="safehtml"><div class="checkbox checked">&nbsp;</div><label>Не обрабатывать блоки <tt>&lt;code&gt;</tt> и <tt>&lt;pre&gt;</tt></label></div></li>
		</ul>
		<div id="buttons"><button id="save" class="button submit bz">Завершить настройку</button></div>
	</div></div>
	<div id="bz_top" class="blackzone bz" style="display: none; left: 0; right: 0; top: 0;"></div>
	<div id="bz_left" class="blackzone bz" style="display: none; left: 0;"></div>
	<div id="bz_right" class="blackzone bz" style="display: none; right: 0;"></div>
	<div id="bz_bottom" class="blackzone bz" style="bottom: 0; display: none; left: 0; right: 0;"></div>
</div>

<script type="text/javascript" src="js/editor.js"></script>
<?php include('footer.php') ?>