# Excellence Swimming: Website Design

A premium, compact swimming-coaching website design (revision 2 of 3). It is built so it can be recreated in Figma as editable layers and exported to **Wix Studio**.

```
site/                    Responsive HTML/CSS reference (the visual source of truth)
  index.html                     01 Home
  lessons.html                   02 Lessons (formats, coaches & pricing)
  clinics.html                   03 Clinics (?state=scheduled previews the scheduled-clinics state)
  calendar.html                  04 Calendar: native Wix Bookings Service List (every Book a lesson lands here)
  booking-calendar.html          04b Native Wix Booking Calendar page (?service=1:1 … 4:1)
  contact.html                   05 Contact (general inquiry + waitlist forms)
  components.html                00 Components board for Figma
  src/                           Page sources + shared header/footer partials
  build.py                       Assembles src → site/*.html
  assets/media/README.md         Photo list: drop files in with these names and they appear automatically
design-system/tokens.json        Colour, type, spacing, radius, layout tokens (Figma Variables / Wix Site Styles)
docs/01-figma-build-spec.md      Figma file, components, page frames
docs/02-wix-studio-handoff.md    What's native in Wix, Bookings/Events/Forms/CMS setup, content to replace
docs/03-interactions.md          Motion plan for Wix Studio
docs/04-booking-requirements.md  Native Wix Bookings vs. future custom booking needs
docs/05-contact-handover.md      Service-interest form, contact labels, handover for Ruslan
docs/06-revision-2-status.md     Revision checklist + asset request for the client
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
| 03_Clinics | `…/clinics.html?capture` (and `?capture&state=scheduled`) | 1280 · 390 |
| 04_Calendar | `…/calendar.html?capture` | 1280 · 390 |
| 04b_Booking_Calendar | `…/booking-calendar.html?capture&service=1:1` | 1280 · 390 |
| 05_Contact | `…/contact.html?capture` | 1280 · 390 |

To refresh the hosted copy after changes, copy `site/` onto the `gh-pages` branch and push.

## Art direction (revision 2)

**Compact, polished and easy to book.** Visual reference: four screenshots of tygerswimfitness.com, adapted to Excellence Swimming's own content and identity.

- **Palette.** Deep navy gradient sections, warm cream page, white cards, aqua accents and soft blue body text. Sampled values are approximations.
- **Type.** Inter Tight Light headings in sentence case, Manrope body text and bold card titles, Space Grotesk small uppercase labels. All three were verified from the reference site's own stylesheet.
- **Cards and capsules.** White rounded cards with thin pale borders; aqua line icons in pale circles with small index numbers; pill-shaped credential capsules; pill buttons (filled aqua or outlined).
- **Images.** Rounded photos, a layered frame and an overlapping name panel on the founder slideshow. Layered wave dividers at selected light/dark transitions.
- **Booking first.** A booking button in every hero, the header, the footer and a pinned mobile bar. Booking uses only native Wix Bookings: a Service List, then Wix's own Booking Calendar page.
- **Logo.** The existing logo stays as a placeholder until new artwork is approved.

## Content honesty

Real content (coaches, rates, credentials, location, contact details, clinics, photos) comes from excellenceswimming.com. Anything in `[brackets]` with a dotted underline, or flagged with a dashed "design note" capsule, is a placeholder: the founder intro (draft), session length, the second location, testimonials, the review rating, university destinations, clinic images and replacement footage. See `docs/06-revision-2-status.md`.
