import type { Language } from "../i18n/LanguageContext";

export type LocalizedText = { en: string; ko: string };

export interface ProcessAsset {
  src: string;
  kind?: "image" | "video";
  label: LocalizedText;
  alt: LocalizedText;
  note: LocalizedText;
}

export interface IterationPair {
  before: string;
  after: string;
  beforeLabel: LocalizedText;
  afterLabel: LocalizedText;
  beforeAlt: LocalizedText;
  afterAlt: LocalizedText;
  decision: LocalizedText;
}

export interface WorkEvidence {
  brief: LocalizedText;
  creativeDecision: LocalizedText;
  delivery: LocalizedText;
  processAssets?: ProcessAsset[];
  iterations?: IterationPair[];
}

export const featuredSlugs = [
  "bose-quietcomfort",
  "step-out-in-color",
  "nike-mercurial",
  "world-cup-product-collection",
  "yena-hokusai-great-wave",
] as const;

export const workEvidence: Record<string, WorkEvidence> = {
  "bose-quietcomfort": {
    brief: {
      ko: "노이즈 캔슬링을 기능 설명이 아닌 한 번의 청각적 반전으로 체감시키는 20초 브랜드 필름을 설계.",
      en: "Design a 20-second brand film that makes noise cancelling felt through one sonic reversal rather than a feature explanation.",
    },
    creativeDecision: {
      ko: "경기장의 함성을 가장 큰 출발점으로 두고, 헤드폰만 화면에서 채도를 갖게 . 제품의 색과 정적이 광고의 두 주인공이 되도록 나머지 요소를 절제.",
      en: "The stadium roar became the loudest possible starting point, while the headphones remained the only saturated object. Product colour and silence carry the film.",
    },
    delivery: {
      ko: "21초 스펙 광고 · 16:9 · 콘셉트, AI 연출, 사운드 디자인, 편집",
      en: "21-second spec commercial · 16:9 · concept, AI direction, sound design and edit",
    },
    processAssets: [
      {
        src: "/media/process/bose/kf1_stadium.png",
        label: { ko: "01 · 소음의 출발점", en: "01 · Loudest starting point" },
        alt: { ko: "경기장 관중석에서 시작하는 Bose 광고 스토리보드", en: "Bose storyboard beginning in a packed stadium" },
        note: { ko: "제품이 필요한 이유를 첫 프레임에서 제시.", en: "The first frame establishes why the product is needed." },
      },
      {
        src: "/media/process/bose/kf2_traffic.png",
        label: { ko: "02 · 무음의 스케일", en: "02 · Scale of silence" },
        alt: { ko: "서울 교통 위를 비행하는 장면의 스토리보드", en: "Storyboard of the flight above Seoul traffic" },
        note: { ko: "큰 움직임과 정적을 충돌시켜 기능을 장면으로 번역.", en: "Large motion against near-silence turns the feature into a scene." },
      },
      {
        src: "/media/process/bose/kf3_button.png",
        label: { ko: "03 · 제품 행동", en: "03 · Product action" },
        alt: { ko: "헤드폰 버튼을 누르는 클로즈업 스토리보드", en: "Close storyboard of the headphone control gesture" },
        note: { ko: "한 번의 버튼 동작으로 사운드 전환을 읽히게 .", en: "A single physical gesture makes the sound transition legible." },
      },
      {
        src: "/media/process/bose/font_options.jpg",
        label: { ko: "04 · 엔드카드 비교", en: "04 · End-card comparison" },
        alt: { ko: "Bose 광고 엔드카드 타이포그래피 후보 비교", en: "Typography options compared for the Bose end card" },
        note: { ko: "브랜드보다 스타일이 앞서지 않는 가장 조용한 조합을 선택.", en: "The quietest option was chosen so styling never overtook the brand." },
      },
    ],
    iterations: [
      {
        before: "/media/process/bose/take1_sheet.jpg",
        after: "/media/process/bose/take3_sheet.jpg",
        beforeLabel: { ko: "TAKE 01", en: "TAKE 01" },
        afterLabel: { ko: "SELECTED TAKE 03", en: "SELECTED TAKE 03" },
        beforeAlt: { ko: "Bose 광고 첫 번째 생성 결과 콘택트시트", en: "Contact sheet from the first Bose generation" },
        afterAlt: { ko: "Bose 광고 최종 선택 생성 결과 콘택트시트", en: "Contact sheet from the selected Bose generation" },
        decision: {
          ko: "초기 결과보다 캐릭터 방향, 헤드폰 가독성, 교통 장면의 축이 안정된 세 번째 테이크를 선택. 생성 사운드는 정적을 유지하지 못해 최종 편집에서 직접 다시 설계.",
          en: "Take three held character direction, product legibility and the traffic axis more consistently. Generated audio still leaked into the silent section, so the soundtrack was rebuilt in post.",
        },
      },
    ],
  },
  "step-out-in-color": {
    brief: {
      ko: "다섯 개 풋살화 컬러웨이를 제품 나열이 아니라 하나의 연속 패션 변신으로 보여주는 세로형 광고.",
      en: "A vertical commercial that turns five futsal colourways into one continuous fashion transformation rather than a product list.",
    },
    creativeDecision: {
      ko: "흰 스튜디오, 거대한 신발 포털, 회전하는 컬러 스와치라는 세 요소를 고정하고 인물·의상·제품만 색상 순서에 맞춰 전환.",
      en: "A white studio, monumental shoe portal and rotating swatch remain fixed while character, styling and product change in a controlled colour sequence.",
    },
    delivery: {
      ko: "15초 세로형 4K 광고 · 2160×3840 · 무대사 · 음악 및 사운드 믹스",
      en: "15-second vertical 4K commercial · 2160×3840 · dialogue-free · music and sound mix",
    },
    processAssets: [
      {
        src: "/media/process/step-out/character_reference_board.png",
        label: { ko: "캐릭터 시스템", en: "Character system" },
        alt: { ko: "다섯 컬러웨이의 지아 캐릭터 레퍼런스 보드", en: "Gia character reference board across five colourways" },
        note: { ko: "색이 바뀌어도 얼굴과 비율은 같은 인물로 유지.", en: "Face and proportion stay recognisably the same as the colour changes." },
      },
      {
        src: "/media/process/step-out/product_reference_board.png",
        label: { ko: "제품 시스템", en: "Product system" },
        alt: { ko: "다섯 풋살화 제품 레퍼런스 보드", en: "Product reference board for five futsal shoes" },
        note: { ko: "제품 실루엣과 색상 위치를 컷마다 다시 확인.", en: "Product silhouette and colour placement were checked shot by shot." },
      },
      {
        src: "/media/process/step-out/gia_main_candidate_01.png",
        label: { ko: "캐스팅 후보 01", en: "Casting candidate 01" },
        alt: { ko: "지아 메인 캐릭터 첫 번째 후보 이미지", en: "First candidate image for Gia's lead look" },
        note: { ko: "얼굴은 선명하지만 광고 전체를 이끌기에는 표정이 강한 편.", en: "Clear identity, but the expression competed with the colourway system." },
      },
      {
        src: "/media/process/step-out/gia_main_masterlocked_v1.png",
        label: { ko: "최종 아이덴티티 락", en: "Final identity lock" },
        alt: { ko: "최종 선택된 지아 캐릭터 고정 이미지", en: "Final identity-locked image selected for Gia" },
        note: { ko: "중립적인 표정과 정면성이 색상 전환에서 가장 안정적으로 유지.", en: "A neutral expression and frontal read held most reliably through colour changes." },
      },
    ],
    iterations: [
      {
        before: "/media/process/step-out/gia_20s_storyboard_v1.png",
        after: "/media/process/step-out/gia_20s_storyboard_v4_topview_toe_up.png",
        beforeLabel: { ko: "STORYBOARD V1", en: "STORYBOARD V1" },
        afterLabel: { ko: "STORYBOARD V4", en: "STORYBOARD V4" },
        beforeAlt: { ko: "Step Out in Color 첫 번째 스토리보드", en: "First storyboard for Step Out in Color" },
        afterAlt: { ko: "Step Out in Color 네 번째 최종 스토리보드", en: "Fourth and final storyboard for Step Out in Color" },
        decision: {
          ko: "초기 보드의 단순한 포털 통과를 제품이 화면을 지배하는 탑뷰와 발끝 동작으로 수정. 컬러 전환의 원인이 더 명확해지고 마지막까지 신발이 기억에 남는 구성.",
          en: "The simple portal walk became a top-view, toe-led transition where the product dominates the frame. The colour change gained a clear cause and the shoe stayed memorable through the final beat.",
        },
      },
    ],
  },
  "yena-hokusai-great-wave": {
    brief: {
      ko: "호쿠사이의 파도가 액자 밖으로 새어 나와 미술관을 침수시키는 20초 재난 코미디.",
      en: "A 20-second disaster comedy in which Hokusai's wave leaks out of its frame and floods the museum.",
    },
    creativeDecision: {
      ko: "파도, 수위, 인물 반응과 카메라를 분리해 Blender 움직임 레퍼런스로 먼저 검증. 물리 시뮬레이션을 복제하는 대신 원인과 결과가 읽히는 시간 순서를 생성 프롬프트로 이전.",
      en: "Wave motion, water level, performance and camera were separated in a Blender movement reference. The prompt carries a legible cause-and-effect timeline rather than claiming exact simulation.",
    },
    delivery: {
      ko: "20초 세로형 이중자막 영상 · Blender 움직임 레퍼런스 · Seedance · 음악 믹스 · 4K QC",
      en: "20-second vertical bilingual video · Blender movement reference · Seedance · music mix · 4K QC",
    },
    processAssets: [
      {
        src: "/media/process/great-wave/01_blender_motion_25s.mp4",
        kind: "video",
        label: { ko: "움직임 레퍼런스", en: "Movement reference" },
        alt: { ko: "미술관 침수 장면의 Blender 움직임 레퍼런스", en: "Blender movement reference for the museum flood" },
        note: { ko: "움직임과 카메라를 분리하고 수위 상승과 반응의 순서를 먼저 고정.", en: "Motion and camera are separated before locking the order of rising water and reactions." },
      },
      {
        src: "/media/process/great-wave/contact-sheet.jpg",
        label: { ko: "이미지 셀렉션", en: "Image selection" },
        alt: { ko: "Great Wave 일상 사진 후보 콘택트시트", en: "Contact sheet for Great Wave daily-photo candidates" },
        note: { ko: "본편과 같은 인물·장소·색감을 유지하는 이미지만 유지.", en: "Only images that held the same character, place and palette as the film remained." },
      },
      {
        src: "/media/process/great-wave/boundary_qc_montage.jpg",
        label: { ko: "자막 경계 QC", en: "Subtitle boundary QC" },
        alt: { ko: "영한 이중자막의 경계 프레임 QC 몽타주", en: "Boundary-frame QC montage for English-Korean subtitles" },
        note: { ko: "장면 전환에서 자막이 한 프레임씩 남거나 잘리지 않는지 확인.", en: "Boundary frames were checked for lingering or clipped subtitle cards." },
      },
    ],
    iterations: [
      {
        before: "/media/process/great-wave/test_original.png",
        after: "/media/process/great-wave/test_4k.png",
        beforeLabel: { ko: "SOURCE", en: "SOURCE" },
        afterLabel: { ko: "4K QC", en: "4K QC" },
        beforeAlt: { ko: "업스케일 전 Great Wave 프레임", en: "Great Wave frame before upscale" },
        afterAlt: { ko: "4K 업스케일 후 Great Wave QC 프레임", en: "Great Wave QC frame after 4K upscale" },
        decision: {
          ko: "선명도만 올리고 인물 피부와 물결의 질감이 인공적으로 변하지 않는 설정을 선택. 최종본은 더 큰 해상도보다 원본의 자연스러움을 우선해 검수.",
          en: "The chosen pass adds clarity without turning skin and water texture synthetic. QC prioritised the source's natural feel over aggressive sharpness.",
        },
      },
    ],
  },
  "world-cup-product-collection": {
    brief: {
      ko: "축구화, 물병, 헤어밴드 세 제품을 하나의 월드컵 컬렉션처럼 보이게 하는 41초 제품 필름.",
      en: "A 41-second product film presenting boots, bottle and headband as one World Cup collection.",
    },
    creativeDecision: {
      ko: "서로 다른 Kling·Hailuo 생성 결과를 흰 프로토타입 무대, 모노크롬 재질과 정밀한 손동작이라는 공통 규칙으로 통합.",
      en: "Separate Kling and Hailuo generations are unified through a white prototype stage, monochrome materials and precise hand-led details.",
    },
    delivery: {
      ko: "41초 제품 컬렉션 필름 · Kling, Hailuo, CapCut · 제품 디테일 애니메이션",
      en: "41-second product collection film · Kling, Hailuo, CapCut · product-detail animation",
    },
    processAssets: [
      {
        src: "/media/process/world-cup/01-prototype-stage.jpg",
        label: { ko: "프로토타입 룩", en: "Prototype look" },
        alt: { ko: "흰색 축구화, 물병과 헤어밴드의 프로토타입 제품 무대", en: "Prototype stage with white boot, bottle and headband" },
        note: { ko: "세 제품의 실루엣과 높낮이를 먼저 하나의 컬렉션 문법으로 정렬.", en: "Silhouette and elevation establish one collection language before colour arrives." },
      },
      {
        src: "/media/process/world-cup/02-headband-detail.jpg",
        label: { ko: "소재 디테일", en: "Material detail" },
        alt: { ko: "핀셋으로 금색 축구공 장식을 헤어밴드에 올리는 장면", en: "Tweezers placing a gold football detail onto the headband" },
        note: { ko: "Kling의 손동작은 작고 정확하게 제한해 소재감과 금색 포인트에 시선 집중.", en: "Kling's hand motion stays small and precise so texture and the gold accent remain the focus." },
      },
      {
        src: "/media/process/world-cup/03-bottle-interaction.jpg",
        label: { ko: "사용 장면", en: "Use moment" },
        alt: { ko: "축구공 형태의 금색 뚜껑을 가진 물병을 드는 장면", en: "Hand holding a bottle with a gold football-shaped cap" },
        note: { ko: "인물이 제품을 가리지 않도록 손의 위치와 프레이밍을 단순하게 유지.", en: "Hand placement and framing stay simple so the interaction never hides the product." },
      },
      {
        src: "/media/process/world-cup/04-collection-lockup.jpg",
        label: { ko: "컬렉션 락업", en: "Collection lockup" },
        alt: { ko: "완성된 월드컵 축구화, 물병과 헤어밴드의 컬렉션 엔드 프레임", en: "Final collection frame with completed World Cup boot, bottle and headband" },
        note: { ko: "화이트 베이스, 레드 패턴과 금색 포인트를 반복해 서로 다른 생성 컷을 한 제품군으로 통합.", en: "White, red pattern and gold accents repeat to unify separately generated products." },
      },
    ],
  },
  "nike-mercurial": {
    brief: {
      ko: "야간 경기장에서 축구화 한 켤레를 두고 벌어지는 추격을 40초 액션 광고로 만든 스펙 커머셜.",
      en: "A 40-second spec commercial that turns a contested pair of boots into a night-time football chase.",
    },
    creativeDecision: {
      ko: "제품 데모 대신 속도·터치·추격의 드라마를 엔진으로 삼고, 빠른 컷 속에서도 축구화가 읽히도록 캐릭터·조명·제품 연속성을 기준으로 샷 선정.",
      en: "Speed, touch and pursuit drive the film instead of a product demo; shots were selected for continuity of character, lighting and boot so the product stays legible at pace.",
    },
    delivery: {
      ko: "40초 액션 커머셜 · AI 비디오, CapCut · 한/영 이중 자막",
      en: "40-second action commercial · AI video, CapCut · Korean–English subtitles",
    },
  },
};

export interface EditorialCase {
  slug: string;
  title: LocalizedText;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  heroImage: string;
  heroAlt: LocalizedText;
  steps: Array<{ title: LocalizedText; body: LocalizedText }>;
  before: LocalizedText;
  after: LocalizedText;
  decision: LocalizedText;
  images?: ProcessAsset[];
}

export const editorialCases: EditorialCase[] = [
  {
    slug: "voice-building",
    title: { ko: "i.do.eats 보이스 빌딩", en: "Building the i.do.eats voice" },
    eyebrow: { ko: "WRITING SYSTEM · VOICE DESIGN", en: "WRITING SYSTEM · VOICE DESIGN" },
    summary: {
      ko: "맛집을 오래 다녀본 언니가 친구에게 사진을 보여주듯 쓰는 목소리를 실제 샘플에서 추출해 재사용 가능한 작성 기준으로 정리.",
      en: "A reusable writing system distilled from real samples: an experienced food lover talking a friend through each photo with warmth and precise judgement.",
    },
    role: { ko: "샘플 분석, 화자·독자 정의, 문장 리듬, 금지 표현, QA 기준", en: "Sample analysis, audience and narrator definition, sentence rhythm, exclusions and QA" },
    heroImage: "/media/process/writing/canva-master-cover-page-07.png",
    heroAlt: { ko: "i.do.eats 네이버 블로그 대표 이미지", en: "i.do.eats Naver Blog cover image" },
    steps: [
      { title: { ko: "샘플에서 찾기", en: "Read the samples" }, body: { ko: "반복되는 문장 길이, 판단 방식, 시작과 끝, 쓰지 않는 표현까지 기록.", en: "Sentence length, judgement patterns, openings, closings and consistently absent language were recorded." } },
      { title: { ko: "한 문장으로 정의", en: "Name the voice" }, body: { ko: "가볍고 친근하지만 식감·간·온도·가격을 구체적으로 짚는 사람으로 화자를 고정.", en: "The narrator is warm and casual, but precise about texture, seasoning, temperature and price." } },
      { title: { ko: "작성 규칙으로 변환", en: "Turn it into rules" }, body: { ko: "리듬, 1인칭, 메뉴 블록, 솔직한 판단과 금지 문구를 실제 작성 지침으로 전환.", en: "Rhythm, first-person use, menu blocks, honest judgement and banned phrasing became practical instructions." } },
      { title: { ko: "사람 말투 QA", en: "Human-voice QA" }, body: { ko: "카톡 테스트, 식탁 장면 테스트, 다른 식당에도 붙는 문장인지 확인한 뒤 통과.", en: "Every draft passes conversational, table-scene and specificity checks before approval." } },
    ],
    before: { ko: "전체적으로 만족스러웠고 분위기도 좋아 데이트 장소로 추천해요.", en: "Overall it was satisfying, with a nice atmosphere that makes it good for a date." },
    after: { ko: "크림은 진한데 레몬 향이 끝을 가볍게 잡아줬어요. 다음에도 이 접시는 다시 시킬래요.", en: "The cream was rich, but lemon lifted the finish. This is the plate I would order again." },
    decision: { ko: "막연한 칭찬을 지우고 실제 맛, 장면과 다음 선택이 남는 문장으로 수정.", en: "Generic praise was replaced with taste, scene and a clear next choice." },
  },
  {
    slug: "naver-blog-system",
    title: { ko: "네이버 블로그 제작 시스템", en: "Naver Blog production system" },
    eyebrow: { ko: "RESEARCH · WRITING · IMAGE PACKAGE", en: "RESEARCH · WRITING · IMAGE PACKAGE" },
    summary: {
      ko: "최신 정보 조사부터 보이스 초안, 자연스러운 문장 수정, 모바일 줄바꿈, 이미지 순서와 최종 QA까지 한 콘텐츠 패키지로 제작.",
      en: "One content package carries research, voice-led drafting, natural-language revision, mobile formatting, image sequencing and final QA.",
    },
    role: { ko: "리서치 설계, 글쓰기, Humanize, 모바일 포맷, 이미지 플랜, 검증", en: "Research design, writing, humanisation, mobile format, image plan and verification" },
    heroImage: "/media/process/writing/canva-master-cover-page-07.png",
    heroAlt: { ko: "한남동 다츠 네이버 블로그 대표 이미지", en: "Naver Blog cover for Daats in Hannam" },
    steps: [
      { title: { ko: "Research", en: "Research" }, body: { ko: "영업시간·가격·주차는 현재 출처로 검증하고 개인 경험과 공개 정보를 구분.", en: "Hours, price and parking are verified with current sources and kept separate from personal experience." } },
      { title: { ko: "Voice draft", en: "Voice draft" }, body: { ko: "보이스 프로필을 적용해 사진마다 첫인상, 맛, 식감과 재주문 판단 작성.", en: "The voice profile guides first impression, taste, texture and reorder judgement for each image." } },
      { title: { ko: "Humanize", en: "Humanise" }, body: { ko: "보고서형 결론, 반복 어미와 빈 전환 문구를 찾아 재작성.", en: "Report-like conclusions, repeated endings and empty transitions are identified and rewritten." } },
      { title: { ko: "Mobile format", en: "Mobile format" }, body: { ko: "의미 단위로 줄을 나누되 메뉴명, 숫자와 조사를 부자연스럽게 끊지 않기.", en: "Lines break by meaning without splitting menu names, quantities or grammatical units." } },
      { title: { ko: "Image plan", en: "Image plan" }, body: { ko: "대표 이미지, 지도, 메뉴판과 각 메뉴 사진의 순서를 글 구조와 정렬.", en: "Cover, map, menu and food images are sequenced to match the article structure." } },
      { title: { ko: "Final QA", en: "Final QA" }, body: { ko: "사실, 사진 매칭, 글자 수, 모바일 가독성과 임시저장 결과를 확인.", en: "Facts, image matching, length, mobile readability and saved-draft output are checked." } },
    ],
    before: { ko: "메뉴는 무엇부터 보면 좋을까요? 전체적으로 안정적인 선택이었어요.", en: "What should you order first? Overall, it was a reliable choice." },
    after: { ko: "카츠산도는 고기가 두꺼운데도 질기지 않았어요. 다만 식으면 튀김옷의 바삭함은 확실히 줄어서 먼저 먹는 편이 나았고요.", en: "The pork was thick without becoming tough. The crust softened as it cooled, so this was the plate to eat first." },
    decision: { ko: "검색용 정보와 실제 식탁의 판단을 한 문단에 섞지 않고, 사진에서 확인되는 근거를 중심으로 수정.", en: "Search information and table-side judgement were separated, then the paragraph was rebuilt around evidence visible in the photo." },
    images: [
      { src: "/media/process/writing/approved-blog-01.jpg", label: { ko: "메뉴 이미지 01", en: "Menu image 01" }, alt: { ko: "네이버 블로그에 사용한 승인 음식 사진", en: "Approved food photograph used in the Naver Blog package" }, note: { ko: "첫 메뉴 블록의 근거 이미지", en: "Evidence image for the first menu block" } },
      { src: "/media/process/writing/approved-blog-02.jpg", label: { ko: "메뉴 이미지 02", en: "Menu image 02" }, alt: { ko: "네이버 블로그에 사용한 두 번째 승인 음식 사진", en: "Second approved food photograph used in the Naver Blog package" }, note: { ko: "비교 메뉴의 맛과 식감을 연결", en: "Connects the comparison dish to taste and texture" } },
      { src: "/media/process/writing/approved-blog-03.jpg", label: { ko: "메뉴 이미지 03", en: "Menu image 03" }, alt: { ko: "네이버 블로그에 사용한 세 번째 승인 음식 사진", en: "Third approved food photograph used in the Naver Blog package" }, note: { ko: "글의 리듬을 바꾸는 디저트 이미지", en: "A dessert image that changes the article rhythm" } },
    ],
  },
];

export function pick(text: LocalizedText, language: Language) {
  return text[language] ?? text.en;
}

export function getEditorialCase(slug: string) {
  return editorialCases.find((item) => item.slug === slug);
}
