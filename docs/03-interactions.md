# Motion Plan (revision 2)

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
| 1 | Section labels, headings, text blocks | **Entrance animation:** Fade In + Glide In from the bottom | 0.7s, ≈ 24–40px, ease-out, plays once |
| 2 | Card grids (philosophy, formats, services, clinics) | Same entrance, **staggered** | Delay each card by 0.08s |
| 3 | Cards | **Hover:** move up 4px + soft shadow; photo inside scales 1.00 → 1.04 | 0.3s (photo 0.7s), ease-out |
| 4 | Buttons and text links | **Hover:** aqua lightens, arrow icon moves 3–4px right | 0.3s |
| 5 | Header | **Scroll effect:** transparent → navy with blur after the hero | 0.3s |
| 6 | Hero headline + buttons | **Entrance:** Fade In on page load | 0.8s; buttons delayed 0.2s |
| 7 | Founder slideshow | Slideshow transition: crossfade, arrows only, **no autoplay** | 0.6s |
| 8 | Testimonial slider | Slideshow transition: fade + 16px slide, arrows + dots, **no autoplay** | 0.5s |
| 9 | Founder photo frame | **Entrance:** Fade In; frame plate settles from −4° to −2° | 0.9s, once |
| 10 | Mobile Book bar | Pinned to the bottom; slides up after the hero | 0.3s |
| 11 | Hero video (desktop only) | Muted loop; optional slow parallax via Scroll animation | Low speed |

**Turn off or skip:**
- Anything that moves text the visitor is trying to read.
- Auto-rotating testimonial sliders.
- Loop animations on more than one element per screen.
- Wix Studio respects the visitor's "reduce motion" setting. Keep that on.

**Reduced motion:** every animation in the HTML reference switches off when the visitor's device asks for reduced motion (CSS `prefers-reduced-motion`). In Wix Studio, keep the site's reduced-motion setting on.

**Teaching order once the site is built:** 1 → 2 → 3 → 4 → 5 → 6 → 10 → 7 → 8 → 9 → 11. The first five cover most of the polish.
