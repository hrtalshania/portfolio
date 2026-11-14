document.addEventListener('DOMContentLoaded', function() {
  renderNavbar();
  renderHero();
  renderServices();
  renderApproach();
  renderProjects();
  renderMoreProjects();
  renderTechnologies();
  renderExperience();
  renderEducation();
  renderAbout();
  renderContact();
  renderFooter();
  initHashScroll();
});

// Anchor navigation from other pages (e.g. projects/index.html#contact)
// jumps BEFORE this script renders the sections, when the page is still
// short — so the browser lands near the hero and the rendered content
// pushes the target away. Re-scroll to the hash target after rendering,
// and once more on window.load (fonts/images/GSAP can still shift layout).
function initHashScroll() {
  function scrollToHash() {
    if (!window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }
  scrollToHash();
  window.addEventListener('load', scrollToHash, { once: true });
}

function renderNavbar() {
  const nav = document.getElementById('desktop-nav');
  const hamburgerNav = document.getElementById('hamburger-nav');
  
  const logo = portfolioData.nav.logo;
  const links = portfolioData.nav.links;
  
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const themeIcon = currentTheme === 'light' 
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  
  const resumeLink = `
    <a href="${portfolioData.nav.resume}" class="btn btn-resume" target="_blank" rel="noopener">Resume</a>
  `;

  const accentBtnHTML = `
    <button class="accent-toggle" onclick="toggleAccent()" aria-label="Switch color palette" title="Color mode (click to change)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3l7 5.2v7.6L12 21l-7-5.2V8.2L12 3z"/>
      </svg>
    </button>
  `;

  const logoHTML = `<a href="#hero" class="logo">${logo}</a>`;

  let navHTML = `<div>${logoHTML}</div><div><ul class="nav-links">`;
  links.forEach(link => {
    navHTML += `<li><a href="${link.href}">${link.label}</a></li>`;
  });
  navHTML += `</ul></div><div class="nav-right">${resumeLink}${accentBtnHTML}<button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">${themeIcon}</button></div>`;
  
  nav.innerHTML = navHTML;
  
  const hamburgerHTML = `
    ${logoHTML}
    <div class="hamburger-right">
      <div class="hamburger-menu">
        <div class="hamburger-icon" onclick="toggleMenu()" role="button" tabindex="0" aria-expanded="false" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="menu-links">
          ${links.map(link => `<li><a href="${link.href}" onclick="toggleMenu()">${link.label}</a></li>`).join('')}
          <li class="menu-controls">
            <button class="theme-toggle menu-control" onclick="toggleTheme()" aria-label="Toggle theme">
              ${themeIcon}<span>Theme</span>
            </button>
            <button class="accent-toggle menu-control" onclick="toggleAccent()" aria-label="Switch color palette" title="Color mode (click to change)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3l7 5.2v7.6L12 21l-7-5.2V8.2L12 3z"/>
              </svg><span>Colour</span>
            </button>
          </li>
          <li class="menu-resume"><a href="${portfolioData.nav.resume}" target="_blank" rel="noopener" onclick="toggleMenu()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>Resume</a></li>
        </div>
      </div>
    </div>
  `;
  
  hamburgerNav.innerHTML = hamburgerHTML;
}

function renderHero() {
  const heroContent = document.querySelector('#hero .hero-content');
  const photoSrc = portfolioData.hero.image; // TODO: drop your real photo (e.g. assets/profile.jpg) here later

  const photoBlock = photoSrc
    ? `<div class="hero-photo"><img src="${photoSrc}" alt="Harshit Talshania" /></div>`
    : `<div class="hero-photo"><div class="photo-placeholder">
         <span class="photo-monogram">${portfolioData.hero.monogram || "HT"}</span>
         <small>Photo coming soon</small>
       </div></div>`;

  heroContent.innerHTML = `
    <div class="hero-text">
      <p class="hero-greeting">Hi, I'm ${portfolioData.hero.name || "Harshit Talshania"}</p>
      <h1 class="hero-title">${portfolioData.hero.title}</h1>
      <p class="hero-subtitle">${portfolioData.hero.subtitle}</p>
      <p class="hero-description">${portfolioData.hero.description}</p>
      <p class="hero-tagline">${portfolioData.hero.taglineUrl
        ? `<a href="${portfolioData.hero.taglineUrl}" target="_blank" rel="noopener" class="hero-tagline-link">${portfolioData.hero.tagline}</a>`
        : portfolioData.hero.tagline}</p>
      <div class="hero-cta">
        <a href="#projects" class="btn btn-primary">${portfolioData.hero.ctaPrimary}</a>
        <a href="#contact" class="btn btn-secondary">${portfolioData.hero.ctaSecondary}</a>
      </div>
    </div>
    <div class="hero-photo-wrap">
      ${photoBlock}
    </div>
  `;
}

function renderServices() {
  const container = document.getElementById('services-grid');
  const services = portfolioData.services.map((service, index) => `
    <div class="service-card" data-index="${index}">
      <div class="service-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${getIcon(service.icon)}
        </svg>
      </div>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-description">${service.description}</p>
    </div>
  `).join('');
  
  container.innerHTML = services;
}

function getIcon(type) {
  const icons = {
    code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    api: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/>',
    architecture: '<path d="M2 20h20"/><path d="M5 20V10l7-7 7 7v10"/><path d="M9 20v-6h6v6"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>',
    robot: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>',
    test: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'
  };
  return icons[type] || icons.code;
}

function renderApproach() {
  const container = document.getElementById('approach-content');
  const steps = portfolioData.approach.steps.map((step, index) => `
    <div class="approach-step">
      <div class="step-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="step-content">
        <h3 class="step-title">${step.title}</h3>
        <p class="step-description">${step.description}</p>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = steps;
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  const projects = portfolioData.projects.map((project, index) => `
    <div class="project-card">
      <div class="project-header">
        <div class="project-index">${String(index + 1).padStart(2, '0')} · Case study</div>
        <h3 class="project-title">${project.title}</h3>
      </div>
      <div class="project-body">
        <p class="project-summary">${project.summary}</p>
        <div class="project-tech">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-links">
        <a href="projects/index.html?id=${project.slug}" class="project-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          Read case study
        </a>
        ${project.links.live ? `
        <a href="${project.links.live}" class="project-link" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
          Live site
        </a>
        ` : ''}
      </div>
    </div>
  `).join('');

  container.innerHTML = projects;
}

function renderMoreProjects() {
  const container = document.getElementById('more-projects-grid');
  if (!container) return;
  const items = portfolioData.moreProjects.map(p => `
    <div class="more-project-card">
      <div class="more-project-header">
        <h3 class="more-project-title">${p.title}</h3>
        <span class="more-project-tech">${p.tech}</span>
      </div>
      <p class="more-project-description">${p.summary}</p>
      <a href="projects/index.html?id=${p.slug}" class="more-project-link">
        Read more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  `).join('');

  container.innerHTML = items;
}

function renderTechnologies() {
  const container = document.getElementById('tech-grid');
  const note = document.getElementById('tech-note');
  if (note && portfolioData.technologiesNote) {
    note.textContent = portfolioData.technologiesNote;
  }
  const tech = portfolioData.technologies;

  // Categories come straight from data.js keys (order preserved).
  const grid = Object.entries(tech).map(([name, items]) => `
    <div class="tech-category">
      <h3 class="tech-category-title">${name}</h3>
      <ul class="tech-list">
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  container.innerHTML = grid;
}

function renderExperience() {
  const container = document.getElementById('experience-list');
  const exp = portfolioData.experience.map(job => `
    <div class="experience-card">
      <div class="experience-header">
        <h3 class="experience-role">${job.role}</h3>
        <span class="experience-period">${job.period}</span>
      </div>
      <p class="experience-company">${job.company}</p>
      ${job.location ? `<p class="experience-location">${job.location}</p>` : ''}
      ${job.responsibilities && job.responsibilities.length ? `
      <ul class="experience-responsibilities">
        ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
      </ul>
      ` : ''}
      ${job.clientProjects && job.clientProjects.length ? `
      <div class="experience-clients">
        <h4>Client work</h4>
        ${job.clientProjects.map(p => `
          <div class="experience-client">
            <h5>${p.name}</h5>
            <p>${p.description}</p>
            <span class="experience-client-tech">${p.tech}</span>
          </div>
        `).join('')}
      </div>
      ` : ''}
      ${job.note ? `<p class="experience-note">${job.note}</p>` : ''}
    </div>
  `).join('');
  
  container.innerHTML = exp;
}

function renderEducation() {
  const container = document.getElementById('education-list');
  const edu = portfolioData.education;
  
  container.innerHTML = `
    <div class="education-card">
      <h3 class="education-title">${edu.degree.title}</h3>
      <p class="education-field">${edu.degree.field}</p>
      <p class="education-details">${edu.degree.details}</p>
    </div>
    <div class="education-card">
      <h3 class="education-title">${edu.diploma.title}</h3>
      <p class="education-field">${edu.diploma.field}</p>
      <p class="education-details">${edu.diploma.details}</p>
    </div>
  `;
}

function renderAbout() {
  const container = document.getElementById('about-content');
  const about = portfolioData.about;
  const principles = (about.principles || []).map(p => `<li>${p}</li>`).join('');
  
  container.innerHTML = `
    <div class="about-text">
      ${about.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      ${principles ? `
      <div class="about-principles">
        <h3>How I think</h3>
        <ul>
          ${principles}
        </ul>
      </div>
      ` : ''}
    </div>
    <div class="about-interests">
      <h3>Focus Areas</h3>
      <div class="interest-tags">
        ${about.interests.map(i => `<span class="interest-tag">${i}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderContact() {
  const container = document.querySelector('#contact .contact-content');
  const contact = portfolioData.contact;
  
  const socials = contact.socials.map(s => `
    <a href="${s.url}" class="contact-social" target="_blank">
      <span>${s.platform}</span>
    </a>
  `).join('');
  
  container.innerHTML = `
    <div class="contact-info">
      <a href="mailto:${contact.email}" class="contact-email">${contact.email}</a>
      <div class="contact-socials">
        ${socials}
      </div>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector('footer');
  footer.innerHTML = `
    <div class="footer-content">
      <p class="footer-copyright">${portfolioData.footer.copyright}</p>
      <p class="footer-tagline">${portfolioData.footer.tagline}</p>
    </div>
  `;
}