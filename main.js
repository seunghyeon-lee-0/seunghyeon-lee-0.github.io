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

  /* ── Carousel ──────────────────────────────────────── */
  window.scrollCarousel = function (id, dir) {
    const c = document.getElementById(id);
    const card = c && c.querySelector('.pcard');
    if (!card) return;
    c.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' });
  };

  document.querySelectorAll('.project-carousel').forEach(c => {
    let dragging = false, startX = 0, startScroll = 0, moved = 0;
    c.addEventListener('mousedown', e => {
      dragging = true; moved = 0;
      startX = e.pageX - c.offsetLeft;
      startScroll = c.scrollLeft;
      c.classList.add('is-dragging');
    });
    c.addEventListener('mousemove', e => {
      if (!dragging) return;
      e.preventDefault();
      const delta = (e.pageX - c.offsetLeft) - startX;
      moved = Math.abs(delta);
      c.scrollLeft = startScroll - delta * 1.2;
    });
    const stop = () => { dragging = false; c.classList.remove('is-dragging'); };
    document.addEventListener('mouseup', stop);
    c.addEventListener('mouseleave', stop);
    // 드래그 직후 발생하는 click이 모달을 열지 않도록 차단
    c.addEventListener('click', e => { if (moved > 8) { e.stopPropagation(); e.preventDefault(); } }, true);
  });

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
    reveal('section', 0.07);
    reveal('.fade', 0.08);
    document.getElementById('home').classList.add('visible');
  } else {
    document.querySelectorAll('section, .fade').forEach(el => el.classList.add('visible'));
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
