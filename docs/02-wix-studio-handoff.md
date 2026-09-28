# Figma → Wix Studio Handoff

## Before export: checklist

- [ ] Desktop page frames are exactly **1280px** wide, and the Wix Studio editor is set to 1280.
- [ ] Every section is a direct child of the page frame, ordered top to bottom as it appears.
- [ ] Groups that should respond to screen size use Auto Layout (they become **Stacks**).
- [ ] All text is live text using the shared text styles (none outlined).
- [ ] Colours come from variables. No stray hex values.
- [ ] Photos are **image fills** on simple frames. Logo and icons are simple **SVG** vectors.
- [ ] Buttons are one frame, one fill and one text layer each.
- [ ] No complex masks, blend modes, blurs or effects that only work in Figma.
- [ ] Layers have descriptive names (see 01-figma-build-spec.md §8).
- [ ] `Hero_Video_Background`, `Hero_Overlay` and `Hero_Content` are separate layers. The hero is never flattened.

## Export

1. Install the official **Figma to Wix Studio** plugin.
2. Export one page frame at a time, starting with `01_Home_Desktop`.
3. In Wix Studio, check the section structure, then set up the tablet and mobile breakpoints using the 768/390 frames as the reference.

## Rebuild in Wix Studio

| Figma | Wix Studio |
|---|---|
| Page section frame | **Section** (full width, background on section) |
| Auto Layout group | **Stack** (direction/gap/padding preserved) |
| Grid compositions (services mosaic, 12-col splits) | **CSS Grid** on section/container |
| Header component | Global **Header** → *Sticky / Freeze*; Scroll effect: background Transparent → `#071A26` (Home only). Inner pages: solid Navy |
| Mobile menu | Wix **Menu** + hamburger (Navy full-screen panel) |
| Colour / text variables | **Site Styles** → Theme colours + Text themes (Sora is available in Wix fonts) |
| Button component | Wix **Button** with design presets (Default / Hover / Pressed) |
| Accordion | Wix **Accordion** element or Collapsible text |
| Testimonial slider | **Slideshow** (one slide at a time, arrows, no autoplay) |

### Hero video
1. Select the `02_Hero` section → **Change Background → Video** → upload the drone video.
2. Use the Figma still as the **poster/fallback image**.
3. Add the overlay as a **section background overlay** gradient: top Navy 45% → bottom Navy 85%. Add a second, left-to-right Navy 55% → 0% layer if the text needs more contrast.
4. Video settings: muted, loop and autoplay on desktop. On mobile, use the poster image if the file is heavy (keep the video under about 6 MB, 1080p).

### CMS (never publish placeholder data)
| Collection | Fields | Used on |
|---|---|---|
| **Clinics** | Name, Date, Time, Location, Level, Coach (ref), Description, Availability, Price, Image, Booking link | Home `09_Clinics` (next 3), Clinics page. Show `03b_Empty_State` when the dataset is empty |
| **Coaches** | Name, Role, Specialties (tags), Short intro, Biography, Certifications, Experience, Portrait | Home `10_Team`, Team page |
| **Testimonials** | Quote, Name, Program, Photo (optional), Consent confirmed | Home `11_Testimonials` |
| **Services** | Name, Summary, Who it's for, Main benefit, Image, CTA link, Order | Services page, Home preview |

### Booking
Every **BOOK A LESSON** link points to `#book` in the reference site. In Wix, link it to the **Wix Bookings** service list, or to a specific service page for the "Book Private Lesson" and "Reserve Your Spot" buttons.

## Content to replace before launch

Anything shown in `[brackets]` with a dotted underline is a placeholder. **Do not invent it.**

- Facility name, address, email, phone, social links (footer)
- Clinic details (all fields)
- Coach names, roles, specialties, biographies, certifications and experience
- Testimonials (real quotes, with the client's permission)
- The confirmed **service list**: remove any of the seven services the academy does not offer
- Every image placeholder (labelled `Image · …`): replace with real photography. See `site/assets/media/README.md` for the full shot list, filenames and aspect ratios
- The hero drone video
