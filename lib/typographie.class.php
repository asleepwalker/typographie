<?php

	/*
	*	Typographie, v1.2.2
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

		public function process($text) {

			// Спецсимволы
			if (in_array('specials', $this->_actions)) {
				$this->processSpecials($text);
			}

			// Математические символы
			if (in_array('mathchars', $this->_actions)) {
				$this->processMath($text);
			}

			// Минус перед числами
			if (in_array('mathchars', $this->_actions) || in_array('dashes', $this->_actions)) {
				$this->processMinuses($text);
			}

			// Отступы в пунктуации
			if (in_array('punctuation', $this->_actions)) {
				$this->processPunctuation($text);
			}

			// Отступы вокруг спецсимволов
			if (in_array('specialspaces', $this->_actions)) {
				$this->processSpecialSpaces($text);
			}

			// Градусы, минуты/футы, секунды/дюймы
			if (in_array('angles', $this->_actions)) {
				$this->processAngles($text);
			}

			// Двойные+ пробелы
			if (in_array('dblspace', $this->_actions)) {
				$this->processMultipleSpaces($text);
			}

			// Кавычки
			if (in_array('quotes', $this->_actions)) {
				$this->processQoutes($text);

				// Вложенные кавычки
				if (in_array('inquot', $this->_actions))
					$this->processInnerQoutes($text);
				else {
					$this->processStackingQoutes($text);
				}
			}

			// Тире, минус, интервал
			if (in_array('dashes', $this->_actions)) {
				$this->processDashes($text);
			}

			// Неразрывные пробелы
			if (in_array('nbsp', $this->_actions)) {
				$this->processNbsps($text);
			}

			// Символ троеточия
			if (in_array('hellip', $this->_actions)) {
				$this->processHellips($text);
			}

			return $text;
		}

		protected function processSpecials(&$text) {
			$actions = array(
				'/(\([cс]\))|(\{copy\})/ui'          => '©',
				'/(\(r\))|(\{reg\})/ui'              => '®',
				'/(\((тм|tm)\))|(\{(tm|trade)\})/ui' => '™',
				'/\{(ss|sect)}/'                     => '§',
				'/\{(\*|deg)}/'                      => '°',
				'/\{euro}/'                          => '€',
				'/\{cent}/'                          => '¢',
				'/\{pound}/'                         => '£',
				'/\{(yen|yuan)}/'                    => '¥',
				'/\{alpha\}/ui'                      => 'α',
				'/\{beta\}/ui'                       => 'β',
				'/\{gamma\}/ui'                      => 'γ',
				'/\{delta\}/ui'                      => 'δ',
				'/\{epsilon\}/ui'                    => 'ε',
				'/\{theta\}/ui'                      => 'θ',
				'/\{lambda\}/ui'                     => 'λ',
				'/\{mu\}/ui'                         => 'μ',
				'/\{nu\}/ui'                         => 'ν',
				'/\{pi\}/ui'                         => 'π',
				'/\{rho\}/ui'                        => 'ρ',
				'/\{sigma\}/ui'                      => 'σ',
				'/\{tau\}/ui'                        => 'τ',
				'/\{phi\}/ui'                        => 'φ',
				'/\{psi\}/ui'                        => 'Ψ',
				'/\{omega\}/ui'                      => 'ω'
			);

			$this->performActions($text, $actions);
		}

		protected function processMath(&$text) {
			$actions = array(
				'/\{!=}/'           => '≠',
				'/\{~}/'            => '≈',
				'/\{equal}/'        => '≡',
				'/\{<=}/'           => '⩽',
				'/\{=>}/'           => '⩾',
				'/\+-/'             => '±',
				'/\{-}/'            => '–',
				'/\{multiple}/'     => '×',
				'/\{divide}/'       => '÷',
				'/<->/'             => '↔',
				'/<=>/'             => '⇔',
				'/<-/'              => '←',
				'/<=/'              => '⇐',
				'/->/'              => '→',
				'/=>/'              => '⇒',
				'/\{\^1}/'          => '¹',
				'/\{\^2}/'          => '²',
				'/\{\^3}/'          => '³',
				'/\{1\/8}/'         => '⅛',
				'/\{1\/6}/'         => '⅙',
				'/\{1\/5}/'         => '⅕',
				'/\{1\/4}/'         => '¼',
				'/\{1\/3}/'         => '⅓',
				'/\{1\/2}/'         => '½',
				'/\{2\/5}/'         => '⅖',
				'/\{2\/3}/'         => '⅔',
				'/\{3\/8}/'         => '⅜',
				'/\{3\/5}/'         => '⅗',
				'/\{3\/4}/'         => '¾',
				'/\{4\/5}/'         => '⅘',
				'/\{5\/6}/'         => '⅚',
				'/\{5\/8}/'         => '⅝',
				'/\{7\/8}/'         => '⅞',
				'/\{part}/'         => '∂',
				'/\{any}/'          => '∀',
				'/\{exist}/'        => '∃',
				'/\{sum}/'          => 'Σ',
				'/\{empty}/'        => '∅',
				'/\{infinity}/'     => '∞',
				'/\{belong}/'       => '∈',
				'/\{!belong}/'      => '∉',
				'/\{union}/'        => '∪',
				'/\{intersection}/' => '∩',
				'/\{v}/'            => '√',
				'/\{v3}/'           => '∛',
				'/\{v4}/'           => '∜',
				'/\{ang}/'          => '∠'
			);

			$this->performActions($text, $actions);
		}

		protected function processMinuses(&$text) {
			$text = preg_replace('/((?<=[ ])-(?=[\d])|(^-(?=[\d])))/', '–', $text);
		}

		protected function processPunctuation(&$text) {
			$actions = array();

			if (in_array('dashes', $this->_actions)) {
				$actions['/[-]{2,5}/']                               = '—';
			}

			$actions['/(^|\s)([-—])(?=[^\s])/um']                    = '$1$2 '; // Пробел после тире
			$actions['/(?<=[^\s])([-—])($|\s)/um']                   = ' $1$2'; // Пробел перед тире
			$actions['/(?<=[.,!?:)])(?=[^ \n"\'.,;!?&:\]\)<»{)])/u'] = ' ';
			$actions['/[ ]*(?=[.,;!?:])/u']                          = '';

			if (in_array('nbsp', $this->_actions)) {
				$actions['/ ([-—])/']                                = chr(194).chr(160).'$1';
			}

			$exceptions = array();
			$this->preserve_part('/[\d]+([.,][\d]+)+/u', $exceptions, $text); // Дроби, IP
			$this->preserve_part('/^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/ui', $exceptions, $text); // E-mail
			$this->preserve_part('/((([a-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[a-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[a-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/u', $exceptions, $text); // URI
			$this->preserve_part('/[:;.][\'_-]{0,2}[.,edpobnsu*#@|()&\$308ехорвъэ]/ui', $exceptions, $text); // Смайлы
			$this->performActions($text, $actions);
			$this->restore_parts($exceptions, $text);
		}

		protected function processSpecialSpaces(&$text) {
			$actions = array(
				'/([№§])[\s]*(?=[\d])/'       => '$1 ',
				'/(?<=[\d])[\s]*(?=°[CСF])/u' => ' ',
				'/(?<=[\d])[\s]*(?=%)/u'      => ''
			);

			$this->performActions($text, $actions);
		}

		protected function processMultipleSpaces(&$text) {
			$text = preg_replace('/[ ]{2,}/', ' ', $text);
		}

		protected function processQoutes(&$text) {
			$actions = array(
				'/(^|[\s>};\(\[-])"/'          => '$1«',
				'/"([\s-\.!,:;\?\)\]\n\r]|$)/' => '»$1',
				'/([^\s{])"([^\s}])/'          => '$1»$2',
				'/(«[^\s«]*)»(.*?».*?»)/'      => '$1«$2' // Вложенное цитирование с самого начала основного
			);

			$this->performActions($text, $actions);
		}

		protected function processInnerQoutes(&$text) {
			while (preg_match('/(«[^«»]*)«/mu', $text)) {
				$text = preg_replace('/(«[^«»]*)«/mu', '$1„', $text);
				$text = preg_replace('/(„[^„“«»]*)»/mu', '$1“', $text);
			}
		}

		protected function processStackingQoutes(&$text) {
			$actions = array(
				'/«{2,}/u' => '«',
				'/»{2,}/u' => '»'
			);

			$this->performActions($text, $actions);
		}

		protected function processDashes(&$text) {
			$actions = array(
				'/(^|\n|["„«])--?(\s)/u' => '$1—$2',
				'/(?<=[\d])-(?=[\d])/'     => '–'
			);

			if (in_array('nbsp', $this->_actions)) {
				$actions['/(\s)--?($|\s)/u']  = chr(194).chr(160).'—$2';
			} else {
				$actions['/(\s)--?($|\s)/u']  = ' —$2';
			}

			$this->performActions($text, $actions);
		}

		protected function processAngles(&$text) {
			$actions = array(
				'/(?<=\d)\*/'            => '°',
				'/(?<=\d)\'/'            => '′',
				'/(^[^"]*\d)"([^"]*$)/'  => '$1″$2', // Вне кавычек
				'/("[^"]*\d)"([^"]*?")/' => '$1″$2'  // Внутри кавычек
			);

			$this->performActions($text, $actions);
		}

		protected function processNbsps(&$text) {
			$text = preg_replace('/((^|[\s])[a-zа-яёіїєґ\'′]{1,2})[ ]/iu', '$1'.chr(194).chr(160), $text);
		}

		protected function processHellips(&$text) {
			$text = preg_replace('/\.{2,5}/', '…', $text);
		}

		private function performActions(&$text, $actions) {
			foreach ($actions as $key => $val) {
				$text = preg_replace($key, $val, $text);
			}
		}

		protected function preserve_part($pattern, &$pieces, &$text) {
			$text = preg_replace_callback($pattern, function ($match) use (&$pieces) {
				$code = substr(md5($match[0]), 0, 8);
				$pieces[$code] = $match[0];
				return '{'.$code.'}';
			}, $text);
		}

		protected function restore_parts($pieces, &$text) {
			foreach ($pieces as $code => $content) {
				$text = str_replace('{'.$code.'}', $content, $text);
			}
		}

	};