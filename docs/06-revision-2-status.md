# Revision 2 status

This is design revision **2 of 3**; one more revision remains. Status key: **Done** = implemented and checked in the HTML reference (desktop 1280, tablet 768, mobile 390). **Pending** = our work still to do. **Needs client input** = waiting on Ruslan.

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | Collect the reference links and logo sample from Ruslan | Needs client input | We have four screenshots of tygerswimfitness.com. Still needed: any other reference links, and the logo sample |
| 2 | Establish the font, palette, spacing, cards, capsules and button system | Done | Fonts verified from the reference site's stylesheet: Inter Tight / Manrope / Space Grotesk. Palette sampled (approximate). `design-system/tokens.json`, component board `site/components.html` |
| 3 | Apply that system across all five pages | Done | Home, Lessons, Clinics, Calendar, Contact |
| 4 | Revise the homepage structure | Done | Hero → Founder → Philosophy → Lessons & clinics → Booking summary (links to the Calendar page) → Testimonials + school logo wall |
| 5 | Simplify the mobile hero and booking access | Done | Navy gradient, no video (the file isn't downloaded on phones), full-width Book button first, pinned Book bar after the hero |
| 6 | Add the founder slideshow and compact credentials | Done | Two photos (Tokyo 2020 portrait, racing shot) with arrows; six credential capsules; intro shortened (still a draft for Ruslan) |
| 7 | Add lesson inclusions, coaches and pool locations | Done (content partly pending) | Session length, second location and its pool photo are labelled placeholders |
| 8 | Design upcoming and past clinic states | Done | None-scheduled (default) and scheduled (`?state=scheduled`); past clinics always visible; "What clinics cover" image panels (Unsplash stock photos, labelled) |
| 9 | Retain native Wix booking as the current placeholder | Done | Calendar labelled as a design placeholder with sample data |
| 10 | Document the future custom booking requirements | Done | `docs/04-booking-requirements.md`, with Wix capabilities checked against Wix's help centre |
| 11 | Design the service-interest form and outline contact grouping | Done (backend pending) | Form designed; Wix Forms, labels and automations still to be set up and tested in Wix (`docs/05-contact-handover.md`) |
| 12 | Request professional and swimming photos, pool photos, replacement videos, university details and review links | Pending | We still need to send this request. List below |
| 13 | Record that the revised delivery date still needs confirmation | Needs client input | Revised delivery date not yet agreed |
| 14 | Record that logo pricing, concept count and deliverables still need confirmation | Needs client input | Logo is a separate task. The current logo stays as a placeholder |
| 15 | Check desktop and mobile for text wrapping, spacing, overflow, contrast and clear booking CTAs | Done | Automated checks: no horizontal overflow at 390 / 768 / 1280 on any page; text contrast ≥ 4.5:1 for body pairs; a booking CTA in every hero, the footer and the mobile bar. A visual check in Figma after import is still recommended |

## Asset and information request for Ruslan

- **Photos:** a professional portrait, more swimming/action shots, photos of each pool (St. Charles and the second location), and photos from past clinics.
- **Video:** replacement hero footage in cooler blue/navy tones. The current pool-deck clip has bright red banners, lane ropes and kickboards that clash with the palette. Also any clinic drone footage for the Clinics hero.
- **University destinations** of former students, with permission to name them, plus each school's logo file (and confirmation the logo may be shown).
- **Reviews:** a Google (or other) review link, and 2–3 written testimonials with permission.
- **Copy:** approve or rewrite the founder intro; session length; second location name and address; which coach teaches where; confirmation and details of each credential (event, year), including the Commonwealth Games medal.
- **Business decisions:** revised delivery date; logo pricing, number of concepts and deliverables; whether lesson packs or recurring bookings are needed (see `04-booking-requirements.md`).
