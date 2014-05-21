<nav><ul>
	<li><a class="back" href="/">Вернуться к работе</a></li>
	<li<?php if ($page == 'about'): ?> class="active"><a><?php else: ?>><a href="?about"><?php endif; ?>О сервисе</a></li>
	<li class="sub<?php if ($page == 'specials'): ?> active"><a><?php else: ?>""><a href="?specials"><?php endif; ?>Таблица символов</a></li>
	<li class="sub<?php if ($page == 'history'): ?> active"><a><?php else: ?>""><a href="?history"><?php endif; ?>История изменений</a></li>
	<li<?php if ($page == 'api'): ?> class="active"><a><?php else: ?>><a href="?api"><?php endif; ?>API</a></li>
	<li class="sub<?php if ($page == 'examples'): ?> active"><a><?php else: ?>""><a href="?examples"><?php endif; ?>Примеры кода</a></li>
	<li<?php if ($page == 'sources'): ?> class="active"><a><?php else: ?>><a href="?sources"><?php endif; ?>Исходники</a></li>
	<li<?php if ($page == 'contacts'): ?> class="active"><a><?php else: ?>><a href="?contacts"><?php endif; ?>Контакты</a></li>
</ul></nav>
<div id="content">
		<h1><?php echo $title ?></h1>