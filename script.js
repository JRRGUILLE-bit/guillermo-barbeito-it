(() => {
  const lang = document.documentElement.lang || 'es-UY';
  const isSpanish = lang.toLowerCase().startsWith('es');

  // Keep the visible profile focused on current IT work rather than an academic title.
  const heroSummary = document.querySelector('.hero-summary');
  if (heroSummary) {
    heroSummary.textContent = isSpanish
      ? 'Profesional IT con experiencia en service desk, soporte de producto, troubleshooting, producto y operaciones IT. Trabajo entre usuarios y sistemas: diagnosticar, resolver, documentar y mejorar.'
      : 'IT professional with experience across service desk, product support, troubleshooting, product ownership and IT operations. I work between users and systems: diagnose, resolve, document and improve.';
  }

  const heroEducation = Array.from(document.querySelectorAll('.hero-meta > div'))
    .find((item) => {
      const label = item.querySelector('span');
      if (!label) return false;
      const text = label.textContent.trim().toLowerCase();
      return text === 'formación' || text === 'education';
    });

  if (heroEducation) {
    const value = heroEducation.querySelector('strong');
    if (value) {
      value.textContent = isSpanish
        ? 'Ingeniería en Informática · UCU'
        : 'Computer Engineering · UCU';
    }
  }

  const educationCard = document.querySelector('.experience-side .credential-card');
  if (educationCard) {
    const title = educationCard.querySelector(':scope > strong');
    if (title) {
      title.textContent = isSpanish
        ? 'Ingeniería en Informática'
        : 'Computer Engineering';
    }

    const year = educationCard.querySelector('.credential-year');
    if (year) year.remove();
  }

  // Keep search/social descriptions aligned with the visible positioning.
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', isSpanish
      ? 'Profesional IT en Montevideo. Experiencia en IT Support, Service Desk, Product Support, Product Owner, sistemas, Git/GitHub y automatización. CV y proyectos técnicos.'
      : 'IT professional in Montevideo with experience in IT Support, Service Desk, Product Support, Product Ownership, systems, Git/GitHub and automation. Resume and public technical projects.');
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', isSpanish
      ? 'Profesional IT en Montevideo. Soporte técnico, service desk, producto, sistemas y automatización. CV y proyectos verificables en GitHub.'
      : 'IT professional in Montevideo. Technical support, service desk, product, systems and automation. Resume and verifiable GitHub projects.');
  }

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', isSpanish
      ? 'Profesional IT en Montevideo. Soporte técnico, producto, sistemas y automatización.'
      : 'IT professional in Montevideo. Technical support, product, systems and automation.');
  }

  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.style.letterSpacing = 'normal';
  }

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      sectionLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
      });
    }, {
      rootMargin: '-30% 0px -58% 0px',
      threshold: [0, 0.2, 0.5, 0.8]
    });

    sections.forEach((section) => activeObserver.observe(section));
  }
})();
