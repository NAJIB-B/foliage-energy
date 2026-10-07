// Inject the homepage contact band; page numbering follows visible section order.
document.querySelector('.flow').insertAdjacentHTML('beforebegin', `
	<section id="contact" class="contact-band">
		<div class="shell">
			<span class="section-number">05 / CONTACT US</span>
			<h2>READY FOR<br>MORE <em>POWER?</em></h2>
			<p>Tell us a little about your space and we’ll help you find the right path forward.</p>
			<div>
				<a class="btn btn-sun" href="contact.html">Request a consultation <b><svg class="arrow-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7"/></svg></b></a>
				<a class="contact-email" href="mailto:hello@foliageenergy.com">hello@foliageenergy.com</a>
			</div>
		</div>
	</section>`);
document.head.insertAdjacentHTML('beforeend', `<style>
	.contact-band{background:var(--green);color:var(--cream);padding:105px 0}
	.contact-band h2{font-size:60px;letter-spacing:-3px;margin:23px 0}
	.contact-band h2 em{color:var(--yellow);font-style:normal}
	.contact-band p{max-width:380px;font-size:14px;line-height:1.65}
	.contact-band>div>div{display:flex;gap:32px;align-items:center;margin-top:28px}
	.contact-email{color:var(--cream);font:600 12px 'DM Mono';text-decoration:none}
	@media(max-width:760px){.contact-band{padding:75px 0}.contact-band h2{font-size:45px}.contact-band>div>div{display:grid;gap:20px;justify-items:start}}
</style>`);
