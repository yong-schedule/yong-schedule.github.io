(function () {
  "use strict";

  var monthsEl = document.getElementById("months");
  var chatEl = document.getElementById("chat");
  var chatInnerEl = document.getElementById("chatInner");
  var countBadge = document.getElementById("countBadge");
  var jumpBtn = document.getElementById("jumpBtn");

  var WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  function totalMessageCount() {
    var total = 0;
    FROMM_MONTHS.forEach(function (m) { total += FROMM_DATA[m].length; });
    return total;
  }

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

  // ---------- month pills ----------
  var currentMonth = null;

  function buildMonthPills() {
    var frag = document.createDocumentFragment();
    FROMM_MONTHS.forEach(function (key) {
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

  // ---------- rendering ----------
  function renderMonth(key) {
    var msgs = FROMM_DATA[key] || [];
    chatInnerEl.innerHTML = "";

    if (msgs.length === 0) {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "이 달에는 메시지가 없어요.";
      chatInnerEl.appendChild(empty);
      return;
    }

    var byDay = {};
    var dayOrder = [];
    msgs.forEach(function (m) {
      if (!byDay[m.d]) {
        byDay[m.d] = [];
        dayOrder.push(m.d);
      }
      byDay[m.d].push(m);
    });

    var frag = document.createDocumentFragment();

    dayOrder.forEach(function (day) {
      var divider = document.createElement("div");
      divider.className = "day-divider";
      var span = document.createElement("span");
      span.textContent = formatDayDivider(day);
      divider.appendChild(span);
      frag.appendChild(divider);

      byDay[day].forEach(function (m) {
        var row = document.createElement("div");
        row.className = "msg-row";

        var avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = "솔";
        row.appendChild(avatar);

        var body = document.createElement("div");
        body.className = "msg-body";

        var name = document.createElement("div");
        name.className = "sender-name";
        name.textContent = "용뜬,";
        body.appendChild(name);

        var bubbleRow = document.createElement("div");
        bubbleRow.className = "bubble-row";

        var bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = m.m;
        bubbleRow.appendChild(bubble);

        var time = document.createElement("span");
        time.className = "time";
        time.textContent = formatTime(m.t);
        bubbleRow.appendChild(time);

        body.appendChild(bubbleRow);
        row.appendChild(body);
        frag.appendChild(row);
      });
    });

    chatInnerEl.appendChild(frag);
  }

  function selectMonth(key, scrollToTop) {
    currentMonth = key;
    setActivePill(key);
    renderMonth(key);
    if (scrollToTop) {
      chatEl.scrollTop = 0;
    }
  }

  // ---------- jump-to-latest button ----------
  chatEl.addEventListener("scroll", function () {
    var show = chatEl.scrollTop > 400;
    jumpBtn.classList.toggle("show", show);
  });

  jumpBtn.addEventListener("click", function () {
    chatEl.scrollTo({ top: chatEl.scrollHeight, behavior: "smooth" });
  });

  // ---------- init ----------
  function init() {
    buildMonthPills();
    countBadge.textContent = totalMessageCount().toLocaleString("ko-KR") + "개";

    var last = FROMM_MONTHS[FROMM_MONTHS.length - 1];
    selectMonth(last, false);
  }

  init();
})();
