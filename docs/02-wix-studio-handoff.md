# Wix Studio Build Guide (revision 2)

Everything in the design is buildable with native Wix Studio and Wix apps (Bookings, Events, Forms, CMS, Members). The table marks where a Wix widget decides the final look and where a feature still needs checking during the build.

## Can Wix do it natively?

| Design element | Wix Studio feature | Native? |
|---|---|---|
| Fonts: Inter Tight, Manrope, Space Grotesk | Site Styles → Fonts. If a font isn't in Wix's list, upload it (Google Fonts files, open licence) | Yes |
| Hero video (desktop) / navy gradient (mobile) | Section background → Video + overlay; on the mobile breakpoint, change the section background to the navy gradient | Yes. Check that the mobile background override doesn't still load the video |
| Header transparent → navy on scroll | Header scroll effect | Yes |
| Wave dividers | Section → Shape Dividers. Upload `site/assets/media/wave-divider.svg` (two layered waves) and set the colour per section | Yes ([Wix guide](https://support.wix.com/en/article/studio-editor-adding-and-customizing-shape-dividers)) |
| Founder slideshow (2 photos, arrows) + overlapping name panel | Slideshow element, arrows on, autoplay off; name panel is a container layered over the bottom edge | Yes |
| Layered photo frame | Container with a gradient fill, rotated −2°, behind the slideshow | Yes |
| Credential capsules | Repeated containers with a pill radius, icon + text (or Buttons with icons) | Yes |
| Philosophy, service, format, location cards | Containers in a Grid or Repeater; hover: move up 4px + shadow | Yes |
| Coaches & pricing | CMS "Coaches" collection → Repeater | Yes |
| Booking summary on Home | Container with text, buttons and pill links. Every link goes to the Calendar page (no widget on Home) | Yes. Links that preselect a lesson type or coach (`?format=`, `?coach=`) need Velo; without it they simply open the Calendar |
| Calendar page | Wix Bookings Booking Calendar widget (see Bookings below) | Yes. **The widget's own layout decides spacing**; we style fonts, colours and buttons in its design panel |
| Testimonial slider with arrows + dots | Slideshow element or the Testimonials design element, autoplay off | Yes |
| Review rating | Text + star icons, typed in once a verified review source exists | Yes (no live feed) |
| School logo wall | Gallery (grid) or Repeater of logo images; greyscale → colour on hover via Hover interaction | Yes. Add logos only for schools Ruslan confirms; check permission to show each logo |
| Clinics focus panels (3 image panels) | Three containers (one wide, two narrow) with image backgrounds, overlay, pill label and caption; image zoom on hover via Hover interactions ([Wix guide](https://support.wix.com/en/article/studio-editor-creating-a-custom-click-or-hover-interaction)) | Partly. The "hovered panel widens" effect isn't a standard Wix animation: build it static, or add Velo/custom code |
| Upcoming clinics with images | Wix Events widget, card/grid layout, images on, upcoming only | Yes |
| Past clinics | Second Events widget filtered to past events | Yes. Check the past-events option in the widget settings during the build |
| Forms (inquiry, waitlist, team clinic) | Wix Forms | Yes. See `05-contact-handover.md` for labels |
| Mobile Book bar | Container pinned to the bottom, mobile breakpoint only | Yes |
| Sign in to see bookings | Wix Members → My Bookings | Yes |
| "Book with Ruslan" opens the calendar filtered to Ruslan | Not native (widget ignores URL parameters) | Option A: link to the Calendar and the client taps the Coach filter. Option B: a short Velo snippet |
| Motion | Entrance, hover, scroll effects; reduced-motion respected | Yes (see `03-interactions.md`) |

## Wix Bookings setup

1. **Staff:** add Ruslan and Hannah with working hours.
2. **Locations:** add St. Charles Prep and the second location.
3. **Services:** four appointment services: *1:1 Private*, *2:1 Semi-private*, *3:1 Small group*, *4:1 Group*. Assign coaches, locations, duration and price. Prices differ by coach, so use price options by staff member, or one service per coach and format if the plan doesn't support that.
4. **Calendar page:** Tabs element with four tabs, each holding a Booking Calendar widget for that service, with the Location and Staff filters on. Widget design: Manrope, Navy `#172A5A` text, White background, selected day and slot in Navy with white text, accents Aqua Ink `#1C7480`, button Aqua `#75CAD3` with Abyss text and pill radius.
5. **Home:** no widget. A short booking summary links every option to the Calendar page.
6. **Booking buttons:** link every Book a lesson button to the Calendar page.
7. **Sign-in:** Wix Members, so returning clients can reschedule from My Bookings.

The calendar in the design is a **placeholder for this native widget**. It is not a working booking system and never was. Anything the native widget can't do is listed in `04-booking-requirements.md` for separate scoping.

## Wix Events setup (Clinics)

- Create each clinic as an event with registration, a cover image and a short description.
- **Upcoming:** Events widget, card layout, upcoming only. In its settings, set the "no upcoming events" message to "No clinics scheduled right now. Join the waitlist and we'll email you when the next one opens."
- **Past:** a second Events widget showing past events, so the page stays useful between clinics.
- **Team clinics:** Wix Form, notifications to Ruslan.

## CMS: "Coaches" collection

| Field | Type |
|---|---|
| Name | Text |
| Role | Text |
| Photo | Image |
| Credentials | Tags (shown as capsules) |
| Best strokes | Text |
| Location | Text |
| Price 1:1 / 2:1 / 3:1 / 4:1 | Text |
| Order | Number |

## Content status

Real content from excellenceswimming.com: coaches, rates, credentials, best strokes, St. Charles address, email, phone, tagline, clinic descriptions, past clinics, coach photos. Everything still missing is marked on the pages with a dotted underline or a dashed "design note" capsule, and tracked in `06-revision-2-status.md`.
