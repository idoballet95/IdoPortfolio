# AI Works 포트폴리오 강화 구현 계획

## 목표

승인된 설계에 따라 기존 React/Vite 포트폴리오의 공개 `AI Works`를 이미지, 영상, 글과 제작 판단이 함께 보이는 증거 중심 포트폴리오로 개편한다. 기존 작업과 URL은 유지한다.

## 작업 순서

### 1. 에셋 선별과 공개 안전성 점검

- Bose, Step Out, Great Wave, Naver Blog 원본 폴더에서 웹에 사용할 제작 자료만 선별한다.
- 개인 로컬 경로, 계정 정보, API 정보와 내부 식별자가 이미지나 문서에 노출되지 않는지 확인한다.
- 큰 PNG는 웹용 JPEG 또는 WebP로 축소하고, 동영상 원본은 기존 포트폴리오 파일을 재사용한다.
- `public/media/process/` 아래 프로젝트별 디렉터리에 복사한다.

검증:
- 모든 공개 경로가 존재한다.
- 이미지가 브라우저에서 열리고 방향과 라벨이 원본과 일치한다.
- 새 에셋 용량이 과도하지 않다.

### 2. 작업 데이터 모델 확장

파일: `src/app/data/works.ts`

- media type, featured rank, capability tag를 추가한다.
- creative decision, final delivery, process asset, iteration pair 타입을 추가한다.
- Bose, Step Out, Great Wave, World Cup에 검증된 상세 데이터를 연결한다.
- 기존 33개 작업의 slug와 기본 데이터는 유지한다.

파일: `src/app/data/editorial-cases.ts`

- Voice Building과 Naver Blog 제작 사례를 별도 editorial case 데이터로 정의한다.
- 한국어와 영어 핵심 카피, 과정 단계, 공개 가능한 이미지와 전후 비교를 포함한다.

검증:
- 모든 새 이미지 경로가 `public` 파일에 대응한다.
- 데이터 누락 작업에서도 기존 상세 화면이 정상 작동한다.

### 3. 한국어 최초 기본값

파일: `src/app/i18n/LanguageContext.tsx`

- 저장값이 없을 때 `ko`를 반환한다.
- 기존 localStorage 선택 기억을 유지한다.

검증:
- 빈 localStorage에서 KOR 활성화
- ENG 선택 후 새로고침 시 ENG 유지

### 4. AI Works 홈 요약 개편

파일: `src/app/components/AIWorks.tsx`

- 한국어 중심 헤드라인과 보조 문구를 추가한다.
- Image, Video, Writing 세 역량을 결과물 중심 문장으로 표시한다.
- 대표 작업을 Bose, Step Out, Great Wave, World Cup 중심으로 재정렬한다.
- CTA 버튼은 추가하지 않는다. 기존 전체 작업 이동 링크만 정보 탐색 수단으로 유지한다.

검증:
- 홈 첫 스크롤 안에 세 역량이 모두 노출된다.
- 대표작 카드가 올바른 상세 URL로 이동한다.

### 5. 전체 AI Works 갤러리 개편

파일: `src/app/components/WorkGallery.tsx`

- 파스텔 아이콘 카드 헤더를 콘택트시트형 소개로 교체한다.
- Featured, Video, Image, Writing & Systems, Character IP, Experiments 필터를 제공한다.
- Video와 Character IP 필터는 기존 작업 데이터를 사용한다.
- Image와 Writing & Systems는 curated section과 editorial case로 연결한다.
- 모든 작업을 삭제하지 않고 아카이브 하단에 유지한다.
- hover가 없는 환경에서도 제목과 유형을 표시한다.

새 컴포넌트:
- `CapabilityIntro.tsx`
- `FeaturedCaseStudies.tsx`
- `ImageDirectionGallery.tsx`
- `WritingSystems.tsx`

검증:
- 필터별 결과 수와 표시 항목이 일치한다.
- 필터 변경 시 빈 화면이 생기지 않는다.
- 모바일에서 섹션 읽기 순서가 유지된다.

### 6. 대표작 상세 페이지 강화

파일: `src/app/components/WorkDetail.tsx`

새 컴포넌트:
- `ProcessRail.tsx`
- `IterationCompare.tsx`
- `PromptDisclosure.tsx`

- 최종 결과, brief, creative decision, process, iteration, final delivery 순으로 재구성한다.
- 긴 프롬프트는 접힌 disclosure로 이동한다.
- process 데이터가 없는 기존 작업은 현재의 간결한 설명을 유지한다.
- prompt 파일이 없는 경우 빈 `archive in progress` 패널을 제거한다.

검증:
- Bose, Step Out, Great Wave에서 과정 이미지와 설명이 일치한다.
- World Cup은 확인된 결과와 설명만 표시한다.
- 기존 작업 상세도 오류 없이 열린다.
- prompt fetch 실패 상태가 disclosure 안에 표시된다.

### 7. 글과 보이스 사례 상세 화면

파일:
- `src/app/components/EditorialCaseDetail.tsx`
- `src/app/App.tsx`

- `/work/voice-building`과 `/work/naver-blog-system` 경로를 기존 상세 라우팅 안에서 처리한다.
- Voice Building은 sample analysis, voice rules, before/after와 재사용 시스템을 설명한다.
- Naver Blog는 research, draft, humanize, mobile format, image plan, final QA를 설명한다.
- 실제 글 전체보다 판단 기준과 짧은 전후 예시를 사용한다.

검증:
- 두 URL이 직접 접근과 내부 탐색 모두에서 열린다.
- 공개 이미지와 텍스트에 개인 로컬 경로가 보이지 않는다.

### 8. 시각 시스템 정리

파일:
- `src/styles/index.css`
- 관련 컴포넌트 Tailwind class

- warm ivory, near-black, muted chartreuse 단일 포인트 팔레트를 사용한다.
- Arial 전역 사용을 제거하고 기존 로컬/웹 안전 폰트 구성에서 한국어 가독성이 좋은 조합을 적용한다.
- grain, ruled annotation line, contact-sheet label 등 작은 제작 노트 디테일을 추가한다.
- focus-visible과 reduced-motion 스타일을 보강한다.

검증:
- 가독성과 대비
- 모바일 줄바꿈
- reduced-motion에서 진입 애니메이션 최소화

### 9. 자동 및 수동 검증

- `npm run build`
- 브라우저 console error 확인
- `/`, `/work`, 6개 대표 상세 URL과 임의의 기존 상세 URL 확인
- 데스크톱, 태블릿, 모바일 화면 확인
- 한국어 기본 및 영어 기억 확인
- 키보드 탐색 확인
- 깨진 이미지와 영상 경로 확인

### 10. 커밋

- 구현 변경을 검토 가능한 하나의 기능 커밋으로 남긴다.
- 설계나 계획과 무관한 사용자 변경은 포함하지 않는다.

## 완료 조건

- 승인된 설계 문서의 완료 기준을 모두 만족한다.
- 기존 33개 작업과 URL이 유지된다.
- 이미지, 영상, 글과 수정 판단이 AI Works 첫 화면과 대표 상세에서 확인된다.
- build와 브라우저 검증이 통과한다.
