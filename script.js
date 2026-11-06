const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');
if (menuBtn && primaryNav) {
  menuBtn.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal, .hero-copy, .hero-media, .section-heading, .service-list, .service-footer, .process-top, .process-steps, .faq-items, .contact-copy, .quote-form, .gallery, .work-bottom, .area-inner');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  revealItems.forEach(item => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach(item => observer.observe(item));
}

const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const vehicle = (data.get('vehicle') || '').toString().trim();
    const location = (data.get('location') || '').toString().trim();
    const service = (data.get('service') || '').toString().trim();
    const details = (data.get('details') || '').toString().trim();

    const lines = [
      'Hi Mechanic Mobile Angel, I would like a quote.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Vehicle: ${vehicle}`,
      `Location: ${location}`,
      `Service needed: ${service}`,
      `Details: ${details || 'N/A'}`,
      '',
      'Please let me know your availability. Thank you.'
    ];

    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `sms:+17473895386?body=${body}`;
  });
}
