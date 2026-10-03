# Figma Build Spec (v2)

The HTML in `/site` is the visual source of truth. Import it into Figma with html.to.design (see the README for URLs and viewports), then turn the component board into real components.

## File structure

```
00 Components        ← components.html?capture @ 1440
01 Home              ← index.html @ 1280 and 390
02 Lessons           ← lessons.html @ 1280 and 390
03 Clinics           ← clinics.html @ 1280 and 390 (+ ?state=empty for the empty-state frame)
04 Calendar          ← calendar.html @ 1280 and 390
05 Contact           ← contact.html @ 1280 and 390
06 Motion notes      ← sticky notes from 03-interactions.md
```

## Foundations

- **Colour:** three brand colours only. Ink Navy `#0E1B2C`, Warm White `#FAF8F4`, Champagne Gold `#C6A969`. Gold Ink `#876628` is the same gold, deepened for small text on white. Everything else is a transparency of Ink or Warm White. Import `design-system/tokens.json`.
- **Gold rules:** use gold only for thin lines, chips, the credential bar, small labels and the logo mark. Never use it as a background or button fill.
- **Page flow:** pages are Warm White from top to bottom. Ink appears only in the Home hero (over video) and the footer. Don't alternate dark and light sections.
- **Type:** Sora 800 throughout. Display 88, H1 72, H2 52, H3 28, Body Large 19, Body 16, Label 12 with +18% tracking.
- **Grid:** 12 columns, 64 margin, 24 gutter at 1280. 8 / 40 / 20 at 768. 4 / 20 / 16 at 390.
- **Imagery:** one strong image per page, at most:

  | Page | Image |
  |---|---|
  | Home | Hero video and the founder portrait |
  | Lessons | One 21:9 image, plus coach portraits |
  | Clinics | One 21:9 image |
  | Calendar | None |
  | Contact | None |

## Components (from the board)

| Component | Variants | Wix Studio equivalent |
|---|---|---|
| Button | Style = Primary / Light / Outline · State = Default / Hover / Pressed / Disabled · Size = Default / Small | Button (design presets) |
| Text Link | Surface = Light / Dark | Text link, or a button with transparent fill |
| Header | State = Transparent / Solid · Breakpoint = Desktop / Mobile | Global header with a scroll effect, plus the Menu element |
| Credential Bar | none | Horizontal Stack of text; a Marquee on mobile (optional) |
| Section Heading | none | Stack: Label + H2 |
| Point · Format · Quote · Honours Row · Price Row · Chip | none | Stacks of text with a 1px top line (Line element) |
| Coach Row | none | CMS "Coaches" repeater item |
| Event Row | State = Scheduled / Empty | Wix Events widget (List layout); empty state in the widget settings |
| Form Field | State = Default / Focus / Error · Type = Input / Select / Textarea | Wix Forms fields (styled in the form's design panel) |
| Tabs | Use = Forms / Lesson format | Tabs element |
| Calendar parts | Day, Slot, Booking Summary | Wix Bookings Booking Calendar widget (design panel) |
| Book Bar · Calendar Sticky Summary | none | Container pinned to the bottom of the screen, mobile breakpoint only |
| Footer | none | Global footer |

## Page frames

| Frame | Sections, in order |
|---|---|
| **Home** | Header (Transparent) · Hero (video) · Credentials · Founder · Why Excellence · Services (Lessons + Clinics) · Testimonials · Footer (with Book Now) |
| **Lessons** | Header · Hero + one image · Formats (1:1, 2:1, 3:1, 4:1) · Coaches & pricing (one row per coach) · Footer |
| **Clinics** | Header · Hero + one image · Open clinics (Events list, with an empty-state variant) · Team clinics (text + form) · Footer |
| **Calendar** | Header · Title + sign-in link · Lesson-format tabs · Booking widget (filters, month, slots, summary) · Footer |
| **Contact** | Header · Title · Info column + tabbed forms (General inquiry / Waitlist) · Footer |

## Naming

- Sections are named `NN_Name`, e.g. `03_Credentials`.
- Groups use PascalCase, e.g. `Hero_Video_Background`.
- Never leave default layer names, and never outline text.
