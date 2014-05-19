<?php

	$default = 'main';

	$page = $default;
	if (isset($_GET['about'])) $page = 'about';
	elseif (isset($_GET['api'])) $page = 'api';
	elseif (isset($_GET['sources'])) $page = 'sources';
	elseif (isset($_GET['specials'])) $page = 'specials';

	include('pages/'.$page.'.php');

?>