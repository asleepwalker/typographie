F<?php

	/*
	*	Typographie, v1.2.2
	*	(c) 2014–2017 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
	*	https://github.com/asleepwalker/typographie
	*/

	class TypographieTest extends PHPUnit_Framework_TestCase {

		public function __construct() {
			require_once('lib/typographie.class.php');
		}

		public function testQuotes() {
			$engine = new Typographie('quotes,inquot');
			$this->assertEquals('Проверка «кавычек»', $engine->process('Проверка "кавычек"'));
			$this->assertEquals('Проверка «последовательности» «кавычек»', $engine->process('Проверка "последовательности" "кавычек"'));
			$this->assertEquals('«Кавычки» в начале строки', $engine->process('"Кавычки" в начале строки'));
			$this->assertEquals('Кавычки в конце «строки»', $engine->process('Кавычки в конце "строки"'));
			$this->assertEquals('Проверка «вложенных „кавычек“»', $engine->process('Проверка "вложенных "кавычек""'));
			$this->assertEquals('Проверка «„вложенных“ кавычек»', $engine->process('Проверка ""вложенных" кавычек"'));
			$this->assertEquals('Проверка «„самовложенных“» кавычек', $engine->process('Проверка ""самовложенных"" кавычек'));
			$this->assertEquals('«„Вложенные“ кавычки» в начале строки', $engine->process('""Вложенные" кавычки" в начале строки'));
			$this->assertEquals('Вложенные кавычки «в конце „строки“»', $engine->process('Вложенные кавычки "в конце "строки""'));

			$engine->actions('quotes');
			$this->assertEquals('Проверка склеивания «вложенных «кавычек»', $engine->process('Проверка склеивания «вложенных «кавычек»»'));
		}

		public function testDashes() {
			$engine = new Typographie('dashes');
			$this->assertEquals('Тире — тест', $engine->process('Тире - тест'));
			$this->assertEquals('— Фраза из диалога', $engine->process('- Фраза из диалога'));
			$this->assertEquals('Тире в конце —', $engine->process('Тире в конце -'));
			$this->assertEquals('Проверка интервалов/минусов 3–4', $engine->process('Проверка интервалов/минусов 3-4'));
		}

		public function testAngles() {
			$engine = new Typographie('angles');
			$this->assertEquals('Проверка градусов 3°', $engine->process('Проверка градусов 3*'));
			$this->assertEquals('Проверка футов 4′', $engine->process('Проверка футов 4\''));
			$this->assertEquals('Проверка дюймов 5″', $engine->process('Проверка дюймов 5"'));
			$this->assertEquals('6″ в начале строки', $engine->process('6" в начале строки'));
			$this->assertEquals('"Диагональ 6″ здесь"', $engine->process('"Диагональ 6" здесь"'));
			$this->assertEquals('"Диагональ 6″"', $engine->process('"Диагональ 6""'));
			$this->assertEquals('"6″ диагональ"', $engine->process('"6" диагональ"'));
			$this->assertEquals('"Диагональ модели 3020"', $engine->process('"Диагональ модели 3020"'));

			$engine->actions('angles,quotes');
			$this->assertEquals('«Диагональ 7″ здесь»', $engine->process('"Диагональ 7" здесь"'));
			$this->assertEquals('«Диагональ 7″»', $engine->process('"Диагональ 7""'));
			$this->assertEquals('«7″ диагональ»', $engine->process('"7" диагональ"'));
			$this->assertEquals('«Диагональ модели 3021»', $engine->process('"Диагональ модели 3021"'));
		}

		public function testSpecials() {
			$engine = new Typographie('specials');
			$this->assertEquals('© Typographie, Typographie®, Typographie™, § 1. Typographie', $engine->process('(c) Typographie, Typographie(r), Typographie(tm), {ss} 1. Typographie'));
			$this->assertEquals('$100 = 10 000 ¢ = 91 € = 67 £ = 621 ¥', $engine->process('$100 = 10 000 {cent} = 91 {euro} = 67 {pound} = 621 {yuan}'));
			$this->assertEquals('α β γ δ ε θ λ μ ν π ρ σ τ φ Ψ ω', $engine->process('{alpha} {beta} {gamma} {delta} {epsilon} {theta} {lambda} {mu} {nu} {pi} {rho} {sigma} {tau} {phi} {psi} {omega}'));
		}

		public function testMath() {
			$engine = new Typographie('mathchars');
			$this->assertEquals('A ≠ B, B ≈ C, C ≡ D, D ∈ ∅', $engine->process('A {!=} B, B {~} C, C {equal} D, D {belong} {empty}'));
			$this->assertEquals('a × b, b ÷ c, Σ ni', $engine->process('a {multiple} b, b {divide} c, {sum} ni'));
			$this->assertEquals('∃ m ∈ R, ∀ n ∈ N, ∞ ∉ N, A ∪ B, C ∩ D', $engine->process('{exist} m {belong} R, {any} n {belong} N, {infinity} {!belong} N, A {union} B, C {intersection} D'));
			$this->assertEquals('y\' = ∂x/∂y, ±100, –50, 1 < 2 ⩽ 2 ⩾ 2 > 3', $engine->process('y\' = {part}x/{part}y, +-100, -50, 1 < 2 {<=} 2 {=>} 2 > 3'));
			$this->assertEquals('1¹ = 1² = 1³ = √1 = ∛1 = ∜1', $engine->process('1{^1} = 1{^2} = 1{^3} = {v}1 = {v3}1 = {v4}1'));
			$this->assertEquals('↔ ⇔ ← ⇐ → ⇒', $engine->process('<-> <=> <- <= -> =>'));
			$this->assertEquals('⅛ ⅙ ⅕ ¼ ⅓ ½ ⅖ ⅔ ⅜ ⅗ ¾ ⅘ ⅚ ⅝ ⅞', $engine->process('{1/8} {1/6} {1/5} {1/4} {1/3} {1/2} {2/5} {2/3} {3/8} {3/5} {3/4} {4/5} {5/6} {5/8} {7/8}'));
		}

		public function testLineBreaks() {
			$engine = new Typographie('nbsp');
			$this->assertEquals('Всё своё я'.chr(194).chr(160).'ношу с'.chr(194).chr(160).'собой.', $engine->process('Всё своё я ношу с собой.'));
		}

		public function testHellips() {
			$engine = new Typographie('hellip');
			$this->assertEquals('<Нытьё>…', $engine->process('<Нытьё>...'));
		}

		public function testFixingOfMultipleSpaces() {
			$engine = new Typographie('dblspace');
			$this->assertEquals('Исправление двойных пробелов', $engine->process('Исправление  двойных   пробелов'));
		}

		public function testFixingOfPunctuation() {
			$engine = new Typographie('punctuation');
			$this->assertEquals('Я, видимо, очень плохо учился в школе - но сейчас не экзамен же!', $engine->process('Я ,видимо , очень плохо учился в школе -но сейчас не экзамен же !'));
			$this->assertEquals('Кроме того, я не понимаю: неужели и так непонятно?!', $engine->process('Кроме того , я не понимаю:неужели и так непонятно ? !'));
			$this->assertEquals('- И не знаю - нужно ли - отбивать тире -', $engine->process('-И не знаю -нужно ли- отбивать тире-'));
		}

		public function testFixingOfSpacing() {
			$engine = new Typographie('specialspaces');
			$this->assertEquals('№ 1, § 1', $engine->process('№1, §1'));
			$this->assertEquals('-39 °C = -38.2 °F', $engine->process('-39°C = -38.2°F'));
			$this->assertEquals('25%', $engine->process('25 %'));
		}

	}