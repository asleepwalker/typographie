<?php

	$raw = $_POST['raw'];

	$text = html_entity_decode($raw, ENT_QUOTES, 'utf-8');
    $arr = array(
        // Убираем символ троеточия
        '/…/u' => '...',
        // Кавычки «ёлочки» &laquo; &raquo;
        '/(^|[\s;\(\[-])"/' => '$1«',
        '/"([\s-\.!,:;\?\)\]\n\r]|$)/' => '»$1',
        '/([^\s])"([^\s])/' => '$1»$2',
        // Длинное тире &mdash;
        '/(^|\n|["„«])--?(\s)/u' => '$1—$2',
        '/(\s)--?(\s)/' => ' —$2',
        // Непереносимый проблел после коротких слов &nbsp;
        '/([\s][a-zа-яё]{1,2})[ ]/iu' => '$1 '
    );
    foreach ($arr as $key=>$val) {
        $text = preg_replace($key, $val, $text);
    }
    // Вложенные кавычки &bdquo; &ldquo;
    while (preg_match('/(«[^«»]*)«/mu', $text)) {
        $text = preg_replace('/(«[^«»]*)«/mu', '$1„', $text);
        $text = preg_replace('/(„[^„“«»]*)»/mu', '$1“', $text);
    }

	echo json_encode(array('response' => $text));

?>