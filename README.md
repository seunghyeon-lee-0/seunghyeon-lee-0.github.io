# Seunghyeon Lee — Portfolio (v3)

레퍼런스(`yejin-hwang.github.io`)의 디자인 토큰을 그대로 가져와 재작성한 버전.
960px 단일 컬럼, 소형 타이포, 라운드 카드 + pill 태그, 우측 슬라이드 모달 구조.

## 배포

`seunghyeon-lee-0/seunghyeon-lee-0.github.io` 저장소 루트에 아래를 덮어쓰기:

```
index.html
style.css
main.js
assets/
```

GitHub Pages 설정은 그대로 (`main` / `(root)`).

## 넣어야 하는 파일

| 경로 | 용도 | 없을 때 동작 |
|---|---|---|
| `assets/images/profile.jpg` | 히어로 우측 사진 (세로형 권장, 3:4 이상) | 회색 플레이스홀더 |
| `assets/images/about.jpg` | About 우측 사진 | 회색 플레이스홀더 |
| `assets/resume/Seunghyeon_Lee_Resume.pdf` | Resume 버튼 | 404 |
| `assets/video/healthcare-dashboard-demo.mp4` | 대시보드 시연 (현재 4초 더미) | 재생 불가 |
| `assets/images/healthcare-thumb.svg` | 프로젝트 카드 썸네일 (SVG 목업) | — 실제 대시보드 캡처로 교체 권장 |
| `assets/images/og-cover.png` | 링크 공유 미리보기 (1200×630, 생성 완료) | — 내용 바뀌면 재생성 |
| `assets/favicon.svg` | 파비콘 (SL 모노그램) | 기본 아이콘 |

이미지가 없으면 `onerror`로 제거되고 플레이스홀더가 남으므로 깨진 아이콘은 안 뜬다.

## 자주 만질 값

| 위치 | 변수 / 셀렉터 | 설명 |
|---|---|---|
| `style.css` `:root` | `--hero-photo-col` | 히어로 사진 칼럼 폭. `.8fr` → `.65fr`로 줄이면 사진이 더 작아짐 |
| `style.css` | `section{max-width:960px}` | 전체 콘텐츠 폭 |
| `style.css` | `.pcard{flex:0 0 calc(42% - .5rem)}` | 캐러셀에서 한 화면에 보이는 카드 수 |
| `index.html` `.ct-item` | — | About 타임라인 항목 |

## 구조

- 섹션 순서: Home → About → Skills → Research → Projects → Education → Awards → Conferences → Certs → Contact
- Research(워킹페이퍼 2건)는 캐러셀이 아닌 2열 그리드. 항목이 3개 이상 되면 `card-grid`를 `project-carousel`로 바꾸고 `carousel-nav`를 추가하면 된다.
- Projects는 캐러셀 + 우측 슬라이드 모달(`openModal('flood'|'shuttle'|'health')`).
- Contact 폼은 백엔드 없이 `mailto:`로 열린다. 실제 폼 수신이 필요하면 Formspree/Getform 엔드포인트로 `main.js`의 submit 핸들러만 교체.

## 확인해야 할 사항

- Education에 지도교수명(김희웅)을 넣어뒀다. 공개를 원치 않으면 해당 `<span>` 삭제.
- Research 카드는 "Analysis completed / Manuscript in preparation" 상태만 노출하고 방법론·결과는 비공개로 유지했다. 논문 게재 확정 후 모달을 추가하는 것이 자연스럽다.
- `og:image`는 생성해둔 `og-cover.png`를 쓴다. 프로필 사진이 없어도 링크 공유 미리보기는 정상 동작한다.
- JSON-LD(`schema.org/Person`)에 학력·기술·SNS를 넣어뒀다. 이름/소속이 바뀌면 `<script type="application/ld+json">` 블록도 같이 수정할 것.
- 커스텀 도메인을 쓸 경우 루트에 `CNAME` 파일을 추가하고, `index.html`의 `og:url`·`canonical`, `sitemap.xml`, `robots.txt`의 주소를 함께 바꿔야 한다.

## 추가된 파일 (v3.1)

| 파일 | 용도 |
|---|---|
| `404.html` | GitHub Pages 기본 404 대체 |
| `robots.txt` / `sitemap.xml` | 검색엔진 색인 |
| `assets/favicon.svg` | 파비콘 · 홈화면 아이콘 |
| `assets/images/og-cover.png` | 링크 공유 미리보기 카드 |

## 동작 메모

- **스크롤 스파이**: 현재 섹션의 nav 링크에 pill 배경이 붙는다. 모든 링크에 동일한 padding을 주어 활성화 시 레이아웃 시프트가 0이다. 모바일에서는 nav가 가로 스크롤되며 활성 링크를 자동으로 중앙에 맞춘다.
- **`scroll-margin-top:44px`**: 고정 내비 높이만큼 앵커 이동 위치를 보정한다. 없으면 섹션 제목이 내비 뒤로 숨는다.
- **`<noscript>` 가드**: JS가 죽어도 섹션이 `opacity:0`으로 남지 않는다.
- **캐러셀 드래그**: 8px 이상 드래그한 직후의 click은 캡처 단계에서 차단되어 모달이 잘못 열리지 않는다.
