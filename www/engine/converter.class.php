<?php

	/*
	*	Typographie, v1.2.1
	*	(c) 2014–2015 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
	*	https://github.com/asleepwalker/typographie
	*/

	class TypographieModes extends Typographie {

		private $_in;
		private $_out;

		public function mode($in, $out) {
			$this->_in = $in;
			$this->_out = $out;
		}

		private function prepare($raw) {
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
				$this->preserve_part('/<[\/]{0,1}p>/ui', $this->_preserved, $raw);
				if ($this->_in == 'html') {
					if (in_array('safehtml', $this->_actions))
						$this->preserve_part('/<(code|pre)(\s[^>]*)*>.*?<\/\1>/uis', $this->_preserved, $raw);
					$this->preserve_part('/<[^>]+>/ui', $this->_preserved, $raw);
				}
			}

			return $raw;
		}

		private function ready($text) {
			if (($this->_in == 'html') && ($this->_out == 'plain'))
				$text = html_entity_decode($text, ENT_COMPAT, 'UTF-8');
			else if (in_array('entities', $this->_actions) && ($_POST['out'] == 'html'))
				$text = htmlentities($text);

			foreach ($this->_preserved as $code => $content)
				$text = str_replace('{'.$code.'}', $content, $text);

			return $text;
		}

		public function process($raw) {
			$text = $this->prepare($raw);
			$text = parent::process($text);
			return $this->ready($text);
		}
	};