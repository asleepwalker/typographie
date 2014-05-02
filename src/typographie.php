<?php

	/*
		Typographie, v1.0
		https://github.com/asleepwalker/typographie

		by Artyom "Sleepwalker" Fedosov, 2014
		http://me.asleepwalker.ru/
		mail@asleepwalker.ru
	*/

	class Typographie {

		private $_in;
		private $_out;
		private $_editor;
		private $_actions;

		private $_symbols = array(
			'plain' => array(
				'nbsp'    => ' ',
				'lquote'  => '«',
				'rquote'  => '»',
				'lquote2' => '„',
				'rquote2' => '“',
				'mdash'   => '—',
				'ndash'   => '–',
				'minus'   => '–',
				'hellip'  => '…',
				'copy'    => '©',
				'trade'   => '™',
				'apos'    => '&#39;',
				'reg'     => '<sup><small>®</small></sup>',
				'multiply' => '&times;',
				'1/2' => '&frac12;',
				'1/4' => '&frac14;',
				'3/4' => '&frac34;',
				'plusmn' => '&plusmn;',
				'rarr' => '&rarr;',
				'larr' => '&larr;',
				'rsquo' => '&rsquo;'),
			'html' => array(
				'nbsp'    => '&nbsp;',
			)
		);

		private $_ignore = array(
			'<pre[^>]*>' => '<\/pre>',
			'<style[^>]*>' => '<\/style>',
			'<script[^>]*>' => '<\/script>',
			'<!--' => '-->',
			'<code[^>]*>' => '<\/code>'
		);


		public function __construct($in = 'plain', $out = 'plain', $editor = false) {
			$this->mode($in, $out, $editor);
		}

		public function mode($in, $out, $editor) {
			$this->_in = $in;
			$this->_out = $out;
			$this->_editor = $editor;
		}

		public function actions($actionlist) {
			$this->_actions = explode(',', $actionlist);
		}

		public function process($raw) {
			$actions = array();
			$text = html_entity_decode($raw, ENT_QUOTES, 'UTF-8');

			// Кавычки-ёлочки
			$actions['/(^|[\s;\(\[-])"/']            = '$1«';
			$actions['/"([\s-\.!,:;\?\)\]\n\r]|$)/'] = '»$1';
			$actions['/([^\s])"([^\s])/']            = '$1»$2';

			// Отступы в пунктуации
			if (in_array('crrctpunc', $this->_actions)) {
				$actions['/([ ]-[ ]|[ ]-|-[ ])/']            = ' - ';
				/*$actions['/([ ],[ ]|,[ ]|[ ],|,)/']          = ', ';
				. ! ? ?! : ; ( ) ... ?.. !.. O_o */
			}

			// Двойные+ пробелы
			if (in_array('dblspace', $this->_actions)) {
				$actions['/[ ]+/']                       = ' ';
			}

			// Тире, минус, интервал
			if (in_array('dash', $this->_actions)) {
				$actions['/[-]{2,}/']                    = '—';
				$actions['/(^|\n|["„«])--?(\s)/u']       = '$1—$2';
				$actions['/(\s)--?(\s)/']                = ' —$2';
			}

			// Неразрывные пробелы
			if (in_array('nbsp', $this->_actions)) {
				$actions['/([\s][a-zа-яё]{1,2})[ ]/iu']  = '$1 ';
			}

			// Символ троеточия
			if (in_array('hellip', $this->_actions)) {
				$actions['/(\.){2,5}/']  = '…';
			}

			// Выполняем операции замены
			foreach ($actions as $key=>$val) $text = preg_replace($key, $val, $text);

			// Вложенные кавычки
			if (in_array('inquot', $this->_actions)) {
				while (preg_match('/(«[^«»]*)«/mu', $text)) {
					$text = preg_replace('/(«[^«»]*)«/mu', '$1„', $text);
					$text = preg_replace('/(„[^„“«»]*)»/mu', '$1“', $text);
				}
			} else {
				// Дублирующие кавычки сливаются в одни
				$text = preg_replace('/(«)+/', '«', $text);
				$text = preg_replace('/(»)+/', '»', $text);
			}

			return $text;
		}
	};

?>