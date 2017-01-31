<?php include('header.php'); ?>
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
			<div id="highlight"><div id="hcheckbox" class="checkbox" checked>&nbsp;</div><label>Подсветить правки</label></div>
		</div>
	</div>
</div>
<div class="clearfix"></div>
<div id="dialog_wrapper" class="hide_options" style="display: none">
	<div id="dialog_box"><div id="dialog_body">
		<ul id="options"></ul>
		<div id="buttons"><button id="save" class="button submit hide_options">Завершить настройку</button></div>
	</div></div>
</div>

<script type="text/javascript" src="app.js"></script>
<?php include('footer.php') ?>