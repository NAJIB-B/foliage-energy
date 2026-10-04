const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-status');

contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const fields = new FormData(contactForm);
    const subject = `Website enquiry: ${fields.get('interest')}`;
    const body = [
        `Name: ${fields.get('name')}`,
        `Email: ${fields.get('email')}`,
        `Phone: ${fields.get('phone') || 'Not provided'}`,
        `Interested in: ${fields.get('interest')}`,
        '',
        'Message:',
        fields.get('message')
    ].join('\n');
    const mailto = `mailto:hello@foliageenergy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    contactStatus.textContent = 'Your email app should open with your message ready. If it does not, email hello@foliageenergy.com.';
    window.location.href = mailto;
});
