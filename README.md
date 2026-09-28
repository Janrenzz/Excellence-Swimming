# Excellence Swimming: Website Design

A premium, minimal and editorial website design for a high-end swimming academy. It is built so it can be recreated in Figma as editable layers and exported to **Wix Studio**.

```
site/                    Responsive HTML/CSS reference (the visual source of truth)
  index.html                     01 Home
  services.html                  02 Services
  private-group-lessons.html     03 Private & Group Lessons
  upcoming-clinics.html          04 Upcoming Clinics   (?state=empty previews the empty state)
  our-team.html                  05 Our Team
  styleguide.html                00 Design System (variables + components)
  src/                           Page sources + shared header/footer partials
  build.py                       Assembles src → site/*.html
  assets/media/README.md         Photo shot list: drop files in with these names and they appear automatically
design-system/tokens.json        Colour, type, spacing, radius, layout tokens (Figma Variables)
docs/01-figma-build-spec.md      Figma file, components, Auto Layout, frames, responsive rules
docs/02-wix-studio-handoff.md    Export checklist, Wix mapping, video, CMS, content to replace
docs/03-interactions.md          Motion spec for Wix Studio
```

## View it

```bash
python3 -m http.server -d site 8080   # open http://localhost:8080
```

To change the header or footer, edit `site/src/partials/*`. To change a page, edit `site/src/*.html`. Then run `python3 site/build.py`.

## Import into Figma (html.to.design)

The `gh-pages` branch serves the site at https://janrenzz.github.io/Excellence-Swimming/. In html.to.design choose **Import from URL**, add `?capture` so every section shows at rest (no scroll reveals), and set the viewport:

| Frame | URL | Viewport |
|---|---|---|
| 00_Components | `…/components.html?capture` | 1440 |
| 01_Home | `…/index.html?capture` | 1280 · 390 |
| 02_Services | `…/services.html?capture` | 1280 · 390 |
| 03_Private_Group | `…/private-group-lessons.html?capture` | 1280 · 390 |
| 04_Clinics | `…/upcoming-clinics.html?capture` | 1280 · 390 |
| 05_Team | `…/our-team.html?capture` | 1280 · 390 |

To refresh the hosted copy after changes, copy `site/` onto the `gh-pages` branch and push.

## Art direction

**High-end sports academy + premium wellness brand + minimal editorial website.**

- **Typography does the work.** Everything is set in Sora 800. Headlines are oversized and uppercase, with tight leading and intentional line breaks ("SWIM STRONGER. / MOVE WITH CONFIDENCE."). Body copy is kept short, capped at about 46–48 characters per line, with generous line height so the heavy weight stays readable.
- **Restrained palette.** The pages are built from Deep Navy, Warm Cream, White and photography. Aqua appears only as a small accent on dark surfaces (labels, numbers, the active nav line).
- **Photography over decoration.** Imagery is large, the aspect ratios are consistent (4:5, 3:4, 4:3, 21:9) and corners stay square. There are no cards, drop shadows, gradients-as-decoration or icon grids.
- **Structure from lines and space.** Content is grouped with thin 1px dividers, numbered indexes (01–04) and 100–160px section spacing, never with boxes.
- **One next step per section.** BOOK A LESSON is the only primary action (header, hero, services, lessons, team, final CTA, footer). Everything else is a quieter text link with an arrow.

## Accessibility

- Contrast: body text on Cream is 16:1, muted text is 6.9:1, Aqua on Navy is 7.6:1, and muted text on Navy is 9:1. The hero uses a two-way gradient overlay so text stays readable over video.
- Buttons are at least 44–52px tall and text links have 44px hit areas. Focus rings are visible, and there is a skip link.
- Heading levels are in order, and each image has alt text via `role="img"`/`aria-label`. Clinic availability is written out in text, not shown by colour alone.
- Reduced-motion preferences are respected: reveals are disabled and the hero video is paused.

## Content honesty

No statistics, testimonials, clinic details or coach credentials have been invented. Every such field is a clearly marked `[placeholder]` (dotted underline) to be filled from real academy data. The service list reflects the brief's *potential* services. Confirm it with the academy before launch.
