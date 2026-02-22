document.addEventListener('DOMContentLoaded', () => {
  // Hamburger
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // Active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Counter animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const step = Math.max(1, Math.ceil(end / 60));
      const timer = setInterval(() => {
        start = Math.min(start + step, end);
        el.textContent = start + suffix;
        if (start >= end) clearInterval(timer);
      }, 20);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
});
