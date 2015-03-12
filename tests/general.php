<?php

	/*
	*	Typographie, v1.2.0
	*	(c) 2014–2015 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
	*	https://github.com/asleepwalker/typographie
	*/

	class TypographieTest extends PHPUnit_Framework_TestCase {

		public function __construct() {
			require_once('lib/typographie.class.php');
		}

		public function testTypographie() {
			$engine = new Typographie('inquot,dashes,dblspace,angles,specials,mathchars,punctuation,specialspaces,nbsp,hellip,paragraphs,safehtml,entities');

			$this->assertEquals('Проверка «кавычек»', $engine->process('Проверка "кавычек"'));
			$this->assertEquals('Проверка «вложенных „кавычек“»', $engine->process('Проверка "вложенных "кавычек""'));
		}

	}