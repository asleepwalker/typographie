<?php

	class Converter {

		private $_in;
		private $_out;
		private $_preserved;

		public function __construct($in = 'plain', $out = 'plain') {
			$this->_in = $in;
			$this->_out = $out;
			$this->_preserved = array();
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
				$text = preserve_html('/<[\/]{0,1}p>/ui', $this->_preserved, $text);
				if ($this->_in == 'html') {
					if (in_array('safehtml', $this->_actions))
						$text = preserve_html('/<(code|pre)[^>]*>.*?<\/\1>/uis', $this->_preserved, $text);
					$text = preserve_html('/<[^>]+>/ui', $this->_preserved, $text);
				}
			}
		}

		public function ready($text) {
			if (($this->_in == 'html') && ($this->_out == 'plain'))
				$text = html_entity_decode($text, ENT_COMPAT, 'UTF-8');

			foreach ($pieces as $code => $content)
				$text = str_replace('{'.$code.'}', $content, $text);
		}

		function preserve_html($pattern, &$pieces, $text) {
			return preg_replace_callback($pattern, function ($match) use (&$pieces) {
				$code = substr(md5($match[0]), 0, 8);
				$pieces[$code] = $match[0];
				return '{'.$code.'}';
			}, $text);
		}
	};

?>