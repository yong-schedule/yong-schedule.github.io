(function () {
  "use strict";

  var monthsEl = document.getElementById("months");
  var daysEl = document.getElementById("days");
  var chatEl = document.getElementById("chat");
  var chatInnerEl = document.getElementById("chatInner");
  var jumpBtn = document.getElementById("jumpBtn");

  var searchToggle = document.getElementById("searchToggle");
  var searchOverlay = document.getElementById("searchOverlay");
  var searchClose = document.getElementById("searchClose");
  var searchInput = document.getElementById("searchInput");
  var searchClear = document.getElementById("searchClear");
  var searchResultsEl = document.getElementById("searchResults");

  var PEER_NAME = "용뚠,";
  var PEER_INITIAL = "용";

  var WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
  var currentMonthKey = null;

  /* ================= utils ================= */

  function formatMonthLabel(key) {
    var parts = key.split("-");
    return parts[0] + "." + parts[1];
  }

  function formatDayDivider(dateStr) {
    var d = new Date(dateStr + "T00:00:00");
    var wd = WEEKDAYS[d.getDay()];
    var parts = dateStr.split("-");
    return parseInt(parts[1], 10) + "월 " + parseInt(parts[2], 10) + "일 (" + wd + ")";
  }

  function formatDateShort(dateStr) {
    var parts = dateStr.split("-");
    return parts[0] + "." + parts[1] + "." + parts[2] + ".";
  }

  function formatTime(t) {
    var hh = parseInt(t.slice(0, 2), 10);
    var mm = t.slice(3, 5);
    var period = hh < 12 ? "오전" : "오후";
    var h12 = hh % 12;
    if (h12 === 0) h12 = 12;
    return period + " " + h12 + ":" + mm;
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function resetScroll() {
    chatEl.scrollTop = 0;
    if (window.scrollTo) window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // guard against late layout shifts (e.g. media loading) pushing scroll
    requestAnimationFrame(function () {
      chatEl.scrollTop = 0;
    });
  }

  /* ================= month / day nav ================= */

  function buildMonthPills() {
    var frag = document.createDocumentFragment();
    ARCHIVE_MONTHS.forEach(function (key) {
      var pill = document.createElement("button");
      pill.className = "month-pill";
      pill.textContent = formatMonthLabel(key);
      pill.dataset.month = key;
      pill.addEventListener("click", function () {
        selectMonth(key, true);
      });
      frag.appendChild(pill);
    });
    monthsEl.appendChild(frag);
  }

  function setActivePill(key) {
    var pills = monthsEl.querySelectorAll(".month-pill");
    pills.forEach(function (p) {
      var active = p.dataset.month === key;
      p.classList.toggle("active", active);
      if (active) {
        p.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  }

  function getDayOrder(key) {
    var msgs = ARCHIVE_DATA[key] || [];
    var seen = {};
    var dayOrder = [];
    msgs.forEach(function (m) {
      if (!seen[m.d]) {
        seen[m.d] = true;
        dayOrder.push(m.d);
      }
    });
    return dayOrder;
  }

  function buildDayChips(dayOrder, activeDay) {
    daysEl.innerHTML = "";
    var frag = document.createDocumentFragment();
    dayOrder.forEach(function (day) {
      var pill = document.createElement("button");
      pill.className = "day-pill";
      pill.dataset.day = day;

      var d = new Date(day + "T00:00:00");
      var wd = WEEKDAYS[d.getDay()];

      var num = document.createElement("span");
      num.className = "day-num";
      num.textContent = parseInt(day.split("-")[2], 10);

      var wdSpan = document.createElement("span");
      wdSpan.textContent = wd;

      pill.appendChild(num);
      pill.appendChild(wdSpan);

      pill.addEventListener("click", function () {
        selectDay(day);
      });

      frag.appendChild(pill);
    });
    daysEl.appendChild(frag);
    setActiveDayPill(activeDay);
  }

  function setActiveDayPill(day) {
    var pills = daysEl.querySelectorAll(".day-pill");
    pills.forEach(function (p) {
      var active = p.dataset.day === day;
      p.classList.toggle("active", active);
      if (active) {
        p.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  }

  /* ================= message rendering ================= */

  function avatarEl() {
    var av = document.createElement("div");
    av.className = "avatar";
    var img = document.createElement("img");
    img.src = "assets/profile.jpg";
    img.alt = "";
    img.onerror = function () {
      img.style.display = "none";
      fb.style.display = "flex";
    };
    var fb = document.createElement("div");
    fb.className = "fallback";
    fb.textContent = PEER_INITIAL;
    av.appendChild(img);
    av.appendChild(fb);
    return av;
  }

  function wrapWithSrcLink(el, m) {
    if (!m.url) return el;
    var a = document.createElement("a");
    a.href = m.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "src-link-wrap";
    a.title = "원본 열기";
    a.appendChild(el);
    return a;
  }

  function buildFallbackCard(iconCls, icon, label, detail) {
    var card = document.createElement("div");
    card.className = "attach-card";
    var iconEl = document.createElement("div");
    iconEl.className = "attach-icon " + iconCls;
    iconEl.textContent = icon;
    var txt = document.createElement("div");
    txt.className = "attach-text";
    var lbl = document.createElement("div");
    lbl.className = "attach-label";
    lbl.textContent = label;
    txt.appendChild(lbl);
    if (detail) {
      var sub = document.createElement("div");
      sub.className = "attach-sub";
      sub.textContent = detail;
      txt.appendChild(sub);
    }
    card.appendChild(iconEl);
    card.appendChild(txt);
    return card;
  }

  function buildBubbleContent(m) {
    switch (m.type) {
      case "photo": {
        if (m.url) {
          var photo = document.createElement("img");
          photo.className = "attach-media photo-media";
          photo.src = m.url;
          photo.alt = "사진";
          photo.loading = "lazy";
          photo.onerror = function () {
            photo.replaceWith(buildFallbackCard("photo", "📷", "사진", "이미지를 불러올 수 없어요"));
          };
          return wrapWithSrcLink(photo, m);
        }
        return buildFallbackCard("photo", "📷", "사진");
      }
      case "video": {
        if (m.url) {
          var vid = document.createElement("video");
          vid.className = "attach-media video-media";
          vid.src = m.url;
          vid.controls = true;
          vid.preload = "none";
          vid.onerror = function () {
            vid.replaceWith(buildFallbackCard("video", "🎥", "동영상", "영상을 불러올 수 없어요"));
          };
          return vid;
        }
        return buildFallbackCard("video", "🎥", "동영상");
      }
      case "voice": {
        var card = document.createElement("div");
        card.className = "voice-card";
        var lbl = document.createElement("div");
        lbl.className = "attach-label";
        lbl.textContent = "음성메시지";
        card.appendChild(lbl);
        if (m.url) {
          var audio = document.createElement("audio");
          audio.src = m.url;
          audio.controls = true;
          audio.preload = "none";
          audio.onerror = function () {
            var fb = buildFallbackCard("voice", "▶", "음성메시지", "음성을 불러올 수 없어요");
            card.replaceWith(fb);
          };
          card.appendChild(audio);
        }
        return card;
      }
      default: {
        var bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = m.m;
        return bubble;
      }
    }
  }

  // renders all messages for `day` within month `key`.
  // if targetMidx is given, flashes and scrolls to that specific message
  // (midx = index of the message within ARCHIVE_DATA[key]).
  function renderDay(key, day, targetMidx) {
    var fullMonthMsgs = ARCHIVE_DATA[key] || [];
    chatInnerEl.innerHTML = "";

    var frag = document.createDocumentFragment();

    var divider = document.createElement("div");
    divider.className = "day-divider";
    var span = document.createElement("span");
    span.textContent = formatDayDivider(day);
    divider.appendChild(span);
    frag.appendChild(divider);

    var targetRow = null;

    fullMonthMsgs.forEach(function (m, idx) {
      if (m.d !== day) return;

      var row = document.createElement("div");
      row.className = "msg-row";
      row.dataset.midx = idx;
      row.appendChild(avatarEl());

      var body = document.createElement("div");
      body.className = "msg-body";

      var name = document.createElement("div");
      name.className = "sender-name";
      name.textContent = PEER_NAME;
      body.appendChild(name);

      var bubbleRow = document.createElement("div");
      bubbleRow.className = "bubble-row";
      bubbleRow.appendChild(buildBubbleContent(m));

      var time = document.createElement("span");
      time.className = "time";
      time.textContent = formatTime(m.t);
      bubbleRow.appendChild(time);

      body.appendChild(bubbleRow);
      row.appendChild(body);
      frag.appendChild(row);

      if (targetMidx !== undefined && targetMidx !== null && idx === targetMidx) {
        targetRow = row;
      }
    });

    chatInnerEl.appendChild(frag);

    if (targetRow) {
      requestAnimationFrame(function () {
        targetRow.scrollIntoView({ behavior: "auto", block: "center" });
        targetRow.classList.add("flash");
        setTimeout(function () {
          targetRow.classList.remove("flash");
        }, 1700);
      });
    } else {
      resetScroll();
    }
  }

  function selectDay(day, targetMidx) {
    setActiveDayPill(day);
    renderDay(currentMonthKey, day, targetMidx);
  }

  function selectMonth(key, scrollToTop, targetDay, targetMidx) {
    setActivePill(key);
    currentMonthKey = key;

    var dayOrder = getDayOrder(key);

    if (dayOrder.length === 0) {
      chatInnerEl.innerHTML = "";
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "이 달에는 메시지가 없어요.";
      chatInnerEl.appendChild(empty);
      daysEl.innerHTML = "";
      return;
    }

    var day = targetDay || dayOrder[0];
    buildDayChips(dayOrder, day);
    renderDay(key, day, targetMidx);

    if (scrollToTop && (targetMidx === undefined || targetMidx === null)) {
      resetScroll();
    }
  }

  chatEl.addEventListener("scroll", function () {
    var show = chatEl.scrollTop > 400;
    jumpBtn.classList.toggle("show", show);
  });

  jumpBtn.addEventListener("click", function () {
    chatEl.scrollTo({ top: chatEl.scrollHeight, behavior: "smooth" });
  });

  /* ================= search ================= */

  var searchIndex = [];

  function buildSearchIndex() {
    ARCHIVE_MONTHS.forEach(function (mk) {
      var msgs = ARCHIVE_DATA[mk] || [];
      msgs.forEach(function (m, idx) {
        if (m.type === "text" && m.m) {
          searchIndex.push({ mk: mk, d: m.d, t: m.t, m: m.m, midx: idx });
        }
      });
    });
  }

  var MAX_RESULTS = 150;

  function runSearch(query) {
    searchResultsEl.innerHTML = "";
    var q = query.trim();
    if (!q) {
      return;
    }

    var qLower = q.toLowerCase();
    var matches = [];
    for (var i = searchIndex.length - 1; i >= 0; i--) {
      var item = searchIndex[i];
      if (item.m.toLowerCase().indexOf(qLower) !== -1) {
        matches.push(item);
        if (matches.length >= MAX_RESULTS) break;
      }
    }

    if (matches.length === 0) {
      var empty = document.createElement("div");
      empty.className = "search-empty";
      empty.textContent = "\u201C" + q + "\u201D 에 대한 검색결과가 없어요.";
      searchResultsEl.appendChild(empty);
      return;
    }

    var meta = document.createElement("div");
    meta.className = "search-meta";
    meta.textContent = matches.length >= MAX_RESULTS
      ? "검색결과 " + MAX_RESULTS + "개 이상 (최근순, 더 구체적으로 검색해보세요)"
      : "검색결과 " + matches.length + "개";
    searchResultsEl.appendChild(meta);

    var re = new RegExp(escapeRegExp(q), "ig");
    var frag = document.createDocumentFragment();

    matches.forEach(function (item) {
      var btn = document.createElement("button");
      btn.className = "search-result-item";

      var dateEl = document.createElement("div");
      dateEl.className = "search-result-date";
      dateEl.textContent = formatDateShort(item.d) + "  " + formatTime(item.t);
      btn.appendChild(dateEl);

      var snippetEl = document.createElement("div");
      snippetEl.className = "search-result-snippet";
      var flat = item.m.replace(/\n/g, " ");
      snippetEl.innerHTML = flat.replace(re, function (hit) {
        return "<mark>" + hit + "</mark>";
      });
      btn.appendChild(snippetEl);

      btn.addEventListener("click", function () {
        closeSearch();
        selectMonth(item.mk, true, item.d, item.midx);
      });

      frag.appendChild(btn);
    });

    searchResultsEl.appendChild(frag);
  }

  var searchDebounce = null;
  searchInput.addEventListener("input", function () {
    searchClear.hidden = searchInput.value.length === 0;
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(function () {
      runSearch(searchInput.value);
    }, 120);
  });

  searchClear.addEventListener("click", function () {
    searchInput.value = "";
    searchClear.hidden = true;
    searchResultsEl.innerHTML = "";
    searchInput.focus();
  });

  function openSearch() {
    searchOverlay.hidden = false;
    searchInput.value = "";
    searchClear.hidden = true;
    searchResultsEl.innerHTML = "";
    setTimeout(function () { searchInput.focus(); }, 30);
  }

  function closeSearch() {
    searchOverlay.hidden = true;
  }

  searchToggle.addEventListener("click", openSearch);
  searchClose.addEventListener("click", closeSearch);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !searchOverlay.hidden) closeSearch();
  });

  /* ================= password gate ================= */

  function initPasswordGate() {
    // change this before publishing the archive
    var PW = "910221";

    var gate = document.getElementById("pwGate");
    var input = document.getElementById("pwInput");
    var err = document.getElementById("pwError");
    var submit = document.getElementById("pwSubmit");

    function unlock() {
      try { sessionStorage.setItem("archive_unlocked", "1"); } catch (e) {}
      gate.classList.add("unlocked");
    }

    function tryUnlock() {
      if (input.value === PW) {
        unlock();
      } else {
        err.classList.add("show");
        input.value = "";
        input.focus();
      }
    }

    var already = false;
    try { already = sessionStorage.getItem("archive_unlocked") === "1"; } catch (e) {}

    if (already) {
      gate.classList.add("unlocked");
    } else {
      submit.addEventListener("click", tryUnlock);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") tryUnlock();
      });
      setTimeout(function () { input.focus(); }, 50);
    }
  }

  /* ================= init ================= */

  function init() {
    document.title = PEER_NAME + " · 채팅 아카이브";
    initPasswordGate();
    buildMonthPills();
    buildSearchIndex();
    var first = ARCHIVE_MONTHS[0];
    selectMonth(first, false);
  }

  init();
})();
