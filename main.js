const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click',()=>nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-carousel]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const track=document.getElementById(btn.dataset.carousel);
    const card=track?.querySelector(':scope > *');
    if(!track||!card)return;
    const gap=parseFloat(getComputedStyle(track).gap)||18;
    track.scrollBy({left:(card.getBoundingClientRect().width+gap)*Number(btn.dataset.dir),behavior:'smooth'});
  });
});

const projects = {
  flood: {
    kicker:'Risk Modeling · 2025', title:'Flood Risk Modeling',
    lead:'기후변화에 따른 지역별 홍수 위험을 재평가하고, 위험 분석 결과를 보험요율과 보상 구조 설계까지 연결한 프로젝트입니다.',
    image:'assets/images/flood-risk-pipeline.png',
    role:['ArcGIS를 활용해 Landsat 위성·공간 데이터를 전처리하고 지역별 홍수 관련 지표를 시각화했습니다.','Python을 활용해 분석 변수의 중요도와 가중치를 산출했습니다.','전처리 데이터와 가중치 분석 결과를 통합해 서울시 자치구별 최종 홍수 위험 점수를 산출했습니다.'],
    approach:'공공데이터와 위성데이터를 활용해 FVI(Flood Vulnerability Index)와 FDI(Flood Defense Infrastructure Index)를 구성하고, 평상시와 극한 강우 상황의 위험 변화를 비교했습니다.',
    results:'지역을 Stable, Latent-Risk, Chronic-Risk, Misclassified의 네 유형으로 분류하고, 최종 위험도를 Risk Coefficient로 변환해 보험료와 보상 구조 설계로 확장했습니다.',
    metrics:[['4','Risk Types'],['1.00–1.96','Risk Coefficient'],['25','Seoul Districts']],
    github:'https://github.com/seunghyeon-lee-0/flood-risk-insurance-model'
  },
  shuttle: {
    kicker:'Location Optimization · 2024', title:'Shuttle Bus Location Optimization',
    lead:'지역 축제 기간의 교통 혼잡을 완화하기 위해 셔틀버스 정류장 위치와 운행 권역을 데이터 기반으로 설계한 프로젝트입니다.',
    image:'assets/images/shuttle-visual.png',
    role:['입지 분석에 필요한 데이터를 수집하고 분석 가능한 형태로 전처리했습니다.','Python을 활용해 입지 평가 변수의 중요도와 가중치를 산출했습니다.','MCLP와 P-Median을 활용한 최적 입지 분석을 수행했습니다.','정책 활용 가능성, 운영상 시사점, 분석의 한계와 향후 개선 방향을 정리했습니다.'],
    approach:'AHP 기반 수요 가중치를 구성한 뒤 MCLP와 P-Median을 병행해 수요 커버리지와 접근성을 함께 평가했습니다. 이후 Greedy Algorithm으로 공간적 중복을 제거하고 군집 분석으로 운행 권역을 구성했습니다.',
    results:'약 43개의 후보 정류장을 22개의 최종 정류장으로 압축하고, 2개의 셔틀 운행 권역과 노선을 설계했습니다.',
    metrics:[['43','Candidate Stops'],['22','Final Stops'],['2','Service Zones']],
    github:'https://github.com/seunghyeon-lee-0/shuttle-stop-location-analysis'
  },
  health: {
    kicker:'Healthcare BI · 2023', title:'Healthcare Data Visualization',
    lead:'국민건강보험공단 데이터를 정리해 사용자가 자신의 건강 상태를 직관적으로 탐색할 수 있는 Power BI 대시보드를 제작했습니다.',
    image:null,
    role:['연도별 진료내역 및 의약품 처방 데이터 약 30만 건을 수집해 분석용 데이터셋을 구성했습니다.','Python을 활용해 변수 범주화, 결측치·이상치 처리, 의료 코드 변환을 수행했습니다.','Power BI로 연령, 성별, 거주지역, 측정연도별 주요 질병 및 의약품 분포를 시각화했습니다.','분석 결과를 기반으로 Easy Care 서비스 아이디어의 시장성과 차별화 요소를 기획했습니다.'],
    approach:'2011–2017년 건강검진·진료·처방 데이터를 통합하고 코드화된 의료 정보를 사람이 이해할 수 있는 상태와 명칭으로 변환했습니다. 여러 건강검진 항목을 탐색용 건강위험 지표로 구성했습니다.',
    results:'건강검진 종합 현황, 개인별 건강위험 분석, 주상병 및 의약품 처방 분포를 한 화면에서 탐색할 수 있는 BI 대시보드를 구현했습니다.',
    metrics:[['300K','Records'],['2011–17','Data Years'],['Power BI','Dashboard']],
    video:'assets/video/healthcare-dashboard-demo.mp4'
  }
};

const drawer=document.querySelector('.drawer');
const backdrop=document.querySelector('.drawer-backdrop');
const content=document.querySelector('.drawer-content');
const close=document.querySelector('.drawer-close');

function openProject(key){
  const p=projects[key]; if(!p)return;
  const hero=p.image?`<div class="drawer-hero"><img src="${p.image}" alt="${p.title}"></div>`:'';
  const metrics=p.metrics.map(m=>`<div class="metric"><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join('');
  const role=p.role.map(r=>`<li>${r}</li>`).join('');
  const github=p.github?`<a class="drawer-link" target="_blank" rel="noreferrer" href="${p.github}">View on GitHub →</a>`:'';
  const video=p.video?`<video controls preload="metadata" src="${p.video}"></video>`:'';
  content.innerHTML=`
    <p class="drawer-kicker">${p.kicker}</p><h2>${p.title}</h2><p class="lead">${p.lead}</p>${hero}
    <section class="drawer-section"><h3>My Role</h3><ul>${role}</ul></section>
    <section class="drawer-section"><h3>Approach</h3><p>${p.approach}</p></section>
    <section class="drawer-section"><h3>Results</h3><p>${p.results}</p><div class="metrics">${metrics}</div>${github}</section>
    ${video?`<section class="drawer-section"><h3>Dashboard Demo</h3><p>실제 Power BI 대시보드 사용 영상입니다.</p>${video}</section>`:''}`;
  drawer.classList.add('open');backdrop.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click',()=>openProject(card.dataset.project));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(card.dataset.project)}});
});
close?.addEventListener('click',closeDrawer);backdrop?.addEventListener('click',closeDrawer);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});
