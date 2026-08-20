const projectData = {
  flood: {
    kicker: 'RISK MODELING · 2025',
    title: 'Flood Risk Modeling',
    lead: '기후변화로 인해 기존의 정적인 위험 평가가 놓칠 수 있는 지역을 다시 평가하고, 분석 결과를 실제 보험요율과 보상 구조로 연결한 프로젝트입니다.',
    image: 'assets/images/flood-risk-pipeline.png',
    role: [
      'ArcGIS를 활용해 Landsat 위성 및 공간 데이터를 전처리하고 지역별 홍수 관련 지표를 시각화했습니다.',
      'Python을 활용해 분석 변수의 중요도와 가중치를 산출했습니다.',
      '전처리 데이터와 가중치 분석 결과를 통합하여 서울시 자치구별 최종 홍수 위험 점수를 산출했습니다.'
    ],
    approach: '공공데이터와 위성데이터를 이용해 FVI(Flood Vulnerability Index)와 FDI(Flood Defense Infrastructure Index)를 구성하고, 평상시와 극한 강우 상황의 위험 변화를 비교했습니다. 위험 변화 특성에 따라 지역을 Stable, Latent-Risk, Chronic-Risk, Misclassified의 네 유형으로 분류했습니다.',
    metrics: [['4','Risk Types'],['1.00–1.96','Risk Coefficient'],['25','Seoul Districts']],
    outcome: '특히 정적인 평가에서는 드러나기 어려운 Latent-Risk 지역을 식별하고, 지역별 위험계수를 보험료 산정 구조에 연결했습니다. 또한 각 위험 유형에 맞는 보상 방식을 설계하여 분석 → 분류 → 보험 설계까지 하나의 흐름으로 확장했습니다.',
    link: 'https://github.com/seunghyeon-lee-0/flood-risk-insurance-model'
  },
  shuttle: {
    kicker: 'LOCATION OPTIMIZATION · 2024',
    title: 'Shuttle Bus Location Optimization',
    lead: '지역 축제 기간에 집중되는 차량과 방문객으로 발생하는 교통 혼잡을 줄이기 위해 정류장 위치와 운행 노선을 데이터 기반으로 설계했습니다.',
    image: 'assets/images/shuttle-pipeline.png',
    role: [
      '입지 분석에 필요한 데이터를 수집하고 분석 가능한 형태로 전처리했습니다.',
      'Python을 활용해 입지 평가 변수의 중요도와 가중치를 산출했습니다.',
      'MCLP와 P-Median을 활용한 최적 입지 분석을 수행했습니다.',
      '정책 활용 가능성, 운영상 시사점, 분석의 한계와 향후 과제를 정리했습니다.'
    ],
    approach: 'AHP 기반 수요 가중치를 바탕으로 MCLP와 P-Median을 함께 적용했습니다. 두 모델의 결과를 통합한 후보군에 Greedy Algorithm을 적용해 공간적 중복을 제거하고, 최종 정류장을 선정했습니다. 이후 K-Means와 Hierarchical Clustering을 비교해 운행 권역과 노선을 구성했습니다.',
    metrics: [['43','Candidate Stops'],['22','Final Stops'],['2','Service Zones']],
    outcome: '입지 분석 결과를 단순한 위치 추천으로 끝내지 않고 실제 셔틀 운영 권역과 노선 설계까지 연결했습니다. 제한된 자원 안에서 수요 커버리지와 이용자 접근성을 동시에 고려하는 운영안을 제안했습니다.',
    link: 'https://github.com/seunghyeon-lee-0/shuttle-stop-location-analysis'
  },
  health: {
    kicker: 'HEALTHCARE BI · 2023',
    title: 'Healthcare Data Visualization',
    lead: '국민건강보험공단의 건강검진, 진료, 의약품 데이터를 정리하고 사용자가 건강 상태를 직관적으로 탐색할 수 있는 Power BI 대시보드를 제작했습니다.',
    image: '',
    role: [
      '연도별 진료내역 및 의약품 처방 데이터 약 30만 건을 수집하고 분석 데이터셋을 구축했습니다.',
      'Python을 활용해 변수 범주화, 결측치·이상치 처리, 의료 코드 변환 등 데이터 전처리를 수행했습니다.',
      'Power BI를 활용해 연령, 성별, 거주지역, 측정연도별 주요 질병 및 의약품 처방 분포를 시각화했습니다.',
      '분석 결과를 기반으로 Easy Care 서비스 아이디어를 기획하고 시장성, 경쟁 서비스, 차별화 요소를 검토했습니다.'
    ],
    approach: '2011–2017년 건강검진·진료·의약품 처방 데이터를 정리하고, 복잡한 코드와 수치를 사용자가 이해할 수 있는 범주와 언어로 변환했습니다. 건강검진 수치를 정상·경계·의심 상태로 범주화하고, Power BI의 슬라이서·KPI 카드·분해트리 등을 활용해 탐색형 대시보드를 구성했습니다.',
    metrics: [['300K+','Records'],['2011–17','Data Period'],['1','BI Dashboard']],
    outcome: '의료 데이터를 단순히 시각화하는 데서 그치지 않고 해석 가능한 상태와 언어로 변환했습니다. 대시보드 결과를 개인 건강관리 서비스 Easy Care의 기획으로 이어가 데이터 분석 → 시각화 → 서비스 아이디어의 흐름을 만들었습니다.',
    video: true,
    link: ''
  }
};

const drawer = document.querySelector('#project-drawer');
const backdrop = document.querySelector('#drawer-backdrop');
const drawerBody = document.querySelector('#drawer-body');
const closeButton = document.querySelector('.drawer-close');

function renderDrawer(key) {
  const p = projectData[key];
  if (!p) return;
  const hero = p.image ? `<div class="drawer-hero"><img src="${p.image}" alt="${p.title} visual"></div>` : '';
  const roleItems = p.role.map(item => `<li>${item}</li>`).join('');
  const metrics = p.metrics.map(([v,l]) => `<div class="drawer-metric"><strong>${v}</strong><span>${l}</span></div>`).join('');
  const video = p.video ? `<div class="drawer-section"><h3>Dashboard Demo</h3><p>현재는 교체용 placeholder 영상입니다. 같은 파일명으로 실제 Power BI 녹화 영상을 덮어쓰면 바로 반영됩니다.</p><video class="video-player" controls preload="metadata"><source src="assets/video/healthcare-dashboard-demo.mp4" type="video/mp4">Your browser does not support video.</video></div>` : '';
  const link = p.link ? `<a class="drawer-link" href="${p.link}" target="_blank" rel="noreferrer">View GitHub ↗</a>` : '';

  drawerBody.innerHTML = `
    <p class="drawer-kicker">${p.kicker}</p>
    <h2>${p.title}</h2>
    <p class="drawer-lead">${p.lead}</p>
    ${hero}
    <section class="drawer-section"><h3>My Role</h3><ul>${roleItems}</ul></section>
    <section class="drawer-section"><h3>Approach</h3><p>${p.approach}</p></section>
    <section class="drawer-section"><h3>Key Results</h3><div class="drawer-metrics">${metrics}</div></section>
    <section class="drawer-section"><h3>Application / Insight</h3><p>${p.outcome}</p>${link}</section>
    ${video}
  `;
  drawer.classList.add('open');
  backdrop.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('drawer-open');
  closeButton.focus();
}

function closeDrawer() {
  drawer.classList.remove('open');
  backdrop.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => renderDrawer(card.dataset.project));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      renderDrawer(card.dataset.project);
    }
  });
});
closeButton.addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sectionIds = ['about','skills','research','projects','education','awards','conferences','contact'];
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sectionIds.forEach(id => { const section = document.getElementById(id); if (section) sectionObserver.observe(section); });

document.getElementById('year').textContent = new Date().getFullYear();
