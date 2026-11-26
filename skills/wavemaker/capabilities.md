# Capabilities

Every model and tool, one line each: its id and what it is. What it is great and weak
at, when to reach for it, what it costs and what was measured are in its entry:
`read wm://capability/<id>`. `search` with `kinds: ["capability"]` finds one in your
own words. Prices: `quote_only` on the call; availability: `read wm://route/<id>` or
`generate` with `validate_only`. Failures: [pitfalls.md](pitfalls.md); formats:
[playbooks.md](playbooks.md).

Built by `scripts/dev/build_agent_skills.py`; do not edit.

## Motion picture

- `h3-image-to-video`: H3 image-to-video (I2V; self-hosted, generate {graph: ...}; the house default for video)
- `h3-first-and-last-frame`: H3 first and last frame (FL2VA)
- `h3-reference-to-video`: H3 reference-to-video (Ref2VA)
- `longer-and-continued-takes`: Longer and continued takes (self-hosted H3: h3-long-take, h3-extend, continues, [Shot N])
  - `several-angles-in-one-take`: Several angles in one take ([Shot N] sections in an I2V prompt)
  - `one-unbroken-take-up-to-40-s-in-one-window`: One unbroken take up to 40 s in one window (self-hosted H3, h3-long-take / h3-long-take-speech)
  - `longer-h3-take`: Longer H3 take (self-hosted, h3-extend)
  - `continue-a-speaking-take-with-its-next-line`: Continue a speaking take with its next line (self-hosted, h3-extend-speech, experimental)
  - `a-take-that-continues-another-at-the-same-setup`: A take that continues another at the same setup (generate with continues: {take})
- `partner-video`: Partner video (Omni, Kling, Seedance, Runway, Luma, Grok video, Wan, Hailuo, PixVerse, Vidu)
  - `pika-h3-flex-hosted`: Pika H3 Flex hosted (system:pika-h3-flex, pika.video and pika.reference_to_video; untested here)
  - `gemini-omni-1-2-flash`: Gemini Omni 1.2 Flash (system:gemini-omni-1.2-flash, model: "gemini-omni-1.2-flash"; the veo preset's video; not yet measured here)
  - `kling-4-0`: Kling 4.0 (system:kling-4, model: "kling-4.0"; not yet measured here)
  - `kling-4-0-flash`: Kling 4.0 Flash (system:kling-4-flash, model: "kling-4.0-flash"; not yet measured here)
- `performance-transfer-and-avatars`: Performance transfer and avatars (Runway Act-Two, Kling Motion Control and Avatar; self-hosted pathway:motion-transfer)
- `character-performs-a-driving-clip`: Character performs a driving clip (Wan 2.2 Animate)
- `one-person-replaced-in-an-existing-shot`: One person replaced in an existing shot (SCAIL-2 replace, self-hosted scail2-replace)
- `portrait-performs-a-face-clip`: Portrait performs a face clip (liveportrait-reenact, self-hosted LivePortrait, experimental)
- `dance-to-a-song-with-no-driving-clip`: Dance to a song with no driving clip (Wan 2.2 Dancer)
- `lip-sync`: Lip sync (speaking takes, the sync.lipsync route, Kling lip sync, LatentSync)
  - `new-line-on-an-existing-face-clip`: New line on an existing face clip
  - `from-a-still`: From a still
- `control-video-and-restyle`: Control video and restyle (Wan 2.1 VACE)
- `precise-motion-control`: Precise motion control (Wan 2.1 Fun-Camera, Fun-Control, Fun-InP, ATI, WanMove)
- `transparent-elements`: Transparent elements (Wan Alpha)
- `self-hosted-wan-2-2-image-to-video`: Self-hosted Wan 2.2 image-to-video (wan22-i2v-accel)
- `camera-moves-on-a-still`: Camera moves on a still (wan-camera-moves, Remade-AI LoRAs)
- `reframe-to-another-aspect`: Reframe to another aspect (crop or VACE outpaint)
- `cinemagraph-fpv-glide-and-physics-on-a-still`: Cinemagraph, FPV glide and physics on a still (ltx23-native-i2v, LTX-2.3 style LoRAs, experimental)
- `repair-and-finishing`: Repair and finishing (LTX inpaint, retake, extend, expand; SeedVR2 and Topaz upscale; pathway:ltx-face-repair)
  - `supplied-clips-at-the-same-size-frames-and-sound`: Supplied clips at the same size, frames and sound (LTX-2.3 IC, about 10-35 credits a clip)
  - `same-shot-scene-and-person-edits`: Same-shot scene and person edits (LTX-2.3 IC, about 9-17 credits a 4 s clip)
  - `masked-repair-and-aspect-expansion-of-a-supplied-clip`: Masked repair and aspect expansion of a supplied clip (LTX-2.3 In-Outpainting IC)
  - `object-removal-by-name-or-mask`: Object removal by name or mask
  - `change-a-presenter-s-line-in-the-same-shot`: Change a presenter's line in the same shot (LTX-2.3 Dub-It, ltx-ic-dubit, experimental, about 2 min on one B200 for 6 s)
  - `restyle-a-supplied-clip-same-motion-and-a-new-look-from-a-re`: Restyle a supplied clip, same motion and a new look, from a restyled first frame (LTX control, experimental, about 5 credits for 5 s)
  - `generative-video-upscale-of-a-small-ai-draft`: Generative video upscale of a small AI draft (LTX-2.3 Pixel Spatial IC)
  - `time-edits-of-a-supplied-clip`: Time edits of a supplied clip (LTX-2.3)
- `re-camera-an-existing-clip`: Re-camera an existing clip (self-hosted H3 CrossView-Warp, model h3-recamera-crossview)
- `repair-a-small-smeared-face-in-an-h3-take`: Repair a small smeared face in an H3 take (self-hosted, model h3-face-refine, experimental)
- `draft-then-final-with-the-same-audio`: Draft then final with the same audio (self-hosted, models h3-audio-transplant and h3-audio-transplant-i2v)
- `native-1080p-h3-in-eight-steps`: Native 1080p H3 in eight steps (self-hosted, models h3-turbo-i2v-1088, h3-turbo-i2v-1088-speech and h3-turbo-t2v-1088, experimental)
  - `on-four-gpus`: On four GPUs
- `native-1080p-h3-with-sparse-attention`: Native 1080p H3 with sparse attention (self-hosted, models h3-turbo-i2v-1088-bsa and h3-turbo-i2v-1088-speech-bsa)
- `pika-h3-flex-in-six-steps`: Pika H3 Flex in six steps (self-hosted, model h3-fl-flex6)

## Stills, keyframes and designed type

- `keyframes-plates-and-edits`: Keyframes, plates and edits (Grok Imagine, Gemini, GPT Image, Seedream, Qwen, Krea, FLUX, Z-Image, Klein, P-H3-Image, MiniMax-H3-Image)
  - `self-hosted-recipe-edits`: Self-hosted recipe edits
  - `train-a-private-lora`: Train a private LoRA (self-hosted, Z-Image Base, H100)
  - `product-insert`: Product insert (qwen-edit-product-insert, self-hosted, experimental)
  - `fashion-on-model`: Fashion on-model (qwen-edit-on-model, self-hosted, experimental)
  - `recurring-character`: Recurring character (look sheet saved to the Library)
  - `masks`: Masks (self-hosted, experimental, by name only until the masks variant runs in production)
  - `one-window-of-a-clip`: One window of a clip (generate with change: {source, start_s, end_s})
  - `click-to-select-and-tracking`: Click-to-select and tracking (self-hosted, experimental, by name only until its variant runs in production)
  - `window-region-edits`: Window region edits (self-hosted, experimental)
  - `location-panorama`: Location panorama (location-panorama, self-hosted HY-Pano 2.0)
  - `depth-map`: Depth map (depth-anything-3, self-hosted)
  - `self-hosted-krea2-edits`: Self-hosted Krea2 edits (never refused, about 2 min and 8-13 credits per image; experimental, by name only, until the comfyui-krea2edit 2.0.0 variant runs in production, where krea2-edit stays on v1)
  - `krea2-scene-with-two-subjects`: Krea2 scene with two subjects (krea2-edit-multi, -permissive for adult; self-hosted, experimental, by name; runs on the existing Krea2 edit builds)
  - `krea2-region-repair-and-outpaint`: Krea2 region repair and outpaint
  - `a-real-person-s-likeness-from-a-photo`: A real person's likeness from a photo
- `native-type-in-the-image`: Native type in the image (Gemini 3 Pro Image, GPT Image 2, Ideogram 3 / 4 / 4.5, Recraft vector, self-hosted Qwen-Image 2.1)
- `compositor-type`: Compositor type (compose)

## Sound, voice and music

- `voice`: Voice (ElevenLabs design, save, clone, speech, dialogue, speech to speech; OpenAI, xAI, MiniMax, Fish speech)
  - `dubbing`: Dubbing
  - `self-hosted-chatterbox`: Self-hosted Chatterbox
  - `self-hosted-voices`: Self-hosted voices
- `music`: Music (elevenlabs.music, self-hosted MiniMax Music3)
  - `pika-music`: Pika Music (pika.music, system:pika-music; untested here)
- `stem-split`: Stem split (melband, self-hosted MelBand RoFormer, experimental)
- `sound-effects-and-isolation`: Sound effects and isolation (elevenlabs.sound_effects, elevenlabs.isolation)
- `foley-for-a-silent-clip`: Foley for a silent clip (mmaudio-v2a, mmaudio-t2a, self-hosted MMAudio, experimental)

## Editing and finishing

- `compose`: compose
- `edit`: edit
- `edit-view`: edit view
- `upscale`: Upscale
- `still-fixes-without-a-re-render`: Still fixes without a re-render
- `exact-upscale`: Exact upscale (Real-ESRGAN)
- `face-restore`: Face restore (CodeFormer, GFPGAN, GPEN)
- `loudness`: Loudness
- `stills-and-display`: Stills and display

## Sources and references

- `references`: References
- `web-and-video-sources`: Web and video sources
- `competitor-ads`: Competitor ads
- `library`: Library
- `outside-ideas`: Outside ideas

## Review and measurement

- `review`: review
- `watch`: watch
- `listen`: listen
- `long-sources`: Long sources
- `compare`: compare
- `read-wm-artifact-sha256`: read wm://artifact/<sha256>
