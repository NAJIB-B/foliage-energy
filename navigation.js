const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const isAboutPage = window.location.pathname.toLowerCase().endsWith('/about.html');
const sectionPath = isAboutPage ? 'index.html#' : '#';

navLinks.id = 'site-navigation';
navLinks.innerHTML = `<a href="${sectionPath}top">Home</a><a href="${sectionPath}solutions">Services</a><a href="about.html"${isAboutPage ? ' aria-current="page"' : ''}>About</a><a href="${sectionPath}contact">Contact</a><button class="btn btn-sun mobile-quote-action" type="button" data-open-quote>Get a quote <b>↗</b></button>`;

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
    if (isAboutPage && event.target.closest('[data-open-quote]')) {
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
