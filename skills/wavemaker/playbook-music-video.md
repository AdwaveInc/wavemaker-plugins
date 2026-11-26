## Music video

**What usually works.** The song leads: it is made or approved first and stays as it is. The picture is cut to it, and a finding is answered by re-cutting the picture, never by regenerating or re-editing the song (`listen` with `picture: true` and `lead: "music"` judges the cut against it). A sung song usually wants the singer on screen, lip-synced to the real song; lyric videos and montages suit instrumentals or explicit requests. Most videos intercut performance with a story or texture thread: verses about half performance, choruses around 70%, an instrumental bridge for the story's turn. Cuts on bars: about 2 bars per shot in verses, 1 in choruses, half bars on big hits, roughly runtime / 3-4 shots. Vocal framing as in the lip-sync entry (`read wm://capability/lip-sync`), mic below the chin. `listen` gives the sung words with times; bars follow from the BPM (240 / BPM seconds per bar) to cut against. A 90-120 s video commonly uses 19-27 takes (about one per 4.5 s), around 20 min wall in parallel.

**Graphs and pathways.** The gen-3 performance take: `MiniMaxH3ImageToVideo` (FL2VA weights, `first_frame`) + `LoadAudio` → `TrimAudioDuration` (window start on the global song clock, take length) → `MiniMaxH3AddGuide` (frame 0), `CreateVideo` muxing the same window. Windows of 2-4 bars, 2-3 angles per sung section, each at its window start so angles stay in sync. `pathway:music-video`, `pathway:music3`, `pathway:h3-chains` for longer scenes.

**Pitfalls.** Stills with lyrics read as a slideshow; wide singing shots hid working sync; one graph for a whole song exceeds the job limit; mouths moving in instrumental windows.

**Questions to ask of the cut.**
- Does the mouth open on sung syllables and rest in gaps?
- Does each take's trim start match its place on the song clock and cover the whole take?
- How much sung time shows the singer in sync, and is that the intended balance?
- Do cuts land on the music (`watch` `cuts` against the bar times, or `listen` with `picture: true` and `lead: "music"`), and does energy rise into choruses?
- Does the picture end on the last hit?
