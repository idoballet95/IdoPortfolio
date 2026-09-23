# Yena × Frozen Market — Seedance 2.5 입력용 프롬프트

**수정본 · 30초 · 9:16 · 오디오 ON.** 화실에서 전화가 오고, 예나가 **밖으로 뛰어나간 뒤**, 대부분의 사건은 1660년대 델프트 **야외 거리**에서 벌어진다. **마지막 프레임은 CTA 종이만** 보여준다. 첨부 이미지는 **`SEEDANCE25_INPUTS/` 폴더의 5장만**, 아래 번호 순서대로 사용한다. 프롬프트는 원본 벤치마크의 `소재 → 원테이크 → 글로벌 → 4단계 → 일관성` 구조를 따른다. 영상 생성은 미실행.

| 태그 | 승인 이미지 | 사용할 것 / 제외할 것 |
|---|---|---|
| `@image1` | `SEEDANCE25_INPUTS/image1-yena-delft.png` | 예나 얼굴·땋은 머리·시대 의상 / 시트 배경·포즈·라벨 제외 |
| `@image2` | `SEEDANCE25_INPUTS/image2-delft-painter.png` | 극화 화가 얼굴·의상 / 시트 배경 제외 |
| `@image3` | `SEEDANCE25_INPUTS/image3-pearl-sitter.png` | 극화 모델·작은 귀걸이 / 시트 배경 제외 |
| `@image4` | `SEEDANCE25_INPUTS/image4-fairy-phone.png` | 검은 폰·통화 UI / 제품 시트 배경 제외 |
| `@image5` | `SEEDANCE25_INPUTS/image5-cta-paper-Art.png` | 가로형 종이·수정된 3줄 문구 / 제품 시트 배경 제외 |

```text
@image1: Yena's face, long dark braid, indigo bodice, ivory collar/cuffs, long brown skirt, low shoes; not sheet poses/panels/background.
@image2: fictional painter's face/clothes, not sheet background; he stays indoors.
@image3: fictional sitter's face, blue-yellow headwrap, ochre jacket, SMALL close-to-ear pearl, no metal hook; not sheet background; she stays indoors.
@image4: ONE black phone, UI “FAIRY GODMOTHER” / “RETURN WINDOW CLOSING”; not product-sheet background.
@image5: ONE landscape off-white paper, exact centered serif text below; not product-sheet background.

ONE CONTINUOUS SHOT, no cuts, transitions, hidden edits, lens or sensor changes. One unseen external handheld camera follows Yena; the phone in her hand is a separate prop.

[Global Settings]
Delft circa 1665, natural daylight, photoreal handheld footage, one moderately wide lens. A modest studio opens directly onto a canal-side cobbled street; its wooden door remains OPEN. Outside: brick stepped-gable houses, leaded windows, stone bridge, canal and distant period-dressed walkers; no modern vehicles/signs/clothes. The portrait on its easel is a few steps inside; painter and sitter remain indoors. The camera can travel through the door without a cut. Yena holds @image4 at her right ear and a worn sketchbook under her left arm, with ONE @image5 paper visible inside from frame one. Fairy is voice-only through the phone. Phone/time-stop are time-travel exceptions. Yena speaks natural American English; Fairy is dry and phone-compressed.

[Stage 1 | 0–10s — call, exit, outdoor run]
0–2s: phone vibrates at the studio doorway. Yena answers. Painter, sitter and portrait are briefly visible behind her. Fairy: {Yena, your return window is closing. Did you get the secret of the pearl earring?}
2–6s: while Fairy finishes, Yena RUNS OUT through the open door; the camera follows from her left. Painter, sitter, canvas recede indoors.
6–10s: Yena races along the canal, with historic Delft street clearly visible. Wide eyes, short breath, tight grip on sketchbook: {Oh, fudge. I’m almost there! Yes!! Vermeer painted it twi—} Never complete “twice.”
Endstate: Yena and camera OUTDOORS; raised cobblestone ahead of her right shoe.

[Stage 2 | 10–12s — outdoor trip and freeze]
Her right shoe catches the raised STREET cobble. Momentum pitches her away from the canal; braid/skirt follow. Phone leaves hand, sketchbook opens, its ONE paper slips out. At “twi—”, before landing, Yena, phone, paper, dust, walkers and canal ripples freeze. Street sound stops; no cut or flash.
Endstate: Yena mid-fall OUTDOORS, one phone/paper suspended, Delft street behind.

[Stage 3 | 12–25s — frozen outdoor FPV, phone, paper]
Only the SAME filming camera moves. 12–14s: rise above frozen Yena to reveal the still canal, bridge, cobbled street and period-dressed walkers. 14–16s: dive to her unfinished-word comic face. 16–18s: glide past the ONE suspended @image4 phone, with “FAIRY GODMOTHER” and “RETURN WINDOW CLOSING” readable. 18–21s: move through frozen dust and past the open sketchbook toward the SAME floating @image5 paper. Remain OUTDOORS throughout. By 21s face the paper nearly straight on; hold large and sharp to 25s. Its ONLY printing:
Follow me if you love
Art or Yena
or BOTH
Endstate: camera close to paper OUTDOORS. Never return to Yena after reaching it.

[Stage 4 | 25–30s — resume and END ON PAPER]
Time resumes without flash. Yena lands safely OFFSCREEN; phone/sketchbook fall. The ONE landscape paper lands face-up on cobbles. Camera follows and holds a perpendicular CLOSE-UP through FINAL FRAME. Fairy offscreen, through fallen phone: {Two brushstrokes. Not twice.} Yena offscreen: {I knew that!} Never show either speaker again. FINAL IMAGE: ONLY readable CTA paper on outdoor cobbles.

[Maintain Consistency]
One Yena/painter/sitter/phone/sketchbook/CTA paper. Painter, sitter, canvas stay inside; fall/freeze/ending stay outside. Door/street/canal remain spatially continuous. Objects resume from frozen coordinates. Steps, breath, cloth, faint street/canal ambience, paper, soft landing; non-musical freeze hush. No BGM, subtitles, overlays, logos or watermark. Only phone UI and exact CTA text are legible. END ON PAPER, never a person or wide shot.
```

**벤치마크 대조:** 전화 → 야외 추격 → 넘어짐·시간정지 → 얼어붙은 주변·얼굴·전화 화면 → 서류. 추가했던 캔버스 접사는 삭제했다. 종이를 본 후 원위치로 돌아가는 동작은 사용자 지정 **서류 엔딩**과 충돌하므로 제외. 문구는 `Follow me if you love / Art or Yena / or BOTH`, 마침표 없음.
