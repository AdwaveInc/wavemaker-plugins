# Pitfalls: the edit, review and delivery

Index: [pitfalls.md](pitfalls.md).

**Delivered below the delivery size**. A cartoon-adaptation trailer and a horror comedy delivered 1344x768; a cyberpunk trailer and a 2:00 short (with an hour of its turn left) laid 1344x768 turbo takes on a 1920x1080 canvas, plain-scaled. A 1080p delivery's takes are rendered at 1920x1088 with `h3-fl-flex6` or `h3-turbo-i2v-1088-bsa` (SKILL default 1); one that profile cannot make (an FL2VA landing, over 124 frames) gets `edit` `upscale` (FlashVSR on faces, SeedVR2 makes skin plastic; card `graph-seedvr2-upscale`), not a plain scale. After picture lock, `compose` once at the delivery size: the destination's, else 1920x1080 for 16:9, 1080x1920 for 9:16 and 1080x1080 for 1:1. Say in the final message what was upscaled.

**Stopping at the first delivery**. The film was delivered at 75 of 120 minutes with 23 review defects (faces morphing while people talk, a cup merging into a face, the room changing between cuts) and the message offered "another hour of rendering" instead. Its takes were all 8-step turbo at 1344x768, upscaled with ESRGAN. A first delivery protects the person from a turn cut short; it is not the end of the work. Fix the defects that fit, re-run kept takes at 20 steps, upscale and deliver again.

**Polishing one format while the other waits**. The turn reached its two-hour deadline mid-sentence ("While the vertical renders and reviews…"): the wide was delivered, the vertical never was, and no message said what remained. Across the 14 launch films, turns ended at the deadline 25 times and at the cap 8 times. Give every format a complete cut before polishing either. When the wrap-up notice comes, deliver from what is composed (provisional, saying which reviews are incomplete) rather than start another render that may not finish.

**Speaking defects waived**. Two speaking takes went out over `review` `lip_sync` findings marked `defect`. A defect on a speaking take means a new take of that shot, or a cut away from the mouth (the listener, an insert); explaining it away is not a fix.

**Delivering while review sections are pending**. The cyberpunk trailer delivered with listening and looking still `pending`; the horror comedy delivered unreviewed while its review sat queued for about 8 minutes. Collect a pending section with the identical call after its `retry_after_s`. Deliver before it comes back only when the turn is close to its limit, and then say plainly which sections were not reviewed.

**Runtime short of the brief**. The plan added up to 109.5 s for a 2:00 brief and the film delivered at 1:53. Plan the cut to the stated runtime within about 3 s with beats (a reaction, an insert, another escalation), never slowed takes or held stills, and score the locked cut.

**Slideshows and whole takes.** One 120 s music video was 83% static; finals that used whole 10 s takes averaged 7.5-10 s per shot. Check `review` (frozen spans) and `watch` `cuts` for shot lengths; pick 1-3 s windows and cut between sizes. The cause was imagined cost pressure with no cap set. A telenovela was about five setups of 4-9 s push-ins on singles, and five of its shots opened on one identical keyframe; its slap, lap offer and hand-over all happened off screen ([narrative-coverage-and-interaction](wm://card/narrative-coverage-and-interaction)).

**Reviewing a draft, delivering the final.** Three of twelve runs reviewed a draft, re-rendered the final and delivered it unreviewed. Review the exact file you deliver.

**Review loops on a finished set.** Hosted display turns re-reviewed whole sets after each small change and chased OCR misreadings of correct copy. Review once in parallel, fix real findings, re-review only what changed (collecting a `pending` section with the identical call is not a re-review); when a finding is an OCR misread, look at the pixels and say so.

**Primed reviewers.** Telling a review model a defect is intentional buys a meaningless approval; brief what to check, not the verdict.

**Defect lists in the final message, and claims the cut doesn't carry**.
- Watch out for: a final message that recites every review finding, or that lists what was planned rather than delivered. A telenovela promised "a slap, 'dun dun DUN' stings and thunder" over an empty sfx track and a muted slap, and said it "passed the delivery checks" when no review had run.
- Check: fix what `review` and `deliver` report before you finish: redo the part, review what changed, deliver again. Then check each sound, beat, line and check the message names against the composed timeline, what `listen` or `review` heard, and the `deliver` reply. What you cannot support is named as unchecked or left out (hard rule 6).
- Why: the checks report rather than refuse, so their defects are your work list, not the user's; the chat shows no findings. The final message says what was made. A defect still unfixed gets one short plain sentence, never a list. Disclosures are always stated: how the picture was scaled, procedural or synthetic audio, and anything not checked.
- A review collected after delivery reaches you in a later turn. Fix that piece then only when the turn's request is about it; otherwise do what was asked and say in one plain sentence that the review found something to fix, offering to fix it.

**Resubmitting pending jobs double-bills.**
- Watch out for: a timed-out wait, reconnect or unclear status followed by a fresh submission.
- Check: observe the original job (`read wm://job/<id>`) or replay the same call with the same `request_id`, which returns the original result. Replace only once it is failed, expired or unrecoverable, under a new request ID, and mention possible duplicate charges.
- Why: the original is usually still running and is billed; a twin is billed again. Jobs that failed before they were dispatched, or were lost (`worker_lost`), are the ones worth one resubmission.

**Ignoring the reference**. Asked for a TV ad "like this" for another product, with a dark photoreal 8-shot car spot attached, an agent made a bright cartoon comedy. Check with `review` `reference`: shot counts, transcripts, look profile and a paired frame sheet.

**Two aspects that tell different films**. One film's 9:16 kept the floor-plan insert its 16:9 had replaced with a glide; a second film's vertical lost a key line; a third film's two end cards came from plates made by different models. A fix made to one cut has to reach the other. Review each cut with `companion` set to the other: `companion_shot_differs`, `companion_cuts_differ`, `companion_words_differ` and `companion_end_card_plates` name where they part, with a paired sheet to look at. Extend one end-card plate to each aspect rather than making two.

**Text and faces under the feed's buttons**. Five verticals put copy, a lockup or a face into the right edge or the bottom band, where TikTok, Reels and Shorts draw their buttons and caption. A portrait review now runs `safe_area` against the short-form zone unless told otherwise; `text_in_margin` is off target, `face_in_margin` an observation to look at.

**Upscaling too early.** Fixes composed over an upscaled master compound artifacts; recompose from sources.
