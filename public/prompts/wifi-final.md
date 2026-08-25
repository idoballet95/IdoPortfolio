# 03 · 최종 프롬프트 — 20초 원컷 · 16:9 · 영어

## 힉스필드 Element (등록 완료)

| 태그 | Element 이름 | ID | 분류 |
|---|---|---|---|
| `@yoonjae-wifi` | yoonjae-wifi | `a4e11c17-7ed8-4a10-8fad-159c01020624` | character |
| `@wifi-room` | wifi-room | `bb938c84-95c1-4a67-82e1-9a852039b251` | environment |
| `@wifi-monitor-dead` | wifi-monitor-dead | `047ef7d1-b016-4a6c-aa25-d01de5ca4e14` | prop |
| `@wifi-router` | wifi-router | `ed2b757e-f3b5-4e3f-89fc-158acac041f0` | prop |
| `@wifi-window` | wifi-window | `47e6fd4d-44ff-4ac0-8d49-39fe76877f48` | environment |

## 호출 설정

```
model      : seedance_2_5
mode       : omni_reference
duration   : 20
aspect     : 16:9
resolution : 720p
generate_audio : true
```

## 대사 (영어 · 7줄)

| 시점 | 대사 | 톤 |
|---|---|---|
| 0–4s | `Please… please go in…` | 거의 속삭임 |
| 4–7s | — *(무음)* | **소리가 목에 걸려 안 나옴** |
| 7–10s | `…What? What— no, why did it stop!` | 참았던 숨이 새어나오며 |
| 10–13s | `Come on. Come on, buddy—` | 공유기한테 사정함 |
| 10–13s | `No. No, that's worse!` | LED 다 꺼짐 = 자기가 망침 |
| 13–16s | `One bar. Just one bar!` | 공유기 들고 창가로 |
| 16–20s | `…It went in? It went in!` → `…Oh. That wasn't for us.` | 기대 → **힘 빠진 붕괴** |

---

## ★ Seedance 2.5 prompt (4,991자)

```
Duration 20s, 16:9, one locked-off handheld take, no cuts. At 3am a man loses his internet the instant before a penalty is struck, makes it worse attacking his router, takes it to the window for signal, and is fooled by a roar outside.

[Source Roles]
@yoonjae-wifi defines the man's face, hair and skin, his navy track jacket over a white tee, navy track pants, white socks, black slides. Not the gray backdrop or poses. No logos - plain navy and white.
@wifi-room defines the room and its light: desk and curved ultrawide monitor at center x=60%, gaming chair, red football shirt on the wall above it, bed in the dark left corner, window right, the monitor its only light. Its screen sets the two teams - red against sky blue - for the whole video. Not the scoreboard; not the empty room - the @yoonjae-wifi man is in it.
@wifi-monitor-dead defines the frozen screen: tearing bands over the pitch, pale spinner at center. Not its framing.
@wifi-router defines the router - shape, antennas, amber and red LEDs, its cable. Not its orange wall or doorway; it sits on the floor at the desk's left end.
@wifi-window defines the view out the right window - apartment towers, scattered lit windows. Not its curtain.

[Plot]
0-4s - He sits on the chair edge at x=40%, leaning toward the monitor at x=60%, from behind his right shoulder. Screen light on half his face, hands at his mouth, knee bouncing. On screen a red-shirted taker stands over the ball, a sky blue keeper on the line. Whispering: {Please... please go in...} <clock ticking, fridge hum, muffled crowd noise>

4-7s - No dialogue. The red taker starts his run-up. @yoonjae-wifi comes half out of the chair, sucks in a breath, mouth opening, hands lifting toward chest height - the shout still in his throat. The instant before boot meets ball the screen stops dead and @wifi-monitor-dead takes over - tearing bands lock across that frame, the taker's leg mid-swing, a pale spinner turning. He stalls there: half standing, hands at chest height, mouth open on a sound that never comes. <crowd noise cut off mid-swell, then silence>

7-10s - The held breath leaks out of him, face blank, eyes on the spinner. Then his brows draw in, his hands drop, and he breaks: {...What? What - no, why did it stop!} He drops off the chair onto his knees where the @wifi-router sits and grabs it. Note: that first second is disbelief, not anger.

10-13s - On his knees at x=30%, he shakes the router, slaps it twice, then pleads with it: {Come on. Come on, buddy—} He pulls the power cable out and back in - and every LED dies at once. His face falls flat: {No. No, that's worse!} <palm on plastic, cable clicking, ragged breathing>

13-16s - He scrambles up with the router and carries it to the window, holding it to the glass: {One bar. Just one bar!} The cable snaps taut, stopping him half a step short, router held high. In that pose <a roar erupts from the apartment block outside - men shouting on several floors, clapping, a horn>. He freezes there.

16-20s - He lowers the router, turns to the @wifi-window, brows lifting: {...It went in? It went in!} Note: desperate hope, not certainty. Behind him the monitor returns, flooding the room blue. He spins around; on screen the same sky blue players sprint in a celebrating mass, the red taker face down on the grass. His smile drains away. The router slips from his hands and thuds on the floor. His knees give and he sinks down in front of the chair, out of the lower frame, leaving the empty chair and bright screen above him. Low and drained: {...Oh. That wasn't for us.} <roar continuing outside, monitor crowd noise over it> Held to the last frame.

[Global]
Face, hair and outfit identical for all 20s, no brand logo. He is the only person on screen; the roar outside is sound only, nobody visible through the window. Exactly two hands, one router. The same two kits for all 20s - red versus sky blue - never changing or swapping; his team is red, matching the shirt on his wall. Room geography never changes - router left, monitor center, window right. The monitor is the only light; the ceiling never lights. From 4s to 17s the screen is dead, the room darker and desaturated; at 17s the light returns and lifts both.
Camera: one wide master framing of the @wifi-room held all 20s - router left, monitor center, window right always in frame. It never pans or changes position; only the man moves. A shallow push-in at 7-10s eases out by 13s. 24mm, 35mm grain, shallow DOF, 24fps.
Skin matte - no shine, real pores, never plastic; shadows keep detail.
Audio diegetic only. His lines are natural conversational English with precise mouth shapes; the final line low, slow, drained.
Prohibited: no music, soundtrack, subtitles, on-screen text, numbers, scoreboard or logo, no dialogue beyond the lines given, no camera pans, no cutting, no pratfalls, no ceiling light, no second person, nobody outside the window, no celebrating before the kick; the screen must not return before 17s.
```

---

## 4–7초를 이렇게 고친 이유

공이 아직 발에 닿지도 않았는데 만세를 하고 있었습니다. **환호가 아니라 환호 직전에서 끊겨야** 합니다.

| 순서 | 화면 | 윤재 |
|---|---|---|
| 키커 런업 시작 | 빨간 유니폼 선수가 달려온다 | 의자에서 반쯤 일어남, **숨을 들이켬**, 입이 벌어짐, 손이 가슴 높이까지 올라감 |
| **발이 공에 닿기 직전** | 화면 정지 (다리가 스윙 중인 채로) | — |
| 정지 후 | 로딩 스피너 | 반쯤 선 채, 손은 가슴 높이에 멈춘 채, **입은 벌어졌는데 소리가 안 나옴** |

`mouth open on a sound that never comes` — 이 한 줄이 이 컷의 전부입니다.
그리고 7초에 **참았던 숨이 새어나오면서** 다음 대사가 시작됩니다.

금지 블록에도 `no celebrating before the kick`을 넣어 못 박았습니다.

## 유니폼이 바뀌지 않게 하는 장치

| 위치 | 문구 |
|---|---|
| `@wifi-room` 선언 | 화면 속 두 팀을 **red vs sky blue**로 정의 |
| 0–4s | `a red-shirted taker`, `a sky blue keeper` |
| 4–7s | 프리즈는 **that frame, the taker's leg mid-swing** |
| 16–20s | 복구 화면도 **the same sky blue players**, **the red taker** |
| Global | 20초 내내 킷이 바뀌거나 뒤바뀌지 않음 + 그의 팀은 빨강 |

## 렌더 후 체크

- [ ] **4–7초에 환호를 다 하지 않고 중간에 끊기는가** ← 이번 수정의 핵심
- [ ] 공이 발에 닿기 **직전**에 화면이 멈추는가
- [ ] 멈춘 뒤 입이 벌어진 채 소리가 안 나오는가
- [ ] **17초 이전에 화면이 켜지지 않았는가** ← 반전의 생사
- [ ] 멈추기 전과 복구 후의 유니폼이 같은가 (빨강 vs 하늘색)
- [ ] 카메라가 방을 가로질러 팬하지 않는가
- [ ] 마지막에 카메라가 멈춰 있고 그가 프레임 아래로 빠지는가
- [ ] 옷에 스우시가 안 보이는가 / 화면에 스코어보드가 안 뜨는가
- [ ] BGM·자막이 없는가

## 마무리

영어 대사니까 한국어 자막을 얹습니다 — `skills/bilingual-video-subtitles/`
