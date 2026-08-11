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

  // Turn project cards into recruiter-friendly evidence: case study first, raw repo second.
  const projectRoutes = [
    {
      repo: 'https://github.com/JRRGUILLE-bit/project-isosceles',
      local: isEnglish ? 'projects/menelao/' : 'projects/menelao/',
      label: isEnglish ? 'Read case study' : 'Ver case study'
    },
    {
      repo: 'https://github.com/JRRGUILLE-bit/Foundry',
      local: isEnglish ? 'projects/foundry/' : 'projects/foundry/',
      label: isEnglish ? 'Read case study' : 'Ver case study'
    },
    {
      repo: 'https://github.com/JRRGUILLE-bit/jona-logistica',
      local: isEnglish ? 'projects/jona-logistica/' : 'projects/jona-logistica/',
      label: isEnglish ? 'Read case study' : 'Ver case study'
    }
  ];

  projectRoutes.forEach(({ repo, local, label }) => {
    document.querySelectorAll(`a[href="${repo}"]`).forEach((repoLink) => {
      if (repoLink.dataset.caseStudyProcessed === 'true') return;
      repoLink.dataset.caseStudyProcessed = 'true';

      const caseLink = document.createElement('a');
      caseLink.className = 'text-link case-study-link';
      caseLink.href = local;
      caseLink.innerHTML = `${label} <span>→</span>`;

      repoLink.insertAdjacentElement('beforebegin', caseLink);
      repoLink.textContent = isEnglish ? 'GitHub repository ↗' : 'Repositorio en GitHub ↗';
      repoLink.classList.add('repo-secondary-link');
    });
  });

  // Make email CTAs actionable when a recruiter clicks them.
  document.querySelectorAll('a[href^="mailto:gbarbeitor@yahoo.com"]').forEach((link) => {
    if (link.href.includes('subject=')) return;
    const subject = isEnglish
      ? 'IT opportunity - Guillermo Barbeito'
      : 'Oportunidad IT - Guillermo Barbeito';
    link.href = `mailto:gbarbeitor@yahoo.com?subject=${encodeURIComponent(subject)}`;
  });

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
