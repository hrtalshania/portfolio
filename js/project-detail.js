// ============================================================
// Project detail page — projects/index.html?id=<slug>
// Reads the slug from the URL and renders the full case study
// from portfolioData (js/data.js). No build step needed.
// ============================================================

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Sync the theme icon with the saved theme (same nav ids as index.html).
    updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'dark');

    const container = document.getElementById('project-detail');
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('id');

    const all = portfolioData.projects.concat(portfolioData.moreProjects);
    const project = all.find(p => p.slug === slug);

    if (!project) {
      document.title = 'Project not found | Harshit Talshania';
      container.innerHTML = `
        <div class="detail-missing">
          <h1>Project not found</h1>
          <p>There is no project with that id. It may have been renamed.</p>
          <a href="../index.html#projects" class="project-link">See all projects</a>
        </div>
      `;
      return;
    }

    const links = project.links || {};
    const techList = project.techList || project.tech || [];

    document.title = `${project.title} | Harshit Talshania`;

    container.innerHTML = `
      <header class="detail-header">
        <div class="project-index">Case study</div>
        <h1 class="detail-title">${project.title}</h1>
        <p class="detail-summary">${project.summary}</p>
      </header>

      ${links.live ? `
      <div class="detail-live-box">
        <a href="${links.live}" class="project-link detail-live-link" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
          Live site
        </a>
        ${links.liveNote ? `<p class="detail-live-note">${links.liveNote}</p>` : ''}
        ${links.hosting && links.hosting.length ? `
          <div class="detail-hosting">
            ${links.hosting.map(h => `
              <div class="detail-hosting-row">
                <span class="detail-hosting-name">${h.name}</span>
                <span class="detail-hosting-value">${h.detail}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
      ` : ''}

      <section class="detail-section">
        <h4>The problem</h4>
        <p>${project.problem}</p>
      </section>

      <section class="detail-section">
        <h4>The solution</h4>
        <p>${project.solution}</p>
      </section>

      ${project.features && project.features.length ? `
      <section class="detail-section">
        <h4>What it does</h4>
        <ul class="detail-list">
          ${project.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </section>
      ` : ''}

      ${techList.length ? `
      <section class="detail-section">
        <h4>Built with</h4>
        <div class="project-tech">
          ${techList.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </section>
      ` : ''}

      ${project.gallery && project.gallery.length ? `
      <section class="detail-section">
        <h4>Screenshots</h4>
        <div class="gallery-grid">
          ${buildGalleryMarkup(project)}
        </div>
      </section>
      ` : ''}

      ${project.learnings ? `
      <section class="detail-section">
        <h4>What I learned</h4>
        <p>${project.learnings}</p>
      </section>
      ` : ''}

      <section class="detail-section detail-code-section">
        <h4>Source code</h4>
        ${links.github && links.github !== '#' ? `
          <a href="${links.github}" class="project-link" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            View on GitHub
          </a>
        ` : `
          <p>Most of my project repos stay private for security reasons, so I share the code selectively.
          If you want to see how something here was built, <a href="../index.html#contact" class="detail-contact-link">reach out</a>
          and I will walk you through it or give you access for a review.</p>
        `}
      </section>
    `;

    if (project.gallery && project.gallery.length) {
      initGallery(container, project);
    }
  });

  // ---- Image gallery ----
  // Layout: 2 large tiles, then ONE small tile showing the next image with a
  // "+N more" overlay (N = remaining count). The lightbox browses ALL images
  // from project.gallery, not just the ones rendered in the grid.
  function galleryImg(project, file, index) {
    return `<img src="../assets/projects/${project.slug}/${file}" alt="${project.title} screenshot ${index + 1}" loading="lazy" />`;
  }

  function buildGalleryMarkup(project) {
    const g = project.gallery;
    const bigCount = Math.min(2, g.length);
    let html = '';
    for (let i = 0; i < bigCount; i++) {
      html += `<figure class="gallery-item gallery-big" data-index="${i}">${galleryImg(project, g[i], i)}</figure>`;
    }
    if (g.length > bigCount) {
      const next = bigCount;
      const extra = g.length - bigCount;
      html += `
        <figure class="gallery-item gallery-small gallery-more" data-index="${next}">
          ${galleryImg(project, g[next], next)}
          <span class="gallery-overlay">+${extra} more</span>
        </figure>`;
    }
    return html;
  }

  // ---- Lightbox ----
  function initGallery(container, project) {
    const items = project.gallery.map(file =>
      `../assets/projects/${project.slug}/${file}`
    );
    if (!items.length) return;

    // Overlay (created once, appended to body)
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close">×</button>
      <button class="lightbox-prev" aria-label="Previous image">‹</button>
      <img class="lightbox-img" src="" alt="" />
      <button class="lightbox-next" aria-label="Next image">›</button>
      <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(overlay);
    const overlayImg = overlay.querySelector('.lightbox-img');
    const counter = overlay.querySelector('.lightbox-counter');
    let current = 0;

    function show(index) {
      current = (index + items.length) % items.length;
      overlayImg.src = items[current];
      overlayImg.alt = `${project.title} screenshot ${current + 1}`;
      counter.textContent = (current + 1) + ' / ' + items.length;
    }

    function open(index) {
      show(index);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    container.querySelectorAll('.gallery-item').forEach(tile => {
      tile.addEventListener('click', () => open(Number(tile.dataset.index)));
    });
    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
    overlay.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
