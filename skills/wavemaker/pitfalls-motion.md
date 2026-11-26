# Pitfalls: takes that move

H3 takes and how they are cut. Index: [pitfalls.md](pitfalls.md).

**"Slowly", "gently" and a push-in as the only motion**.
- Watch out for: "slowly", "gently", "softly", "drifts" or "the camera holds" in a shot prompt, or a push-in as the only movement. A trailer's 7 "slowly" shots measured a frame difference of 1.6-7.6, its 2 fast ones 23-30. A short put those words in 20 of 28 prompts and review found 21 of 29 shots near-static; the 8 that moved had a plain action and no soft word.
- Check: each take has one clear action at a natural pace, of a kind H3 holds (travel in frame terms, a sharp head turn, a stride toward camera, a car swerving, water). A gentle story gets its calm from the look, the score and the cut, not motion adverbs. Watch each filmstrip at its real frame rate.

**Stacked fast actions that melt faces**.
- Watch out for: two or more physical actions and speed words packed into one take to raise measured motion. A rule asking for that on every take raised delivered films' median motion by about 47%, and at full size faces smeared and deformed in the fast moments (the lead's mouth and eyes, a co-star's face). Re-running the same takes at 20 steps did not remove the smear; prompting the same shots calm kept faces sharp but often lost the action.
- Check: one clear action per take; on face shots, a small beat or a camera behaviour chosen for the moment; fast body action on wide shots. Look at faces mid-motion at full size before keeping a take, and retake one that smears.
- Why: a face that melts reads as AI at once and costs more than a shot that moves a little less.

**Dialogue shots held still for the line**.
- Watch out for: speaking takes prompted as the line plus "keeps still while he speaks" or one glance. Dialogue is most of a scripted short's runtime, so still deliveries fill the cut with drifting stills.
- Check: give a speaking take one reason to be alive: a small beat around the line, or a camera behaviour chosen for this moment. A locked shot with a good performance is fine, and a dark or red-lit close-up may need more than a body beat. Listen each take for extra words after the line.
- Why: a move used by habit reads as a tic. In a D1 comedy 22 of 53 shots pushed in and 1 pulled back, after this page asked for a camera move on every speaking take on the strength of a frame-difference score no viewer checked.

**Slowed playback to fill a window** (trailers at 0.6-0.85x, launch films at 0.7-0.8x). The renderer makes no new frames, so a 24 fps take at 0.7x repeats 3 frames in 10 and judders. Make each take at least 1.5x the window, cut the moving middle, and keep `playbackRate` at 1.0 or above; when a scene outruns its clip, shorten it, start the clip earlier, make a longer take, or end on a hold you mean. Compose reports `slowed_footage` under 0.9 of the cut's frame rate (a 16 fps take in a 24 fps cut too); `review` reports `repeated_frames` as a defect. A meant speed ramp is `props.rateSegments` (with `sourceWallDurationS`). Slowing does not hide fast elements either (below).

**Takes that run into white**. A "white flash" asked of H3 gave a take that began whitening at about 0.7 s and never came back; the cut used it from 1.5 s, so the shot was blown out, and `compare` preferred that take for showing the flash. `watch` flags `whiteout` stretches and leaves them out of `usable_windows`; `review` calls a shot that runs into white a defect. Cut the take before it washes out, or use the other take.

**Travel against the keyframe**.
- Watch out for: travel the keyframe does not face, or a subject moving rear-first. The swimmer faced the camera in both underwater keyframes; told to "shoot forward toward frame left", she swam into the lens in all four takes and her dark back, lit from above, filled the frame as a silhouette. A truck reversed toward camera with fine end frames.
- Check: the keyframe faces the way the subject travels (restage it in profile for lateral travel), or it travels the way it faces with the camera tracking "so it stays the same size" (the short's k24 so held in both 1088 takes). Or `watch` `motion` with the intended `direction` and `facing` (`flagged` fails).

**A take that drops its keyframe's key image** (a trailer).
- Watch out for: what makes the keyframe turning ordinary mid-take. A trailer's TV-static sky became clouds within a second of its H3 take, and the agent read the `cuts` it caused as "static flicker"; a character's inset chrome lenses became sunglasses; a jumping spider became another species mid-drop.
- Check: `watch` `keyframe` with the still the take was made from puts its first, 1/4, middle, 3/4 and last frames beside the keyframe on one sheet, with each frame's similarity after the camera move and the regions where it `differs`. Those regions are where to look, not defects: about half the faithful takes show some. For a second opinion, `compare` the take with `keep: ["TV-static sky"]`, the keyframe as `against.reference` and the shot prompt as `brief`. Its answers (`kept`, `changed`, `gone`, `left`) are unmeasured so far: evidence to check, not a retake by themselves. A `cuts` hit inside a take made from one still is the moment to look. Faces against plates stay `compare` `identity`.

**Lettering in generated motion** (a four-letter brand name misspelled in the launch films;).
- Watch out for: text a take must carry (a product name, a sign, a screen) or invents. H3 redraws type every frame, so it drifts to near-words.
- Check: put words that must read on the reviewed keyframe (and last frame with FL2VA) or in a `compose` text layer; keep invented signage small or out of focus. Declare them in `review`'s `expected_text` (text, `start_s`/`end_s`, optional `region`): `text` reports `text_misspelled` or `text_not_found`, and `looking` notes undeclared near-words as `pseudo_text`.
- Why: one wrong letter in a brand name voids the piece.

**Fast elements in H3 takes.** Steam, water and smoke can move at about 3x real speed in H3 Turbo takes, and slowing to 0.8x did not hide it. Check a take's filmstrip at its real frame rate, or `review` `looking` (its `motion` findings), and cut away or retake rather than retime.

**Morphing on body actions.** Sitting, standing, kneeling, dressing, hand-overs and walking into close-up tend to morph in H3. Check hands, cloth and faces mid-take; show the state before or after and let the cut imply the action.

**Long chained takes.** In motion-context chains a prompt that contradicts the pinned frames renders both (a union), a motionless hold reads as a freeze, timecodes land 0.92 s early after the pinned head is trimmed, and quality falls off past about 40-60 s (community reports). Hold the old framing before changing, give the hold motion, mix ambience rather than prompting it, and prefer cuts for long pieces (card `chain-h3-windows`).

**Re-camera moves that start at the source pose**.
- Watch out for: a keyframed `h3-recamera-crossview` move whose first keyframe is at or near 0°/0°. It leaked the warp's magenta holes into the output as purple streaks and painted the trigger word "crossview" as on-screen text.
- Check: frames across the whole take for purple patches and stray lettering, and revealed areas for invented buildings or moved objects.
- Why: a warp almost identical to the source confuses the LoRA. The same move starting about 15-20° off the source, with a prompt naming what the new view reveals, rendered cleanly.
