# Seunghyeon Lee Portfolio Prototype

GitHub Pages에 바로 올릴 수 있는 정적 포트폴리오 프로토타입입니다.

## 폴더 구조

```text
seunghyeon-portfolio-prototype/
├── index.html
├── style.css
├── main.js
├── README.md
└── assets/
    ├── images/
    │   ├── flood-risk-motivation.png
    │   ├── flood-risk-pipeline.png
    │   ├── shuttle-pipeline.png
    │   └── shuttle-visual.png
    ├── resume/
    │   └── (Seunghyeon_Lee_Resume.pdf 추가)
    └── video/
        └── (healthcare-dashboard-demo.mp4 추가)
```

## 1. 먼저 로컬에서 보기

`index.html`을 브라우저에서 직접 열어도 대부분 작동합니다.

좀 더 안정적으로 확인하려면 VS Code의 **Live Server** 확장을 사용하거나 아래처럼 실행합니다.

```bash
python -m http.server 8000
```

그 뒤 브라우저에서 `http://localhost:8000` 접속.

## 2. 꼭 교체할 파일

### 프로필 사진
현재 Hero의 `SL / PROFILE PHOTO`는 CSS placeholder입니다.

프로필 사진을 `assets/images/profile.jpg`로 넣은 다음 `index.html`의 `portrait-placeholder` 부분을 `<img>`로 교체하면 됩니다.

### Resume

```text
assets/resume/Seunghyeon_Lee_Resume.pdf
```

이 이름으로 Resume PDF를 넣으면 현재 Resume 링크가 바로 작동합니다.

### Healthcare Dashboard Demo

```text
assets/video/healthcare-dashboard-demo.mp4
```

현재 교체용 placeholder MP4가 들어 있습니다. 실제 Power BI 녹화 영상을 **같은 파일명으로 덮어쓰기만 하면** 홈페이지에서 바로 재생됩니다.

## 3. GitHub Pages 업로드

GitHub 사용자명이 `seunghyeon-lee-0`이므로 사용자 홈페이지로 만들 경우 저장소 이름을 아래처럼 생성합니다.

```text
seunghyeon-lee-0.github.io
```

이 폴더 안의 파일을 저장소 **루트**에 올립니다.

```bash
git init
git add .
git commit -m "Build portfolio prototype"
git branch -M main
git remote add origin https://github.com/seunghyeon-lee-0/seunghyeon-lee-0.github.io.git
git push -u origin main
```

GitHub에서:

```text
Settings
→ Pages
→ Build and deployment
→ Deploy from a branch
→ main / (root)
```

설정 후 다음 주소로 배포됩니다.

```text
https://seunghyeon-lee-0.github.io/
```

## 4. 현재 프로토타입에서 수정이 필요한 내용

- [ ] 실제 프로필 사진
- [ ] Resume PDF
- [ ] 학부 재학/졸업 기간 최종 확인
- [ ] Customer Behavior Working Paper 세부 Methodology 공개 범위
- [ ] AI Perception Working Paper GitHub/발표자료 링크
- [ ] Healthcare Dashboard 실제 영상
- [ ] Healthcare 프로젝트 GitHub/자료 링크가 있다면 추가
- [ ] 수상 상장 이미지 공개 여부 결정
- [ ] 나머지 학술대회 발표가 있다면 추가
- [ ] 최종 영문 전환 및 proofreading

## 디자인 원칙

- 무채색 중심 + Bridge Indigo (`#4C5FD7`) 한 가지 강조색
- 참고 사이트의 정보 구조는 참고하되 디자인은 별도로 구성
- 사진보다 이름과 메시지가 우선
- 프로젝트는 카드 → 우측 상세 drawer 구조
- Skills는 badge 나열보다 범주별 텍스트
- Awards는 전체 이력을 유지하되 프로젝트보다 아래 배치
