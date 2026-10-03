# Motion Plan (v2)

Motion is added in Wix Studio after the design is final in Figma, because Figma-to-Wix doesn't carry animations. This is the list we'll work through together, step by step, once the pages are built.

It's modelled on tygerswimfitness.com, which I inspected. Their motion uses:

- Scroll reveals: content rises 44px or slides in from the left, over about 0.5–0.7s.
- A 0.7s image zoom on hover.
- Floating badges on a slow 5–6s loop.
- A 40s endlessly scrolling marquee strip.
- A pulsing ring and a "scroll" dot indicator.
- Slow wave and light-shimmer overlays.

Everything below is a native Wix Studio animation.

| # | Element | Wix Studio feature | Settings |
|---|---|---|---|
| 1 | Section headings, text blocks, quotes, coach rows | **Entrance animation:** Fade In + Slide In from the bottom | Duration 0.7s, distance ≈ 40px, ease-out, plays once. Stagger sibling items by 0.1s |
| 2 | Founder portrait | **Entrance:** Slide In from the left | 0.8s, ease-out |
| 3 | Hero headline + buttons | **Entrance:** Fade In on page load | 0.8s. Delay the buttons by 0.2s |
| 4 | Credential bar | **Entrance:** Fade In. On mobile, optionally a **marquee** (scrolling text) | Marquee speed slow (≈ 40s per loop), pauses on hover |
| 5 | Lessons & Clinics links, coach photos | **Hover interaction:** image scale 1.00 → 1.04, arrow moves 4px right | 0.5–0.7s, ease-out |
| 6 | Buttons | **Hover:** fill Ink → lighter Ink · **Pressed:** move down 1px | 0.3s |
| 7 | Header | **Scroll effect:** transparent → Warm White after the hero | 0.3s |
| 8 | Hero "scroll" cue (optional) | **Loop animation:** gentle float (up and down 6px) | 1.8s loop |
| 9 | Hero video | Video background, muted and looped. Optional slow parallax via **Scroll animation** | Parallax speed low |
| 10 | Mobile Book Now bar | Pinned to the bottom. **Entrance:** slide up after the hero | 0.3s |

**Turn off or skip:**
- Anything that moves text the visitor is trying to read.
- Auto-rotating testimonial sliders.
- Loop animations on more than one element per screen.
- Wix Studio respects the visitor's "reduce motion" setting. Keep that on.

**Teaching order once the site is built:** 1 → 3 → 5 → 6 → 7 → 4 → 10 → 2 → 8 → 9. The first five cover about 90% of the polish.
