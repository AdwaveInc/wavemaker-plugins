# Examples

Short patterns to adapt. Each block is a Wavemaker tool call (**MCP**: `search`, `read`, `generate`, `edit`, `compose`, `watch`, `listen`, `compare`, `review`, `deliver`, `write` or `run`). Argument shapes are trimmed; `read wm://tool/<name>` gives the real schema. Why these patterns help is in [pitfalls.md](pitfalls.md).

The `run` helpers beside this file (`examples/`; `virtual_set.py` is 72 KB) go in with `wm upload <path>`, which returns the artifact sha256 `run` binds, rather than as text in the call; `wm get` brings a result back to read.

Worked graph sets worth reading when building something similar (`read wm://graph/pathway:<name>`):
- `pathway:music-video`: song-first music video graphs with visible singing (supplied or generated song, montage mode).
- `pathway:presenter-ad`: saved-voice H3 presenter with grounded product references.
- `pathway:ad-recipes`: 25 retained ad recipes as reference-conditioned H3 productions.
- `pathway:display-ads`: still, GIF and HTML5 display work, with destination rules.
- `pathway:directed-stills`: plain images, static ads, meme cards, thumbnails, ad sets as ordinary Comfy graphs.
- `pathway:directed-audio`: speech, music, podcast and audiobook graphs.
- `pathway:h3-chains`: 16-48 s H3 scenes made of 8 s first/last-frame windows; pictures only, so motion and sound do not carry across a join.
- `pathway:h3-context`: one continuous H3 take past 15 s, each window pinned by Motion Context to the previous window's latent (60.0 s in one 838 s H100 job). A job's 300 s bound holds about two windows, so today a long take is extended link by link with `h3-extend`. Chaining by saved latent, one window per job (`h3-window-latent-first`, then `h3-window-latent`), is experimental: use it only when named.
- `pathway:feature-film`: the exported graphs of a retired one-sentence-to-film program (plates, keyframes, lines, ambience). Its runner was removed, so read it for graphs, not as a path to run.
- `pathway:motion-transfer`: a character performing a driving clip's motion on H3.

## 1. Contact sheet from takes

One filmstrip per take, to compare takes side by side:

```text
watch {source: <take sha256>, analyses: ["filmstrip", "cuts", "motion"], fps: 2}
    -> a filmstrip artifact, cut list, travel direction, usable_windows
```

**MCP** alternative, a filmstrip with cuts and motion on the same call:

```json
watch {"source": "wm://artifact/<take or cut>", "analyses": ["filmstrip", "cuts", "motion"]}
```

A sheet shows framing, identity and invented text, not lip sync or a fleeting reversal (use `lip_sync` and `motion`).

## 2. Batch stills, then pick

Start several candidates at once, then collect each job:

```text
for prompt in [variant_a, variant_b, variant_c, variant_d]:
    generate {route: "gemini.image",
              inputs: {model: "gemini-3-pro-image", prompt, aspect_ratio: "16:9", image_size: "2K",
                       reference_sha256s: [plate]},   # optional, up to 14, named "image 1", "image 2"
              request_id: "kf-03-<variant>"}  -> job ids
# Grok: xai.image takes no references. With a plate, use xai.image_edit:
#   inputs: {model: "grok-imagine-image-2.0", prompt, aspect_ratio: "16:9", resolution: "2k",
#            quality: "medium", reference_sha256s: [plate]}   # 1-5, named <IMAGE_0>, <IMAGE_1>
read {uris: ["wm://job/<id>", ...], wait_s: 85}   # returns when all finish; repeat only if some still run
read wm://artifact/<each output sha256>           # signed link to the full-size still
```

Pick against the shot's job (size, angle, the instant before the action, identity, no invented text). For a known subject, the reviewed plate as a reference holds identity better than words alone. These are variants of one still. The stills of one scene (one place and moment, a conversation included) are made in story order, each a new still with the shot before as a reference (SKILL default 15).

## 3. Re-cut to measured narration

Render the VO, measure it, then place picture on its clock:

```text
generate {route: "elevenlabs.speech",
          inputs: {voice_id: <saved voice>, model_id: "eleven_v3", text: <script>}, ...}
listen {source: "wm://artifact/<vo>", expected_text: <script>}
    -> words with start/end seconds; lead and tail silence; loudness
```

Turn word times into cut points (in your head, or in `run`):

```python
# beats: script sentences mapped to shots; words: transcript words with times
cuts, t0 = [], words[0]["start"]
for beat in beats:
    end = words[beat["last_word_index"]]["end"] + 0.25   # small breath after the line
    cuts.append({"shot": beat["shot"], "in": t0, "out": end})
    t0 = end
total = cuts[-1]["out"]   # picture length follows the read, not the plan
```

Then build the `compose` timeline from `cuts`, trimming each take to its best window of that length, VO at -16 LUFS, music around -26 under it. Keep the read whole: one voiceover file, with each timeline segment starting into it at its `sourceStartMs`, rather than one render per line. If `total` misses the brief's length, rewriting or re-rendering the line tends to beat stretching. **MCP** check after render: `review` with `targets: {duration_s, integrated_lufs: -14, max_dead_air_s: 0.75}`.

## 4. Checking delivered text

Read the card or a frame of the master back and compare with the copy:

```json
watch {"source": "wm://artifact/<card or master>", "analyses": ["ocr"],
       "times": [28.5],
       "expected": ["Fourth Dimension", "Book your party at example.com"]}
```

A mismatch names the wrong characters; an in-place edit of that word (card as image 1) usually fixes it, then re-check the whole card. A line OCR could not read needs your own look at the frame. A match still deserves a full-size look. Omit `times` for a still.

## 5. Waiting and recovering without double-billing

```text
start every independent generate / edit / compose        -> job ids
read {uris: ["wm://job/<id>", ...], wait_s: 85}         # returns when all finish; repeat only if some still run
on a timeout or reconnect:
    read wm://job/<original id>   (or replay the same call with the same request_id:
                                   a replay returns the original result, never a second job)
    still running   -> keep waiting on the same id
    failed, expired, worker_lost, not dispatched -> resubmit once under a new request_id
```

## 6. Delivering with a recorded review

```json
review {"source": "wm://artifact/<final cut>", "kind": "video", "brief": "<the brief>",
        "destination": "tiktok/in-feed"}
deliver {"artifacts": {"delivery_video": "<final cut sha256>"}, "destination": "tiktok/in-feed",
         "deliverable_id": "<the turn's deliverable id>"}
```

`deliver` refuses a draft-tier render; render the final first. Fix what the review and the delivery's checks find before you finish; they are your work list, not a list for the user. A fix is a new delivery under the same role.

A destination is only for a platform the brief names. For web video, a download or anything with no platform, `deliver` with no `destination` is fine: nothing is checked against a platform spec, and the reply says so.

Its `must_tell` lists what was found, disclosed or not checked: fix the defects you can and deliver again; one that stays gets one plain sentence in the final message, never a list. The disclosures (how the picture was scaled or upscaled, procedural or synthetic audio) and anything not checked are always stated plainly, and nothing unchecked is called checked. It admits only files the workspace owns, final (a draft render is refused) and within the destination's spec. A video or audio file with no review of its exact sha gets the destination's required sections reviewed by default, charged and priced in the reply (`review_default.quote`); `review: false` turns that off. Reviewing the exact file before delivering it still lets you fix what it finds first. A file whose review was still pending or running when it was delivered gets that same review collected once it settles, and the measurement is attached to the delivery later (a `delivery.reviewed` event in the conversation); nothing is retaken, and until then `must_tell` says the pending sections are not measured.

A cut with dialogue: pass the lines and who says them, so `lip_sync` and `listening` can tell whose mouth should move:

```json
review {"source": "wm://artifact/<final cut>", "kind": "video", "brief": "<the brief>",
        "sections": ["lip_sync", "listening", "transcript", "picture", "cuts", "sound"],
        "characters": [{"id": "june", "name": "June", "description": "woman in her thirties, green coat"},
                       {"id": "rafa", "name": "Rafael"}],
        "lines": [{"text": "You kept the ring?", "speaker": "june", "mode": "on_camera"},
                  {"text": "I kept the receipt.", "speaker": "rafa", "mode": "off_screen"}]}
```

`characters` rows take `id`, `name` and an optional `description`; a line's `speaker` is a character's `id`, and its `mode` is `on_camera` (the default), `off_screen` or `voice_over`. A line everyone says together takes `group: true` (or a `speaker` of `group`, `all`, `everyone`, `chorus`, `crowd` or `ensemble`): lip sync then blames no mouth on it. Model-backed sections (`lip_sync`, `listening`, `looking`) can come back `pending` in `coverage.not_checked` with a `retry_after_s`. Send the identical call again after that many seconds to collect them: the review is keyed by its arguments and the settled model answer is reused, so it is the same review, not a second job (hard rule 1 is about resubmitting work, not this). A changed argument (another section, another line) is a new review.

## 7. H3 takes: image-to-video, first and last frame, references

**MCP**: H3 is the house default for video and runs as a Comfy graph on our GPUs. A keyframe always binds through `inputs.media` (`{"media": {"114.image": <sha256>}}`; a flat `"114.image"` key is refused), in one of two ways:

- **The profile:** `generate {model: "h3-native-turbo-i2v-8", inputs: {media: {"114.image": <keyframe>}, bindings: {"104.prompt": ..., "104.length": <frames>}}}`. The profile's graph already loads node 114 as an image, so nothing else changes. That is the 1344x768 draft. A take for a 1080p delivery where the camera move is the point is the same call with `model: "h3-turbo-i2v-1088-bsa"`: the same node ids at 1920x1088 (bind `104.width` 1088 and `104.height` 1920 for 9:16), on its own B200 variant with a 420 s bound; `h3-fl-flex6` binds `131.prompt`, `131.width`, `131.height` and `131.length` instead (SKILL default 1). Its `<frames>` is sized to the shot like any take: 1.5x the seconds the shot holds in the cut, rounded up to the grid (a 2 s shot is 73 frames, a 2.5 s shot 90), at most 124 (5.17 s). 124 is that profile's ceiling, not its default.
- **The template inline:** the catalog templates (`read wm://graph/<id>` returns the `graph`) make their own still with a built-in Gemini node. Send the graph inline with that node replaced by `LoadImage`, as below. This is the way once you add nodes, such as a speaking take's audio guide.

A template id (`graph: "model-minimax-…"`) keeps the template's own Gemini still; it cannot take your keyframe.

I2V (Auto profile `h3-native-turbo-i2v-8`, template `model-minimax-h3-native-i2v-768-turbo-8step`): node `114` becomes `LoadImage`, everything else is the template.

```json
generate {
  "graph": {
    "6": {"class_type": "UNETLoader", "inputs": {"unet_name": "minimax_h3_fl2va_pruned_int8_convrot.safetensors", "weight_dtype": "default"}},
    "9": {"class_type": "BasicScheduler", "inputs": {"scheduler": "simple", "denoise": 1, "model": ["133", 0], "steps": 8}},
    "10": {"class_type": "VAEDecode", "inputs": {"samples": ["14", 0], "vae": ["11", 0]}},
    "11": {"class_type": "VAELoader", "inputs": {"vae_name": "minimax_h3_video_vae_fp16.safetensors"}},
    "13": {"class_type": "CLIPLoader", "inputs": {"clip_name": "qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors", "type": "minimax", "device": "default"}},
    "14": {"class_type": "SamplerCustomAdvanced", "inputs": {"noise": ["15", 0], "guider": ["16", 0], "sampler": ["17", 0], "sigmas": ["9", 0], "latent_image": ["104", 1]}},
    "15": {"class_type": "RandomNoise", "inputs": {"noise_seed": 1}},
    "16": {"class_type": "BasicGuider", "inputs": {"conditioning": ["104", 0], "model": ["133", 0]}},
    "17": {"class_type": "KSamplerSelect", "inputs": {"sampler_name": "res_multistep"}},
    "23": {"class_type": "VAEDecodeAudio", "inputs": {"samples": ["14", 0], "vae": ["24", 0]}},
    "24": {"class_type": "VAELoader", "inputs": {"vae_name": "minimax_h3_audio_vae_fp32.safetensors"}},
    "91": {"class_type": "CreateVideo", "inputs": {"images": ["10", 0], "audio": ["23", 0], "fps": 24, "bit_depth": 8}},
    "92": {"class_type": "SaveVideo", "inputs": {"video": ["91", 0], "filename_prefix": "video/MiniMax_H3", "format": "mp4", "format.codec": "h264", "format.codec.encoding": "re-encode", "format.codec.encoding.crf": 17.0}},
    "104": {"class_type": "MiniMaxH3ImageToVideo", "inputs": {"clip": ["13", 0], "vae": ["11", 0], "width": 1344, "height": 768, "length": "<frames>", "first_frame": ["114", 0],
      "prompt": "For the target video, at 0.00 seconds into the target video, <Picture 1> (from [Shot 1]) is fully referenced.\n\nintegrated_multimodal_description: [Shot 1] Live-action, one continuous shot in the same location: the woman from <Picture 1> on the cabin deck at dusk turns sharply from the railing toward the man and lifts her mug to him in one quick motion; steam rises from both mugs. The camera holds at the same distance. Both stay on their sides of frame for the whole shot.\n\noverall_soundscape: Lake ambience, a loon far off, the deck creaks.\n\nnon_diegetic_music: None."}},
    "114": {"class_type": "LoadImage", "inputs": {"image": "keyframe.png"}},
    "133": {"class_type": "LoraLoaderModelOnly", "inputs": {"model": ["6", 0], "lora_name": "minimax_h3_fl2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors", "strength_model": 1.0}}
  },
  "inputs": {"media": {"114.image": "<keyframe sha256>"}},
  "count": 1
}
```

- One take per shot first; a second only for a shot whose take fails `watch` or `review` (SKILL default 1). `count: 2` makes two takes, take 2 with each seed + 1 (each job's result lists its `seeds`); send it only with a reason you state. One take holds its runtime's bound while it runs and is charged measured time; `quote_only` shows both.
- One take per graph: a graph job stops at its `job_seconds` (`validate_only` shows it; 300 s fits about 260 frames at 1344x768, 8 steps), so a graph with several H3 chains times out.
- `quote_only` and `validate_only` report `run_time` for a measured H3 take: the estimated run time at its length, size and steps, the runtime's limit, and the longest length that fits ("175 frames ≈ 327 s, limit 300 s; longest that fits: 141 frames ≈ 5.9 s"). It is a fact, not a refusal: past the limit, shorten the take, split the line across windows or lower the steps, as the shot needs.
- Send it once with `"validate_only": true` (placement, node schemas and the staged keyframe are checked, nothing is charged), then without it under a `request_id`. Each take is a job; `read wm://job/<id>` until it succeeds and take the video from `result.artifacts`.
- `"<frames>"` is yours to fill: frames on the 17k+5 grid at 24 fps (0.71 s steps from 5 to 362 frames: 56 is 2.3 s, 107 is 4.5 s, 158 is 6.6 s, 192 is 8 s, 243 is 10.1 s), sized from the shot (see SKILL default 1). A saved graph's own length is a placeholder: a profile or template id run without `104.length` is refused with the grid. Short speaking takes have not been measured yet. Width and height are multiples of 32 (1344x768, or 768x1344 vertical); keep `CreateVideo` at 24 fps. Prompt grammar: `pathway:h3-i2v` and the `h3-i2v` card (`read wm://card/h3-i2v`).
- Every H3 prompt keeps the sections above, action included: one clear action that plays across the take at a natural pace, in frame terms. Where the order matters you can time it ("From 0 to 2 seconds ... then ..."), but don't stack actions or add speed words to raise the motion: on turbo H3 that smeared faces. For a chase, the `[Shot 1]` paragraph reads like: "Live-action, cinematic, one continuous shot in the same location. A low, bumper-height wide shot on a wet crosswalk, as in <Picture 1>: the red hatchback is centred in frame and the white police car is directly behind it on the left. Both cars drive straight toward the camera at speed. The camera tracks backward at bumper height, so the hatchback stays the same size in the centre of the frame. The police car stays tight behind the hatchback's left rear corner for the whole shot and never leaves the frame. The taxis at the frame edges slide backward past the camera." Say where each thing is in frame, which way it moves in frame terms, and what must stay in frame; then sound and music in their own sections. One prose line ("the hatchback races toward the camera, the police car right behind it") lost the police car after 1.5 s.
- `inputs.bindings` changes literal inputs on a template id or a profile (`{"104.prompt": "...", "104.length": <frames>}`).
- Keep the template's nodes and links: an inline graph that is the template with only literals changed and `LoadImage` keyframes bound through `inputs.media` runs as that template, on a warm worker when one is free (about 80 s a take instead of 160 s). Adding, removing or rewiring a node makes it a graph you wrote, which always gets a cold sandbox of its own.
- Save node `92` above writes an H.264 re-encode at CRF 17, as every H3 profile does. The templates' `"format": "auto"` is x264's default CRF 23, mostly 1-2.5 Mbps at 1344x768: dark gradients block and faces go waxy before any grade or upscale. Give the save node of any H3 graph you send these four inputs; a save's encode is not wiring, so the graph still runs as its template. `watch` reports each take's `bits_per_pixel` in its `encode`: at 1344x768 it measured 0.04-0.24 at CRF 23 (half under 0.08) and 0.08-0.82 at CRF 17. A CRF 17 take is several times larger, so an inline limit comes closer: `gemini.structured_text` refuses a request over 20 MB, about 15 MB of video once base64-encoded. Send it a `trim` or `resize` copy of a take that is too big.
- **FL2VA** (`h3-lightning-8`, template `model-minimax-h3-native-flf2v-768-lightning-8step`): replace both `114` (first) and `115` (last) with `LoadImage` and bind `{"114.image": <first>, "115.image": <last>}`; the prompt's alignment line says where Picture 2 lands (the take's last second: 5.17 s at 124 frames, 8.00 s at 192).
- **Ref2VA** (`h3-ref-native`, template `model-minimax-h3-native-r2v-768`): replace `137` and `139` with `LoadImage` and bind `{"137.image": <subject plate>, "139.image": <place plate>}`; the prompt names each as `<Picture N>`.
- A speaking take adds the line as an audio guide: `LoadAudio` → `TrimAudioDuration` → `MiniMaxH3AddGuide`, staged through `inputs.media` the same way (`pathway:saved-voice-h3`). At 1080p the profile `h3-turbo-i2v-1088-speech-bsa` is that graph (media `114.image` and `200.audio`); the 1088 runtime takes no inline graph with nodes it does not list. What is known about the guide's length, and what is not:
  - Unpadded guides (a 3 s line on an 8 s take) invented words after the line in 4 of 8 takes. Padding the guide with silence to the take's length gave the line and then a closed mouth in the 2 takes re-rendered, judged by eye.
  - Whether padding keeps the mouth still over a long tail, the lead before the line or pauses inside it has not been measured across takes. In a rom-com mouths re-opened for about 0.2-0.3 s after lines with no words, in at least 4 shots.
  - So check each speaking take rather than trusting the method: `review` the take with `lip_sync` and its `lines` (§6), `listen` with `expected_text` for extra words, and look at the frames after the last word. `lip_sync` reports a mouth moving with no word heard as `mouth_active_without_speech` with its `start_s`, `end_s` and `position`: `after_line`, `inside_pause` and `no_line` are defects, `before_line` (a lip lead into the speaker's next word) is an observation, and heard laughter over the run gives `mouth_active_laughing`, an observation (precision and recall 0.82 on 65 hand-labelled windows of the rom-com).
- A monologue longer than one take, as one performance ([continuous-monologue](wm://card/continuous-monologue)): one voice read split at a pause near 39 s, each part padded with silence to its take. Part 1: `generate {model: "h3-long-take-speech", inputs: {media: {"114.image": <keyframe>, "200.audio": <part 1>}, bindings: {"104.prompt": ..., "104.width": 416, "104.height": 736, "104.length": <frames covering part 1 plus a rest, at most 957 (39.9 s)>, "201.duration": <length / 24>}}}`. Part 2, from where part 1 ends: `generate {model: "h3-long-take-speech", continues: {take: <part 1>}, inputs: {media: {"200.audio": <part 2>}, bindings: {... "104.length": <frames covering part 2 plus a rest>, "201.duration": length / 24}}}`, or `model: "h3-extend-speech"` with `200.audio` and `condition.prompt` / `condition.length` to carry the motion and room tone (the new frames are length - 22). The parts go back to back on one track; the voice parts in order are the soundtrack.
- Direction in the prompt helps the mouths outside the words (H3 moves every visible mouth). After the line you can direct the speaker to rest; the old service added "After the last line every mouth closes and rests; no other voice." For a cast member on screen during someone else's line, or a shot with no line, the tested clause is "NAME keeps lips closed and does not speak. No one on screen talks; every mouth stays closed and still." with no line audio (`docs/h3-prompt-grammar.md`; its effect on measured mouth motion has not been replayed).
- A speaking take needs some life, not a fixed recipe: one small beat around the line (a lean, a hand to the bag or the panel, a look away and back), a camera behaviour chosen for this moment, or a locked shot when the performance carries it. "He keeps still while he speaks" gave a near-still take every time. Frame difference is not a verdict: a camera move scored highest in (6.5 against 3.5 for beats alone), and asking for one on every speaking take left 22 of 53 shots pushing in on one film. One of 6 camera-move takes added 2 s of speech after the line, so `listen` each take with `expected_text` as above.
- The speaking profile is defaults 8: `h3-turbo-i2v-1088-speech-bsa` at 1080p. The 8-step `h3-native-turbo-i2v-8` is not qualified for authored speech; a speaking take made on it for a draft gets checked as above.
- Partner video is a `generate {route: ...}` call (`gemini.omni`, `kling.image_to_video`, `seedance.video`, `xai.video`); use it only when the user selects it (the turn's pin, or a model the user names). If H3 keeps failing a shot (takes written in these sections, FL2VA for a landing), tell the user what failed and offer one they can select.

## 8. A display set, every unit made by the image model

The prompts below come after the thinking: what it is, who it's for, the look and a line per size ([ad-brief-from-a-thin-ask](wm://card/ad-brief-from-a-thin-ask), [designed-ad-looks](wm://card/designed-ad-looks)). A look with no scene has little to go wrong, so consider it first. The object look, with a dentist's words; yours come from your brief:

```json
generate {"route": "gemini.image", "params": {"model": "gemini-3-pro-image", "aspect_ratio": "5:4", "image_size": "2K",
  "reference_sha256s": ["<logo sha256>"],
  "prompt": "A finished 300x250 display banner for Harbor Family Dental, one designed image with the type in the picture. The whole image is flat warm yellow. Across the top, large, a navy headline that reads exactly \"Same-week cleanings\", and under it a smaller line that reads exactly \"A family dentist in Portland.\" In the lower half, large, one worn toothbrush on the yellow with a soft contact shadow. Beside it, in heavy navy type with clear space around it, a call to action that reads exactly \"Book a cleaning\", with no button shape. Image 1 is the brand logo: reproduce it exactly, once, about 14% of the width, in a corner away from the words. Every letter inside the central 90%. No other words, logos or brand names anywhere."}}
```

The photo panel look, when there is someone worth looking at. The 300x250 first, in Gemini 3 Pro with the supplied logo as the first reference (hard rule 7: nothing on a still is drawn in code):

```json
generate {"route": "gemini.image", "params": {"model": "gemini-3-pro-image", "aspect_ratio": "5:4", "image_size": "2K",
  "reference_sha256s": ["<logo sha256>"],
  "prompt": "A finished 300x250 display banner for Harbor Family Dental, one designed image with the type in the picture. The top 40% is a flat navy panel holding every word, left aligned with room around them. The bottom 60% is one photo, edge to edge, with no words on it: a patient who came straight from work, coat over the chair and lanyard still on, mid-laugh with her hygienist, in bright daylight. Image 1 is the brand logo: reproduce it exactly, once, about 14% of the width, in a corner of the panel. The only words in the image are a headline that reads exactly \"Same-week cleanings\" and a call to action that reads exactly \"Book a visit\", below the headline in heavy teal type with clear space around it, with no button shape, every letter inside the central 90%. No other words, logos or brand names anywhere."}}
```

When the set shows the product (hard rule 8), the product's own photos follow the logo, named by role, with its stated size anchored to a person; `review` each unit that shows it with `products` (a service shows no product: declare none):

```json
generate {"route": "gemini.image", "params": {"model": "gemini-3-pro-image", "aspect_ratio": "5:4", "image_size": "2K",
  "reference_sha256s": ["<logo sha256>", "<product photo sha256>", "<second product photo sha256>"],
  "prompt": "A finished 300x250 display banner for Harbor Heat, one designed image with the type in the picture: an angler on a bucket inside an ice shanty at dawn, the heater on the ice beside his boot, its top at his mid-shin, its glowing face turned toward his hands. Image 1 is the brand logo: reproduce it exactly, once, small, in clear space. Images 2-3 are the Harbor Heat 9,000 BTU LP Portable Heater: copy its design exactly, its own markings included; its size comes from the scene (14 in tall, about as tall as a 5-gallon bucket). The only words in the image are a headline that reads exactly \"Warm hands, longer sits\" and a call to action that reads exactly \"Shop heaters\", in bold styled type with no button shape. One continuous photograph edge to edge; no other words, logos or brand names anywhere."}}
review {"source": "<finished 300x250 sha256>", "kind": "display", "destination": "display/medium_rectangle", "expected": ["Warm hands, longer sits", "Shop heaters"], "products": [{"name": "Harbor Heat 9,000 BTU LP Portable Heater", "references": ["<product photo sha256>", "<second product photo sha256>"], "size": "9.25 x 10.85 x 14 in, 9.7 lb (heathog.com); about as tall as a 5-gallon bucket, mid-shin on a standing adult"}]}
```

Then every other size at once, each from its unit's first `lettering_routes` row (`read wm://format/leaderboard_728x90`): the same scene, palette, type description and locked lines, laid out for the shape. A strip in Seedream 5.0 at its exact pixels (Seedream refuses fewer than 2560x1440 pixels, so the row asks for a large render), without the logo:

```json
generate {"route": "seedream.image", "params": {"model": "seedream-5-0-260128", "size": "5464x680", "seed": 0,
  "prompt": "A finished 728x90 leaderboard display banner for Harbor Family Dental: one horizontal band of flat warm yellow with no picture, bold navy sans-serif, the type large enough to fill most of the band's height and most of its width. The only words in the image are a headline that reads exactly \"Same-week cleanings\" and a call to action that reads exactly \"Book a visit\", in heavy teal type with no button shape, every letter fully inside the frame with a clear margin. No other words, logos or brand names anywhere."}}
```

Words alone won't give the same face on every unit, so choose what repeats ([display-iab-set](wm://card/display-iab-set)). A plain CTA line is the safe default when the network is unknown; that card also says when a drawn button is fine.

Start two takes of each unit at once (two `generate` calls with different seeds, or `count: 2` on a route that takes it) and keep the better of those that pass `review`: it measures words and placement, so look at both.

A Stories or Reels ad keeps its words out of the interface bands by being made square first, then extended:

```json
generate {"route": "gemini.image", "params": {"model": "gemini-3-pro-image", "aspect_ratio": "1:1", "image_size": "2K", "prompt": "<the square ad, all its words inside the central 80%>"}}
generate {"route": "gemini.image", "params": {"model": "gemini-3-pro-image", "aspect_ratio": "9:16", "image_size": "2K", "reference_sha256s": ["<square sha256>"],
  "prompt": "Extend image 1 into a tall 9:16 phone story: keep image 1 unchanged in the middle of the frame and continue the same scene above and below it, seamlessly, in the same light and style. Keep every word exactly as it is and where it is; add no new text, logos or graphics."}}
```

The logo on a Seedream unit is a second Seedream pass, not a paste and not part of the first render (with the logo as a reference in the same render, every headline came out misspelt). Send the unit's render and the logo as references at the same `size`:

```json
generate {"route": "seedream.image", "params": {"model": "seedream-5-0-260128", "size": "5464x680", "seed": 0,
  "reference_sha256s": ["<728x90 render sha256>", "<logo sha256>"],
  "prompt": "Keep image 1 exactly as it is: the same photograph, layout, colours and every word letter for letter. Add the brand logo from image 2 once, small and crisp, in clear space near the type, reproduced exactly as drawn. Do not add, remove or change any other text."}}
```

It can drop a line, so `review` it with every `expected` line. A wrong letter is fixed the same way ("Change only "Fastr" to "Faster"; keep everything else exactly the same") or by generating the unit again.

Each render to its exact pixels (one uniform scale and a crop no larger than the row's `cover_crop`), reviewed, and delivered once you've kept it, so the caller has it before the rest of the set is done:

```json
edit {"source": "<728x90 render sha256>", "op": "ads_format", "params": {"format": "leaderboard_728x90", "fit": "cover"}}
review {"source": "<finished 728x90 sha256>", "kind": "display", "destination": "display/leaderboard_728x90", "expected": ["Same-week cleanings", "Book a visit"]}
deliver {"artifacts": {"delivery_set": ["<finished 728x90 sha256>"]}, "deliverable_id": "<the set's deliverable id>"}
```
