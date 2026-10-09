# Figma: import the site, then rebuild the animations in the Prototype tab

Two parts: (A) getting every page into Figma as editable layers, laid out in desktop + mobile pairs, and (B) a step-by-step tutorial for recreating each animation the website currently has.

---

## Part A — Import

### What does the import

**html.to.design** renders each live page in a browser at a chosen width and converts it into Figma layers: frames, text, images and auto layout where the page uses flexbox. Text stays editable, and the fonts (Inter Tight, Manrope, Space Grotesk, Sora) are Google Fonts, so Figma has them.

What it does **not** do:
- **No components.** It doesn't create reusable components; see A4.
- **No video.** The hero video arrives as its still image.
- **No animation.** All motion is rebuilt in Part B.
- **No positioning.** Frames are dropped where the plugin chooses, so A3 is done by hand.

Always add `?capture` to the address. This shows every section at rest: no scroll fades, no pinned hero. Without it, sections that haven't faded in yet would import as invisible.

### A1. Connect the plugin (so Claude can run the imports)

1. Open your Figma file and add a page called **Website (revision 2)**.
2. Go to **Plugins → html.to.design** and sign in with **macuhajanrenz@gmail.com**.
3. In the plugin window, open the **MCP** tab and leave the window open.
4. Tell Claude it's open. Claude runs the 15 imports listed below and checks each one.

### A2. Or import by hand (same result)

In html.to.design: **Import → URL**, paste the address, set the width, keep **Auto layout** switched on, then click **Import**.

| # | Frame name | Address (base: `https://janrenzz.github.io/Excellence-Swimming/`) | Width |
|---|---|---|---|
| 1 | `00 Components` | `components.html?capture` | 1440 |
| 2 | `01 Home — Desktop` | `index.html?capture` | 1280 |
| 3 | `01 Home — Mobile` | `index.html?capture` | 390 |
| 4 | `02 Lessons — Desktop` | `lessons.html?capture` | 1280 |
| 5 | `02 Lessons — Mobile` | `lessons.html?capture` | 390 |
| 6 | `03 Clinics — Desktop` | `clinics.html?capture` | 1280 |
| 7 | `03 Clinics — Mobile` | `clinics.html?capture` | 390 |
| 8 | `03b Clinics Scheduled — Desktop` | `clinics.html?capture&state=scheduled` | 1280 |
| 9 | `03b Clinics Scheduled — Mobile` | `clinics.html?capture&state=scheduled` | 390 |
| 10 | `04 Calendar — Desktop` | `calendar.html?capture` | 1280 |
| 11 | `04 Calendar — Mobile` | `calendar.html?capture` | 390 |
| 12 | `04b Booking Calendar — Desktop` | `booking-calendar.html?capture&service=1:1` | 1280 |
| 13 | `04b Booking Calendar — Mobile` | `booking-calendar.html?capture&service=1:1` | 390 |
| 14 | `05 Contact — Desktop` | `contact.html?capture` | 1280 |
| 15 | `05 Contact — Mobile` | `contact.html?capture` | 390 |

If your browser shows an old version, add `&v=` plus any number to the address. GitHub Pages lets browsers keep a saved copy of each page for up to 10 minutes.

### A3. Arrange the pairs

Each page gets a desktop frame with its mobile frame directly to its right. The pairs sit in one row, left to right, so pages of different heights never overlap. Select a frame and type these X and Y values in the right panel:

| Pair | Desktop X | Mobile X | Y (all) |
|---|---|---|---|
| 01 Home | 0 | 1400 | 0 |
| 02 Lessons | 2190 | 3590 | 0 |
| 03 Clinics | 4380 | 5780 | 0 |
| 03b Clinics Scheduled | 6570 | 7970 | 0 |
| 04 Calendar | 8760 | 10160 | 0 |
| 04b Booking Calendar | 10950 | 12350 | 0 |
| 05 Contact | 13140 | 14540 | 0 |
| 00 Components | 0 | — | −6000 (above the row) |

The spacing works out as: desktop 1280 wide, a 120 gap, mobile 390 wide, then 400 before the next pair. Add a **Section** (Shift + S) around each pair and name it after the page, for example `01 Home`. Sections keep pairs together when you move them.

### A4. Turn the board into reusable components

The `00 Components` board has every variant as a labelled frame, for example `Style=Primary, State=Hover`.

1. Select the frames for one component, such as the five button variants.
2. Right-click → **Create multiple components**.
3. Rename each component exactly as its label says.
4. With them all selected, use **Combine as variants** in the right panel.
5. Repeat for the other components:
   - Button
   - Capsule
   - Card (philosophy, format, service, past clinic, info, location)
   - Review card
   - Logo tile
   - Focus panel
   - Form field
   - Tabs
   - Day / Slot
   - Wave
   - Header
6. **Optional, but it makes the pages update together.** Imported page layers are plain layers, not instances of these components, so you can't swap them. Instead, delete an imported element (a button, a card) and drag in the matching component from the Assets panel in the same spot. Do this at least for the header, footer, buttons and cards.

### A5. Check the import

For each frame, check:
- **Fonts:** headings are Inter Tight Light. A missing-font warning means a font needs activating.
- **Photos:** each photo shows its image, not a grey or blue block.
- **Mobile layout:** each mobile frame is 390 wide, and its layout matches the phone version of the site (stacked cards, navy hero without video, phone menu button).
- **Placeholders:** the dashed "Design placeholder" capsules are present. They mark what still needs client input.

---

## Part B — Rebuilding the animations in the Prototype tab

### First, set up the prototype

1. Click the **Prototype** tab in the right panel.
2. Select `01 Home — Desktop` and, under **Overflow**, choose **Vertical scrolling**. Do the same for every page frame.
3. Select the header layer and set its scroll behaviour, **Position**, to **Fixed**. This mirrors the site's fixed header.
4. **Easing used throughout the site:** in Figma choose **Custom bezier** and enter `0.22, 0.61, 0.36, 1`. If you'd rather keep it simple, **Ease out** is close.
5. **Durations on the site:**
   - 280 ms: most hovers and the header
   - 600 ms: slideshows and panels
   - 700 ms: section fade-ins and photo zoom
6. **To preview:** select a frame and press **Present**, the ▶ button top right. Use **Cmd/Ctrl + Shift + P** to restart. Hover, click and drag the way a visitor would.

### Can Figma reproduce it?

Figma prototypes have no **scroll-position trigger**. Nothing can react to how far a visitor has scrolled. Anything tied to scrolling therefore needs an approximation, usually **On drag + Smart Animate**, which plays the animation in step with your drag so it feels like scrolling.

| # | Animation on the site | Figma |
|---|---|---|
| 1 | Hero pinned, founder slides over it, hero text fades with scroll | **Approximation** |
| 2 | Sections fade in and rise as they enter the screen | **Approximation** |
| 3 | Header transparent → navy after scrolling | **Approximation** |
| 4 | Mobile Book bar slides up after the hero | **Approximation** |
| 5 | Hero video (desktop), paused when covered | **Partly**: video plays; pausing doesn't |
| 6 | Button hover: lighten, lift 1px, arrow moves | **Direct** |
| 7 | Text link and nav link hover (arrow moves, underline grows) | **Direct** |
| 8 | Card hover: lift 4px + shadow, photo zooms | **Direct** |
| 9 | Founder slideshow: arrows crossfade 2 photos | **Direct** |
| 10 | Reviews carousel: sideways scroll, arrows move one card | **Direct** |
| 11 | Clinics focus panels: hovered panel widens, photo zooms | **Direct** |
| 12 | School logos: grey → colour, lift 3px | **Direct** |
| 13 | Mobile menu opens and closes | **Direct** |
| 14 | Contact tabs (General inquiry / Waitlist) | **Direct** |
| 15 | Form errors and success message | **Approximation** (no real typing checks) |
| 16 | Booking calendar: pick a day, pick a time, Next turns on | **Direct**, for a few sample states |
| 17 | Input focus ring | **Direct** |
| 18 | Reduced-motion setting turns effects off | **Not possible**: Figma prototypes ignore this setting |

---

### 1. Sticky founder covering the hero, with the hero fading out — approximation

**How the site does it:** the hero is pinned to the top of the screen. The "Meet the Founder" section has a solid cream background and sits above the hero in the stack, so as you scroll it slides up and covers the hero. The hero's text and footage note fade from 100% to 0%, rising 32px, and are fully gone when about 70% of the hero is covered. Scrolling back up reverses it exactly. Once the founder reaches the top, the rest of the page scrolls normally.

**Why Figma needs an approximation:** Figma can't link opacity to scroll position. It also has no scroll trigger, so we fake the scroll with a drag.

**Option A: three frames with On drag + Smart Animate. This is the closest match.**

1. **Prepare the frames.**
   - Duplicate `01 Home — Desktop` three times. Name the copies `Home · Cover 0`, `Home · Cover 50` and `Home · Cover 100`.
   - In all three, check the layer order. The founder section must be **above** the hero in the Layers panel; drag it up if needed. Give the founder section a **solid fill** of `#FBF6EC` so the hero can't show through.
   - Group the hero's text, buttons, trust row and footage note into one group named `Hero_Content`. Use the **same layer names** in all three frames; Smart Animate matches layers by name.
   - **Cover 0:** leave as imported.
   - **Cover 50:**
     - Move the founder section **up** by half the hero's height. The hero is about 700 px tall on desktop, so move it 350 px; it now overlaps the hero's bottom half.
     - Move every section below the founder up by the same amount.
     - Set `Hero_Content` opacity to **30%** and move it up **20 px**.
   - **Cover 100:**
     - Move the founder section up by the full hero height so its top touches the top of the frame, under the fixed header.
     - Move every section below the founder up by the same amount.
     - Set `Hero_Content` opacity to **0%** and move it up **32 px**.
   - In Cover 0 and Cover 50, set **Overflow → No scrolling**; dragging does the "scrolling" there. In Cover 100, set **Vertical scrolling** so the rest of Home scrolls normally.
2. **Prototype connections.**
   - In `Home · Cover 0`, draw a full-frame **transparent rectangle** called `Drag_Hotspot` above everything except the header.
   - Connect it: trigger **On drag** → action **Navigate to** `Home · Cover 50` → animation **Smart Animate**.
   - In Cover 50, add the same hotspot. Connect **On drag** → `Home · Cover 100` (Smart Animate). Add a second connection on the same hotspot, **On drag** → back to `Home · Cover 0`. Figma picks the frame whose movement matches your drag direction, so dragging up goes forward and dragging down goes back.
   - In Cover 100 you can't add a drag hotspot, because it would block normal scrolling. To go back to the top, connect the header logo: **On click** → `Home · Cover 0`, Smart Animate.
3. **Easing and duration.**
   - Use Smart Animate with **Custom bezier `0.22, 0.61, 0.36, 1`** at **400 ms**.
   - With On drag, Figma follows your finger or mouse as you drag. The duration only applies to the part that finishes after you let go.
4. **Preview and test.**
   - Present `Home · Cover 0`. Click and drag **upward** on the hero: the founder should slide up and the hero text fade. Drag further to reach Cover 100.
   - Drag **downward** in Cover 50: everything should reverse.
   - In Cover 100, scroll with the wheel to continue down the page, then click the logo to return.
   - If layers jump instead of gliding, a layer name differs between frames. Check the names match exactly.

**Option B: Figma's Sticky scroll behaviour. Simpler, but only the "pinned" part.**

1. In one Home frame with vertical scrolling, select the **hero section** and set **Scroll behaviour → Position: Sticky**.
2. Make sure the founder section is above the hero in the Layers panel and has a solid fill.
3. Present and scroll. The hero should stay put as the founder rides up over it.
4. **Limitation:**
   - **No fade:** Figma can't fade the hero's text as you scroll, so it stays visible until it's covered.
   - **Check the layer order:** test that Figma draws the founder above the pinned hero. If the hero ends up on top in Present mode, use Option A.

**Mobile:** do the same with `01 Home — Mobile`. The hero is about 600 px tall there, so use 300 px for Cover 50 and 600 px for Cover 100.

---

### 2. Section fade-in and rise as you scroll — approximation

**On the site:** each block fades from 0% to 100% and rises 24 px over **700 ms** the first time it enters the screen. Cards in a row start 80 ms apart.

**Figma can't trigger this on scroll.** The closest practical option shows it on the frame you land on:
1. **Frames:** duplicate the page frame. In the copy, called `… · Before`, set the first screen's section groups to **opacity 0%** and move them **24 px down**. Keep the layer names the same.
2. **Connection:** on the `… · Before` frame itself, trigger **After delay 1 ms** → **Navigate to** the normal frame → **Smart Animate**.
3. **Easing:** Custom bezier `0.22, 0.61, 0.36, 1`, **700 ms**. Figma can't delay one card more than another inside a single Smart Animate. Accept everything moving together, or chain extra frames, one per card, each with **After delay 80 ms**.
4. **Test:** present `… · Before`. The first screen should fade up into place. Sections further down will already be visible, which is the limitation.

---

### 3. Header: transparent → navy after scrolling — approximation

1. **Frames:** make the header a component with variants `State=Transparent` (no fill) and `State=Scrolled` (fill `#061522` at 94%, Background blur 12, and the Book button filled aqua).
2. **Connections:** Figma can't change the header on scroll. Practical options:
   - In the Cover 50 and Cover 100 frames from animation 1, use the `State=Scrolled` variant. The header then changes as part of that drag sequence.
   - On other pages, use `State=Scrolled` throughout, since the header turns navy almost immediately on the site anyway (after 24 px).
3. **Easing:** Smart Animate, Custom bezier, **280 ms**.
4. **Test:** present Cover 0 and drag; the header should fill in navy as you move to Cover 50.

---

### 4. Mobile Book bar slides up after the hero — approximation

1. **Frames:** in the mobile Home frame, place the `Book_Bar` at the bottom of the frame and set **Scroll behaviour → Fixed**. That part is direct.
2. **The slide-in is the approximation.** The site only shows the bar once you've scrolled 60% of a screen. In Figma, either:
   - leave it always visible, or
   - include it only in the `Home · Cover 100` mobile frame, positioned **below** the frame edge in Cover 50 and at the bottom in Cover 100, so it slides up as part of the drag.
3. **Easing:** Smart Animate, Custom bezier, **280 ms**.
4. **Test:** present the mobile Cover frames and drag; the bar should rise into place.

---

### 5. Hero video — partly direct

1. **Frames:** select the hero background image in the desktop frame. In **Fill**, change the image to **Video** and upload `site/assets/media/hero-drone.mp4`. Video in prototypes may require a paid Figma plan.
2. **Settings:** in the video fill's options, turn on **Autoplay**, **Loop** and **Mute**.
3. **Not possible:** pausing the video when the founder covers it. It doesn't matter visually, because it's hidden then.
4. **Mobile:** the site shows the navy gradient only, so leave the mobile hero without video.

---

### 6. Button hover — direct

1. **Variants:** on the Button component, add `State=Default` and `State=Hover`.
   - Hover fill `#8AD5DD`, moved up 1 px.
   - Drop shadow: Y 10, blur 24, spread −12, colour `#75CAD3` at 80%.
   - Move the arrow icon 3 px right.
   - Outline style hover: white fill and a navy border.
2. **Connection:** on the Default variant, trigger **While hovering** → **Change to** `State=Hover`.
3. **Easing:** Smart Animate, Custom bezier (or Ease out), **280 ms**.
4. **Test:** present any frame and move your pointer over a button; it should lift and lighten, then return when you move away. **While hovering** reverses automatically.

### 7. Text link and nav link hover — direct

1. **Variants:**
   - Text link: `Hover` with the arrow moved 4 px right.
   - Nav link: `Hover` with the 1 px aqua underline at full width (Default: width 0, or 1 px with 0% opacity).
2. **Connection:** **While hovering** → **Change to** Hover.
3. **Easing:** Smart Animate, Custom bezier, **280 ms**.
4. **Test:** hover the nav and the "Open the calendar →" style links.

### 8. Card hover (lift, shadow, photo zoom) — direct

1. **Variants:** on each card component, add `State=Hover`.
   - Move the card up 4 px.
   - Add a drop shadow: Y 24, blur 48, spread −24, `#172A5A` at 28%.
   - For cards with a photo: scale the image layer inside its clipped frame to 104%. Keep **Clip content** on so the zoom stays inside the rounded corners.
2. **Connection:** **While hovering** → **Change to** Hover.
3. **Easing:** Smart Animate, Custom bezier, **280 ms**. The photo zoom is 700 ms on the site; Figma uses one duration per transition, so pick **400 ms** as a compromise.
4. **Test:** hover the philosophy, service, review, location and lesson-type cards.

### 9. Founder slideshow — direct

1. **Variants:** make the photo frame a component with `Slide=1` (Tokyo 2020 portrait) and `Slide=2` (racing photo), each showing a different image, plus the counter text "1 / 2" or "2 / 2".
2. **Connections:** inside the component, select the → arrow in Slide=1: **On click** → **Change to** `Slide=2`. In Slide=2: → goes to Slide=1, and ← goes to Slide=1. Do the same for ← in Slide=1.
3. **Easing:** **Dissolve**, Custom bezier, **600 ms**. This matches the site's crossfade.
4. **Test:** present Home and click the arrows on the name panel.

### 10. Reviews carousel — direct

1. **Frames:** put the review cards in a horizontal auto layout frame, about 1280 wide on desktop and 390 on mobile, with **Overflow → Horizontal scrolling** and **Clip content** on.
2. **Connections:**
   - Swiping and dragging scroll it natively in Present mode.
   - For the arrows, select → and add **On click** → **Scroll to** → pick the next review card. Turn on **Animate**. Repeat for each card position you want to step through, or accept one step per arrow.
3. **Easing:** Scroll to animates with Ease out, about **400 ms**.
4. **Test:** present Home, drag the cards sideways, then click →.

### 11. Clinics focus panels (hovered panel widens) — direct

1. **Variants:** make the three-panel row a component with variants `Wide=1`, `Wide=2` and `Wide=3`.
   - In each variant, the named panel is wide (about 2.2× the others) and the other two are narrow.
   - The wide panel's photo is scaled to 104%.
   - Use auto layout with **Fill container** widths and adjust each panel's fixed width per variant. Keep layer names identical across variants.
2. **Connections:** inside the component, on each panel: **Mouse enter** → **Change to** the variant where that panel is wide. On the whole row: **Mouse leave** → **Change to** `Wide=3`, the default.
3. **Easing:** Smart Animate, **Ease in and out**, **600 ms**.
4. **Test:** present Clinics and move across the panels.
5. **Mobile:** the panels stack and don't widen, so use a plain stack in the mobile frame.

### 12. School logos (grey → colour) — direct

1. **Variants:** Logo tile `State=Default` with the logo image's **Saturation at −100** and **opacity 75%** (image fill → adjust); `State=Hover` with saturation 0, opacity 100% and the tile moved up 3 px with the card shadow.
2. **Connection:** **While hovering** → **Change to** Hover.
3. **Easing:** Smart Animate, Custom bezier, **280 ms**.
4. **Test:** hover the logos at the bottom of Home.

### 13. Mobile menu — direct

1. **Frames:** create a 390 × 844 frame `Mobile Menu` with the navy gradient, the five links in large type and the Book button. On the header, make variants of the menu button: `Open=false` (two lines) and `Open=true` (an X).
2. **Connections:** on the header's menu button in a mobile page frame: **On click** → **Open overlay** → `Mobile Menu`, position **Top**, and turn on **Close when clicking outside**. On the X in the overlay: **On click** → **Close overlay**.
3. **Easing:** **Dissolve**, Custom bezier, **280 ms**.
4. **Test:** present a mobile frame and tap the menu icon.

### 14. Contact tabs — direct

1. **Variants:** a `Contact Forms` component with `Tab=General` and `Tab=Waitlist`. Each shows the selected pill in navy and its own form underneath.
2. **Connections:** **On click** on the inactive tab → **Change to** the other variant.
3. **Easing:** **Instant**, or Dissolve 200 ms. The site switches instantly.
4. **Test:** present Contact and click "Waitlist".

### 15. Form errors and success message — approximation

1. **Variants:** the form with `State=Empty`, `State=Error` (red borders and messages under Name, Email, Interest and Message) and `State=Sent` (the aqua "Thanks…" box).
2. **Connections:** on Send in `Empty`: **On click** → **Change to** `Error`. On Send in `Error`: **On click** → **Change to** `Sent`. Figma can't check what was typed, so this only shows the states in order.
3. **Easing:** **Instant**.
4. **Test:** click Send twice.

### 16. Booking calendar selection — direct, sample states

1. **Variants:**
   - **Day:** Default / Selected (navy circle) / Unavailable.
   - **Slot:** Default / Selected (navy).
   - **Next button:** Disabled (45% opacity) / Enabled.
   - **Booking Details panel:** `Empty` / `Filled`, showing the chosen date, time, coach and price.
2. **Connections:**
   - On a time slot: **On click** → **Change to** Selected.
   - For the panel and Next button to update together, make the slot grid, panel and button one component with variants `Time=None` and `Time=7:00 AM`, and switch with **On click** → **Change to**.
3. **Easing:** **Instant**, or Dissolve 160 ms.
4. **Test:** present `04b Booking Calendar` and click a time. Booking Details should fill in and Next should brighten.

### 17. Input focus ring — direct

1. **Variants:** Form field `State=Default` and `State=Focus`.
   - Focus: border `#1C7480`, white fill.
   - Ring: an outer stroke or spread shadow of 4 px in `#75CAD3` at 25%.
2. **Connection:** **On click** → **Change to** Focus.
3. **Easing:** Smart Animate, **200 ms**.
4. **Test:** click a field in Present mode.

### 18. Reduced motion — not possible in Figma

On the site, if the visitor's device asks for reduced motion, the hero cover, fades, slides and hover movements are switched off. Figma prototypes have no such setting. To show the behaviour, make a second Home flow with no Smart Animate: Instant transitions and the hero simply scrolling away. Name it `Flow · Reduced motion`.

---

## Organising the flows

In each page frame's Prototype settings, set a **flow starting point** (the ▶ flag) and name it:
- `Home — Desktop` on `Home · Cover 0`
- `Home — Mobile` on the mobile Cover 0
- one flow per remaining page and size

**Share → Copy prototype link** gives Ruslan a single link where he can pick each flow from the left sidebar.
