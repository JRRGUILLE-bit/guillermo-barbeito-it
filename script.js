(() => {
  document.documentElement.classList.add('js');

  const personalizationStyles = document.createElement('link');
  personalizationStyles.rel = 'stylesheet';
  personalizationStyles.href = 'personalization.css';
  document.head.appendChild(personalizationStyles);

  const personalizePage = () => {
    document.body.classList.add('is-personalized');

    const eyebrow = document.querySelectorAll('.eyebrow span');
    if (eyebrow[0]) eyebrow[0].textContent = 'IT PROFILE / MONTEVIDEO';
    if (eyebrow[1]) eyebrow[1].textContent = 'SUPPORT + SYSTEMS + PRODUCT + AUTOMATION';

    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
      heroRole.textContent = 'Ingeniero en Informática. Soporte técnico, sistemas y producto con foco en soluciones simples y medibles.';
    }

    const heroSummary = document.querySelector('.hero-summary');
    if (heroSummary) {
      heroSummary.textContent = 'Mi recorrido combina service desk, soporte de producto, operaciones IT, priorización y automatización. Trabajo entre usuarios y sistemas: diagnosticar, ordenar, documentar y mejorar sin agregar complejidad porque sí.';
    }

    const heroMeta = document.querySelector('.hero-meta');
    if (heroMeta) {
      heroMeta.innerHTML = `
        <div><span>Formación</span><strong>Ingeniería en Informática · UCU · 2008</strong></div>
        <div><span>Experiencia</span><strong>Soporte · Service Desk · Producto · Operaciones IT</strong></div>
        <div><span>Entornos</span><strong>Windows · Microsoft / Google · Git / GitHub</strong></div>
      `;
    }

    const systemHeadLabel = document.querySelector('.system-head > span:first-child');
    if (systemHeadLabel) systemHeadLabel.textContent = 'GB / TECHNICAL OPERATIONS PROFILE';

    const nodes = document.querySelectorAll('.system-map .node');
    const nodeContent = [
      ['01', 'SUPPORT', 'diagnose / resolve'],
      ['02', 'PRODUCT', 'translate / prioritize'],
      ['03', 'SYSTEMS', 'configure / maintain'],
      ['04', 'AUTOMATION', 'reduce / document']
    ];
    nodes.forEach((node, index) => {
      const item = nodeContent[index];
      if (!item) return;
      node.innerHTML = `<span>${item[0]}</span><strong>${item[1]}</strong><small>${item[2]}</small>`;
    });

    const coreSmall = document.querySelector('.core small');
    if (coreSmall) coreSmall.textContent = 'SIMPLE / MEASURABLE / MAINTAINABLE';

    const systemFoot = document.querySelectorAll('.system-foot span');
    if (systemFoot[0]) systemFoot[0].textContent = 'MODE: USER + SYSTEM';
    if (systemFoot[1]) systemFoot[1].textContent = 'OUTPUT: VERIFIED';

    const profileLead = document.querySelector('.profile-copy .lead');
    if (profileLead) {
      profileLead.innerHTML = 'Resolver problemas de forma <em>simple y medible</em>, sin perder de vista a la persona que tiene que usar el sistema.';
    }

    const profileColumns = document.querySelectorAll('.profile-columns p');
    if (profileColumns[0]) {
      profileColumns[0].textContent = 'Mi recorrido técnico empezó en soporte y producto. Trabajé en Sabre Uruguay entre 2012 y 2015, luego como Product Owner en Tradehelm entre 2016 y 2018, y más recientemente en service desk / product support en Tata Consultancy Services y como IT Specialist en Apac.';
    }
    if (profileColumns[1]) {
      profileColumns[1].textContent = 'Ese recorrido me acostumbró a moverme entre usuario, infraestructura y producto: diagnosticar hardware y software, configurar entornos, documentar, priorizar y explicar decisiones a personas técnicas y no técnicas.';
    }

    const areasIntro = document.querySelector('#areas .section-heading > p');
    if (areasIntro) {
      areasIntro.textContent = 'Experiencia práctica en soporte, service desk, producto e infraestructura, con una forma de trabajo orientada a resolver el problema completo y dejarlo documentado.';
    }

    const projectsLink = Array.from(document.querySelectorAll('.site-nav a')).find((link) => link.getAttribute('href') === '#proyectos');
    if (projectsLink && !document.querySelector('.site-nav a[href="#experiencia"]')) {
      const experienceNav = document.createElement('a');
      experienceNav.href = '#experiencia';
      experienceNav.textContent = 'Experiencia';
      projectsLink.insertAdjacentElement('beforebegin', experienceNav);
    }

    if (!document.querySelector('#experiencia')) {
      const projectsSection = document.querySelector('#proyectos');
      if (projectsSection) {
        const experienceSection = document.createElement('section');
        experienceSection.id = 'experiencia';
        experienceSection.className = 'section-pad experience-section';
        experienceSection.innerHTML = `
          <div class="section-heading reveal">
            <div>
              <div class="section-index">03 / EXPERIENCIA</div>
              <h2>Soporte, producto<br>y operación real.</h2>
            </div>
            <p>Una selección del recorrido técnico profesional. Roles con contacto directo con usuarios, producto, infraestructura y resolución de incidentes.</p>
          </div>

          <div class="experience-layout">
            <div class="experience-timeline">
              <article class="experience-role reveal">
                <div class="experience-date">OCT 2024<br>AUG 2025</div>
                <div>
                  <div class="experience-company"><strong>Apac</strong><span>IT / SUPPORT</span></div>
                  <p class="experience-title">Agent / IT Specialist</p>
                  <p>Rol técnico enfocado en soporte, troubleshooting, configuración y mantenimiento de infraestructura, con acompañamiento directo a usuarios.</p>
                </div>
              </article>

              <article class="experience-role reveal">
                <div class="experience-date">MAY 2023<br>MAR 2024</div>
                <div>
                  <div class="experience-company"><strong>Tata Consultancy Services</strong><span>SERVICE DESK</span></div>
                  <p class="experience-title">Help Desk Agent / Product Specialist</p>
                  <p>Service desk y soporte de producto: diagnóstico de hardware y software, entornos Windows, herramientas Microsoft y Google, resolución y documentación de incidentes.</p>
                </div>
              </article>

              <article class="experience-role reveal">
                <div class="experience-date">2016<br>2018</div>
                <div>
                  <div class="experience-company"><strong>Tradehelm</strong><span>PRODUCT</span></div>
                  <p class="experience-title">Product Owner</p>
                  <p>Priorización, requisitos y coordinación entre necesidades de usuario, objetivos de producto y decisiones de desarrollo.</p>
                </div>
              </article>

              <article class="experience-role reveal">
                <div class="experience-date">2012<br>2015</div>
                <div>
                  <div class="experience-company"><strong>Sabre Uruguay</strong><span>SUPPORT / PRODUCT</span></div>
                  <p class="experience-title">Agent / Product Representative / Product Specialist</p>
                  <p>Evolución dentro de roles de soporte y producto, combinando atención a usuarios, resolución de problemas y conocimiento funcional del producto.</p>
                </div>
              </article>
            </div>

            <aside class="experience-side reveal" aria-label="Formación y forma de trabajo">
              <div class="credential-card">
                <div class="credential-label"><span>EDUCATION</span><span>UCU / UY</span></div>
                <strong>Ingeniero en Informática</strong>
                <p>Universidad Católica del Uruguay.</p>
                <span class="credential-year">TÍTULO · 2008</span>
              </div>

              <div class="credential-card">
                <div class="credential-label"><span>ADDITIONAL</span><span>TRAINING</span></div>
                <strong>Producto, Agile e IA</strong>
                <p>Formación complementaria aplicada al trabajo técnico y de producto.</p>
                <div class="training-list" aria-label="Formación complementaria">
                  <span>AGILE</span>
                  <span>SCRUM</span>
                  <span>PROFESSIONAL SCRUM MASTER</span>
                  <span>AGILE TESTING</span>
                  <span>FOUNDATIONS OF AI</span>
                  <span>PROJECT MANAGEMENT</span>
                </div>
              </div>

              <div class="principle-card">
                <div class="principle-label"><span>WORKING PRINCIPLE</span><span>GB / 01</span></div>
                <blockquote>Resolver de forma <em>simple</em>, verificar y dejar el sistema <em>entendible</em>.</blockquote>
              </div>
            </aside>
          </div>
        `;
        projectsSection.insertAdjacentElement('beforebegin', experienceSection);
      }
    }

    const projectIndex = document.querySelector('#proyectos .section-index');
    if (projectIndex) projectIndex.textContent = '04 / PROYECTOS TÉCNICOS';

    const stackIndex = document.querySelector('#stack .section-index');
    if (stackIndex) stackIndex.textContent = '05 / STACK & PRÁCTICAS';

    const stackIntro = document.querySelector('#stack .section-heading > p');
    if (stackIntro) {
      stackIntro.textContent = 'La selección está basada en herramientas y prácticas que aparecen en mi experiencia real: soporte, infraestructura, producto, automatización, documentación y análisis.';
    }

    const stackBoard = document.querySelector('.stack-board');
    if (stackBoard) {
      stackBoard.innerHTML = `
        <div class="stack-row"><span class="stack-key">SUPPORT</span><div>service desk <i>/</i> hardware & software <i>/</i> troubleshooting <i>/</i> user support</div></div>
        <div class="stack-row"><span class="stack-key">SYSTEMS</span><div>Windows <i>/</i> infrastructure maintenance <i>/</i> networking fundamentals <i>/</i> backups & migrations</div></div>
        <div class="stack-row"><span class="stack-key">PLATFORMS</span><div>Microsoft environments <i>/</i> Google environments <i>/</i> Git <i>/</i> GitHub</div></div>
        <div class="stack-row"><span class="stack-key">PRODUCT</span><div>product support <i>/</i> requirements <i>/</i> prioritization <i>/</i> Agile & Scrum</div></div>
        <div class="stack-row"><span class="stack-key">AUTOMATION</span><div>scripting <i>/</i> workflow automation <i>/</i> AI tools <i>/</i> APIs & integrations</div></div>
        <div class="stack-row"><span class="stack-key">DATA</span><div>analysis <i>/</i> BI <i>/</i> documentation <i>/</i> measurable outcomes</div></div>
      `;
    }

    const methodIndex = document.querySelector('.method .section-index');
    if (methodIndex) methodIndex.textContent = '06 / MÉTODO';

    const contactIndex = document.querySelector('#contacto .section-index');
    if (contactIndex) contactIndex.textContent = '07 / CONTACTO';

    const contactHeading = document.querySelector('#contacto h2');
    if (contactHeading) contactHeading.innerHTML = 'Soporte, sistemas<br>o producto técnico.';

    const contactParagraph = document.querySelector('#contacto .contact-copy > p');
    if (contactParagraph) {
      contactParagraph.textContent = 'Montevideo, Uruguay. Disponible para roles y proyectos donde haya que diagnosticar, ordenar, documentar y mejorar una operación técnica.';
    }
  };

  personalizePage();

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
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

  const revealItems = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08
  });

  revealItems.forEach((item) => observer.observe(item));
})();
