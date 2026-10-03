# Excellence Swimming: Website Design

A premium, minimal and editorial website design for a high-end swimming academy. It is built so it can be recreated in Figma as editable layers and exported to **Wix Studio**.

```
site/                    Responsive HTML/CSS reference (the visual source of truth)
  index.html                     01 Home
  lessons.html                   02 Lessons (formats, coaches & pricing)
  clinics.html                   03 Clinics (?state=empty previews the empty state)
  calendar.html                  04 Calendar (booking; every Book Now lands here)
  contact.html                   05 Contact (general inquiry + waitlist forms)
  components.html                00 Components board for Figma
  src/                           Page sources + shared header/footer partials
  build.py                       Assembles src → site/*.html
  assets/media/README.md         Photo list: drop files in with these names and they appear automatically
design-system/tokens.json        Colour, type, spacing, radius, layout tokens (Figma Variables / Wix Site Styles)
docs/01-figma-build-spec.md      Figma file, components, page frames
docs/02-wix-studio-handoff.md    What's native in Wix, Bookings/Events/Forms/CMS setup, content to replace
docs/03-interactions.md          Motion plan for Wix Studio
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
| 02_Lessons | `…/lessons.html?capture` | 1280 · 390 |
| 03_Clinics | `…/clinics.html?capture` (and `?capture&state=empty`) | 1280 · 390 |
| 04_Calendar | `…/calendar.html?capture` | 1280 · 390 |
| 05_Contact | `…/contact.html?capture` | 1280 · 390 |

To refresh the hosted copy after changes, copy `site/` onto the `gh-pages` branch and push.

## Art direction

**Premium, athletic, approachable. Built to get returning customers to booking fast, and to make Coach Ruslan's credentials obvious to first-time visitors within seconds.**

- **Three colours.** Ink Navy `#0E1B2C` for text, nav, footer and buttons. Warm White `#FAF8F4` for the page. Champagne Gold `#C6A969` only for thin rules, chips, small labels and the credential bar. Pages stay light; Ink appears only in the hero video and the footer.
- **Sora 800 throughout.** Oversized uppercase headlines, short body copy capped near 50 characters per line.
- **Credentials first.** The hero says what we offer in two seconds, the credential bar proves it, and the founder section follows immediately.
- **Booking everywhere it matters.** Every Book Now goes to the Calendar page, and the same booking calendar is embedded on Home so returning customers can book without leaving it. Phones get a pinned Book Now bar, and the Calendar page has a pinned booking summary.
- **Selective imagery.** The hero video, Ruslan's portrait, coach portraits, and one image each on Lessons and Clinics. Nothing decorative.
- **Lines, not boxes.** Content is grouped with 1px rules and space. Panels appear only around forms and the booking widget.

## Content honesty

Anything in `[brackets]` with a dotted underline is a placeholder for real details (prices, locations, other coaches, testimonials, credential specifics). Ruslan's intro is a marked draft for him to rewrite.
