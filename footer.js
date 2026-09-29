(() => {
const isAboutPage = window.location.pathname.toLowerCase().endsWith('/about.html');
const homePath = isAboutPage ? 'index.html' : '';
const footer = document.createElement('footer');

footer.className = 'footer';
footer.innerHTML = `
  <div class="shell">
    <div class="footer-main">
      <div class="footer-brand">
        <a class="wordmark" href="${homePath}#top"><img src="assets/fes-logo.webp" alt=""><span>FOLIAGE<br>ENERGY</span></a>
        <p>Pure energy.<br>Naturally grown.</p>
      </div>
      <div class="footer-column">
        <span class="footer-label">EXPLORE</span>
        <nav class="footer-links" aria-label="Footer">
          <a href="${homePath}#top">Home</a>
          <a href="${homePath}#solutions">Services</a>
          <a href="about.html">About</a>
          <a href="${homePath}#contact">Contact</a>
        </nav>
      </div>
      <div class="footer-column footer-contact">
        <span class="footer-label">GET IN TOUCH</span>
        <address class="footer-detail"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Asokoro, Abuja, Nigeria</span></address>
        <a class="footer-detail" href="tel:+2348139175816"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.2 10.2a16 16 0 0 0 6 6l1.8-1.8a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.7 2.6Z"/></svg><span>+ 234 813 917 5816</span></a>
        <a class="footer-detail" href="mailto:hello@foliageenergy.com"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><span>hello@foliageenergy.com</span></a>
      </div>
      <div class="footer-column">
        <span class="footer-label">FOLLOW ALONG</span>
        <a class="footer-social" href="https://www.instagram.com/foliage_enerygy/" aria-label="Instagram: @foliage_enerygy" target="_blank" rel="noopener noreferrer"><svg class="footer-icon footer-social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg></a>
      </div>
    </div>
    <div class="footer-bottom"><small>© ${new Date().getFullYear()} Foliage Energy Solutions</small><a href="${homePath}#top">Back to top ↑</a></div>
  </div>`;

const footerMount = document.querySelector('#site-footer');
const existingFooter = document.querySelector('footer.footer');
if (footerMount) {
    footerMount.replaceWith(footer);
} else if (existingFooter) {
    existingFooter.replaceWith(footer);
} else {
    document.body.append(footer);
}
})();
