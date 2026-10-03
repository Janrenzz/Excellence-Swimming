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

  /* HEADER — transparent over the Home hero, warm white once scrolled. */
  var header = $(".header");
  var bookBar = $(".book-bar");
  var onScroll = function () {
    var y = window.scrollY;
    if (header && !header.classList.contains("header--solid")) header.classList.toggle("is-scrolled", y > 24);
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

  /* HERO VIDEO — paused for reduced-motion users */
  var video = $("#Hero_Video_Background video");
  if (video && reduceMotion) { video.removeAttribute("autoplay"); video.pause(); }

  /* REVEAL — fade + 24px rise as content enters the viewport (Wix: Entrance animation "Fade in" + "Slide up"). */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* CLINICS — preview the empty state with ?state=empty */
  if (/[?&]state=empty/.test(location.search)) {
    var list = $("[data-clinic-list]"), empty = $("[data-clinic-empty]");
    if (list && empty) { list.hidden = true; empty.hidden = false; }
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

  /* CALENDAR — stand-in for the Wix Bookings Booking Calendar widget, with sample availability. */
  var cal = $("[data-cal]");
  if (cal) initCalendar();

  function initCalendar() {
    var COACHES = { ruslan: "Coach Ruslan", "coach-2": "[Coach 2]" };
    var LOCS = { "loc-1": "[Location 1]", "loc-2": "[Location 2]" };
    var params = new URLSearchParams(location.search);
    var state = { format: "1:1", coach: "any", location: "any", day: null, slot: null, monthOffset: 0 };
    if (params.get("coach") && COACHES[params.get("coach")]) state.coach = params.get("coach");
    $("#f-coach").value = state.coach;

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
      var sel = $("[aria-pressed=true]", wk);
      if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: "nearest", inline: "center" });
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
      var groups = [["Morning", 0, 12], ["Afternoon", 12, 17], ["Evening", 17, 24]];
      var slots = slotsFor(state.day).sort(function (a, b) { return a.hour - b.hour || a.coach.localeCompare(b.coach); });
      groups.forEach(function (g) {
        var inG = slots.filter(function (s) { return s.hour >= g[1] && s.hour < g[2]; });
        if (!inG.length) return;
        var wrap = document.createElement("div"); wrap.className = "slots__group";
        wrap.innerHTML = '<p class="slots__label">' + g[0] + "</p>";
        var grid = document.createElement("div"); grid.className = "slots__grid";
        inG.forEach(function (s) {
          var b = document.createElement("button"); b.type = "button"; b.className = "slot";
          var SHORT = { ruslan: "Ruslan", "coach-2": "Coach 2" };
          var sub = state.coach === "any" ? SHORT[s.coach] : (state.location === "any" ? LOCS[s.location] : "");
          b.innerHTML = fmtTime(s.hour) + (sub ? "<small>" + sub + "</small>" : "");
          b.setAttribute("aria-pressed", String(state.slot === s));
          b.setAttribute("aria-label", fmtTime(s.hour) + " with " + COACHES[s.coach] + " at " + LOCS[s.location]);
          b.addEventListener("click", function () { state.slot = s; renderSlots(); renderSummary(); });
          grid.appendChild(b);
        });
        wrap.appendChild(grid); box.appendChild(wrap);
      });
    }

    function renderSummary() {
      var s = state.slot;
      var rows = [
        ["Lesson", state.format + " " + { "1:1": "Private", "2:1": "Semi-private", "3:1": "Small group", "4:1": "Small group" }[state.format]],
        ["Coach", s ? COACHES[s.coach] : (state.coach === "any" ? "Any coach" : COACHES[state.coach])],
        ["Location", s ? LOCS[s.location] : (state.location === "any" ? "Any location" : LOCS[state.location])],
        ["Date", state.day ? fmtDay(state.day) : "—"],
        ["Time", s ? fmtTime(s.hour) : "Choose a time"],
        ["Price", "$[—]"]
      ];
      $("[data-summary]").innerHTML = rows.map(function (r) { return "<li><span>" + r[0] + "</span><span>" + r[1] + "</span></li>"; }).join("");
      $$("[data-next]").forEach(function (b) { b.setAttribute("aria-disabled", String(!s)); });
      $("[data-sticky-text]").innerHTML = s
        ? fmtDay(state.day) + " · " + fmtTime(s.hour) + "<span>" + state.format + " · " + COACHES[s.coach] + " · " + LOCS[s.location] + "</span>"
        : "Pick a time<span>" + (state.day ? fmtDay(state.day) + " · tap a time above" : "Choose a day, then a time") + "</span>";
    }

    $$("[data-cal-tabs] [role=tab]").forEach(function (t) {
      t.addEventListener("click", function () {
        $$("[data-cal-tabs] [role=tab]").forEach(function (x) { x.setAttribute("aria-selected", String(x === t)); });
        state.format = t.getAttribute("data-format"); state.slot = null; render();
      });
    });
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
