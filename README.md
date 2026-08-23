# Seunghyeon Lee - Portfolio

데이터 분석 포트폴리오 웹사이트. 정적 사이트이며 빌드 도구나 의존성이 없습니다.
`index.html`을 열면 그대로 동작하고, GitHub Pages에 그대로 올릴 수 있습니다.

## 파일 구성

```
index.html      전체 마크업 (섹션 + 상세 모달)
style.css       스타일 전체
main.js         모달 · 아코디언 · 스크롤 스파이 · 메일 링크
404.html        존재하지 않는 주소로 접근했을 때 표시
robots.txt      검색엔진 크롤링 허용
sitemap.xml     사이트맵
assets/
  images/       사진 · 썸네일 · 로고 · 프로젝트 이미지
  video/        대시보드 시연 영상
  docs/         프로젝트 보고서 PDF
  resume/       이력서 PDF
  favicon.svg   파비콘
```

## 페이지 구성

| 섹션 | id | 내용 |
|---|---|---|
| Home | `home` | 이름, 한 줄 소개, 링크 |
| About Me | `about` | 소개글, 학력 타임라인, Research Interests, How I Work |
| Education | `education` | 학위, 논문 주제, 이수 과목 |
| Tools & Methods | `skills` | 사용 도구와 방법론 |
| Research Papers | `research` | 진행 중인 연구 2건 |
| Selected Projects | `projects` | 프로젝트 5건 |
| Field Activities | `activities` | 현장 활동 |
| Awards | `awards` | 수상 내역 (클릭 시 상세 펼침) |
| Conferences & Activities | `conferences` | 학회 발표, 대외 활동 |
| Certifications | `certifications` | 자격증 |
| Contact | `contact` | 연락처, 메시지 폼 |

## 동작 방식

- **상세 모달** - 프로젝트·연구 카드를 클릭하면 우측에서 슬라이드로 열립니다. `openModal('id')` / `closeModal()`.
- **How I Work** - 클릭하면 설명이 펼쳐지고 우측 사진이 바뀌는 아코디언입니다.
- **Awards** - 카드를 클릭하면 상세 설명이 펼쳐집니다. 일부는 관련 프로젝트 모달로 연결됩니다.
- **스크롤 스파이** - 현재 보고 있는 섹션의 메뉴에 표시가 붙습니다.
- **Contact 폼** - 서버가 없으므로 메일 앱을 여는 방식입니다. 실제 수신이 필요하면 `main.js`의 submit 핸들러를 Formspree 등의 엔드포인트로 교체하세요.
- **이메일 노출 방지** - 화면에는 `[at]`으로 표기하고, 링크는 스크립트가 조립합니다.

## 수정 방법

| 하고 싶은 것 | 위치 |
|---|---|
| 본문 폭 조정 | `style.css` 의 `--col` |
| 색상 조정 | `style.css` 상단 `:root` |
| 프로젝트 카드 순서 | `index.html` 의 `#projects .card-grid` 안 카드 블록 순서 |
| 썸네일 비율 | `style.css` 의 `#projects .pcard-img` |
| 이미지 교체 | `assets/images/` 에 같은 이름으로 덮어쓰기 |

## 배포

저장소 루트에 전체 파일을 올리고 GitHub Pages를 `main` / `(root)`로 설정하면 됩니다.

**이미지나 CSS를 교체했는데 화면이 그대로면 브라우저 캐시입니다.** `Ctrl+Shift+R`(Mac은 `Cmd+Shift+R`)로 새로고침하세요.
`index.html`의 `style.css?v=` 와 `main.js?v=` 뒤 숫자를 올리면 캐시를 확실히 무효화할 수 있습니다.
푸터에 표시되는 빌드 번호로 현재 보고 있는 버전을 확인할 수 있습니다.

## 채워 넣어야 하는 파일

| 경로 | 없을 때 |
|---|---|
| `assets/resume/Seunghyeon_Lee_Resume.pdf` | Resume 버튼이 404 |
| `assets/docs/*.pdf` | 모달의 Full Report 버튼이 404 |
| `assets/video/healthcare-dashboard-demo*.mp4` | 대시보드 시연 영상 재생 불가 (현재 더미) |
