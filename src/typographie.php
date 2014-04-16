<?php

	class Typographie {

		private $_in;
		private $_out;
		private $_opts;

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


		public function __construct($in = 'plain', $out = 'plain') {
			$this->mode($in, $out);
		}

		public function mode($in, $out) {
			$this->_in = $in;
			$this->_out = $out;
		}

		public function process($raw) {
			$text = html_entity_decode($raw, ENT_QUOTES, 'utf-8');
			$arr = array(
				'/…/u' => '...',
				'/(^|[\s;\(\[-])"/' => '$1«',
				'/"([\s-\.!,:;\?\)\]\n\r]|$)/' => '»$1',
				'/([^\s])"([^\s])/' => '$1»$2',
				'/(^|\n|["„«])--?(\s)/u' => '$1—$2',
				'/(\s)--?(\s)/' => ' —$2',
				'/([\s][a-zа-яё]{1,2})[ ]/iu' => '$1 '
			);
			foreach ($arr as $key=>$val) {
				$text = preg_replace($key, $val, $text);
			}
			while (preg_match('/(«[^«»]*)«/mu', $text)) {
				$text = preg_replace('/(«[^«»]*)«/mu', '$1„', $text);
				$text = preg_replace('/(„[^„“«»]*)»/mu', '$1“', $text);
			}
			return $text;
		}
	};

?>