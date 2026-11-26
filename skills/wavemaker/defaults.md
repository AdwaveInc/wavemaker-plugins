# House defaults in full

The detail, evidence and alternatives behind the short defaults in `SKILL.md`, by the same numbers.
Read the entry you need.
Everything here is a default, not a rule: the hard rules are in `SKILL.md`.

## House defaults

1. **Generated shots:** H3 image-to-video (I2V) from a reviewed keyframe, run as a graph (`generate {graph: ...}`, [examples.md](examples.md) §7) or its profile.
   A take that goes into a 1080p delivery renders there natively:
   `generate {model: "h3-fl-flex6", inputs: {media: {"114.image": <keyframe sha256>}, bindings: {"131.prompt": ..., "131.width": 1920, "131.height": 1088, "131.length": <frames>}}}` (1088 and 1920
   for 9:16) holds products and places. Flex scored 4 or 5 in 8 of 12 test takes at 15.2 credits a clip; the sparse 1080p profile in 8 of 12 at 11.8, and 10 of 12 with timed beats. Where the camera move is the point, use `h3-turbo-i2v-1088-bsa` (`104.prompt`, `104.length`;
   bind `104.width` 1088 and `104.height` 1920 for 9:16).
   Either way the length is sized to the shot like any take, at most 124 frames: 124 is the ceiling, not the default (a 2.5 s shot is 90 frames;
   five 124-frame takes for 2.5 s shots rendered 26 s of video for a 10 s cut).
   Drafts and tests use `h3-native-turbo-i2v-8` at 1344x768 (`"104.width": 1344, "104.height": 768`), about a third of the time and credits; width and height on the 32-pixel grid;
   how a keyframe binds: [examples.md](examples.md) §7.
   Length is your choice per shot, not a floor, on the 17k+5 frame grid (0.71 s steps, 5 to 362 frames at 24 fps):
   size each take from its shot (the spoken line and a settle, the action at a natural pace, the hold or reveal the cut needs, plus the 1.5x below),
   so quick beats and held moments get different takes; a saved graph's length is a placeholder, and a profile run without one is refused.
   An 8-step take fits about 260 frames (10.8 s) in its 300 s bound (6-10 s takes ran 73 of 73 in production, October 2026);
   one unbroken action longer than that is that take extended with `h3-extend` (`read wm://capability/longer-h3-take`), not a cut.
   Native 1088p takes stop at 124 frames (5.17 s), except the speaking profile `h3-turbo-i2v-1088-speech-bsa`, which runs to 192 frames (8 s, two lines in one take;
   lip sync measured 0.54 at 192 frames against 0.81 at 124, one take each, 2026-11-03);
   a longer shot in a 1080p piece is a 1344x768 take, extended if needed (a 192-frame link runs about 210 s however long the take), then upscaled.
   Short speaking takes have not been measured yet.
   You own identity and framing, and it syncs best in close-up.
   Write every H3 prompt in its official sections (examples.md §7):
   the alignment line, `[Shot 1]` with "one continuous shot in the same location" (or, for a scene covered from several angles, its timed `[Shot N]` sections:
   card `single-subject-coverage`), motion in frame terms, a line naming what stays in frame, `overall_soundscape:` and `non_diegetic_music:`;
   a one-line prose prompt lost the second car and the action that the sectioned prompt kept, at the same cost.
   Give each take one clear action that plays across it at a natural pace, said concretely in frame terms, with a camera behaviour chosen for the moment,
   and keep fast body action for wide shots where faces are small.
   Ways to make the shot, with what each measured on six test shots (November 2026; clips watched at 4 or 5 of 5, credits a clip): a single 5 s take (8 of 12, 11.8); the same with two or three timed beats (10 of 12, 11.4); a 9 s 768p take, upscaled (5 of 6, 23.6); first and last frame to a designed end still, upscaled (5 of 6, 15.1); three angles in one take, `[Shot N]` (5 of 6, 11.9; the only way two people talking reached 4); a take continued with `continues` (2 of 6, 23.1) or `h3-extend` (1 of 3, 37.1). The table is in `wm://card/h3-i2v`.
   Turbo H3 smears and deforms faces under fast action:
   after a rule asked for two physical actions and a speed word on every take, delivered films moved about 47% more and faces melted mid-action at full size, and 20 steps did not fix it (
   2026-10-26).
   A still delivery is the opposite failure: three trailers prompted "slowly" on nearly every shot and read as drifting stills.
   A held shot is a choice when the moment calls for it, not a defect.
   Look at faces mid-motion at full size and retake a take whose face smears.
   Make each take at least 1.5x the window you will cut, and a take slowed below 1.0x repeats frames and judders (compose reports `slowed_footage`).
   One take per shot first (`count: 1`): `watch` or `review` it, and make a second take, with a new seed or a fixed prompt, only for a shot whose take failed that check, that shot alone,
   never the whole batch again.
   `count` above 1 on a video take needs a reason you state, such as a shot that tends to fail (fast travel, body actions, speaking takes);
   `generate` hints when a video call asks for more, or when the turn's takes pass twice the shots in `board.json`.
   A 2:00 short made two takes of all 28 shots and kept the first in 26: the second takes were 173 of its 910 credits;
   a 2026-10-29 bench whose agent asked `count=2` for every shot from `run` and resubmitted whole batches made 10.5 H3 takes and 14.5 keyframes a run, against 6.3 and 5.7.
   Re-run a chosen take at 20 steps (`h3-fl-native`) when lettering or fine detail has to hold.
   For an ensemble one keyframe cannot hold, H3 reference-to-video (Ref2VA).
2. **Partner video only when the user selects it:** Omni, Kling, Seedance, Grok video and the other partner models run when the user selects one:
   the turn's pin or a model the user names.
   If H3 keeps failing a shot (a content refusal, or repeated failed takes written in H3's sections, with FL2VA for a shot that has to land),
   tell the user what failed and offer a partner model they can select; when several shots would move, quote the partner takes and ask first.
   A quality complaint, or a comparison against an H3 take that skipped those, is a reason to retake on H3, not H3 failing.
   An `invalid_graph` or `invalid_request` refusal is an input to fix (its message names it), not H3 failing.
   Never swap silently.
   H3 takes are slower, so start them in parallel; speed alone is not a reason to leave H3.
   Alt: none; the user selects another model.
3. **Shots that have to land:** H3 first-and-last-frame (FL2VA) with a designed end still; it fixes timing and direction.
   The first frame is the instant before the action: a jump's keyframe has the car in the air, not already landed.
   Alt: show before and after and let the cut imply the action.
   `h3-fl-native` takes the two stills as media `first_frame.image` and `last_frame.image`, `h3-lightning-8` as `114.image` and `115.image`.
4. **Stills first:** make and review the stills, then animate them,
   usually with Gemini 3 Pro Image (`generate {route: "gemini.image", params: {model: "gemini-3-pro-image", aspect_ratio: ..., image_size: "2K"}}`, up to 14 `reference_sha256s`).
   Stills give you control over consistency, framing and the product before any video is spent.
   How to write them: [stills-that-read-as-photographs](wm://card/stills-that-read-as-photographs) (short subject-first prose, numbered references with roles,
   size against the scene, a new still rather than an edit of an edit, plain light for a real photograph).
   The self-hosted models are a first-class choice for multi-reference edits (`p-h3-image-edit` up to 8 references, though P-H3-Image's own scene stills look over-processed;
   `qwen-image-21-edit` and `flux3-klein-edit` up to 10; card `self-hosted-image-editors`, one card per model).
   Look at each one at full size before animating it, since a contact sheet hides clothes, hands, size, seams and a changed face, and re-make only the one that fails.
   A person seen in more than one shot usually gets one plate (a full-length front view and a chest-up face portrait side by side on a plain grey backdrop, no text;
   card `identity-plate-character`), and a lead's approved hero keyframe is the reference for their other shots, checked with `compare` `aspect: "identity"` against the plate.
   A prop or vehicle seen in several shots can get a plate when it helps (card `object-and-known-thing-plate`):
   attach it only to shots where it appears at about that size, and give its size against the scene.
   An empty place plate passed with people to put into it becomes the canvas: the still keeps its camera and light and the cast look pasted in (8 of 8 in one test).
   So write the place in words for the first shot with people in it and pass that accepted still from then on (cards `location-plate`, `location-sheet`).
   Say what people wear (swimwear for water).
   Alt: text-to-video when the user asks for it, or for abstract, atmospheric or establishing footage with no identity to hold.
   Adult (18+) work has its own models and craft: `read wm://card/h3-explicit` and `wm://card/self-hosted-image-editors` before its first still.
5. **Real or known subjects:** references first:
   `generate {route: "crawler.search", params: {query, limit, images_only: true}}` finds pictures with their pages (the `search` tool does not reach the web;
   for a known character, a still of the actor in the role), `write` `from_url` owns one, and the plate is an image edit of it.
   Invented likenesses drift and mislead.
   Editors differ a lot at likeness from a photo (`read wm://capability/a-real-person-s-likeness-from-a-photo` has the measurements);
   `compare` your plate with `aspect: "identity"` against the photo and keep the best.
   A refusal comes back the same when reworded; another model changes it.
   Alt: an invented stand-in, told to the user, only when no picture of the subject can be found; never for the advertised product (hard rule 8;
   its product page, `crawler.scrape`, also states its size), nor for a character or thing from an existing work the brief names (hard rule 9).
6. **Designed type and ad stills:** the image model sets the words and the logo with the art, at the piece's own shape, copy quoted exactly.
   Gemini 3 Pro Image (logo and product as `reference_sha256s`) for squares, blocks and social sizes;
   for a shape it cannot make (728x90, 320x50, 970x250, 160x600, 300x600), Seedream 5.0 (`seedream.image`) at the exact pixels,
   rendered without the logo and the logo then added by a Seedream edit (the unit and the logo as `reference_sha256s`;
   in one render it misspells the type): `read wm://format/<id>` gives each unit's `lettering_routes` with the `generate` call.
   When the piece shows the product (hard rule 8), its photos follow the logo on every render that shows it (on a Seedream unit, in its first render;
   the logo still comes by the second edit), named by role ("images 2-3 are the 9,000 BTU heater: its design;
   its size comes from the scene"), with one size sentence anchored to a person at the same depth ("beside his boot, its top at mid-shin"),
   never "hero" or "dominates" (card `product-plate-from-real-photos`).
   Gemini 3.1 Flash garbles lettering beyond 3:1.
   Write the copy as prose (a headline that reads exactly "..."), not as labelled fields: `HEADLINE:` gets printed.
   Add the composition rules: one continuous photograph edge to edge (no panels, inset cards or frames), no other words, logos or brand names anywhere (props blank;
   screens blank unless the brief attaches a screen image, which the screen shows exactly as given; the product keeps its own markings), natural hands, the call to action as typography.
   Stories and Reels: Gemini puts words in the interface bands whatever the prompt says,
   so make a square ad with all its words and extend it to 9:16 with a Gemini edit that continues the scene above and below.
   Start two takes of each piece at once; `edit` `ads_format` (the unit's `format`: exact pixels under its file cap) and `review` both (`expected` lines;
   `products` on a unit that shows the product, and act on that section (a finding you disprove at full size beside the photos is not a defect: say so);
   `safe_area` margins where an interface covers the frame); keep the better of those that pass.
   Only `defect` findings need work: when both takes fail, fix every defect of the better one in one image-model edit and start one fresh take beside it; keep whichever passes.
   One ad image is two parallel takes, a fit and a `review` each and one `deliver`: about a minute and a half.
   Alt: in video, code-set text in a `compose` timeline for captions, legal lines and live values; in-world interface follows rule 7's film clause.
7. **Voice:** an ElevenLabs voice designed for the role, saved, rendered with `generate {route: "elevenlabs.speech"}`: a character's line in a film or trailer on `eleven_v4` at stability about 0.35, with a descriptive tag and the lines around it as `previous_text`/`next_text`; narration on `eleven_v3` at stability 0.5.
   The design brief describes a real person's ordinary speaking voice, in ElevenLabs' order: "Native English, General American. Male, early thirties. Good audio quality." then who they are, timbre, pitch and pace (card `voice-casting-for-ads`).
   No mood or volume ("whispering", "yelling over an engine"), no place or effect ("through a machine", "radio", "echo"), no "robotic" or "synthetic", no caricature extremes ("about 160", "squeaky falsetto"): a robot, an AI or a PA is a human voice placed in the mix (compose `placement`).
   The preview `text` is 2-4 ordinary sentences in character.
   Narration is one continuous read, cut on its word times; a line under about 2 s rendered alone tends to be misread, so a short line goes in with the sentence around it.
   Characters in a film or trailer act: each line directed for its scene with at most one short tag a sentence, punctuation for the beats; one model per character; a flat read is a defect, and so is a robotic, thin or wrong-age one (card `voice-performance-direction`).
   v4 can move a v3-designed voice: check each character's first take still sounds like them, and every take with `expected_text`.
   Alt: clone a supplied voice.
8. **On-camera speech:** an H3 speaking take: the rendered line as the take's audio guide (`LoadAudio` → `TrimAudioDuration` → `MiniMaxH3AddGuide` in the I2V graph); sync is made at generation.
   Two people sharing a frame can talk in one take when the guide carries the recorded lines and the prompt names who speaks when and closes the listener's mouth
   ([pitfalls-speech.md](pitfalls-speech.md) "Two speakers sharing one frame").
   In a 1080p delivery use `h3-turbo-i2v-1088-speech-bsa` (media `114.image` keyframe, `200.audio` the line padded to the take;
   bind `201.duration` to length/24): native 1920x1088, so the face is never upscaled.
   Sync varies take to take, so review each one you mean to keep (`review` `sections: ["lip_sync"]`; what was measured: `read wm://capability/lip-sync`).
   Alt: a third-person narrator over non-speaking faces.
9. **Music:** what leads sets the order.
   These are defaults, not rules: work in another order when the piece calls for it.
   When the picture leads (most ads, trailers and narrative), a draft cut usually comes before the final score, so the cue can be written from the cut's real timing:
   a `music_v2` `composition_plan` whose sections change at the cut's beats and differ in instruments and energy, not only in volume, with a stripped-back section under a dialogue scene.
   Judge the cue against the picture, not a list of beats: make one cue, render the draft with it and `listen` the render with `picture: true`, `cuts_s` and `lead: "picture"`;
   its `score` says where it changes or stops against the cuts and whether it fits.
   Make a second cue only when the first fails that check (it misses the cuts, drops out under picture or does not fit) or the user asks for options, then `listen` the renders as `candidates`.
   A 10 s ad that made two rounds of two cues spent $0.30 on four cues and kept one.
   When the music leads (a music video, a supplied or approved song, a radio edit locked first), the music comes first and stays:
   cut the picture to it and answer findings by re-cutting the picture, not by regenerating or re-editing the music (`lead: "music"`).
   Either way, `listen` with `picture: true` again after a revision moves cuts or lines.
   A single cue made before any picture repeated one synth pulse for 48 s through six format changes;
   a dental-clinic spot's :30 cue, written from planned beats before any cut and chosen by its sound alone, played stop-start under the opening shots and jarred against the picture.
   Cues start late, end early and can drop out inside:
   read `music_timing` (`dropouts`) and compose's `music_dropout_under_picture`, then place ([music-fit-and-button-ending](wm://card/music-fit-and-button-ending)).
   Alt: the user's track or MiniMax Music3.
10. **The cut:** `compose` from the best window of each take (`read wm://tool/compose`: its `guide`, then an index;
   `wm://tool/compose#graphics` or `#scenes.VideoClipScene` reads one section), cut to measured speech or bars;
   let the piece's mood set the pace (quick beats for punchy work, longer holds for calm or cinematic briefs), and vary it.
   Measured trailers accelerate into the title, with cards between images and silence before the big hits;
   cutting two or three windows from a take gives the cut that many more shots ([trailer-cut-rhythm](wm://card/trailer-cut-rhythm)).
   Whole takes used as filler feel slow.
   Draft first, final once.
   Alt: a plain timeline of joins.
11. **Review:** `review` on every cut that matters (`looking`, `lip_sync`, `listening`, `safe_area`, `sound`, `continuity`), and on the exact file you deliver,
   with `watch` and `listen` for the measurements; measured faults are what users notice.
   Before production, write the brief's must-haves down as a list:
   every quoted string in a supplied brief (on-screen copy, labels, handles, end-card tagline and URL), each spoken line, the ordered beats with their planned times, the duration and the aspect.
   Pass that list as `requirements` on the review of every final; the `brief` section answers each one met (with when), missed or unverified, and `deliver`'s `must_tell` names the ones not met.
   Every batch-1 launch film's first cut missed something its brief spelled out (a handle, a release line, a take number, 8 planned beats) while its reviews judged only the picture.
   Review a set once, all pieces in parallel; fix the real findings (`severity: "defect"`; an observation, or an OCR misreading of correct copy, is not one;
   a piece that passes is not reworked) and re-review only what changed, with `resolves` set to the earlier findings' `id`s.
   In a fix round keep the approved takes (the same artifact sha in the composition) and regenerate only the flagged shots;
   review the new cut with `earlier` set to the approved cut:
   unchanged shots keep their verdicts, only changed shots and their seams are reviewed again,
   and `regressions` names what the fix broke in the changed seconds (a launch film's lip-sync fix brought a half-speed freeze no one compared).
   A section listed as `pending` under `coverage.not_checked` is not a result yet: send the identical call again after its `retry_after_s` to collect it (examples.md §6);
   the conversation marks only what the re-review verified fixed.
   A `defect` on a speaking take usually means a retake or a cutaway.
   Deliver with a section still pending only when the turn is near its limit, and say which sections were not reviewed.
   A 9:16 cut, or a portrait one with a captioned destination, gets `safe_area` by default against its destination's zone, else the generic short-form one (`safe_area: false` turns it off).
   One film cut for two aspects: review each with `companion` set to the other cut, so a shot, a line or an end card that differs between them shows.
   Deliver each piece of a set (a size, a variant, a cutdown) as soon as it passes, not all at the end: the caller receives each delivery at once.
   Alt: `watch` `filmstrip` per take and your own viewing; a contact sheet built with ffmpeg in `run` (this machine has no ffmpeg).
12. **Delivery size:** lock picture and text, compose once at delivery size: the destination's, else 1920x1080 for 16:9, 1080x1920 for 9:16, 1080x1080 for 1:1.
   a 2:00 short went out as 1344x768 takes scaled 1.43x).
   A take the 1088 profile cannot make (an FL2VA landing, a take over 124 frames) is super-resolved per take, run 4 at once.
   A face in frame: FlashVSR (`edit` `upscale`, `params: {model: "flashvsr", scale: 2}`;
   about 9 credits and 2.5 min a 4.5 s take, the compose scales its 2688x1536 down): it adds real detail to eyes, hair and skin and keeps the face as rendered.
   No face in frame: SeedVR2 (`params: {model: "seedvr2", target_short_side: 1080}`;
   2026-10-28; card `graph-seedvr2-upscale`).
   Real-ESRGAN adds no detail at 1.43x.
   Alt: the same upscalers on 1344x768 takes when a shot's 768p take is already approved.
13. **Waiting:** start independent work, then one `read` with `uris` and `wait_s: 85`;
   it returns when all are done, or with the jobs still running at the cap (through the public API a wait stops at 85 s): read again.
   Every wait re-reads your whole context, so wait long rather than often.
   In a shell, `wm wait <job>` (it returns within 100 s; run it again while the job runs); never `sleep`.
   Calls that change something (`generate`, `edit`, `compose`, `run`, `write`, `deliver`) run one after another even when you send them together, while `read`, `watch`, `listen`,
   `compare` and `review` run side by side.
   So a call that holds itself waiting delays every call behind it:
   `compose` and `review` with `wait_s` hold the call for that time, up to 85 s, and return the finished result when the job ends inside it.
   Started with `wait_s: 0` they return the job at once, and the one `read` waits on renders, reviews and takes together.
   This one is a tool fact, not a default: `read` with `wait_s` is how the tools wait.
14. **Deliver, then keep going:** deliver the first complete, reviewed cut so the person has it (a turn that kept polishing delivered nothing).
   Then, while review's defects remain and the time and cap leave room, fix them, finish and deliver again under the same role.
   A fix round is usually cheaper than it feels: on a 2:21 film of 53 shots, about 15-25 minutes (a retake 3-9 min and 12-20 credits, compose about 5 min, review 3-8 min;
   D1, 2026-11-03, stopped at minute 90 of 120 with room for another).
   A piece that passes is done.
   With two formats (a wide and a vertical), both get a complete cut before either is polished.
   When a wrap-up notice arrives (about 15 minutes or the credits for it left), deliver what you judge best of what you composed, provisional where review is incomplete, and say what remains:
   nothing is delivered for you.
   Alt: deliver once at the end when the cap leaves no room for a second round.
15. **Continuity across cuts:** shots of one place and moment agree on who is where, what they hold and which way they face.
   The method (write who is where and each prop's state, make the master first, then each shot from the one before,
   in story order) and its evidence are in the card `wm://card/blocking-before-coverage`.
   Alt: a single-shot scene needs none of it.
16. **Look and finish:** decide the light before the keyframes (the sources and their direction, how bright the frame is, palette,
   lens and camera height) and describe it physically in each still's prompt; quality words ("cinematic", "film still", "grain") change little.
   Most ads, comedy, daytime documentary and real places want bright, plain, readable light, and a real reference photo usually keeps its own light;
   low-key, dark frames are a choice for genres such as horror.
   Take prompts describe what moves and how the light changes.
   A finish over the composed film (`edit` `camera` `look: "film"`,
   `edit` `grade`) ties the shots together ([look-and-light-before-keyframes](wm://card/look-and-light-before-keyframes),
   [finish-pass](wm://card/finish-pass);
   a genre has its own card, and [reference-rhythm-by-genre](wm://card/reference-rhythm-by-genre) has what each family measured).
17. **Physical events** (a trip, a fall, a spill, something knocked over or pulled out):
   write the physics in a few lines, make one master still of the set and the object, and cover the event one action per take (approach, contact insert, reaction), cut on the contact.
   The method, its evidence and its cost (the same brief took 52-65 minutes before the method sat in the always-loaded skill and 93-110 minutes after,
   2026-11-16) are in the card `wm://card/physical-events-coverage`.
   Alt: show before and after and let the cut imply the event (default 3).
