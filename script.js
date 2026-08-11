(() => {
  const pageLang = (document.documentElement.lang || '').toLowerCase();
  const isEnglish = pageLang.startsWith('en');

  // Normalize the Spanish ProfilePage dateModified value to the DateTime format expected by Google.
  document.querySelectorAll('script[type="application/ld+json"]').forEach((schemaScript) => {
    try {
      const data = JSON.parse(schemaScript.textContent);
      const graph = Array.isArray(data['@graph']) ? data['@graph'] : [];
      const profilePage = graph.find((item) => item && item['@type'] === 'ProfilePage');

      if (profilePage && profilePage.dateModified === '2026-08-11') {
        profilePage.dateModified = '2026-08-11T06:23:00-03:00';
        schemaScript.textContent = JSON.stringify(data);
      }
    } catch (_) {
      // Leave unrelated or malformed JSON-LD untouched.
    }
  });

  // Keep both language versions connected for users and search engines.
  if (!isEnglish) {
    if (!document.querySelector('link[rel="alternate"][hreflang="en"]')) {
      const enAlternate = document.createElement('link');
      enAlternate.rel = 'alternate';
      enAlternate.hreflang = 'en';
      enAlternate.href = 'https://jrrguille-bit.github.io/guillermo-barbeito-it/en/';
      document.head.appendChild(enAlternate);
    }

    const nav = document.querySelector('.site-nav');
    const cvLink = nav?.querySelector('.nav-cv');
    if (nav && cvLink && !nav.querySelector('.nav-lang')) {
      const langLink = document.createElement('a');
      langLink.className = 'nav-lang';
      langLink.href = 'en/';
      langLink.lang = 'en';
      langLink.textContent = 'EN';
      cvLink.insertAdjacentElement('beforebegin', langLink);
    }
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
