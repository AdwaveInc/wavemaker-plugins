# Pitfalls: image models, edits and text

Stills, edit models and lettering. Index: [pitfalls.md](pitfalls.md).

**Undress by omission**.
- Watch out for: people in a hot tub, pool, lake or bed with no clothing named. Image models default to bare skin. Two of six cabin spots showed a woman who reads as topless (bare back, no straps), and one put a fully clothed couple's feet in the tub.
- Check: every still with people at full size before animating it, and `review` `looking` on the cut. Say what everyone wears; for water, name the swimwear.
- Why: on an ordinary brief that shot ends the ad; raters stopped there.

**Prompt words that become defects**. Things you ask for appear, often more than you meant. "Sparkle", "glisten" and "glossy drip" gave sparkles on breading and sauce everywhere. "Rear plate area dark and unreadable" gave a blacked-out plate. "Crumbs on his lip" gave a messy face. "The left half as clean negative space" gave a frame that looks cut off once a `split` card covers it. Describe what a camera would see; for a card, frame the subject clear of it with the background filling the frame.

**Bars and borders painted into stills**.
- Watch out for: "anamorphic", "letterbox", "widescreen", "2.39:1" or "cinemascope" in a 16:9 image prompt: the model paints black bars into the frame (a trailer kept 36 px of them through a zoom). A plate drawn with a white or coloured border passes it to every keyframe edited from it (a trailer: 16 px white columns in two shots).
- Check: `watch` each still and take with `artifact_scan` (a still's default). `letterbox` names flat bands of any colour, px per side and the `picture` box inside; `review` names them per shot (`edge_bands`). Black or white edge bars are `certain`; other bands may be the shot's own backdrop, so look before you crop. Bands your `brief` designs are observations.
- Fix: `edit` op `crop` to the `picture` box, then `resize` to the frame, or remake the still edge to edge. Ask for the look with lens and grade words, never the frame's shape.

**Krea2 restage leaks**.
- Watch out for: the plate's clothing showing under a new outfit, the person's own background or a second plate's room appearing in the shot, and a removed subject's shadow staying behind.
- Check: in `krea2-edit-scene` the scene is reference 1 and the person reference 2 (swapped, likeness fails); name the new outfit and what is gone; for a removal name the shadow and use Raw at CFG 3 in `krea2-general-edit`.
- Why: the edit LoRAs copy from every reference token; V2 identity carried a street into a living room, and two-person V2 carried a bookshelf onto a beach.

**Angle and next-shot edits that rewrite the product**.
- Watch out for: `qwen-edit-change-angle` and `qwen-edit-next-scene` stills used as delivered product or packaging shots. A high-angle view of a bottle misspelt its label (NORTHWNE), back views invent unseen sides (a bald head got a face on its back), and chained next shots drift identity after about three.
- Check: read every label and logo at full size against the source; prompt back views "no face on the back of the head"; re-anchor chained shots on the plate.
- Why: the LoRA redraws the subject from a new viewpoint; it does not copy pixels.

**A second reference that also sets the pose**. With a side view as `<image2>`, two of three `qwen-image-21-edit` restages came out in profile, and one had over-sharpened skin. Add a second view only when that angle is wanted, and check pose and skin at full size; a low-resolution reference hurts identity most.

**Self-hosted edits that drift a face or reframe** (FLUX.3 Klein).
- Watch out for: a `flux3-klein-edit` restage that slims, ages or smooths a face, drops a mole or freckles, or zooms out from the source. Mechanical parts (instrument valves, gears) can come out wrong in its text-to-image.
- Check: the face at full size beside the reference.
- Why: its upsampler rewrites the request into a full caption, and the caption, not the reference, sets the composition.

**Re-rendered packaging.**
- Watch out for: a product placed into a new scene by an edit model (`qwen-edit-replace-background`): labels, small text and logos are redrawn and drift.
- Check: the label at 100% beside the source photo, and the colour: `compare` with `against.packshot` (the product cutout or studio still) and `product_box` gives each take's CIEDE2000 to the product's colours; over 5 is another colour, and a small `delta_e00_hue_chroma` means the light changed, not the product.
- Why: a wrong letter on the pack voids the ad. In video, a cutout (`birefnet-cutout`) composited in `compose` keeps the source pixels; cutouts drop the shadow, so add a contact shadow, and glass keeps its old background colour.

**Learned skin texture and plastic skin.** A crosshatch on skin or cloth that appears only with a LoRA was learned from upscaled or sharpened training images; open models also tend to waxy skin. Check people at 100%; try lower LoRA strength or an earlier checkpoint, or rebuild texture by downscaling and re-upscaling (card `pitfall-learned-texture-artifacts`).

**Open image model traps** (community reports, 2026-10).
- Weighted prompt syntax such as `(word:1.3)` does nothing on models with Qwen3.5 or Qwen3-VL text encoders (MOSS-Image, Qwen-Image 2.x, FLUX.3 Klein); say it in words.
- Qwen-Image 2.1 identity suffers most from low-resolution references; a second reference from the side helps. Its 4-step Lightning LoRA is sharper but shifts composition to the left. Skin tends plastic with a yellow cast.
- FLUX.3 Klein is meant to run with its prompt upsampler; without it, text-to-image is weak.
- Few-step MOSS adapters add unrequested logos and lettering; SFT at 25 steps kept "no text" best.

**Partial masks and shifted texture passes**. `qwen-edit-inpaint-crop` keeps whatever the mask leaves out: swapping an earring left its old stud above the mask. Mask the whole object. `image-texture-rebuild` shifts framing about 1.5 % and re-invents tiny text and jewellery, so don't composite it over the source or run it on label close-ups.

## Text on screen

**Text rendering errors.**
- Watch out for: one wrong letter in a title, URL, price or logo; Grok Imagine rewriting prompts; blank signs inventing lettering; video models rewriting a card's type when it moves.
- Check: `watch` `ocr` with every intended line in `expected` (include the wordmark), at the master raster; view the card full size and compare the logo side by side with the supplied mark. After moving a card, check frames at start, middle and end.
- Why: one wrong letter in a brand name voids the piece. When a still keeps failing, change only the wrong line with an image-model edit, or move the piece to a stronger letterer at its shape (`lettering_routes`: Seedream 5.0 for strips and towers); never set it in code (hard rule 7). In video, a `compose` text layer is the exit for captions, legal lines and live values.

**End card.** An image-model plate is the resting frame; its words and mark never pass through a video model once landed, and it never dissolves over a face (cards end-card-design, end-card-brand-plate).

**Captions and type illegible or in the margins.**
- Watch out for: captions colliding with supers or the CTA, text in feed-UI zones, banner text under the size floor.
- Check: `review` `safe_area` (pass the brief's margins; `kind: "display"` for banner sets, which measures the 6% inset) and the real pixels at destination size. References: 11 px floor at 300x250; 6% inset on banners; 90% title-safe on cards; legal fine print x-height at least 30 px at 1080p.
