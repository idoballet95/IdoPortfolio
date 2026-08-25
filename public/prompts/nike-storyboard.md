# STORYBOARD — Nike Mercurial "핑크" 30초 코미디 광고 (v2)

## 엘리먼트 매트릭스 (single source of truth)

| Cut | Characters | Environment | Props / Products |
|-----|-----------|-------------|------------------|
| 1 (0–15s)  | `yoonjae`, `rival10` | `futsal_night` | `mercurial-pink` |
| 2 (15–30s) | `yoonjae`, `rival10` | `futsal_night` | `mercurial-pink` |
| 엔드카드 (30–33s) | — | 스튜디오(정지) | `mercurial-pink` |

## Element ID 대장

| Tag | Element ID | 상태 |
|-----|-----------|------|
| `yoonjae` | `7c451541-a13d-47be-8c5d-0b7f891656f9` | ✅ 등록 완료 |
| `mercurial-pink` | `8d8e445b-1d86-4b6a-92a6-03fdd97fded7` | ✅ 등록 완료 |
| `rival10-1` (민혁, Codex 재생성 시트) | `6fc9e68f-ac45-4e2b-8f51-e533502a9606` | ✅ 등록 완료 (구 rival10 e33ae518는 미사용) |
| `futsal-night` | `e1e50942-ace9-4e64-9c8c-62d8caaaa490` | ✅ 등록 완료 (중복 987f1db1는 미사용) |

## 비디오 렌더 잡
| Cut | Job ID | 상태 |
|-----|--------|------|
| CUT 1 "조롱" | `9380356c-4875-47df-8739-ca7343f8e247` | 🔄 렌더 중 (67.5cr) |
| CUT 2 "증명+전향" | `856cc2bd-f85b-4536-bfbb-d0eb3458976b` | 🔄 렌더 중 (67.5cr) |
| 엔드카드 | Codex 생성 완료 → `images/2026-07-08/endcard-mercurial-01.png` | ✅ |

## 컷별 샷 설계 (Seedance 2.0, 16:9, duration 15, genre drama, 멀티샷 자율 커버리지)

### CUT 1 — "조롱 (셋업)" (M1 Narrative, 야간 풋살 코트)
- 야간 코트 설정샷 → 벤치의 윤재, 가방에서 핑크 머큐리얼 꺼냄 (제품 인서트 — 코트 조명 아래 유일한 채도), 코트가 잠깐 조용해짐
- 민혁(블랙 킷 #10) 씩 웃으며 다가옴: **"오~ 이쁘네? 오늘 눈에 확 띄겠다."** 뒤에서 팀원들 킥킥
- 윤재 태연하게 끈 당기고 일어서며 민혁 눈 보고 담담하게: **"잘 봐 둬. 오늘 이 색만 보일 거니까."** (셋업 라인)
- Last frame: 코트 라인을 밟는 핑크 부츠 클로즈업, 민혁 발(블랙)과 나란히
- 사운드: 밤 도시 앰비언스, 철망 소리, 킥킥 웃음, 끈 조이는 소리 — **no BGM**

### CUT 2 — "증명 + 전향" (M3 Action, 야간 풋살 코트)
- 킥오프 직후 폭발 스타트 — 윤재 급가속
- **민혁 POV 인서트: 핑크 잔상만 슉— 지나간다** (1차 회수) → 넛메그 96fps 슬로모, 민혁 헛돌아 비틀
- 수비 한 명 더 제치고 → 골! 네트 출렁
- 민혁 팀원 (헐떡): **"방금… 뭐가 지나간 거야?"** / 민혁 (홀린 듯): **"…핑크."** (2차 회수)
- 펀치라인 인서트: 벤치 뒤에 숨어 폰으로 핑크 머큐리얼 **'바로구매'** 누르는 민혁의 손 + 폰 알림음 (3차 회수·전향)
- Last frame: 폰 화면 속 핑크 신발, 뒤로 흐릿한 윤재 세리머니 보케
- 사운드: 스터드, 볼 임팩트, 함성, 잔상 휙 소리, 폰 결제 알림음 — **no BGM**

### 엔드카드 (정지 3초, 후반 합성)
- gpt_image_2: 제품 히어로 샷 + 메인 카피 **"보이는 건, 잔상뿐."** + 서브 "MERCURIAL VAPOR 17 — 속도를 신어라"

## 크로스체크 규칙
- 각 컷 프롬프트에 해당 행의 모든 Element `<<<id>>>` 필수 (yoonjae + rival10 + futsal_night + mercurial-pink)
- 기타 팀원들은 제네릭 엑스트라 ("background players, dark generic kits, no readable faces")
- CUT 2 폰 화면의 신발도 mercurial-pink 레퍼런스로 앵커

## 파이프라인 (남은 단계)
1. ✅ yoonjae / mercurial-pink Element 등록
2. 🔄 rival10 후보 2 + futsal_night 플레이트 생성 중
3. ⬜ 사용자: rival10 ①/② 선택 (스토리 승인 겸)
4. ⬜ rival10 / futsal_night Element 등록
5. ⬜ CUT 1–2 Seedance 2.0 렌더 (병렬)
6. ⬜ 엔드카드 생성
7. ⬜ 자막·합본(FULL.mp4) → BGM 1트랙(FULL_bgm.mp4)
