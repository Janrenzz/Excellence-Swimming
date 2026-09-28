# Figma Build Spec

How to build the Excellence Swimming website in Figma so that it exports cleanly to Wix Studio with the official **Figma to Wix Studio** plugin.

The HTML reference in `/site` is the visual source of truth. Every class name, section ID and measurement there matches a layer, style or variable name below.

---

## 1. File structure

```
📄 Excellence Swimming — Website
├── 00 Cover
├── 01 Design System        ← variables, text styles, components (see /site/styleguide.html)
├── 02 Desktop · 1280       ← 01_Home_Desktop … 05_Team_Desktop
├── 03 Tablet · 768         ← 01_Home_Tablet … 05_Team_Tablet
├── 04 Mobile · 390         ← 01_Home_Mobile … 05_Team_Mobile
├── 05 Interaction Notes    ← sticky notes / annotations (see 03-interactions.md)
└── 99 Archive
```

### Fastest path from the reference site to Figma layers

1. Serve `/site` locally (`python3 -m http.server -d site 8080`).
2. In Figma, run **html.to.design** (or a similar HTML-to-Figma importer) on each page at 1280, 768 and 390 widths. This gives editable frames, live text and Auto Layout for every flex group.
3. Replace the imported layers with the components from **01 Design System**, re-link fills to the colour variables and text to the text styles, then rename using the tables below.
4. Replace every image placeholder (`media__tag` labels such as *Image · Coach & swimmer*) with real photography as an **image fill**.

Imported files still need this clean-up. Do not export an un-tidied import straight to Wix.

---

## 2. Variables (Figma Variables panel)

Import `design-system/tokens.json` with a DTCG-compatible importer, or create the variables by hand.

| Collection | Variables |
|---|---|
| **Color** | `Primary/Navy` #071A26 · `Secondary/Ocean` #123A4D · `Background/Cream` #F5F3EE · `Background/Neutral` #EAE7DF · `Background/White` #FFFFFF · `Accent/Aqua` #7FB7B3 · `Accent/Warm` #C5B89F · `Text/Primary` #111820 · `Text/Light` #FFFFFF · `Text/Muted` #4A5560 · `Text/Muted Light` #FFFFFF @72% · `Line/Default` Text/Primary @16% · `Line/Strong` @32% · `Line/On Dark` White @20% |
| **Spacing** | 8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 120 · 160 |
| **Radius** | `Small` 4 · `Medium` 8 · `Large` 12 |
| **Layout** (modes: Desktop / Tablet / Mobile) | `Margin` 64 / 40 / 20 · `Gutter` 24 / 20 / 16 · `Section Padding` 144 / 104 / 72 · `Header Height` 84 / 76 / 68 |

**Colour rules**
- Pages are mostly Cream, Navy, White and photography. Ocean is for hover states and labels on light backgrounds.
- **Aqua** is only used for text on dark backgrounds (7.6:1 on Navy). On light backgrounds it is decorative only.
- Warm is only used for decoration, never for text.

## 3. Text styles

All text styles use **Sora, weight 800 (ExtraBold)**. Headings are uppercase (Text case: UPPER).

| Style | Desktop | Tablet | Mobile | Line height | Letter spacing |
|---|---|---|---|---|---|
| `Display/Hero` | 84 | 64 | 44 | 98% | −3% |
| `Heading/H1` | 80 | 60 | 44 | 98% | −3% |
| `Heading/H2` | 56 | 44 | 34 | 102% | −2.5% |
| `Heading/H3` | 32 | 28 | 22 | 110% | −1.5% |
| `Body/Large` | 18 | 18 | 17 | 160% | 0 |
| `Body/Standard` | 16 | 16 | 16 | 165% | +0.5% |
| `Body/Small` | 15 | 15 | 15 | 160% | 0 |
| `Label` | 13 | 13 | 13 | 120% | +16%, UPPER |
| `Navigation` | 14 | — | 26–40 (menu panel) | 100% | +1% |
| `Button` | 14 | 14 | 14 | 100% | +8%, UPPER |

**Readability with Sora 800**
- Body text boxes are capped at a max width: Body/Large ≈ 480px, Body/Standard ≈ 440px.
- Keep paragraphs to two or three sentences. Never set body text below 15px.
- Put secondary copy in Text/Muted rather than a lighter weight, since only one weight is used.

## 4. Grids

| Breakpoint | Frame | Columns | Margin | Gutter |
|---|---|---|---|---|
| Desktop | 1280 | 12 | 64 | 24 |
| Tablet | 768 | 8 | 40 | 20 |
| Mobile | 390 | 4 | 20 | 16 |

Save them as grid styles `Grid/Desktop-12`, `Grid/Tablet-8` and `Grid/Mobile-4`.

---

## 5. Components

Build every component with Auto Layout. Name component properties as shown.

| Component | Structure (Auto Layout) | Variants / properties |
|---|---|---|
| **Primary Button** | Horizontal · padding 0/28 · height 52 (Fixed) · radius Small · **one live text layer** | `Surface`: Light (Navy fill / white text) · Dark (Cream fill / Navy text). `State`: Default · Hover (Ocean fill / White fill) · Pressed (y+1, 92% brightness). `Size`: Default 52 · Small 44 |
| **Secondary Button** | As Primary · 1px inside stroke, no fill | `Surface`: Light / Dark · `State`: Default / Hover (fills solid) / Pressed |
| **Text Link** | Horizontal · gap 10 · min height 44 · single text layer `LABEL →` | `State`: Default (35% underline) / Hover (full underline, arrow +4px) |
| **Navigation Link** | Vertical · gap 0 · text + 2px underline rectangle (Aqua) | `State`: Default (86% opacity, underline hidden) / Hover / Active (underline visible) |
| **Header** | Horizontal · space-between · height 84 · padding 0/64 · children: Logo · Nav (horizontal, gap 36) · CTA group | `State`: Transparent (no fill) / Scrolled (Navy fill + 1px bottom line On Dark). `Breakpoint`: Desktop / Mobile (logo + menu icon) |
| **Eyebrow Label** | Horizontal · gap 12 · 24×2 rule + Label text | `Surface`: Light (Ocean) / Dark (Aqua) |
| **Section Heading** | Horizontal · space-between · align bottom · children: [Vertical gap 24: Eyebrow + H2] + optional Text Link | `Link`: boolean |
| **Service Block** | Vertical · gap 24 · Image (fill) + Meta (vertical gap 10: title row [H3 + index] + Body) | `Ratio`: 4:3 / 4:5 |
| **Service Feature** (Services page) | Horizontal · gap 24 · Image 6 col + Body 5 col (Vertical gap 32: index label, title, body, Facts list, Text Link) | `Layout`: Image Left / Image Right |
| **Clinic Block** | Horizontal · Image 6 col + Body 5 col (Date row · Level · H3 · Description · Facts list · Primary Button) | `State`: Available / Few spots / Full (text label changes; never colour only) |
| **Clinic Row** (Home) | Horizontal · 4 children: Date · Main · Level · Text Link · 1px bottom stroke | — |
| **Coach Card** (Home) | Vertical · gap 24 · 3:4 portrait + Info (Name H3, Role Label, Specialty) | — |
| **Coach Profile** (Team) | Horizontal · 5-col portrait 4:5 + 6-col body (Role, Name H2, Specialty chips, intro, Accordion) | `Layout`: Image Left / Image Right |
| **Testimonial** | Horizontal · 5-col image + 6-col body (Eyebrow, Quote, Cite, Controls) | `Image`: boolean |
| **Accordion Item** | Vertical · Trigger row (min 56, space-between: Label + ± icon) + Panel | `State`: Closed / Open |
| **Step** | Vertical · gap 16 · top 1px stroke · Number (H2-ish), Title, Body/Small | `Surface`: Light / Dark |
| **Facts List** | Vertical · rows (Horizontal: 120-wide Label dt + value) with 1px bottom strokes | — |
| **Footer** | Vertical · Top (Horizontal: Brand 4 col + 3 columns) + Bottom bar | `Breakpoint`: Desktop / Mobile |

**Button rule for Wix:** a standard CTA is **one frame, one fill and one live text layer**. The arrow is typed into the same text (`EXPLORE SERVICES →`) rather than added as an icon.

---

## 6. Page frames and section layers

- Each page frame has a fixed width and **hug** height, with vertical Auto Layout at 0 gap.
- Sections are **direct children** of the page frame, ordered top to bottom exactly as they appear.
- Every section is full width (1280) with its background fill on the section frame itself. Inside it, a `Container` frame (horizontal padding = Margin) holds the content.
- The header is placed as the first child. Absolute-position it over the hero on the Home page only, and note "Sticky / Fixed" for Wix.

### 01_Home_Desktop

| Layer | Background | Content (Auto Layout) |
|---|---|---|
| `01_Header` | none (Transparent) | Header component, State=Transparent |
| `02_Hero` | **`Hero_Video_Background`** (image fill = drone still) + `Hero_Overlay` (gradient: Navy 45% → 8% → 30% → 85%, plus left-to-right Navy 55% → 0) | `Hero_Content`: Vertical gap 24, bottom-left, max width 820: Eyebrow · Display/Hero · Body/Large · `Hero_CTA_Group` (Primary Button Dark + Text Link). Height 100vh (frame 800–900). Sticky note: **REPLACE WITH DRONE BACKGROUND VIDEO IN WIX STUDIO** |
| `03_Trust` | Cream | Horizontal, 4 items, 1px left dividers. Each: Title (15, +10%) + Body/Small muted |
| `04_Introduction` | Cream | Grid: Heading block (col 1–6) · Body/Large + Text Link (col 8–12) |
| `05_Services` | Cream | Section Heading + 5 Service Blocks (7+4 / 4+4+4, middle block offset 96) |
| `06_Lessons` | Neutral | Section Heading · 2 × Lesson Option (image 5:6, H2 "PRIVATE"/"GROUP", Body, arrow) · centred Secondary Button |
| `07_Why_Us` | Navy | Heading (col 1–7) + lead (col 9–12) · 4 principles with 1px top lines (no cards) |
| `08_Immersive_Image` | Full-bleed image fill + bottom overlay | "EVERY STROKE. / MORE CONFIDENCE." 112px, bottom-left |
| `09_Clinics` | Cream | Section Heading + 3 Clinic Rows (CMS placeholders) |
| `10_Team` | Cream | Section Heading + 3 Coach Cards (middle offset 80) |
| `11_Testimonials` | Neutral | Testimonial component (one quote at a time) |
| `12_Process` | Cream | Section Heading · 3 Steps · Primary Button |
| `13_Final_CTA` | Image fill + Navy 78% overlay | H1 "READY TO / DIVE IN?" · Body/Large · Primary Button Dark |
| `14_Footer` | Navy | Footer component |

### 02_Services_Desktop
`01_Header` (Scrolled) · `02_Hero` (Eyebrow, H1 "COACHING FOR / EVERY GOAL." col 1–7 · Body/Large + Primary Button col 9–12 · 21:9 image) · `03_Service_Index` (anchor links 01–07) · `04_Services_List` (7 × Service Feature, alternating Image Left / Image Right, 176 between) · `05_Final_CTA` (Navy: "NOT SURE / WHERE TO START?" + GET STARTED) · `06_Footer`

### 03_Private_Group_Desktop
`01_Header` · `02_Hero` (H1 "PRIVATE & GROUP / SWIM LESSONS." + supporting text + BOOK A LESSON · image diptych 7:5) · `03_Private` (Cream: image left, 5 numbered highlights, BOOK PRIVATE LESSON) · `04_Group` (Navy: image right, 5 highlights, VIEW GROUP LESSONS) · `05_Comparison` ("WHICH OPTION / IS RIGHT FOR YOU?": two columns divided by a 1px vertical line, same Facts rows on each side, no ticks or price grid) · `06_Process` (4 Steps: Choose / Schedule / Meet Your Coach / Start Progressing) · `07_Final_CTA` ("READY TO GET / IN THE WATER?") · `08_Footer`

### 04_Clinics_Desktop
`01_Header` · `02_Hero` (Navy: "UPCOMING / CLINICS.") · `03_Clinic_List` (3 × Clinic Block, CMS-bound) · `03b_Empty_State` (a hidden variant: "NEW CLINICS ARE / COMING SOON." + CONTACT US) · `04_Final_CTA` · `05_Footer`

### 05_Team_Desktop
`01_Header` · `02_Hero` ("MEET THE / TEAM.") · `03_Coaches` (3 × Coach Profile, alternating) · `04_Philosophy` (Navy: 4 rows, number · word at H2 size · one line) · `05_Final_CTA` (Cream: "FIND THE RIGHT COACH / FOR YOUR GOALS." + BOOK A LESSON) · `06_Footer`

---

## 7. Responsive adaptation (not just scaling)

| Pattern | Desktop 1280 | Tablet 768 | Mobile 390 |
|---|---|---|---|
| Navigation | Inline links + CTA | Menu icon → full-screen Navy panel | Same as tablet |
| Hero | Content bottom-left, 84px | 64px | 44px, buttons stacked full width |
| Trust | 4 across | 2 × 2 | Stacked list, top dividers |
| Services mosaic | 7+4 / 4+4+4 staggered | 1 full + 2×2 staggered | Single column |
| Lessons | 2 halves | 2 halves | Stacked, 4:5 images |
| Principles / Steps | 4 (or 3) across | 2 × 2 | Stacked |
| Alternating image/text | Side by side | Image full width, text below (cols 1–6 of 8) | Image, then text |
| Clinic rows | 4 columns | Date + stacked main | Fully stacked |
| Comparison | 2 columns | 2 columns, labels above values | Stacked, top divider |
| Section padding | 144 | ≈104 | ≈72 |

Set children to **Fill container** width inside Auto Layout. Images use a fixed aspect ratio (Figma: lock aspect ratio) so they stay in proportion when resized.

## 8. Layer naming rules

- Sections are named `NN_Name`, e.g. `05_Services`.
- Groups use PascalCase with underscores: `Hero_Content`, `Hero_CTA_Group`, `Service_Block/Private`.
- Images are named by what they show, e.g. `IMG_Coach_Swimmer`, `IMG_Underwater`.
- Never leave default names (`Frame 238`, `Rectangle 12`).
- Never flatten or outline text. Never group-and-rotate. Never use Boolean groups for layout.
