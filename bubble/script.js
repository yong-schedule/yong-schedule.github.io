(function () {
  "use strict";

  var monthsEl = document.getElementById("months");
  var daysEl = document.getElementById("days");
  var chatEl = document.getElementById("chat");
  var chatInnerEl = document.getElementById("chatInner");

  var WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
  var currentMonthKey = null;

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

  function formatTime(t) {
    var hh = parseInt(t.slice(0, 2), 10);
    var mm = t.slice(3, 5);
    var period = hh < 12 ? "오전" : "오후";
    var h12 = hh % 12;
    if (h12 === 0) h12 = 12;
    return period + " " + h12 + ":" + mm;
  }

  function buildMonthPills() {
    var frag = document.createDocumentFragment();
    BUBBLE_MONTHS.forEach(function (key) {
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
    var msgs = BUBBLE_DATA[key] || [];
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
    fb.textContent = "용";
    av.appendChild(img);
    av.appendChild(fb);
    return av;
  }

  function buildPhotoFallback(m) {
    var card = document.createElement("div");
    card.className = "attach-card";
    var icon = document.createElement("div");
    icon.className = "attach-icon photo";
    icon.textContent = "📷";
    var txt = document.createElement("div");
    txt.className = "attach-text";
    var label = document.createElement("div");
    label.className = "attach-label";
    label.textContent = "사진";
    txt.appendChild(label);
    if (m.detail) {
      var sub = document.createElement("div");
      sub.className = "attach-sub";
      sub.textContent = m.detail;
      txt.appendChild(sub);
    }
    card.appendChild(icon);
    card.appendChild(txt);
    return card;
  }

  function buildBubbleContent(m) {
    switch (m.type) {
      case "photo": {
        if (m.id) {
          var photo = document.createElement("img");
          photo.className = "attach-media photo-media";
          photo.src = "assets/img/" + m.id + ".jpg";
          photo.alt = m.detail || "사진";
          photo.loading = "lazy";
          photo.onerror = function () {
            photo.replaceWith(buildPhotoFallback(m));
          };
          return photo;
        }
        return buildPhotoFallback(m);
      }
      case "video": {
        var card = document.createElement("div");
        card.className = "attach-card";
        var icon = document.createElement("div");
        icon.className = "attach-icon video";
        icon.textContent = "🎥";
        var txt = document.createElement("div");
        txt.className = "attach-text";
        var label = document.createElement("div");
        label.className = "attach-label";
        label.textContent = "동영상";
        txt.appendChild(label);
        if (m.detail) {
          var sub = document.createElement("div");
          sub.className = "attach-sub";
          sub.textContent = m.detail;
          txt.appendChild(sub);
        }
        card.appendChild(icon);
        card.appendChild(txt);
        return card;
      }
      case "voice": {
        var card = document.createElement("div");
        card.className = "attach-card";
        var icon = document.createElement("div");
        icon.className = "attach-icon voice";
        icon.textContent = "▶";
        var txt = document.createElement("div");
        txt.className = "attach-text";
        var label = document.createElement("div");
        label.className = "attach-label";
        label.textContent = "음성메시지";
        txt.appendChild(label);
        var sub = document.createElement("div");
        sub.className = "attach-sub";
        sub.textContent = m.detail || "";
        txt.appendChild(sub);
        card.appendChild(icon);
        card.appendChild(txt);
        return card;
      }
      case "call": {
        var card = document.createElement("div");
        card.className = "attach-card";
        var icon = document.createElement("div");
        icon.className = "attach-icon call";
        icon.textContent = "📞";
        var txt = document.createElement("div");
        txt.className = "attach-text";
        var label = document.createElement("div");
        label.className = "attach-label";
        label.textContent = "음성 통화";
        txt.appendChild(label);
        var sub = document.createElement("div");
        sub.className = "attach-sub";
        sub.textContent = m.detail || "";
        txt.appendChild(sub);
        card.appendChild(icon);
        card.appendChild(txt);
        return card;
      }
      case "sticker": {
        var card = document.createElement("div");
        card.className = "attach-card";
        var icon = document.createElement("div");
        icon.className = "attach-icon sticker";
        icon.textContent = "🐣";
        var txt = document.createElement("div");
        txt.className = "attach-text";
        var label = document.createElement("div");
        label.className = "attach-label";
        label.textContent = "스티커";
        txt.appendChild(label);
        if (m.detail) {
          var sub = document.createElement("div");
          sub.className = "attach-sub";
          sub.textContent = m.detail;
          txt.appendChild(sub);
        }
        card.appendChild(icon);
        card.appendChild(txt);
        return card;
      }
      case "live": {
        var card = document.createElement("div");
        var ended = m.detail === "end";
        card.className = "live-card" + (ended ? " ended" : "");
        if (!ended) {
          var dot = document.createElement("div");
          dot.className = "live-dot";
          card.appendChild(dot);
        }
        var span = document.createElement("span");
        span.textContent = ended ? ("버블 라이브 종료 " + (m.dur || "")) : "버블 라이브 시작";
        card.appendChild(span);
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

  function renderDay(key, day) {
    var msgs = (BUBBLE_DATA[key] || []).filter(function (m) {
      return m.d === day;
    });
    chatInnerEl.innerHTML = "";

    var frag = document.createDocumentFragment();

    var divider = document.createElement("div");
    divider.className = "day-divider";
    var span = document.createElement("span");
    span.textContent = formatDayDivider(day);
    divider.appendChild(span);
    frag.appendChild(divider);

    msgs.forEach(function (m) {
      var row = document.createElement("div");
      row.className = "msg-row";
      row.appendChild(avatarEl());

      var body = document.createElement("div");
      body.className = "msg-body";

      var name = document.createElement("div");
      name.className = "sender-name";
      name.textContent = "용";
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
    });

    chatInnerEl.appendChild(frag);
  }

  function selectDay(day) {
    setActiveDayPill(day);
    renderDay(currentMonthKey, day);
    chatEl.scrollTop = 0;
  }

  function selectMonth(key, scrollToTop) {
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

    var firstDay = dayOrder[0];
    buildDayChips(dayOrder, firstDay);
    renderDay(key, firstDay);

    if (scrollToTop) {
      chatEl.scrollTop = 0;
    }
  }

  function init() {
    buildMonthPills();
    var first = BUBBLE_MONTHS[0];
    selectMonth(first, false);
  }

  init();
})();
