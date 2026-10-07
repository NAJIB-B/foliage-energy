(() => {
    const mount = document.querySelector('#work-gallery-mount');
    if (!mount) return;

    const isServicesPage = document.body.classList.contains('services-page');
    const projects = [
        ['work-4.webp', 'Rooftop solar installation', 'Solar panels being installed on a residential rooftop'],
        ['work-1.webp', 'Inverter system installation', 'Technician working on a solar inverter and electrical controls'],
        ['work-2.webp', 'Hybrid power equipment', 'Installed inverter and electrical distribution equipment'],
        ['work-3.webp', 'On-site system setup', 'Technicians setting up solar and backup power equipment'],
        ['work-5.webp', 'Battery storage integration', 'Battery storage units installed alongside solar inverters']
    ];

    mount.innerHTML = `
      <section class="work-gallery-section">
        <div class="shell">
          <div class="work-gallery-heading">
            <div>
              <span class="section-number">${isServicesPage ? 'PROJECT GALLERY' : '03 / SELECTED WORK'}</span>
              <h2>ENERGY AT<br><em>WORK.</em></h2>
            </div>
            <p>A look at the solar, inverter and storage systems our work is built around.</p>
          </div>
          <div class="work-gallery-grid">
            ${projects.map(([image, title, alt], index) => `
              <figure class="work-gallery-item">
                <div class="work-gallery-photo"><img src="assets/${image}" alt="${alt}" loading="lazy"></div>
                <figcaption><span>${String(index + 1).padStart(2, '0')}</span><strong>${title}</strong></figcaption>
              </figure>`).join('')}
          </div>
          <a class="btn btn-sun work-gallery-cta" href="contact.html">Discuss your project <b><svg class="arrow-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7"/></svg></b></a>
        </div>
      </section>`;
})();
