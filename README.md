# Seunghyeon Lee - Portfolio

## 파일 구성

```
index.html          전체 마크업 (섹션 + 상세 모달)
404.html            존재하지 않는 주소로 접근했을 때 표시
robots.txt          검색엔진 크롤링 허용
sitemap.xml         사이트맵
assets/
  css/style.css     스타일 전체
  js/main.js        모달 · 아코디언 · 스크롤 스파이 · 메일 링크
  favicon.svg       파비콘
  images/
    about/          프로필 · 졸업 사진 · How I Work 사진
    activities/     현장 활동 사진
    icons/          아이콘
    logos/          학교 · 기관 · 파트너 로고
    thumbnails/     프로젝트 카드 썸네일
    projects/       프로젝트별 상세 이미지 (flood, shuttle, healthcare, medichanger,
                    pinfit, twincept, disclosure, moeun)
    og-cover.png    링크 공유 미리보기 이미지
  video/            대시보드 시연 영상
  docs/             프로젝트 보고서 PDF
  resume/           이력서 PDF
_notes/             문구 수정용 메모 (사이트에 배포되지 않음)
_archive/           현재 사이트에서 쓰지 않는 이미지 보관 (사이트에 배포되지 않음)
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
