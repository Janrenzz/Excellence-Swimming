/* Excellence Swimming — prototype interactions.
   Each behaviour maps to a native Wix Studio feature (see docs/03-interactions.md);
   the calendar and forms here are stand-ins for Wix Bookings and Wix Forms. */
(function () {
  /* ?capture renders every section at rest (no scroll reveals) for html.to.design imports. */
  var capture = /[?&]capture/.test(location.search);
  if (!capture) document.documentElement.classList.add("js");
  var reduceMotion = capture || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* REVEAL — runs first so a later script error can never leave sections hidden.
     Fade + 24px rise as content enters the viewport (Wix: Entrance animation "Fade in" + "Slide up"). */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }


  /* HEADER — transparent over the dark hero, navy once scrolled (Wix: header Scroll effect). */
  var header = $(".header");
  var bookBar = $(".book-bar");
  var onScroll = function () {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (bookBar) bookBar.classList.toggle("is-visible", y > window.innerHeight * 0.6);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* PHOTOS — hide the placeholder label once a real photo loads. */
  $$(".media__img[style*='url(']").forEach(function (el) {
    var m = el.getAttribute("style").match(/url\(['"]?([^'")]+)/);
    if (!m) return;
    var probe = new Image();
    probe.onload = function () { el.parentElement.classList.add("has-photo"); };
    probe.src = m[1];
  });

  /* MOBILE MENU */
  var toggle = $(".menu-toggle");
  if (toggle) {
    var label = $(".visually-hidden", toggle);
    var setMenu = function (open) {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "Close menu" : "Open menu";
    };
    toggle.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    $$(".mobile-menu a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  }

  /* HERO VIDEO — desktop only. Phones get the navy gradient and never download the file;
     reduced-motion users keep the still frame (Wix: hide the video on the mobile breakpoint). */
  var video = $("#Hero_Video_Background video");
  if (video && !reduceMotion && window.matchMedia("(min-width: 768px)").matches) {
    video.src = video.getAttribute("data-src");
    video.play && video.play().catch(function () {});
  }

  /* HERO → FOUNDER — while the founder section slides over the pinned hero, fade the hero content.
     Progress is read from scroll position on every frame, so it reverses smoothly when scrolling back up.
     Fully faded once the founder covers ~70% of the hero; the video pauses while the hero is fully covered. */
  var heroStack = $("[data-hero-stack]");
  if (heroStack && !reduceMotion) {
    var stackHero = $(".hero", heroStack), heroTicking = false;
    var updateHero = function () {
      heroTicking = false;
      var p = Math.min(Math.max(window.scrollY / (stackHero.offsetHeight * 0.7), 0), 1);
      stackHero.style.setProperty("--hero-fade", (1 - p).toFixed(3));
      if (video && video.src) { if (window.scrollY >= stackHero.offsetHeight) video.pause(); else if (video.paused) video.play().catch(function () {}); }
    };
    var queueHero = function () { if (!heroTicking) { heroTicking = true; requestAnimationFrame(updateHero); } };
    window.addEventListener("scroll", queueHero, { passive: true });
    window.addEventListener("resize", queueHero);
    updateHero();
  }

  /* SLIDESHOWS — founder photos and testimonials: arrows (+ dots), no autoplay
     (Wix: Slideshow element with arrows/navigation on, autoplay off). */
  function carousel(root, slideSel, prevSel, nextSel, onChange) {
    var slides = $$(slideSel, root), i = 0;
    var go = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.classList.toggle("is-active", k === i);
        if (k === i) s.removeAttribute("aria-hidden"); else s.setAttribute("aria-hidden", "true");
      });
      if (onChange) onChange(i, slides.length);
    };
    $(prevSel, root).addEventListener("click", function () { go(i - 1); });
    $(nextSel, root).addEventListener("click", function () { go(i + 1); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(i - 1);
      if (e.key === "ArrowRight") go(i + 1);
    });
    return go;
  }
  $$("[data-slides]").forEach(function (root) {
    var count = $("[data-slides-count]", root);
    carousel(root, ".slide", "[data-slides-prev]", "[data-slides-next]", function (i, n) { if (count) count.textContent = (i + 1) + " / " + n; });
  });
  /* REVIEWS — sideways-scrolling cards; arrows move by one card (Wix: Slider / horizontal Repeater). */
  $$("[data-reviews]").forEach(function (root) {
    var track = $("[data-reviews-track]", root);
    var step = function (dir) {
      var card = $(".review-card", track);
      track.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: reduceMotion ? "auto" : "smooth" });
    };
    var prev = $("[data-reviews-prev]"), next = $("[data-reviews-next]");
    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (next) next.addEventListener("click", function () { step(1); });
  });

  /* CLINICS — default is "none scheduled"; preview the scheduled list with ?state=scheduled */
  if (/[?&]state=scheduled/.test(location.search)) {
    var list = $("[data-clinic-list]"), empty = $("[data-clinic-empty]");
    if (list && empty) { list.hidden = false; empty.hidden = true; }
  }

  /* CONTACT TABS — #waitlist opens the waitlist form */
  var formTabs = $("[data-form-tabs]");
  if (formTabs) {
    var tabs = $$("[role=tab]", formTabs);
    var select = function (tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
          select(n); n.focus();
        }
      });
    });
    if (location.hash === "#waitlist") select($("#tab-waitlist"));
  }

  /* FORMS — validate on submit, then show a confirmation (Wix Forms: required fields + success message). */
  $$("[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      $$("[required]", form).forEach(function (input) {
        var ok = input.checkValidity() && String(input.value).trim() !== "";
        input.closest(".field").classList.toggle("is-invalid", !ok);
        input.setAttribute("aria-invalid", String(!ok));
        if (!ok && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); return; }
      var done = document.createElement("p");
      done.className = "form__success";
      done.setAttribute("role", "status");
      done.textContent = "Thanks, we’ve received your message and will reply soon.";
      form.innerHTML = "";
      form.appendChild(done);
    });
    form.addEventListener("input", function (e) {
      var f = e.target.closest(".field");
      if (f && f.classList.contains("is-invalid") && e.target.checkValidity()) f.classList.remove("is-invalid");
    });
  });

  /* BOOKING CALENDAR — stand-in for Wix Bookings' native Booking Calendar page (one service per page,
     chosen on the Service List), with sample availability. */
  $$("[data-cal-widget]").forEach(initCalendar);

  function initCalendar(root) {
    var $ = function (sel) { return root.querySelector(sel); };
    var $$ = function (sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };
    var COACHES = { ruslan: "Ruslan Gaziev", hannah: "Hannah Bach" };
    var LOCS = { "loc-1": "St. Charles · Bexley", "loc-2": "[Second location]" };
    var PRICES = { ruslan: { "1:1": 150, "2:1": 160, "3:1": 180, "4:1": 200 }, hannah: { "1:1": 130, "2:1": 150, "3:1": 165, "4:1": 180 } };
    var params = new URLSearchParams(location.search);
    var state = { format: "1:1", coach: "any", location: "any", day: null, slot: null, monthOffset: 0 };
    if (params.get("coach") && COACHES[params.get("coach")]) state.coach = params.get("coach");
    var svc = params.get("service") || params.get("format") || "";
    if (/^[1-4]:1$/.test(svc)) state.format = svc;
    var NAMES = { "1:1": "1:1 Private lesson", "2:1": "2:1 Semi-private lesson", "3:1": "3:1 Small group lesson", "4:1": "4:1 Group lesson" };
    var title = $("[data-service-title]");
    if (title) { title.textContent = NAMES[state.format]; document.title = NAMES[state.format] + " — Excellence Swimming"; }
    $("[data-filter=coach]").value = state.coach;

    var today = new Date(); today.setHours(0, 0, 0, 0);
    var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var key = function (d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
    var addDays = function (d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; };

    /* Deterministic sample slots for the next 42 days. */
    var ALL = [];
    for (var i = 1; i <= 42; i++) {
      var d = addDays(today, i);
      if (d.getDay() === 0) continue;
      Object.keys(COACHES).forEach(function (c, ci) {
        Object.keys(LOCS).forEach(function (l, li) {
          if (c === "hannah" && l === "loc-1") return; /* Hannah doesn’t coach at St. Charles */
          [6, 7, 9, 16, 17, 18, 19].forEach(function (h) {
            var seed = (i * 31 + ci * 17 + li * 13 + h * 7) % 10;
            if (seed < 3 && !((ci + li + i) % 3 === 0 && h < 12)) {
              ALL.push({ date: d, coach: c, location: l, hour: h, formats: seed === 0 ? ["1:1"] : ["1:1", "2:1", "3:1", "4:1"] });
            }
          });
        });
      });
    }

    var matches = function (s) {
      return s.formats.indexOf(state.format) > -1 &&
        (state.coach === "any" || s.coach === state.coach) &&
        (state.location === "any" || s.location === state.location);
    };
    var slotsFor = function (d) { return ALL.filter(function (s) { return matches(s) && key(s.date) === key(d); }); };
    var daysWithSlots = function () {
      var set = {}; ALL.forEach(function (s) { if (matches(s)) set[key(s.date)] = s.date; });
      return set;
    };
    var fmtTime = function (h) { return (h % 12 || 12) + ":00 " + (h < 12 ? "AM" : "PM"); };
    var fmtDay = function (d) { return DOW[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()].slice(0, 3); };

    function firstAvailable() {
      var set = daysWithSlots(), best = null;
      Object.keys(set).forEach(function (k) { if (!best || set[k] < best) best = set[k]; });
      return best;
    }

    function render() {
      var avail = daysWithSlots();
      if (!state.day || !avail[key(state.day)]) { state.day = firstAvailable(); state.slot = null; }
      if (state.day) {
        var m = (state.day.getFullYear() - today.getFullYear()) * 12 + state.day.getMonth() - today.getMonth();
        if (state.monthOffset !== m && !state._userMonth) state.monthOffset = m;
      }
      renderMonth(avail); renderWeek(avail); renderSlots(); renderSummary();
    }

    function dayButton(d, avail, extra) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "day" + (avail[key(d)] ? " has-slots" : "");
      b.innerHTML = (extra || "") + d.getDate();
      b.setAttribute("aria-label", fmtDay(d) + (avail[key(d)] ? ", times available" : ", no times"));
      b.setAttribute("aria-pressed", String(!!state.day && key(d) === key(state.day)));
      if (!avail[key(d)]) b.disabled = true;
      b.addEventListener("click", function () { state.day = d; state.slot = null; state._userMonth = false; render(); });
      return b;
    }

    function renderMonth(avail) {
      var base = new Date(today.getFullYear(), today.getMonth() + state.monthOffset, 1);
      $("[data-month-title]").textContent = MONTHS[base.getMonth()] + " " + base.getFullYear();
      $("[data-month=\"-1\"]").disabled = state.monthOffset <= 0;
      $("[data-month=\"1\"]").disabled = state.monthOffset >= 1;
      var grid = $("[data-month-grid]"); grid.innerHTML = "";
      ["S", "M", "T", "W", "T", "F", "S"].forEach(function (x) { var s = document.createElement("span"); s.className = "month__dow"; s.textContent = x; grid.appendChild(s); });
      for (var p = 0; p < base.getDay(); p++) grid.appendChild(document.createElement("span"));
      var n = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
      for (var dd = 1; dd <= n; dd++) grid.appendChild(dayButton(new Date(base.getFullYear(), base.getMonth(), dd), avail));
    }

    function renderWeek(avail) {
      var wk = $("[data-week]"); wk.innerHTML = "";
      for (var i = 1; i <= 21; i++) {
        var d = addDays(today, i);
        wk.appendChild(dayButton(d, avail, "<small>" + DOW[d.getDay()] + "</small>"));
      }
      /* Scroll the day strip sideways only; never move the page. */
      var sel = wk.querySelector("[aria-pressed=true]");
      if (sel) wk.scrollLeft = sel.offsetLeft - wk.clientWidth / 2 + sel.offsetWidth / 2;
    }

    function renderSlots() {
      var box = $("[data-slots]"); box.innerHTML = "";
      var title = $("[data-slots-title]");
      if (!state.day) {
        title.textContent = "No times available";
        box.innerHTML = '<p class="slots__empty">No open times match these filters. Try another coach or location, or <a href="contact.html#waitlist" style="text-decoration: underline">join the waitlist</a>.</p>';
        return;
      }
      title.textContent = fmtDay(state.day);
      /* Native daily view: one plain grid of times. If several coaches are free at the same time,
         Wix assigns an available staff member, so each time appears once. */
      var seen = {}, slots = slotsFor(state.day).sort(function (a, b) { return a.hour - b.hour || a.coach.localeCompare(b.coach); })
        .filter(function (s) { if (seen[s.hour]) return false; seen[s.hour] = true; return true; });
      var grid = document.createElement("div"); grid.className = "slots__grid";
      slots.forEach(function (s) {
        var b = document.createElement("button"); b.type = "button"; b.className = "slot";
        b.textContent = fmtTime(s.hour);
        b.setAttribute("aria-pressed", String(state.slot === s));
        b.addEventListener("click", function () { state.slot = s; renderSlots(); renderSummary(); });
        grid.appendChild(b);
      });
      box.appendChild(grid);
    }

    function renderSummary() {
      var s = state.slot;
      /* Native booking summary fields: service, date & time, location, staff, duration, price */
      var rows = [
        ["Service", NAMES[state.format]],
        ["Date & time", s ? fmtDay(state.day) + ", " + fmtTime(s.hour) : (state.day ? fmtDay(state.day) + " · choose a time" : "—")],
        ["Location", s ? LOCS[s.location] : (state.location === "any" ? "All locations" : LOCS[state.location])],
        ["Coach", s ? COACHES[s.coach] : (state.coach === "any" ? "All coaches" : COACHES[state.coach])],
        ["Duration", "<span class=\"ph\">[Duration]</span>"],
        ["Price", s ? "$" + PRICES[s.coach][state.format] : (state.coach !== "any" ? "$" + PRICES[state.coach][state.format] : "From $" + Math.min(PRICES.ruslan[state.format], PRICES.hannah[state.format]))]
      ];
      $("[data-summary]").innerHTML = rows.map(function (r) { return "<li><span>" + r[0] + "</span><span>" + r[1] + "</span></li>"; }).join("");
      $$("[data-next]").forEach(function (b) { b.setAttribute("aria-disabled", String(!s)); });
    }

    $$("[data-filter]").forEach(function (sel) {
      sel.addEventListener("change", function () { state[sel.getAttribute("data-filter")] = sel.value; state.slot = null; render(); });
    });
    $$("[data-month]").forEach(function (b) {
      b.addEventListener("click", function () { state.monthOffset += Number(b.getAttribute("data-month")); state._userMonth = true; var avail = daysWithSlots(); renderMonth(avail); });
    });
    $$("[data-next]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        if (!state.slot) return;
        b.textContent = "Opens Wix checkout";
        setTimeout(function () { b.textContent = "Next"; }, 1800);
      });
    });
    render();
  }
})();
