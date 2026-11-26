# Pitfalls: narration, voices and the mix

Voiceover, voices, take audio and loudness. Index: [pitfalls.md](pitfalls.md); on-camera lines are in [pitfalls-speech.md](pitfalls-speech.md).

**Narration rendered line by line**.
- Watch out for: one `elevenlabs.speech` call per narration line. The cyberpunk trailer rendered six lines separately on `eleven_multilingual_v2`: the 0.93 s two-word tag line came back sounding like different words, the six stems measured -18.4 to -22.7 LUFS (the tag line quietest) and were mixed as they were, and the ellipsis in "television... tuned" became a 1.2 s pause in mid-shot.
- Check: record the voiceover as one continuous read in the saved voice and cut it on its word times from `listen` (examples.md §3; card `vo-direction-and-delivery`). Render a line on its own only when it needs a different delivery, with the same voice and settings, and never a line under about 2 s by itself. `listen` each line with `expected_text`; bring the pieces to one loudness before the mix; write an ellipsis only where you want a pause.
- Why: a read in one breath keeps pitch, pace and level together; a two-word line alone has no context for the model to say it right.

**Character lines read flat**.
- Watch out for: each line sent bare in its own call, with no tag, no scene around it and default stability; then a flat read, one intensity throughout, the wrong emotion for the scene, or stress on the wrong word. One character's invitation, threat, reveal and button came back within 0.3 st and 0.5 dB of each other; a pain line ran 5.3 words/s with its first word the loudest; 26 of 30 lines had no tag.
- Check: write a performance note per line (what the character wants, the emotion, intensity, pace, the word to hit), turn it into tags, punctuation and stability, render on `eleven_v4` with the lines around it as `previous_text`/`next_text` (check each voice still sounds like its character, keep one model per character, and check every take with `expected_text`: at low stability v4 added words, repeating a tag line), take key lines three times and choose against the note: pass it as `delivery` to `listen` and to each `review` line, and read the measured `prosody` (pitch spread, level range, words per second, the loudest word; in `review` it is in the `listening` section, so name `sections` or ask `detail: "full"`) to catch a flat or rushed read. Hear it over the shot and under the score. Card `voice-performance-direction` ([wm://card/voice-performance-direction](wm://card/voice-performance-direction)).
- Why: an undirected line comes back in the voice's resting register. Direction works when given: one `[shouting]` line rose 13 semitones over the same character's soft line.

**Picture cut before the read**.
- Watch out for: new or directed reads dropped into a picture cut for the old ones. Directed reads ran 20-50% longer; 7-9 of 10 cyberpunk-trailer lines then crossed a cut mid-phrase, and the delivered space-station trailer paused 0.6-1.5 s inside lines.
- Check: lock the read and the score first (a radio edit), then cut each line over its own shot, with cuts between lines or on a hit and line-less shots absorbing the length. Trim accidental hesitations out of the line on its word times; keep written beats; never speed a read up. Use `compose`'s `cut_inside_speech` (`cut_to_s`) and `long_pause_inside_line` (`trim_s` at `file_s`); an L-cut in a pause is fine. Card `voice-performance-direction`.
- Why: the cyberpunk trailer's re-cut kept the title at 51.5 s by taking 0.5-1.45 s from line-less shots and 0.2 s from each montage shot; compose found 4 cuts inside phrases as shot and none after.

**Casting notes left unread**. The narrator's design prompt asked for "slow and deliberate"; the `listen` audition ranked it first while saying "the delivery is a bit too slow and lacks some cinematic punch", and every line was rendered in it unchanged. Leave "slow" out of a narrator's design prompt (pace comes from the read), describe a character's person rather than a mood or a place ("calm", "speaking softly" and "over a ship radio" stayed on every line), put the peak line in the preview, and act on what the listener says about the voice, by redesigning it or directing the read, before picture is cut to it.

**Narration timing and dead air.**
- Watch out for: a script far under the runtime's word budget, picture cut before the VO was measured, speech time-stretched to fit, music that starts late or ends early.
- Check: transcribe the rendered VO and use its word times; `listen` or `watch` `silence` for lead, tail and internal gaps. `review` reports silences of 1.5 s or more as `dead_air` on media up to 120 s (an observation, `off_target` when longer than your `max_dead_air_s`); room tone under scenes prevents them.
- Why: speech stretched beyond about 5% sounds processed; rewriting or re-rendering the line fits it cleanly. ElevenLabs cues ran 0.5-0.8 s late and 2-3.5 s short .

**Lines written for the eye**.
- Watch out for: an aside between commas inside a sentence, a tagline read as display fragments ("Acme. Made here. Runs anywhere."), a read cut into pieces and spaced out to fill the runtime, a take chosen by its length.
- Check: `listen` with `expected_text` on each take. `sentence_split` and `sentences_joined` name where the read breaks a line differently from the script. Choose between three or more takes on the hardest lines. `eleven_v3` and `eleven_v4` ignore SSML `<break>`: put sentences that must stand apart on their own lines or give the gap a `[short pause]` tag.
- Why: a reviewer called a payments spot's long line choppy and its tagline robotic.

**Voice drift between lines**. A fridge's voice changed mid-cut when one line was rendered alone at default settings. Check `listening` for voice changes, and render every line of a character with the same voice and `model_id`; vary only the tags and stability a line's delivery needs, and listen for the voice changing on the lowest-stability takes.

**A design preview shipped as the VO.** Previews are auditions. Nothing flags it for you: check that every VO line is a render of a saved voice, not a preview.

**Take audio left in the mix.** H3 takes carry their own sound; a take's footsteps at a fixed 0.3 under the narration were too loud for one rater. `listen` to the final mix, or let `review` run `listening`, and lower or replace generated foley that competes with the VO.

**Loudness off target.** One satire ad mastered at -22.6 LUFS. Check `watch` or `listen` `loudness` on the delivered file; more than 2 LU off target or true peak over the limit is a defect.
