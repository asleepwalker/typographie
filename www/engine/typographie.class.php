<?php

	/*
	*	Typographie, v1.2.0
	*	(c) 2014–2015 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
	*	https://github.com/asleepwalker/typographie
	*/

	class Typographie {

		protected $_actions;
		protected $_preserved;

		public function __construct($actionlist) {
			$this->actions($actionlist);
			$this->_preserved = array();
		}

		public function actions($actionlist) {
			$this->_actions = explode(',', $actionlist);
		}

		protected function preserve_part($pattern, &$pieces, &$text) {
			$text = preg_replace_callback($pattern, function ($match) use (&$pieces) {
				$code = substr(md5($match[0]), 0, 8);
				$pieces[$code] = $match[0];
				return '{'.$code.'}';
			}, $text);
		}

		public function process($text) {
			$actions = array();

			// Спецсимволы
			if (in_array('specials', $this->_actions)) {
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
			if (in_array('mathchars', $this->_actions)) {
				$actions['/\{!=}/']                            = '≠';
				$actions['/\{~}/']                             = '≈';
				$actions['/\{equal}/']                         = '≡';
				$actions['/\{<=}/']                            = '⩽';
				$actions['/\{=>}/']                            = '⩾';
				$actions['/\+-/']                              = '±';
				$actions['/\{-}/']                             = '–';
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
				$actions['/\{union}/']                         = '∪';
				$actions['/\{intersection}/']                  = '∩';
				$actions['/\{v}/']                             = '√';
				$actions['/\{v3}/']                            = '∛';
				$actions['/\{v4}/']                            = '∜';
				$actions['/\{ang}/']                           = '∠';
			}

			// Минус перед числами
			if (in_array('dashes', $this->_actions)) {
				$actions['/((?<=[ ])-(?=[\d])|(^-(?=[\d])))/'] = '–';
			}

			// Отступы в пунктуации
			if (in_array('punctuation', $this->_actions)) {
				if (in_array('dashes', $this->_actions)) $actions['/[-]{2,5}/'] = '—';
				$actions['/([ ]+([-—])[ ]*)|([ ]*([-—])[ ]+)/u']                = ' $2$4 ';
				$actions['/^[ ]([-—][ ])/um']                                   = '$1';
				$actions['/(?<=[.,!?:)])(?=[^ \n"\'.,;!?&:\]\)<»{)])/u']        = ' ';
				$actions['/[ ]*(?=[.,;!?:])/u']                                 = '';
				if (in_array('nbsp', $this->_actions)) $actions['/ ([-—])/']    = ' $1';
			}

			// Градусы, минуты/футы, секунды/дюймы, ч.1
			if (in_array('angles', $this->_actions)) {
				$actions['/([\d.]+)\*/']                       = '$1°';
				$actions['/([\d.]+)\'/']                       = '$1′';
			}

			// Отступы вокруг спецсимволов
			if (in_array('specialspaces', $this->_actions)) {
				$actions['/([№§])[\s]*(?=[\d])/']              = '$1 ';
				$actions['/(?<=[\d])[\s]*(?=°[CСF])/u']        = ' ';
			}

			// Кавычки-ёлочки
			$actions['/(^|[\s>};\(\[-])"/']                    = '$1«';
			$actions['/"([\s-\.!,:;\?\)\]\n\r]|$)/']           = '»$1';
			$actions['/([^\s{])"([^\s}])/']                    = '$1»$2';

			// Двойные+ пробелы
			if (in_array('dblspace', $this->_actions))
				$actions['/[ ]{2,}/']                          = ' ';

			// Тире, минус, интервал
			if (in_array('dashes', $this->_actions)) {
				$actions['/(^|\n|["„«])--?(\s)/u']             = '$1—$2';
				$actions['/(?<=[\d])-(?=[\d])/']               = '–';
				if (in_array('nbsp', $this->_actions))
				     $actions['/( |\s)--?(\s)/']               = ' —$2';
				else $actions['/(\s)--?(\s)/']                 = ' —$2';
			}

			// Неразрывные пробелы
			if (in_array('nbsp', $this->_actions))
				$actions['/([\s][a-zа-яёіїєґ\'′]{1,2})[ ]/iu'] = '$1 ';

			// Символ троеточия
			if (in_array('hellip', $this->_actions))
				$actions['/[.]{2,5}/']                         = '…';

			// Выполняем операции замены
			$exceptions = array();
			$this->preserve_part('/[\d]+([.,][\d]+)+/u', $exceptions, $text); // Дроби, IP
			$this->preserve_part('/^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/ui', $exceptions, $text); // E-mail
			$this->preserve_part('/((([a-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[a-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[a-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/u', $exceptions, $text); // URI
			$this->preserve_part('/[:;.][\'_-]{0,2}[.,edpobnsu*#@|()&\$308ехорвъэ]/ui', $exceptions, $text); // Смайлы
			foreach ($actions as $key => $val)
				$text = preg_replace($key, $val, $text);
			foreach ($exceptions as $code => $content)
				$text = str_replace('{'.$code.'}', $content, $text);

			// Вложенные кавычки
			if (in_array('inquot', $this->_actions))
				while (preg_match('/(«[^«»]*)«/mu', $text)) {
					$text = preg_replace('/(«[^«»]*)«/mu', '$1„', $text);
					$text = preg_replace('/(„[^„“«»]*)»/mu', '$1“', $text);
				}
			else {
				// Дублирующие кавычки сливаются в одни
				$text = preg_replace('/«{2,}/', '«', $text);
				$text = preg_replace('/»{2,}/', '»', $text);
			}

			// Градусы, минуты/футы, секунды/дюймы, ч.2
			if (in_array('angles', $this->_actions)) {
				$text = preg_replace('/(?<=»)([^«]+?[\d.]+)»/', '$1″', $text);
				if (strpos($text, '«') === false)
					$text = preg_replace('/([\d.]+)»/', '$1″', $text);
			}

			return $text;
		}
	};