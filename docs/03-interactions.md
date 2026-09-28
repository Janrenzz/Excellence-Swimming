# Interaction Notes

These interactions are documented here rather than built into the static Figma file. Rebuild them in Wix Studio with **Interactions / Animations** (and scroll effects for the header). The reference site (`site/assets/js/main.js`, `styles.css`) shows each one working.

All motion uses the easing `cubic-bezier(0.22, 0.61, 0.36, 1)` (ease-out). All of it is turned off when the visitor has **prefers-reduced-motion** set.

| Element | Trigger | Behaviour | Duration |
|---|---|---|---|
| **Header** (Home) | Scroll > 24px | Background transparent → Deep Navy `#071A26`, plus a 1px bottom line (White 20%) | 320ms |
| **Header** (inner pages) | — | Always Deep Navy, fixed | — |
| **Nav link** | Hover / Active | 2px Aqua underline grows from the left (scaleX 0 → 1). Active page keeps the underline | 320ms |
| **Primary / Secondary button** | Hover | Fill changes (Navy → Ocean; Cream → White; Outline → solid). Arrow moves 4px right | 320ms |
| **Button** | Pressed | Moves down 1px | 200ms |
| **Text link** | Hover | Underline grows 35% → 100% width, arrow moves 4px right | 320ms |
| **Images in links** | Hover | Image scales 1.00 → 1.03 inside a clipped frame | 600ms |
| **Content blocks** | Enter viewport (10% from bottom) | Fade 0 → 1 and move up 20px. Plays once | 600ms |
| **Clinic row** | Hover | Background tints to Neutral 60% | 320ms |
| **Testimonials** | Arrow click | Crossfade to the next quote. No autoplay. The counter updates (`02 / 03`) | 300ms |
| **Accordion** | Click / Enter | Opens or closes the panel. `+` rotates to `−` | 320ms |
| **Mobile menu** | Menu icon | Full-screen Navy panel fades in; the icon turns into an ×. Esc closes it | 320ms |
| **Hero video** | Load | Autoplays muted and looped. Paused (poster shown) for reduced-motion users | — |

Keep it restrained. Don't add parallax, auto-rotating sliders or entrance animations on the hero headline.
