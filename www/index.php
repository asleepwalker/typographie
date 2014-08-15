<?php

	if     (isset($_GET['about']))    $page = 'about';
	elseif (isset($_GET['specials'])) $page = 'specials';
	elseif (isset($_GET['history']))  $page = 'history';
	elseif (isset($_GET['api']))      $page = 'api';
	elseif (isset($_GET['examples'])) $page = 'examples';
	elseif (isset($_GET['sources']))  $page = 'sources';
	elseif (isset($_GET['contacts'])) $page = 'contacts';
	else                              $page = 'main';

	include('pages/'.$page.'.php');