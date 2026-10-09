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
| Booking summary on Home | Container with text, buttons and pill links. Lesson-type pills link to that service's Booking Calendar page URL; coach and location pills link to the Calendar page | Yes |
| Calendar page (Step 1) | Regular Studio page: title section + Members Login Bar + Wix Bookings **Service List** element (grid, 4 cards: image, name, tagline, duration, price, Book Now, More Info) | Yes. Card content comes from each service in Bookings ([Wix guide](https://support.wix.com/en/article/wix-bookings-setting-up-your-service-list)) |
| Booking Calendar (Step 2) | Wix Bookings' own dynamic **Booking Calendar page** (Pages & Menu → Bookings Pages), designed once for all services: Daily layout, header subtitle + Location and Staff filters on, open on first available date, available slots only; Design tab colours/fonts only; mobile layout Weekly | Yes ([Wix guide](https://support.wix.com/en/article/wix-bookings-customizing-your-booking-calendar-page)). One service per page: visitors change lesson type by going back to the Service List |
| Testimonials: sideways-scrolling review cards, rating badge, "Read all reviews" | Slider or horizontal-scroll Repeater of cards (or the Wix Reviews / Google Reviews app), arrows on, autoplay off; edge fade is a gradient overlay | Yes. If you use a reviews app, its widget decides the final card styling |
| Rating badge (score + stars + count) | Text + star icons typed in, or a reviews app's badge; only once a verified review source exists | Yes |
| School logo wall | Gallery (grid) or Repeater of logo images; greyscale → colour on hover via Hover interaction | Yes. Add logos only for schools Ruslan confirms; check permission to show each logo |
| Clinics focus panels (3 image panels) | Three containers (one wide, two narrow) with image backgrounds, overlay, pill label and caption; image zoom on hover via Hover interactions ([Wix guide](https://support.wix.com/en/article/studio-editor-creating-a-custom-click-or-hover-interaction)) | Partly. The "hovered panel widens" effect isn't a standard Wix animation: build it static, or add Velo/custom code |
| Upcoming clinics with images | Wix Events widget, card/grid layout, images on, upcoming only | Yes |
| Past clinics | Second Events widget filtered to past events | Yes. Check the past-events option in the widget settings during the build |
| Forms (inquiry, waitlist, team clinic) | Wix Forms | Yes. See `05-contact-handover.md` for labels |
| Mobile Book bar | Container pinned to the bottom, mobile breakpoint only | Yes |
| Sign in to see bookings | Wix Members → My Bookings | Yes |
| Opening the calendar already filtered to one coach | Not native. Design avoids it: "Book with Ruslan/Hannah" opens the Calendar page and the visitor picks the coach in the calendar's Coach filter | Velo only, if ever wanted |
| Motion | Entrance, hover, scroll effects; reduced-motion respected | Yes (see `03-interactions.md`) |

## Wix Bookings setup

1. **Staff:** add Ruslan and Hannah with working hours.
2. **Locations:** add St. Charles Prep and the second location.
3. **Services:** four appointment services: *1:1 Private*, *2:1 Semi-private*, *3:1 Small group*, *4:1 Group*. Assign coaches, locations, duration and price. Prices differ by coach, so use price options by staff member, or one service per coach and format if the plan doesn't support that.
4. **Calendar page (Service List):** add Bookings → Service List, choose the four lesson services, grid layout (4 / 2 / 1 per row), show image, name, tagline, duration, price, Book Now and More Info. Clicking a service opens its Booking Calendar (the default).
5. **Booking Calendar page:** Pages & Menu → Bookings Pages → Booking Calendar. Settings: Layout = Daily (mobile: Weekly); Display = subtitle + filters on, first available date, available slots only; Text = rename the Staff filter to "Coach". Design tab: Manrope, Navy `#172A5A` text, White background, Cream `#FBF6EC` header, Line `#E7E1D3` borders/dividers, selected date and time in Navy with white text, Next button Aqua `#75CAD3` with Abyss text. If a corner radius isn't offered, Wix's default applies.
6. **Home:** no widget. The booking summary's lesson-type links use each service's Booking Calendar URL.
7. **Booking buttons:** link every Book a lesson button to the Calendar page.
8. **Sign-in:** Wix Members, so returning clients can reschedule from My Bookings.

The calendar in the design is a **placeholder for this native page**. It is not a working booking system and never was. Anything the native widget can't do is listed in `04-booking-requirements.md` for separate scoping.

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
