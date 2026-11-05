document.addEventListener('DOMContentLoaded', function () {

  /* ── 빌드 확인 ─────────────────────────────────────── */
  // 로컬(file://)로 열었을 때만 브라우저 탭 제목에 빌드 번호를 붙인다.
  // 배포(https)에서는 제목이 그대로 유지된다.
  var BUILD = document.querySelector('.build')?.textContent.trim() || '';
  console.log('%c' + BUILD, 'font-size:16px;font-weight:700;color:#c0392b');
  var buildEl = document.querySelector('.build');
  if (location.protocol === 'file:') {
    if (BUILD) document.title = '[' + BUILD + '] ' + document.title;   // 로컬에서만 버전 확인
  } else if (buildEl) {
    buildEl.remove();                                                   // 배포본에는 노출하지 않는다
  }

  /* ── How I Work 아코디언 ───────────────────────────── */
  window.toggleHiw = function (item) {
    var items = [...document.querySelectorAll('.hiw-item')];
    var photos = [...document.querySelectorAll('.hiw-photo')];
    var idx = items.indexOf(item);
    var wasOpen = item.classList.contains('open');

    items.forEach(function (el) { el.classList.remove('open'); });
    if (!wasOpen) item.classList.add('open');

    // 우측 사진: 열린 항목의 사진, 모두 닫혔으면 첫 번째 사진을 기본으로
    photos.forEach(function (ph) { ph.classList.remove('active'); });
    var target = document.getElementById('hphoto-' + (wasOpen ? 0 : idx));
    if (target) target.classList.add('active');
  };

  /* ── Modal ─────────────────────────────────────────── */
  const overlay = document.getElementById('modal-overlay');
  // closeModal이 예약한 "display:none" 타이머가 살아 있으면,
  // 380ms 안에 새로 연 모달까지 같이 숨겨버린다. 항상 취소한 뒤 연다.
  let hideTimer = null;

  window.openModal = function (id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    clearTimeout(hideTimer);
    hideTimer = null;

    document.querySelectorAll('.modal').forEach(m => {
      if (m === modal) return;
      m.style.display = 'none';
      m.style.transform = 'translateX(100%)';
      m.querySelectorAll('video').forEach(v => v.pause());
    });

    overlay.style.display = 'block';
    modal.style.display = 'block';
    modal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { modal.style.transform = 'translateX(0)'; });
    });
  };

  window.closeModal = function () {
    clearTimeout(hideTimer);
    const open = [...document.querySelectorAll('.modal')].filter(m => m.style.display === 'block');
    open.forEach(m => {
      m.style.transform = 'translateX(100%)';
      m.querySelectorAll('video').forEach(v => v.pause());
    });
    hideTimer = setTimeout(() => {
      open.forEach(m => { m.style.display = 'none'; });
      hideTimer = null;
    }, 380);
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── Awards accordion ──────────────────────────────── */
  document.querySelectorAll('.award-card').forEach(card => {
    const body = card.querySelector('.award-detail');
    if (!body) return;
    card.addEventListener('click', () => {
      const open = card.classList.toggle('open');
      card.setAttribute('aria-expanded', open);
    });
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

  /* ── 이메일 링크 조립 ──────────────────────────────── */
  // 주소를 HTML에 그대로 두지 않아 수집 봇이 긁어가기 어렵게 한다
  const mailLink = document.getElementById('mailLink');
  const mailAddr = mailLink ? mailLink.dataset.user + '@' + mailLink.dataset.domain : 'dltmd004@yonsei.ac.kr';
  if (mailLink) mailLink.setAttribute('href', 'mailto:' + mailAddr);

  /* ── 이메일 공개 버튼 (히어로 · 푸터) ───────────────── */
  // 주소를 HTML에 그대로 두지 않고, 클릭했을 때만 조립해 노출한다.
  function bindMail(btn) {
    if (!btn) return;
    btn.addEventListener('click', function () {
      var addr = btn.dataset.u + '@' + btn.dataset.d;
      var shown = addr.replace('@', ' [at] ').replace(/\./g, ' [dot] ');

      var box = document.createElement('span');
      box.className = 'mail-reveal';
      box.innerHTML = '<span>' + shown + '</span>';

      var copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'mail-copy';
      copy.setAttribute('aria-label', '이메일 주소 복사');
      copy.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
      copy.addEventListener('click', function (e) {
        e.stopPropagation();
        navigator.clipboard?.writeText(addr);
        copy.classList.add('done');
        copy.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></svg>';
        setTimeout(function () { box.replaceWith(btn); }, 1600);
      });
      box.appendChild(copy);
      btn.replaceWith(box);
    });
  }
  bindMail(document.getElementById('mailBtn'));
  bindMail(document.getElementById('footMail'));

});
