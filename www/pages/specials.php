<?php $title = 'Таблица символов'; include('header.php'); ?>
<div id="help">
	<?php include('help.php') ?>
		<article>
			<p>Для вставления спецсимволов в текст можно воспользоваться вот такими конструкциями.</p>
			<h2>Обычные символы, греческий алфавит</h2>
			<table class="specials">
				<tr>
					<td>(c), {copy} → ©</td>
					<td>(r), {reg} → ®</td>
					<td>(тм), {trade} → ™</td>
					<td>{ss}, {sect} → §</td>
				</tr>
				<tr>
					<td>{*}, {deg} → °</td>
					<td><span title="Требует опции исправления градусов">123* → 123°</span></td>
					<td><span title="Требует опции исправления градусов">123' → 123′</span></td>
					<td><span title="Требует опции исправления градусов">123" → 123″</span></td>
				</tr>
				<tr>
					<td>{euro} → €</td>
					<td>{cent} → ¢</td>
					<td>{pound} → £</td>
					<td>{yen}, {yuan} → ¥</td>
				</tr>
				<tr>
					<td>{alpha} → α</td>
					<td>{beta} → β</td>
					<td>{gamma} → γ</td>
					<td>{delta} → δ</td>
				</tr>
				<tr>
					<td>{epsilon} → ε</td>
					<td>{theta} → θ</td>
					<td>{lambda} → λ</td>
					<td>{mu} → μ</td>
				</tr>
				<tr>
					<td>{nu} → ν</td>
					<td>{pi} → π</td>
					<td>{rho} → ρ</td>
					<td>{sigma} → σ</td>
				</tr>
				<tr>
					<td>{tau} → τ</td>
					<td>{phi} → φ</td>
					<td>{psi} → Ψ</td>
					<td>{omega} → ω</td>
				</tr>
			</table>
			<h2>Математические символы</h2>
			<table class="specials">
				<tr>
					<td>{!=} → ≠</td>
					<td>{~} → ≈</td>
					<td>{equal} → ≡</td>
					<td>{empty} → ∅</td>
				</tr>
				<tr>
					<td>{any} → ∀</td>
					<td>{exist} → ∃</td>
					<td>{infinity} → ∞</td>
					<td>{part} → ∂</td>
				</tr>
				<tr>
					<td>{belong} → ∈</td>
					<td>{!belong} → ∉</td>
					<td>{union} → ∪</td>
					<td>{intersection} → ∩</td>
				</tr>
				<tr>
					<td>+- → ±</td>
					<td>{-} → –</td>
					<td>{multiple} → ×</td>
					<td>{divide} → ÷</td>
				</tr>
				<tr>
					<td>{ang} → ∠</td>
					<td>{v} → √</td>
					<td>{v3} → ∛</td>
					<td>{v4} → ∜</td>
				</tr>
				<tr>
					<td>{<=} → ⩽</td>
					<td>{=>} → ⩾</td>
					<td><-> → ↔</td>
					<td><=> → ⇔</td>
				</tr>
				<tr>
					<td><- → ←</td>
					<td><= → ⇐</td>
					<td>-> → →</td>
					<td>=> → ⇒</td>
				</tr>
				<tr>
					<td>{^1} → ¹</td>
					<td>{^2} → ²</td>
					<td>{^3} → ³</td>
					<td>{1/8} → ⅛</td>
				</tr>
				<tr>
					<td>{1/6} → ⅙</td>
					<td>{1/5} → ⅕</td>
					<td>{1/4} → ¼</td>
					<td>{1/3} → ⅓</td>
				</tr>
				<tr>
					<td>{1/2} → ½</td>
					<td>{2/5} → ⅖</td>
					<td>{2/3} → ⅔</td>
					<td>{3/8} → ⅜</td>
				</tr>
				<tr>
					<td>{3/5} → ⅗</td>
					<td>{3/4} → ¾</td>
					<td>{4/5} → ⅘</td>
					<td>{5/6} → ⅚</td>
				</tr>
				<tr>
					<td>{5/8} → ⅝</td>
					<td>{7/8} → ⅞</td>
					<td>{sum} → Σ</td>
				</tr>
			</table>
		</article>
	</div>
</div>
<?php include('footer.php') ?>