#!/usr/bin/env python3
"""Assemble static pages: site/src/*.html + partials -> site/*.html.

Tokens in a page source:
  {{head:Title|Description}}   <head> block
  {{header:transparent|solid:<active-page-key>}}
  {{footer}}
  {{partial:name}} / {{partial:name|modifier}}   shared block ({{mod}} inside it becomes the modifier)
  {{icon:name}}                inline line icon (Wix: SVG icon / Vector Art)
  {{wave:modifier}}            layered wave divider between sections (Wix: section Shape Divider)
Run:  python3 site/build.py
"""
import hashlib, pathlib, re

ROOT = pathlib.Path(__file__).parent
SRC, PARTIALS = ROOT / "src", ROOT / "src" / "partials"

NAV = [
    ("home", "index.html", "Home"),
    ("lessons", "lessons.html", "Lessons"),
    ("clinics", "clinics.html", "Clinics"),
    ("calendar", "calendar.html", "Calendar"),
    ("contact", "contact.html", "Contact"),
]


ICONS = {
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "arrow-left": '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    "award": '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    "medal": '<path d="M7.2 2h9.6L14 8.5"/><path d="M10 8.5 7.2 2"/><circle cx="12" cy="15" r="6"/><path d="M12 12.5v5"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    "user": '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    "video": '<path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    "waves": '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    "message": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "clipboard": '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    "calendar": '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "star": '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    "mail": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    "pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "cap": '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    "image": '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
    "film": '<rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
    "sparkle": '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
    "heart": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
}

WAVE = ('<div class="wave wave--{mod}" aria-hidden="true"><svg viewBox="0 0 1440 84" preserveAspectRatio="none">'
        '<path class="wave__back" d="M0 0H1440V16C1200 44 1000 76 760 78 480 80 240 42 0 36Z"/>'
        '<path class="wave__front" d="M0 0H1440V6C1180 30 980 58 720 60 460 62 220 26 0 18Z"/>'
        '</svg></div>')


def icon(name):
    return f'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>'


def read(name):
    return (PARTIALS / name).read_text()


def nav_links(active, cls):
    out = []
    for key, href, label in NAV:
        cur = ' aria-current="page"' if key == active else ""
        out.append(f'<a class="{cls}" href="{href}"{cur}>{label}</a>')
    return "\n        ".join(out)


def header(variant, active):
    html = read("header.html")
    # Every page now opens on a dark hero or band, so the header is always transparent → navy on scroll.
    html = html.replace("{{variant}}", "")
    html = html.replace("{{nav}}", nav_links(active, "nav__link"))
    html = html.replace("{{mobile_nav}}", nav_links(active, ""))
    return html


def asset_version():
    """Short hash of the CSS + JS so browsers fetch fresh files after every change."""
    h = hashlib.sha1()
    for f in ("assets/css/styles.css", "assets/js/main.js"):
        h.update((ROOT / f).read_bytes())
    return h.hexdigest()[:8]


def head(title, desc):
    return (read("head.html").replace("{{title}}", title).replace("{{description}}", desc)
            .replace("{{version}}", asset_version()))


def build():
    for page in sorted(SRC.glob("*.html")):
        html = page.read_text()
        html = re.sub(r"\{\{head:([^|}]+)\|([^}]+)\}\}", lambda m: head(m[1], m[2]), html)
        html = re.sub(r"\{\{header:(\w+):(\w+)\}\}", lambda m: header(m[1], m[2]), html)
        html = html.replace("{{footer}}", read("footer.html"))
        html = re.sub(r"\{\{partial:([\w-]+)(?:\|([\w-]+))?\}\}",
                      lambda m: read(m[1] + ".html").replace("{{mod}}", m[2] or ""), html)
        html = re.sub(r"\{\{wave:([\w-]+)\}\}", lambda m: WAVE.format(mod=m[1]), html)
        html = re.sub(r"\{\{icon:([\w-]+)\}\}", lambda m: icon(m[1]), html)
        (ROOT / page.name).write_text(html)
        print("built", page.name)


if __name__ == "__main__":
    build()
