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
		private $_actions;

		public function __construct($in = 'plain', $out = 'plain') {
			$this->mode($in, $out);
		}

		public function mode($in, $out) {
			$this->_in = $in;
			$this->_out = $out;
		}

		public function actions($actionlist) {
			$this->_actions = explode(',', $actionlist);
		}

		public function process($raw) {
			$actions = array();
			$text = html_entity_decode($raw, ENT_QUOTES, 'UTF-8');

			// Спецсимволы
			if (in_array('special', $this->_actions)) {
				$actions['/\{([\'"])}/']                       = '$1';
				$actions['/(\([cс]\))|(\{copy\})/ui']          = '©';
				$actions['/(\(r\))|(\{reg\})/ui']              = '®';
				$actions['/(\((тм|tm)\))|(\{(tm|trade)\})/ui'] = '™';
				$actions['/\{(ss|sect)}/']                     = '§';
				$actions['/\{(\*|deg)}/']                      = '°';

				$actions['/\{euro}/']                          = '€';
				$actions['/\{cent}/']                          = '¢';
				$actions['/\{pound}/']                         = '£';
				$actions['/\{(yen|yuan)}/']                    = '¥';

				$actions['/\{alpha\}/ui']                      = 'α';
				$actions['/\{beta\}/ui']                       = 'β';
				$actions['/\{gamma\}/ui']                      = 'γ';
				$actions['/\{delta\}/ui']                      = 'δ';
				$actions['/\{epsilon\}/ui']                    = 'ε';
				$actions['/\{theta\}/ui']                      = 'θ';
				$actions['/\{lambda\}/ui']                     = 'λ';
				$actions['/\{mu\}/ui']                         = 'μ';
				$actions['/\{nu\}/ui']                         = 'ν';
				$actions['/\{pi\}/ui']                         = 'π';
				$actions['/\{rho\}/ui']                        = 'ρ';
				$actions['/\{sigma\}/ui']                      = 'σ';
				$actions['/\{tau\}/ui']                        = 'τ';
				$actions['/\{phi\}/ui']                        = 'φ';
				$actions['/\{psi\}/ui']                        = 'Ψ';
				$actions['/\{omega\}/ui']                      = 'ω';
			}

			// Математические символы
			if (in_array('math', $this->_actions)) {
				$actions['/\{!=}/']                            = '≠';
				$actions['/\{~}/']                             = '≈';
				$actions['/\{equal}/']                         = '≡';
				$actions['/\{<=}/']                            = '⩽';
				$actions['/\{=>}/']                            = '⩾';
				$actions['/\+-/']                              = '±';
				$actions['/<->/']                              = '↔';
				$actions['/<=>/']                              = '⇔';
				$actions['/<-/']                               = '←';
				$actions['/<=/']                               = '⇐';
				$actions['/->/']                               = '→';
				$actions['/=>/']                               = '⇒';

				$actions['/\{\^1}/']                           = '¹';
				$actions['/\{\^2}/']                           = '²';
				$actions['/\{\^3}/']                           = '³';
				$actions['/\{1\/8}/']                          = '⅛';
				$actions['/\{1\/6}/']                          = '⅙';
				$actions['/\{1\/5}/']                          = '⅕';
				$actions['/\{1\/4}/']                          = '¼';
				$actions['/\{1\/3}/']                          = '⅓';
				$actions['/\{1\/2}/']                          = '½';
				$actions['/\{2\/5}/']                          = '⅖';
				$actions['/\{2\/3}/']                          = '⅔';
				$actions['/\{3\/8}/']                          = '⅜';
				$actions['/\{3\/5}/']                          = '⅗';
				$actions['/\{3\/4}/']                          = '¾';
				$actions['/\{4\/5}/']                          = '⅘';
				$actions['/\{5\/6}/']                          = '⅚';
				$actions['/\{5\/8}/']                          = '⅝';
				$actions['/\{7\/8}/']                          = '⅞';

				$actions['/\{part}/']                          = '∂';
				$actions['/\{any}/']                           = '∀';
				$actions['/\{exist}/']                         = '∃';
				$actions['/\{empty}/']                         = '∅';
				$actions['/\{infinity}/']                      = '∞';
				$actions['/\{belong}/']                        = '∈';
				$actions['/\{!belong}/']                       = '∉';
				$actions['/\{v}/']                             = '√';
				$actions['/\{v3}/']                            = '∛';
				$actions['/\{v4}/']                            = '∜';
				$actions['/\{ang}/']                           = '∠';
			}

			// Отступы в пунктуации
			if (in_array('crrctpunc', $this->_actions)) {
				if (in_array('dash', $this->_actions)) $actions['/[-]{2,5}/'] = '—';
				$actions['/([ ]+[-—][ ]*)|([ ]*[-—][ ]+)/u']        = ' - ';
				$actions['/(?<=[.,;!?:])(?=[^ \n"\'.,;!?:\]\)])/u'] = ' ';
				$actions['/[ ]*(?=[.,;!?:])/u']                     = '';	
			}

			// Кавычки-ёлочки
			$actions['/(^|[\s;\(\[-])"/']                      = '$1«';
			$actions['/"([\s-\.!,:;\?\)\]\n\r]|$)/']           = '»$1';
			$actions['/([^\s{])"([^\s}])/']                    = '$1»$2';

			// Двойные+ пробелы
			if (in_array('dblspace', $this->_actions)) {
				$actions['/[ ]{2,}/']                          = ' ';
			}

			// Тире, минус, интервал
			if (in_array('dash', $this->_actions)) {
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