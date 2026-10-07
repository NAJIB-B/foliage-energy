const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const isAboutPage = window.location.pathname.toLowerCase().endsWith('/about.html');
const isContactPage = window.location.pathname.toLowerCase().endsWith('/contact.html');
const isServicesPage = window.location.pathname.toLowerCase().endsWith('/services.html');
const sectionPath = isAboutPage || isContactPage || isServicesPage ? 'index.html#' : '#';

navLinks.id = 'site-navigation';
navLinks.innerHTML = `<a href="${sectionPath}top">Home</a><a href="services.html"${isServicesPage ? ' aria-current="page"' : ''}>Services</a><a href="about.html"${isAboutPage ? ' aria-current="page"' : ''}>About</a><a href="contact.html"${isContactPage ? ' aria-current="page"' : ''}>Contact</a><button class="btn btn-sun mobile-quote-action" type="button" data-open-quote>Get a quote <b><svg class="arrow-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7"/></svg></b></button>`;

const closeNavigation = () => {
    navLinks.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
};

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    navLinks.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    if (!isOpen) navLinks.querySelector('a').focus();
});

navLinks.addEventListener('click', event => {
    if (event.target.closest('a, button')) closeNavigation();
});

document.addEventListener('click', event => {
    if (!document.querySelector('.nav').contains(event.target)) closeNavigation();
    if ((isAboutPage || isContactPage || isServicesPage) && event.target.closest('[data-open-quote]')) {
        window.location.href = 'index.html#quote';
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeNavigation();
        menuToggle.focus();
    }
});

window.matchMedia('(min-width: 961px)').addEventListener('change', closeNavigation);
