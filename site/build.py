#!/usr/bin/env python3
"""Assemble static pages: site/src/*.html + partials -> site/*.html.

Tokens in a page source:
  {{head:Title|Description}}   <head> block
  {{header:transparent|solid:<active-page-key>}}
  {{footer}}
Run:  python3 site/build.py
"""
import pathlib, re

ROOT = pathlib.Path(__file__).parent
SRC, PARTIALS = ROOT / "src", ROOT / "src" / "partials"

NAV = [
    ("home", "index.html", "Home"),
    ("lessons", "lessons.html", "Lessons"),
    ("clinics", "clinics.html", "Clinics"),
    ("calendar", "calendar.html", "Calendar"),
    ("contact", "contact.html", "Contact"),
]


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
    html = html.replace("{{variant}}", "" if variant == "transparent" else " header--solid")
    html = html.replace("{{nav}}", nav_links(active, "nav__link"))
    html = html.replace("{{mobile_nav}}", nav_links(active, ""))
    return html


def head(title, desc):
    return read("head.html").replace("{{title}}", title).replace("{{description}}", desc)


def build():
    for page in sorted(SRC.glob("*.html")):
        html = page.read_text()
        html = re.sub(r"\{\{head:([^|}]+)\|([^}]+)\}\}", lambda m: head(m[1], m[2]), html)
        html = re.sub(r"\{\{header:(\w+):(\w+)\}\}", lambda m: header(m[1], m[2]), html)
        html = html.replace("{{footer}}", read("footer.html"))
        html = re.sub(r"\{\{partial:([\w-]+)\}\}", lambda m: read(m[1] + ".html"), html)
        (ROOT / page.name).write_text(html)
        print("built", page.name)


if __name__ == "__main__":
    build()
