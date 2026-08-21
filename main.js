document.addEventListener('DOMContentLoaded', function () {

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
  // 드롭다운 안의 링크는 스파이 대상에서 제외 (부모 Projects 링크가 대신 담당)
  const navLinks = [...nav.querySelectorAll('a')].filter(a => !a.closest('.nav-sub'));

  // 링크 하나가 여러 섹션을 담당할 수 있다: data-spy="research projects"
  const entries = navLinks.map(a => ({
    link: a,
    ids: (a.dataset.spy || a.getAttribute('href').slice(1)).split(/\s+/)
  }));
  const sections = [...new Set(entries.flatMap(e => e.ids))]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (sections.length) {
    const setActive = () => {
      // 뷰포트 상단 1/3 지점을 기준선으로 현재 섹션을 판정
      const line = window.scrollY + window.innerHeight / 3;
      let current = sections[0];
      sections.forEach(s => { if (s.offsetTop <= line) current = s; });

      let changed = false;
      entries.forEach(({ link, ids }) => {
        const on = ids.includes(current.id);
        if (on !== link.classList.contains('active')) changed = true;
        link.classList.toggle('active', on);
      });

      // 모바일에서 nav가 가로 스크롤될 때 활성 링크를 화면 안으로
      if (changed && nav.scrollWidth > nav.clientWidth) {
        const a = navLinks.find(x => x.classList.contains('active') && x.offsetParent);
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
