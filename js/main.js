// ── PDVN Meetup — Main JS ──

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Animations ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // ── Nav background on scroll ──
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
      }
    }, { passive: true });
  }

  // ── Scroll Position Memory ──
  // Save scroll position when clicking internal links that navigate away
  const isIndexPage = window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/');

  if (isIndexPage) {
    // On index page: restore saved scroll position
    const savedScroll = sessionStorage.getItem('pdvn_scroll_y');
    if (savedScroll !== null) {
      // Temporarily disable smooth scroll for instant restore
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, parseInt(savedScroll, 10));
      sessionStorage.removeItem('pdvn_scroll_y');
      // Re-enable smooth scroll after position is restored
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = '';
        });
      });
    }

    // Save scroll position when clicking links to subpages
    document.querySelectorAll('a[href^="pages/"]').forEach(link => {
      link.addEventListener('click', () => {
        sessionStorage.setItem('pdvn_scroll_y', window.scrollY.toString());
      });
    });
  }

  // On subpages: save scroll position when clicking "back" links
  document.querySelectorAll('[data-nav-back]').forEach(link => {
    link.addEventListener('click', (e) => {
      // The scroll position of index page was already saved when user navigated here
      // We just need to make sure it's preserved
    });
  });
});
