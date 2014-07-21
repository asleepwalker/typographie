<?php

	/*
		Typographie, v1.1
		https://github.com/asleepwalker/typographie

		by Artyom "Sleepwalker" Fedosov, 2014
		http://me.asleepwalker.ru/
		mail@asleepwalker.ru
	*/

	class Converter {

		private $_in;
		private $_out;
		private $_actions;
		private $_preserved;

		public function __construct($in, $out, $actions) {
			$this->_in = $in;
			$this->_out = $out;
			$this->_actions = explode(',', $actions);
			$this->_preserved = array();
		}

		private function preserve_html($pattern, &$pieces, $text) {
			return preg_replace_callback($pattern, function ($match) use (&$pieces) {
				$code = substr(md5($match[0]), 0, 8);
				$pieces[$code] = $match[0];
				return '{'.$code.'}';
			}, $text);
		}

		public function prepare($raw) {
			if (($this->_in == 'html') && ($this->_out == 'plain')) {
				$raw = preg_replace('/[\n]*<br[\s\/]*>[\n]*/ui', "\n", $raw);
				$raw = preg_replace('/<p[^>]*>(.*?)<\/p>[\s]*/usi', "$1\n\n", $raw);
				$raw = strip_tags($raw);
			}
			elseif (($this->_in == 'plain') && ($this->_out == 'html')) {
				$raw = str_replace('<', '&lt;', $raw);
				$raw = str_replace('>', '&gt;', $raw);
				if (in_array('paragraphs', $this->_actions)) {
					$raw = preg_replace('/^(.+?)$/uim', "<p>$1</p>", $raw);
					$raw = preg_replace('/<\/p>\n<p>/ui', "<br>\n", $raw);
				} else $raw = preg_replace('/[\n]/ui', "<br>\n", $raw);
			}

			if ($this->_out == 'html') {
				$raw = $this->preserve_html('/<[\/]{0,1}p>/ui', $this->_preserved, $raw);
				if ($this->_in == 'html') {
					if (in_array('safehtml', $this->_actions))
						$raw = $this->preserve_html('/<(code|pre)[^>]*>.*?<\/\1>/uis', $this->_preserved, $raw);
					$raw = $this->preserve_html('/<[^>]+>/ui', $this->_preserved, $raw);
				}
			}

			return $raw;
		}

		public function ready($text) {
			if (($this->_in == 'html') && ($this->_out == 'plain'))
				$text = html_entity_decode($text, ENT_COMPAT, 'UTF-8');

			foreach ($this->_preserved as $code => $content)
				$text = str_replace('{'.$code.'}', $content, $text);

			return $text;
		}
	};

?>