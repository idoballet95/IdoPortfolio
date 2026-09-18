import type { LocalizedText } from "./portfolio-evidence";
import savedOrder from "./image-order.json";

export type ImageCategory = "people" | "experiment" | "type";

export interface ImageWork {
  src: string;
  /** Aspect ratio hint for the masonry grid */
  orientation: "landscape" | "portrait";
  alt: LocalizedText;
}

export const imageCategories: Array<{ key: ImageCategory; ko: string; en: string }> = [
  { key: "experiment", ko: "실험", en: "Experiment" },
  { key: "people", ko: "인물", en: "People" },
  { key: "type", ko: "폰트 테스팅", en: "Type" },
];

const base = "/media/images";

const defaultWorks: Record<ImageCategory, ImageWork[]> = {
  type: [
    { src: `${base}/type/nail-with-klimt-judith-01.jpg`, orientation: "landscape", alt: { ko: "Nail with Klimt's Judith 타이틀 01", en: "Nail With Klimt Judith 01" } },
    { src: `${base}/type/nail-with-klimt-judith-02.jpg`, orientation: "landscape", alt: { ko: "Nail with Klimt's Judith 타이틀 02", en: "Nail With Klimt Judith 02" } },
    { src: `${base}/type/yena-in-art-cutout.jpg`, orientation: "landscape", alt: { ko: "YENA IN ART — 컷아웃", en: "Yena In Art Cutout" } },
    { src: `${base}/type/yena-in-art-brush.jpg`, orientation: "landscape", alt: { ko: "YENA IN ART — 브러시", en: "Yena In Art Brush" } },
    { src: `${base}/type/yena-in-art-3d.jpg`, orientation: "landscape", alt: { ko: "YENA IN ART — 3D", en: "Yena In Art 3D" } },
    { src: `${base}/type/hangul-milk-poster.jpg`, orientation: "landscape", alt: { ko: "한글 우유 포스터", en: "Hangul Milk Poster" } },
    { src: `${base}/type/just-vitamins-retro.jpg`, orientation: "landscape", alt: { ko: "JUST VITAMINS — 레트로 오프셋 타이포", en: "JUST VITAMINS — retro offset type" } },
    { src: `${base}/type/just-vitamins-glass.jpg`, orientation: "landscape", alt: { ko: "JUST VITAMINS — 유리 캡슐 타이포", en: "JUST VITAMINS — glass capsule type" } },
    { src: `${base}/type/just-vitamins-gummy.jpg`, orientation: "landscape", alt: { ko: "JUST VITAMINS — 젤리 타이포", en: "JUST VITAMINS — gummy type" } },
    { src: `${base}/type/just-vitamins-capsule.jpg`, orientation: "landscape", alt: { ko: "JUST VITAMINS — 캡슐 안 골드 타이포", en: "JUST VITAMINS — gold type inside a capsule" } },
  ],
  people: [
    { src: `${base}/people/yena-magazine-02.jpg`, orientation: "portrait", alt: { ko: "YENA 매거진 커버 룩 02", en: "YENA magazine cover look 02" } },
    { src: `${base}/people/library-portrait.jpg`, orientation: "landscape", alt: { ko: "서재 포트레이트", en: "Library Portrait" } },
    { src: `${base}/people/cat-and-tv-01.jpg`, orientation: "portrait", alt: { ko: "고양이와 TV 01", en: "Cat And Tv 01" } },
    { src: `${base}/people/cat-and-tv-02.jpg`, orientation: "portrait", alt: { ko: "고양이와 TV 02", en: "Cat And Tv 02" } },
    { src: `${base}/people/athlete-face-01.jpg`, orientation: "landscape", alt: { ko: "애슬릿 페이스 스터디 01", en: "Athlete Face 01" } },
    { src: `${base}/people/athlete-face-02.jpg`, orientation: "landscape", alt: { ko: "애슬릿 페이스 스터디 02", en: "Athlete Face 02" } },
    { src: `${base}/people/athlete-face-03.jpg`, orientation: "landscape", alt: { ko: "애슬릿 페이스 스터디 03", en: "Athlete Face 03" } },
    { src: `${base}/people/athlete-face-04.jpg`, orientation: "landscape", alt: { ko: "애슬릿 페이스 스터디 04", en: "Athlete Face 04" } },
    { src: `${base}/people/athlete-face-05.jpg`, orientation: "landscape", alt: { ko: "애슬릿 페이스 스터디 05", en: "Athlete Face 05" } },
    { src: `${base}/people/athlete-face-06.jpg`, orientation: "landscape", alt: { ko: "애슬릿 페이스 스터디 06", en: "Athlete Face 06" } },
    { src: `${base}/people/silver-grandma-street-01.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 스트리트 01", en: "Silver Grandma Street 01" } },
    { src: `${base}/people/silver-grandma-street-02.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 스트리트 02", en: "Silver Grandma Street 02" } },
    { src: `${base}/people/silver-grandma-portrait-01.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 포트레이트 01", en: "Silver Grandma Portrait 01" } },
    { src: `${base}/people/silver-grandma-portrait-02.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 포트레이트 02", en: "Silver Grandma Portrait 02" } },
    { src: `${base}/people/silver-grandma-portrait-03.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 포트레이트 03", en: "Silver Grandma Portrait 03" } },
    { src: `${base}/people/silver-grandma-bench-01.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 벤치 시리즈 01", en: "Silver Grandma Bench 01" } },
    { src: `${base}/people/silver-grandma-bench-02.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 벤치 시리즈 02", en: "Silver Grandma Bench 02" } },
    { src: `${base}/people/silver-grandma-bench-03.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 벤치 시리즈 03", en: "Silver Grandma Bench 03" } },
    { src: `${base}/people/silver-grandma-bench-04.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 벤치 시리즈 04", en: "Silver Grandma Bench 04" } },
    { src: `${base}/people/silver-hair-portrait.jpg`, orientation: "portrait", alt: { ko: "실버 헤어 클래식 포트레이트", en: "Silver Hair Portrait" } },
    { src: `${base}/people/locker-room-01.jpg`, orientation: "portrait", alt: { ko: "라커룸 필름 스냅 01", en: "Locker Room 01" } },
    { src: `${base}/people/locker-room-02.jpg`, orientation: "portrait", alt: { ko: "라커룸 필름 스냅 02", en: "Locker Room 02" } },
    { src: `${base}/people/locker-room-03.jpg`, orientation: "portrait", alt: { ko: "라커룸 필름 스냅 03", en: "Locker Room 03" } },
    { src: `${base}/people/locker-room-04.jpg`, orientation: "portrait", alt: { ko: "라커룸 필름 스냅 04", en: "Locker Room 04" } },
    { src: `${base}/people/locker-room-05.jpg`, orientation: "portrait", alt: { ko: "라커룸 필름 스냅 05", en: "Locker Room 05" } },
    { src: `${base}/people/locker-room-06.jpg`, orientation: "portrait", alt: { ko: "라커룸 필름 스냅 06", en: "Locker Room 06" } },
    { src: `${base}/people/grid-dress-01.jpg`, orientation: "portrait", alt: { ko: "그리드 드레스 룩북 01", en: "Grid dress lookbook 01" } },
    { src: `${base}/people/grid-dress-02.jpg`, orientation: "portrait", alt: { ko: "그리드 드레스 룩북 02", en: "Grid dress lookbook 02" } },
    { src: `${base}/people/grid-dress-03.jpg`, orientation: "portrait", alt: { ko: "그리드 드레스 룩북 03", en: "Grid dress lookbook 03" } },
    { src: `${base}/people/grid-dress-04.jpg`, orientation: "portrait", alt: { ko: "그리드 드레스 룩북 04", en: "Grid dress lookbook 04" } },
    { src: `${base}/people/grid-dress-05.jpg`, orientation: "portrait", alt: { ko: "그리드 드레스 룩북 05", en: "Grid dress lookbook 05" } },
    { src: `${base}/people/grid-dress-06.jpg`, orientation: "portrait", alt: { ko: "그리드 드레스 룩북 06", en: "Grid dress lookbook 06" } },
    { src: `${base}/people/orange-armchair.jpg`, orientation: "portrait", alt: { ko: "오렌지 벨벳 암체어 에디토리얼", en: "Orange velvet armchair editorial" } },
    { src: `${base}/people/yena-magazine.jpg`, orientation: "portrait", alt: { ko: "YENA 매거진 커버 룩", en: "YENA magazine cover look" } },
    { src: `${base}/people/yame-street.jpg`, orientation: "portrait", alt: { ko: "YAME 스트리트 스냅", en: "YAME street snap" } },
    { src: `${base}/people/alley-bouquet.jpg`, orientation: "portrait", alt: { ko: "골목 부케 스냅", en: "Alley bouquet snap" } },
    { src: `${base}/people/linen-dress.jpg`, orientation: "portrait", alt: { ko: "리넨 드레스 스튜디오", en: "Linen dress studio" } },
    { src: `${base}/people/street-burger.jpg`, orientation: "portrait", alt: { ko: "계단 버거 스냅", en: "Street burger snap" } },
    { src: `${base}/people/pink-cardigan.jpg`, orientation: "portrait", alt: { ko: "핑크 가디건 스냅", en: "Pink cardigan snap" } },
  ],
  experiment: [
    { src: `${base}/experiment/cleat-hero.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 히어로", en: "2026 World Cup Cleat Hero" } },
    { src: `${base}/experiment/puffer-cape-01.jpg`, orientation: "portrait", alt: { ko: "폴카닷 퍼퍼 케이프 01", en: "Polka-dot puffer cape 01" } },
    { src: `${base}/experiment/puffer-cape-02.jpg`, orientation: "portrait", alt: { ko: "폴카닷 퍼퍼 케이프 02", en: "Polka-dot puffer cape 02" } },
    { src: `${base}/experiment/candy-forest-01.jpg`, orientation: "landscape", alt: { ko: "캔디 포레스트 튤 01", en: "Candy forest tulle 01" } },
    { src: `${base}/experiment/candy-forest-02.jpg`, orientation: "landscape", alt: { ko: "캔디 포레스트 튤 02", en: "Candy forest tulle 02" } },
    { src: `${base}/experiment/candy-forest-03.jpg`, orientation: "portrait", alt: { ko: "캔디 포레스트 튤 03", en: "Candy forest tulle 03" } },
    { src: `${base}/experiment/candy-forest-04.jpg`, orientation: "portrait", alt: { ko: "캔디 포레스트 튤 04", en: "Candy forest tulle 04" } },
    { src: `${base}/experiment/candy-forest-05.jpg`, orientation: "landscape", alt: { ko: "캔디 포레스트 튤 05", en: "Candy forest tulle 05" } },
    { src: `${base}/experiment/candy-forest-06.jpg`, orientation: "portrait", alt: { ko: "캔디 포레스트 튤 06", en: "Candy forest tulle 06" } },
    { src: `${base}/experiment/candy-forest-07.jpg`, orientation: "portrait", alt: { ko: "캔디 포레스트 튤 07", en: "Candy forest tulle 07" } },
    { src: `${base}/experiment/candy-forest-08.jpg`, orientation: "portrait", alt: { ko: "캔디 포레스트 튤 08", en: "Candy forest tulle 08" } },
    { src: `${base}/experiment/klimt-gold-room-01.jpg`, orientation: "landscape", alt: { ko: "클림트 골드 거실 01", en: "Klimt Gold Room 01" } },
    { src: `${base}/experiment/klimt-gold-room-02.jpg`, orientation: "landscape", alt: { ko: "클림트 골드 거실 02", en: "Klimt Gold Room 02" } },
    { src: `${base}/experiment/klimt-gold-room-03.jpg`, orientation: "landscape", alt: { ko: "클림트 골드 거실 03", en: "Klimt Gold Room 03" } },
    { src: `${base}/experiment/empty-arena-passage.jpg`, orientation: "landscape", alt: { ko: "빈 경기장 통로", en: "Empty Arena Passage" } },
    { src: `${base}/experiment/rooftop-basketball-01.jpg`, orientation: "landscape", alt: { ko: "옥상 농구 코트 01", en: "Rooftop Basketball 01" } },
    { src: `${base}/experiment/pool-harbor.jpg`, orientation: "landscape", alt: { ko: "항구 위 수영장", en: "Pool Harbor" } },
    { src: `${base}/experiment/pink-running-passage.jpg`, orientation: "landscape", alt: { ko: "핑크 러닝 통로", en: "Pink Running Passage" } },
    { src: `${base}/experiment/canyon-pool.jpg`, orientation: "landscape", alt: { ko: "협곡 수영장", en: "Canyon Pool" } },
    { src: `${base}/experiment/rooftop-basketball-02.jpg`, orientation: "landscape", alt: { ko: "옥상 농구 코트 02", en: "Rooftop Basketball 02" } },
    { src: `${base}/experiment/rooftop-tennis.jpg`, orientation: "landscape", alt: { ko: "옥상 테니스 코트", en: "Rooftop Tennis" } },
    { src: `${base}/experiment/fruit-world-01.jpg`, orientation: "landscape", alt: { ko: "과일 음료 월드 01", en: "Fruit World 01" } },
    { src: `${base}/experiment/fruit-world-02.jpg`, orientation: "landscape", alt: { ko: "과일 음료 월드 02", en: "Fruit World 02" } },
    { src: `${base}/experiment/fruit-world-03.jpg`, orientation: "landscape", alt: { ko: "과일 음료 월드 03", en: "Fruit World 03" } },
    { src: `${base}/experiment/fruit-world-04.jpg`, orientation: "landscape", alt: { ko: "과일 음료 월드 04", en: "Fruit World 04" } },
    { src: `${base}/experiment/fruit-world-05.jpg`, orientation: "landscape", alt: { ko: "과일 음료 월드 05", en: "Fruit World 05" } },
    { src: `${base}/experiment/fruit-world-06.jpg`, orientation: "landscape", alt: { ko: "과일 음료 월드 06", en: "Fruit World 06" } },
    { src: `${base}/experiment/fruit-world-07.jpg`, orientation: "landscape", alt: { ko: "과일 음료 월드 07", en: "Fruit World 07" } },
    { src: `${base}/experiment/grapefruit-splash-01.jpg`, orientation: "landscape", alt: { ko: "자몽 스플래시 01", en: "Grapefruit Splash 01" } },
    { src: `${base}/experiment/grapefruit-bubble.jpg`, orientation: "portrait", alt: { ko: "자몽 버블", en: "Grapefruit Bubble" } },
    { src: `${base}/experiment/grapefruit-splash-02.jpg`, orientation: "landscape", alt: { ko: "자몽 스플래시 02", en: "Grapefruit Splash 02" } },
    { src: `${base}/experiment/yuzu-mascot.jpg`, orientation: "portrait", alt: { ko: "유자 버블 마스코트", en: "Yuzu Mascot" } },
    { src: `${base}/experiment/mango-mascot.jpg`, orientation: "portrait", alt: { ko: "망고 버블 마스코트", en: "Mango Mascot" } },
    { src: `${base}/experiment/peach-mascot.jpg`, orientation: "portrait", alt: { ko: "복숭아 버블 마스코트", en: "Peach Mascot" } },
    { src: `${base}/experiment/fruit-ice-texture.jpg`, orientation: "portrait", alt: { ko: "과일 얼음 텍스처", en: "Fruit Ice Texture" } },
    { src: `${base}/experiment/nyc-apartment.jpg`, orientation: "landscape", alt: { ko: "NYC 아파트 세트", en: "Nyc Apartment" } },
    { src: `${base}/experiment/cleat-detail.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 디테일", en: "Cleat Detail" } },
    { src: `${base}/experiment/cleat-01.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 01", en: "Cleat 01" } },
    { src: `${base}/experiment/cleat-02.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 02", en: "Cleat 02" } },
    { src: `${base}/experiment/cleat-03.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 03", en: "Cleat 03" } },
    { src: `${base}/experiment/cleat-04.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 04", en: "Cleat 04" } },
    { src: `${base}/experiment/cleat-05.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 05", en: "Cleat 05" } },
    { src: `${base}/experiment/cleat-06.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 06", en: "Cleat 06" } },
    { src: `${base}/experiment/cleat-07.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 07", en: "Cleat 07" } },
    { src: `${base}/experiment/cleat-08.jpg`, orientation: "landscape", alt: { ko: "2026 월드컵 클리트 08", en: "Cleat 08" } },
    { src: `${base}/experiment/paper-flowers-blue.jpg`, orientation: "landscape", alt: { ko: "종이 꽃 세트 — 블루", en: "Paper flower set — blue" } },
    { src: `${base}/experiment/paper-flowers-pink.jpg`, orientation: "landscape", alt: { ko: "종이 꽃 세트 — 핑크", en: "Paper flower set — pink" } },
  ],
};

/** Apply the hand-curated order saved from the browser sort mode (unknown items keep their default position at the end). */
function applyOrder(items: ImageWork[], order: string[] | undefined) {
  if (!order?.length) return items;
  const rank = new Map(order.map((src, index) => [src, index]));
  return [...items].sort((a, b) => (rank.get(a.src) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.src) ?? Number.MAX_SAFE_INTEGER));
}

const orderByCategory = savedOrder as Partial<Record<ImageCategory, string[]>>;

export const imageWorks: Record<ImageCategory, ImageWork[]> = {
  people: applyOrder(defaultWorks.people, orderByCategory.people),
  experiment: applyOrder(defaultWorks.experiment, orderByCategory.experiment),
  type: applyOrder(defaultWorks.type, orderByCategory.type),
};
