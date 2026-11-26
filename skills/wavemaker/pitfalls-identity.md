# Pitfalls: people, places and props across shots

What tends to go wrong with who and what is on screen, how to check, why. Index: [pitfalls.md](pitfalls.md).

**One face per lead, from one hero keyframe**.
- Watch out for: every shot of a lead made as its own parallel image call from the plate. One trailer's lead came out as three different men; another's changed face from shot to shot.
- Check: approve one hero keyframe per lead at full size, then make that person's other shots as new stills with it as a reference (Grok's edit route, `xai.image_edit`, kept the person best of the measured editors: ArcFace 0.65-0.94 against the plate; card `grok-imagine-image`). Before animating, `compare` the keyframes with `aspect: "identity"` and the plate in `against` `plates`; the cartoon-adaptation trailer's calls passed no plate and measured nothing.
- Why: a viewer follows a face across cuts; three faces make three characters.

**A group built in one edit**: five plates in one edit averaged the faces (0.31-0.53, one character lost); every wide built on it measured 0.1-0.44. `compare` a master against every plate before building on it. A larger cast in one still works when the editor takes every plate as a reference: Gemini 3 Pro kept 7 of 7 real people, where Grok's edits of edits kept 2 of 7.

**Identity drift without a reviewed keyframe.**
- Watch out for: text-to-video or an unreviewed first frame for any shot showing a person, product, place or recurring subject. Faces, wardrobe and products drift between shots, and I2V pins only the first frame, so later frames can still morph.
- Check: compare first, middle and last frames with the plate (`watch` `identity_track` with `plates`; `compare` `aspect: "identity"` against the plate). Bind `last_frame` (FL2VA) when a face or geometry has to hold.
- Why: viewers track faces across cuts. Text-to-video suits a clip that deliberately shows no subject.

**Judging stills from a contact sheet.** At a few hundred pixels a tile hides clothes, hands, size, food texture, seams and a changed face; all three trailers of 2026-10-23 judged their keyframes from 240-800 px strips. Look at each keyframe at full size (or `review` it with `looking`) before animating it: a defect in the still is in every take.

**Real or known subjects invented from text**.
- Watch out for: a real person, brand product, place, or a character from a known work generated from a description.
- Check: does the plan (`shotlist.json`) name every subject the piece shows with its origin (real, known fiction or invented), and does each known one descend from reviewed reference pixels?
- Why: an invented likeness misleads and drifts. With no usable references, a stand-in told to the user is the fallback, never for the advertised product: one that exists comes from its photos, and one found nowhere is designed and shown (hard rule 8).

**Invented imagery of the advertised property.**
- Watch out for: a stand-in for the very product, venue, home or person the ad sells, including a related object in the product's place (boots in a sock ad).
- Check: does any shot show an invented version of what the claims advertise?
- Why: showing a property that does not exist is a false claim; asking for photos tends to be better.

**Continuity breaks at cuts**. Its 35 stills were one parallel batch from an empty street, the getaway bike baked into the plate: the crushed bike was whole four shots later, a villain who fell was elsewhere or gone, a bag turned into a backpack. Write each scene's continuity first (who is where, what each holds, each prop's state), make one action's stills in story order, the shot before as reference, render a changed state once (SKILL default 15, card `blocking-before-coverage`), and ask at every cut who is where and what state each prop is in. `watch` `shot_sheet` shows each shot's end beside the next start; `review` `cuts` only hashes frames. Not only action: a dinner, two trailers and a sketch skipped the rule, so Maya's anger reset at each return from one still, the diner's pen and phone vanished, and the sci-fi sequel trailer's Gary held two mugs. Any shots of one place and moment are one continuous scene.

**Coverage without geography**.
- Watch out for: the keyframes of one scene with several people generated in parallel from the plates and an empty room. Each still looks right; cut together, two people who face each other sit against the same wall, the listener's shoulder swaps sides, and a third person serves an empty table. The run's own review called the eyelines fine.
- Check: the scene's stills side by side in cut order; for each person, side of frame, eyeline, whether this camera should see their face or their back, and what is behind them. Can you draw the room?
- Why: a generated still has no room until it is given one.

**Small faces in H3.** A recognisable person who is small in frame comes out smeared at any resolution, and SeedVR2 sharpens the smear rather than recovering the face (community report). Check faces at full size on sampled frames; frame the person larger or cut to a closer shot. At sigma shift 12, a "light" denoise of 0.15-0.25 is close to a fresh render (card `pitfall-small-faces-in-h3`).

**Site pixels used as footage.** Animated screenshots and stock photos, or one shot per nav item, read as a brochure of someone else's pictures. Check whether each shot is filmed in the idea or a page image with a move; site facts are the useful part.

**Recurring props and vehicles without a plate**. The family's station wagon changed model between shots. A car, weapon or object seen in more than one shot usually gets its own plate, attached to the shots that show it at about that size (card `object-and-known-thing-plate`). A travel shot that has to arrive somewhere pins its last frame (FL2VA).

**One room becomes several, even with a location plate and a master**. The emergency-red shots and the fix-round replacements were new pictures, not edits, so one elevator got five ceilings and door types, and a mirrored wall read as a corridor; three review rounds never flagged it. Write the set's fixtures into the blocking, pass the approved keyframe as a reference to each later state and insert, `compare` keyframes with `aspect: "setting"` against the plate or master before animating, and avoid mirrors.

**Doors and windows onto what the shot never showed.** H3 invents what lies beyond an opening: a concrete wall where the brief had a thin bar of light between floors, and a maintenance worker on a full landing though the cab had stopped between floors. Design the reveal as its own still, check it against the story's logic, and pin it as the last frame (FL2VA).

**Plates that disagree about the room**. The cab plate and master were shot from outside the open doors with a mirrored back wall, while the doors plate was shot from inside a wider cab, so every method switched between inside and outside and changed the cab's size. Write the place as a set first (size in metres, where every camera stands, fixtures, no mirrors), make the empty plates from one another, and look at them side by side before adding people (card `location-plate`). With that, six shots including a reverse held one cab of one size.
