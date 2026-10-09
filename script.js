(function () {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');

  function closeMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // If the client has not added a photo yet, hide the broken image and keep its designed fallback.
  document.querySelectorAll('img').forEach(function (image) {
    image.addEventListener('error', function () {
      image.classList.add('image-missing');
      const brand = image.closest('.brand');
      if (brand && image.classList.contains('brand-image')) brand.classList.remove('has-logo');
    });
    image.addEventListener('load', function () {
      if (image.classList.contains('brand-image')) {
        const brand = image.closest('.brand');
        if (brand) brand.classList.add('has-logo');
      }
    });
    if (image.complete && image.naturalWidth > 0 && image.classList.contains('brand-image')) {
      const brand = image.closest('.brand');
      if (brand) brand.classList.add('has-logo');
    }
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          if (active) link.classList.add('active');
          else link.classList.remove('active');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  // Keep the sticky header available for fragment navigation on all screen sizes.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      if (event.defaultPrevented) return;
      target.style.scrollMarginTop = (header ? header.offsetHeight + 12 : 92) + 'px';
    });
  });
})();
