# Playbooks

What has tended to work for each format, in a common order: not a procedure. Take what helps and skip what does not. Numbers are reference ranges from measured work; the brief and your judgment decide. Each format is its own short file, small enough to read whole. Models and tools: `read wm://capability/<id>` ([capabilities.md](capabilities.md) lists them); failures: [pitfalls.md](pitfalls.md); format cards: `search` `kinds: ["card"]`.

| Format | File |
| -- | -- |
| Ad or TV spot | [playbook-ad.md](playbook-ad.md) |
| Social short and UGC vertical | [playbook-social.md](playbook-social.md) |
| Display ad set | [playbook-display.md](playbook-display.md) |
| Music video | [playbook-music-video.md](playbook-music-video.md) |
| Narrative short or trailer | [playbook-narrative.md](playbook-narrative.md) |
| Long form (documentary, episode, explainer, over about 2 min) | [playbook-long-form.md](playbook-long-form.md) |
| Logo sting or bumper | [playbook-logo-sting.md](playbook-logo-sting.md) |
| Narrative stages, in detail | [playbook-narrative-prepare.md](playbook-narrative-prepare.md) (script, look, plates, keyframes), [playbook-narrative-shoot.md](playbook-narrative-shoot.md) (voice, takes), [playbook-narrative-cut.md](playbook-narrative-cut.md) (cut, finish, review and deliver) |

Shared craft for motion formats:
- **Concept first.** One idea a viewer can retell in a sentence beats a list of features. Try a few different shapes (world-building, comedic scenario, mock genre, demonstration, testimonial, emotional story) and ask whether a competitor could run it by swapping the logo.
- **Plan the cut before takes** against a clock (measured speech, bars or VO). Each take rendered about 1.5x the window it fills (defaults 1) gives the edit its choices.
- **Keyframe = the instant before the action**, at the shot's size and angle. Two sizes of a key action give the edit options; consecutive shots of one subject want about two sizes or 30° of change.
- **Sound from frame 1, an ending on a hit.** Web and social masters sit around -14 LUFS integrated, true peak at or below -1 dBTP; TV around -24 LKFS (-23 LUFS EBU).
- **Reference adaptation.** "Like this" or "the same but for X" usually means keep the reference's structure, pace, look, word shapes and sound and swap only what was named; "inspired by" means a mood board. Its pace is measurable: `watch` `cuts` gives its shot boundaries, `shot_sheet` each shot's frames for the breakdown, and their lengths give its median and spread to plan the new cut against; `review` with `reference: <sha256>` then measures both pieces the same way (shot counts, lengths and medians, both transcripts, a look profile, paired frames) so each gap is a change you can name or a miss to fix.
