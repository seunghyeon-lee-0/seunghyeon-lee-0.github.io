document.addEventListener('DOMContentLoaded', function () {

  /* ── Tabs (Working Papers / Selected Projects) ─────── */
  const tabs = [...document.querySelectorAll('.tab')];
  const panels = [...document.querySelectorAll('.tab-panel')];

  window.showTab = function (name, scroll) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    panels.forEach(p => { p.hidden = (p.id !== 'tab-' + name); });
    // 탭 전환 시 새로 노출된 카드의 등장 애니메이션을 즉시 완료 상태로
    document.querySelectorAll('.tab-panel:not([hidden]) .fade')
      .forEach(el => el.classList.add('visible'));
    if (scroll !== false) {
      const sec = document.getElementById('projects');
      if (sec) window.scrollTo({ top: sec.offsetTop - 8, behavior: 'smooth' });
    }
  };

  /* ── Modal ─────────────────────────────────────────── */
  const overlay = document.getElementById('modal-overlay');

  window.openModal = function (id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    overlay.style.display = 'block';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { modal.style.transform = 'translateX(0)'; });
    });
  };

  window.closeModal = function () {
    document.querySelectorAll('.modal').forEach(m => {
      m.style.transform = 'translateX(100%)';
      setTimeout(() => { m.style.display = 'none'; }, 380);
      m.querySelectorAll('video').forEach(v => v.pause());
    });
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── Scroll reveal ─────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const reveal = (selector, threshold) => {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll(selector).forEach(el => io.observe(el));
    };
    reveal('section', 0.05);
    reveal('.fade', 0.08);
    document.getElementById('home').classList.add('visible');
  } else {
    document.querySelectorAll('section, .fade').forEach(el => el.classList.add('visible'));
  }

  /* ── Scroll spy ────────────────────────────────────── */
  const nav = document.querySelector('nav');
  const navLinks = [...nav.querySelectorAll('a')];
  const targets = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (targets.length) {
    const setActive = () => {
      // 뷰포트 상단 1/3 지점을 기준선으로 현재 섹션을 판정
      const line = window.scrollY + window.innerHeight / 3;
      let current = targets[0];
      targets.forEach(t => { if (t.offsetTop <= line) current = t; });

      const href = '#' + current.id;
      let changed = false;
      navLinks.forEach(a => {
        const on = a.getAttribute('href') === href;
        if (on !== a.classList.contains('active')) changed = true;
        a.classList.toggle('active', on);
      });
      // 모바일에서 nav가 가로 스크롤될 때 활성 링크를 화면 안으로
      if (changed && nav.scrollWidth > nav.clientWidth) {
        const a = navLinks.find(x => x.classList.contains('active'));
        if (a) nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' });
      }
    };
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setActive(); ticking = false; });
    }, { passive: true });
    setActive();
  }

  /* ── Contact form → mailto ─────────────────────────── */
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const msg = document.getElementById('cf-msg').value.trim();
    const subject = encodeURIComponent(`[Portfolio] ${name || 'Contact'}`);
    const body = encodeURIComponent(`${msg}\n\n---\n${name}\n${email}`);
    window.location.href = `mailto:dltmd004@yonsei.ac.kr?subject=${subject}&body=${body}`;
  });

});
