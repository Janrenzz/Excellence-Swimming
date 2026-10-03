# Wix Studio Build Guide (v2)

Everything in the design is buildable with native Wix Studio and Wix apps (Bookings, Events, Forms, CMS). No custom code is required. The table marks the two places where Wix's own widget decides the final look, and the one optional code snippet.

## Can Wix do it natively?

| Design element | Wix Studio feature | Native? |
|---|---|---|
| 5 pages + nav + Book Now in the header | Pages, global Header, Menu, Button linked to the Calendar page | Yes |
| Hero video with overlay | Section background → Video, plus an overlay colour | Yes |
| Header transparent over the hero → solid on scroll | Header scroll effect (background change on scroll) | Yes. If your editor version lacks it, use the Solid header on Home too |
| Credential bar | Horizontal Stack of text with gold dots | Yes |
| Founder, Why Excellence, Lessons/Clinics links, quotes | Stacks, Text, Line, Image | Yes |
| Coaches & pricing rows | CMS collection "Coaches" → Repeater | Yes |
| Booking calendar embedded on Home | Same Tabs + Booking Calendar widgets as the Calendar page (copy the section, or save it as a reusable section) | Yes |
| Calendar: lesson-format tabs | Tabs element, one Booking Calendar widget per tab | Yes (setup below) |
| Calendar: coach + location filters, month view, time slots, summary, Next → checkout | Wix Bookings Booking Calendar widget, with Location and Staff filters turned on | Yes. **The widget's own layout**: we style it (fonts, colours, buttons) in its design panel. Spacing will be close to the mock-up, not identical |
| Mobile calendar sticky summary | The Bookings widget's mobile layout (its own Next button) | **Approximation**: Wix's widget handles this itself. Our sticky bar shows the intended behaviour |
| "Book with Ruslan" opens the calendar with Ruslan already selected | URL parameters aren't read by the widget natively | Option A (no code): link to the Calendar, and the customer taps the Coach filter. Option B: a short Velo snippet (provided on request) |
| Clinics list | Wix Events widget, List layout | Yes |
| Clinics empty state | The Events widget's "no upcoming events" message, plus a waitlist strip that's always visible | Yes (setup below) |
| Team clinic form, general inquiry, waitlist | Wix Forms (required fields, success message, email notifications) | Yes |
| Contact form tabs | Tabs element | Yes |
| Mobile Book Now bar | Container pinned to the bottom of the screen, mobile breakpoint only | Yes |
| Sign in to see bookings | Wix Members "My Bookings" page | Yes |
| Animations | Entrance, scroll, hover and loop animations | Yes (see 03-interactions.md) |

## Wix Bookings setup (do this first; the design depends on it)

1. **Staff:** add each coach (Ruslan, Coach 2, …) with their working hours.
2. **Locations:** add each pool under Business Info → Locations.
3. **Services:** create four appointment services: *1:1 Private*, *2:1 Semi-private*, *3:1 Small group*, *4:1 Small group*. For each one:
   - Assign the coaches who teach it and the locations.
   - Set the duration.
   - Set the price. If prices differ by coach, use the service's **price options / variants by staff member**. If your plan doesn't offer that, create one service per coach and format instead (e.g. "1:1 Private · Ruslan").
4. **Calendar page:** add a Tabs element with four tabs. In each tab, add **Bookings → Booking Calendar**, choose that tab's service, then turn on **Filters: Location, Staff** and pick the Monthly layout. In the widget's design panel, set:
   - Font: Sora
   - Text: Ink `#0E1B2C`
   - Background: Warm White `#FAF8F4`
   - Selected day and time slot: Ink fill with Warm White text
   - Accents: Gold `#C6A969`
   - Button: Ink with a 4px radius
5. **Home embed:** copy the finished Tabs + calendar section onto the Home page (Book section, after Why Excellence). On the mobile breakpoint, leave the widget's own Next button inline, because Home already has the pinned Book Now bar.
6. **Book Now:** link every Book Now button to the Calendar page. That's the header, hero, footer, mobile bar and coach rows.
7. **Sign-in:** add Wix Members, so returning customers can sign in and use "My Bookings" to reschedule.

## Wix Events setup (Clinics)

- Create each clinic as an event with registration or tickets.
- On the Clinics page, add the **Events** widget with the List layout and Upcoming events only. Style it like the Event Row component: date, title, details line, Register button.
- **Empty state:** in the widget settings, change the "no upcoming events" text to "New dates coming soon." Then place a small waitlist strip under the widget ("Want first notice of new clinics? Join the waitlist →"). It's useful whether or not clinics are listed, so no show/hide logic is needed.
- **Team clinics:** use a Wix Form with the fields shown in the design, and set its email notifications to go to you.

## CMS: "Coaches" collection

| Field | Type |
|---|---|
| Name | Text |
| Role | Text |
| Photo | Image |
| Credentials | Tags |
| Focus | Text |
| Price 1:1 | Text |
| Price 2:1 | Text |
| Price 3:1 | Text |
| Price 4:1 | Text |
| Order | Number |

Connect it to a repeater on the Lessons page. The founder section on Home is designed separately, as static content.

## Before launch, replace

- Ruslan's portrait, his first-person intro, and the details for each credential (Games, year, event)
- Other coaches' names, photos, credentials and focus
- Prices, currency, session lengths and locations
- Contact details, reply times and the time zone line on the Calendar
- Real testimonials, used with permission
- Hero video. The current clip shows a "Saint Charles Water Polo & Swimming" banner; replace it if that's not your facility.
