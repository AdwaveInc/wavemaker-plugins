## Logo sting or bumper

**What usually works.** The same method lands the reveal at the end of a longer film when its brief says how the mark arrives ([end-card-brand-plate](wm://card/end-card-brand-plate) "When the brief says how the mark arrives"). 3-10 s (about 5 s when unspecified), resolving around 60% through and holding the logo about 2 s. The mark is the supplied artwork, shown by a composition layer from the resolve frame; generated motion leads into it. One designed move (a slow push, or material settling into the logo's layout), with an FL2VA end frame matching the layout. Stop-motion feel comes from rendering 24 fps, keeping every second frame and holding each twice (ffmpeg `fps=12` then `fps=24`). Logo around 40% of frame width with strong contrast. A sonic logo from the `elevenlabs.sound_effects` route peaking on the resolve; no speech unless asked. A logo without transparency needs its background removed before compositing: on a flat colour, `edit` `key` (its `color`) makes a transparent PNG; on anything busier, ask the user for a transparent file.

**Pitfalls.** H3 invents letters that compete with the mark; a dead tail after the hit.

**Questions to ask of the cut.**
- Does it end on the exact supplied logo, held as long as asked?
- Is the logo readable when the frame is shrunk to a quarter?
- Does the sonic logo peak on the resolve?
- Is the delivery resolution what was asked, and was any upscale mentioned?
