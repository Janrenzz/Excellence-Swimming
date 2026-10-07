# Figma Build Spec (revision 2)

The HTML in `/site` is the visual source of truth. Import it into Figma with html.to.design (see the README for URLs and viewports), then turn the component board into real components.

## File structure

```
00 Components        ← components.html?capture @ 1440
01 Home              ← index.html @ 1280 and 390
02 Lessons           ← lessons.html @ 1280 and 390
03 Clinics           ← clinics.html @ 1280 and 390 (+ ?state=scheduled for the scheduled-clinics frame)
04 Calendar          ← calendar.html @ 1280 and 390
05 Contact           ← contact.html @ 1280 and 390
06 Motion notes      ← sticky notes from 03-interactions.md
```

Replace the revision-1 frames rather than keeping both: import the new frames, check them, then delete the old ones so the file has one version of each page.

## Foundations

- **Colour:** deep navy dark sections, warm cream page, white cards, aqua accents, soft blue body text. Values are in `design-system/tokens.json`. Colours sampled from the reference screenshots are approximations, adjusted for contrast (all text pairs pass WCAG AA).
- **Type:** verified from the reference site's own stylesheet: **Inter Tight** (headings, Light 300), **Manrope** (body 400, bold card titles and buttons 600–700) and **Space Grotesk** (small uppercase labels, Medium 500). All three are free Google Fonts and available in Figma. Headings are sentence case. Sizes: Display 76, H1 60, H2 46, H3 22, Lead 19, Body 16, Label 12 (+28% tracking).
- **Logo:** the existing wave mark + Sora wordmark stays as a placeholder until new artwork is approved. Logo design is a separate task.
- **Grid:** 12 columns, 64 margin, 24 gutter at 1280. 8 / 40 / 20 at 768. 4 / 20 / 16 at 390.
- **Radii:** cards 24 (20 on mobile), photos 28, inputs 14, buttons/capsules/tabs/slots pill.
- **Page flow:** cream sections hold white cards. Dark gradient sections are entered and left through a layered wave divider at selected transitions only.
  - Home: Hero (dark, video) · Founder (cream) · Philosophy (cream) · wave · Lessons & clinics (dark) · wave · Booking summary (cream, links to Calendar) · Testimonials + school logo wall (cream → mist) · wave · Footer
  - Lessons: Hero (dark, image) · Lesson types + includes (cream) · wave · Coaches & pricing (dark, white cards) · wave · Locations (cream) · wave · Footer
  - Clinics: Hero (dark, image/video) · Upcoming (cream) · wave · What clinics cover (focus panels) + Past clinics (dark) · wave · Team clinics (cream) · wave · Footer
  - Calendar, Contact: dark title band · cream content · wave · Footer
- **Mobile hero (Home):** navy gradient, no video. Heading, one sentence, full-width Book button, then the secondary button and trust row.

## Components (from the board)

| Component | Variants | Wix Studio equivalent |
|---|---|---|
| Button | Style = Primary / Outline · Surface = Light / Dark · State = Default / Hover / Disabled · Size = Default / Small | Button (design presets, pill radius) |
| Text link | Surface = Light / Dark | Text link or transparent button with an arrow icon |
| Round button | Surface = Light / Dark | Button with an icon, circle radius |
| Capsule | Size = Default / Small · Icon = Award / University · Surface = Light / Dark | Container (pill radius) + icon + text, or a Button with an icon |
| Trust row · Booking steps | none | Horizontal Stack of icon + text |
| Design note | none | Remove before launch (it only flags placeholders) |
| Philosophy card | State = Default / Hover | Container in a Grid or Repeater (white fill, 1px border, 24px radius) |
| Format card · Service card · Past clinic card · Info card · Location card | none | Containers / Repeater items |
| Upcoming clinic card | none | Wix Events widget, card layout with images |
| Coach card | none | CMS "Coaches" repeater item |
| Founder slideshow | Slide = 1 / 2 | Slideshow element (2 slides, arrows on, autoplay off) with the name panel overlapping |
| Review card | Avatar = Aqua / Amber / Navy | Card in a Slider / horizontal Repeater (or reviews app) |
| Rating badge | none | Text + star icons; only once a verified review link exists |
| Form field | Type = Input / Select / Checkbox · State = Default / Focus / Error | Wix Forms fields (styled in the form's design panel) |
| Tabs | Use = Forms / Lesson format | Tabs element, pill style |
| Calendar parts | Day, Week day, Slot | Wix Bookings Booking Calendar widget design panel |
| Wave divider | From = Cream / Navy | Section Shape Divider |
| Booking summary | none | Container + buttons + pill links to the Calendar page |
| Focus panel | Width = Narrow / Wide | Container with image background, overlay, pill label and caption |
| School logo tile | State = Placeholder / Logo | Gallery or Repeater item |
| Header · Mobile book bar | none | Global header with scroll effect; container pinned to the bottom on mobile |

## Naming

- Sections are named `NN_Name`, e.g. `03_Founder`.
- Groups use PascalCase, e.g. `Hero_Video_Background`, `Clinic_Video_Background`.
- Never leave default layer names, and never outline text.
