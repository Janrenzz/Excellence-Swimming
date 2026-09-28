/* Excellence Swimming — interactions (each maps to a documented Wix Studio interaction,
   see docs/interactions.md). Kept intentionally small. */
(function () {
  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* HEADER — Transparent → Deep Navy on scroll (home only; inner pages are solid). */
  var header = document.querySelector(".header");
  if (header && !header.classList.contains("header--solid")) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* PHOTOS — each slot names its file in an inline background-image (see assets/media/README.md).
     When the file loads, hide the placeholder label. */
  document.querySelectorAll(".media__img[style*='url(']").forEach(function (el) {
    var m = el.getAttribute("style").match(/url\(['"]?([^'")]+)/);
    if (!m) return;
    var probe = new Image();
    probe.onload = function () { el.parentElement.classList.add("has-photo"); };
    probe.src = m[1];
  });

  /* MOBILE MENU */
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    var closeMenu = function () {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector(".visually-hidden").textContent = "Open menu";
    };
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".visually-hidden").textContent = open ? "Close menu" : "Open menu";
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    document.querySelectorAll(".mobile-menu a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* HERO VIDEO — pause for reduced-motion users */
  var video = document.querySelector("#Hero_Video_Background video");
  if (video && reduceMotion) { video.removeAttribute("autoplay"); video.pause(); }

  /* CONTENT — Fade + 20px upward on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* TESTIMONIALS — one at a time */
  document.querySelectorAll("[data-testimonials]").forEach(function (root) {
    var slides = root.querySelectorAll(".testimonial__slide");
    var count = root.querySelector(".testimonial__count");
    var i = 0;
    var show = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.hidden = idx !== i; });
      if (count) count.textContent = String(i + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    };
    root.querySelector("[data-prev]").addEventListener("click", function () { show(i - 1); });
    root.querySelector("[data-next]").addEventListener("click", function () { show(i + 1); });
    show(0);
  });

  /* ACCORDION */
  document.querySelectorAll(".accordion__trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      document.getElementById(btn.getAttribute("aria-controls")).hidden = open;
    });
  });

  /* CLINICS — preview the empty state with ?state=empty */
  if (/[?&]state=empty/.test(location.search)) {
    var list = document.querySelector("[data-clinic-list]");
    var empty = document.querySelector("[data-clinic-empty]");
    if (list && empty) { list.hidden = true; empty.hidden = false; }
  }
})();
