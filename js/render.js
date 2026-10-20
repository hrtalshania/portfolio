document.addEventListener('DOMContentLoaded', function() {
  renderNavbar();
  renderHero();
  renderServices();
  renderApproach();
  renderPhilosophy();
  renderProjects();
  renderMoreProjects();
  renderTechnologies();
  renderExperience();
  renderEducation();
  renderAbout();
  renderContact();
  renderFooter();
});

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

  let navHTML = `<div class="logo">${logo}</div><div><ul class="nav-links">`;
  links.forEach(link => {
    navHTML += `<li><a href="${link.href}">${link.label}</a></li>`;
  });
  navHTML += `</ul></div><div class="nav-right">${resumeLink}<button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">${themeIcon}</button></div>`;
  
  nav.innerHTML = navHTML;
  
  const hamburgerHTML = `
    <div class="logo">${logo}</div>
    <div class="hamburger-menu">
      <div class="hamburger-icon" onclick="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="menu-links">
        ${links.map(link => `<li><a href="${link.href}" onclick="toggleMenu()">${link.label}</a></li>`).join('')}
      </div>
    </div>
  `;
  
  hamburgerNav.innerHTML = hamburgerHTML;
}

function renderHero() {
  const heroContent = document.querySelector('#hero .hero-content');
  heroContent.innerHTML = `
    <h1 class="hero-title">${portfolioData.hero.title}</h1>
    <p class="hero-subtitle">${portfolioData.hero.subtitle}</p>
    <p class="hero-description">${portfolioData.hero.description}</p>
    <p class="hero-tagline">${portfolioData.hero.tagline}</p>
    <div class="hero-cta">
      <a href="#projects" class="btn btn-primary">${portfolioData.hero.ctaPrimary}</a>
      <a href="#contact" class="btn btn-secondary">${portfolioData.hero.ctaSecondary}</a>
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
    architecture: '<path d="M2 20h20"/><path d="M5 20V10l7-7 7 7v10"/><path d="M9 20v-6h6v6"/>'
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

function renderPhilosophy() {
  const container = document.getElementById('philosophy-content');
  const principles = portfolioData.philosophy.principles.map(p => `
    <li>${p}</li>
  `).join('');
  
  container.innerHTML = `
    <blockquote class="philosophy-quote">"${portfolioData.philosophy.content}"</blockquote>
    <ul class="philosophy-principles">
      ${principles}
    </ul>
  `;
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  const projects = portfolioData.projects.map(project => `
    <div class="project-card">
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
      </div>
      <div class="project-body">
        <div class="project-section">
          <h4>Problem</h4>
          <p>${project.problem}</p>
        </div>
        <div class="project-section">
          <h4>Solution</h4>
          <p>${project.solution}</p>
        </div>
        <div class="project-section">
          <h4>Key Features</h4>
          <ul>
            ${project.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        <div class="project-tech">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-links">
        <a href="${project.links.github}" class="project-link" target="_blank">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          ${project.links.githubLabel || 'Code'}
        </a>
        ${project.links.demo !== '#' ? `
        <a href="${project.links.demo}" class="project-link" target="_blank">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
          Demo
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
      <p class="more-project-description">${p.description}</p>
      ${p.github !== '#' ? `<a href="${p.github}" class="more-project-link" target="_blank">View on GitHub →</a>` : ''}
    </div>
  `).join('');

  container.innerHTML = items;
}

function renderTechnologies() {
  const container = document.getElementById('tech-grid');
  const tech = portfolioData.technologies;
  
  const categories = [
    { name: 'Backend', items: tech.backend },
    { name: 'Databases', items: tech.databases },
    { name: 'Frontend', items: tech.frontend },
    { name: 'Tools & Others', items: tech.tools }
  ];
  
  const grid = categories.map(cat => `
    <div class="tech-category">
      <h3 class="tech-category-title">${cat.name}</h3>
      <ul class="tech-list">
        ${cat.items.map(item => `<li>${item}</li>`).join('')}
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
      <ul class="experience-responsibilities">
        ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
      </ul>
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
      <p class="education-details">${edu.diploma.details}</p>
    </div>
  `;
}

function renderAbout() {
  const container = document.getElementById('about-content');
  const about = portfolioData.about;
  
  container.innerHTML = `
    <div class="about-text">
      ${about.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
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