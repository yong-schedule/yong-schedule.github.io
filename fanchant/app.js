/*
  app.js
  ------------------------------------------------------------
  #/           -> 곡 목록 (플레이리스트 헤더 스타일)
  #/song-id    -> 해당 곡 상세 (기존 그대로)
*/

const app = document.getElementById("app");

// 곡 id -> 앨범 커버 이미지.
// 1) assets/ 폴더 안 파일명만 적으면 로컬 이미지를 씁니다. (예: "뱉어.jpg")
// 2) http:// 또는 https://로 시작하는 값을 적으면 그 링크를 그대로 불러옵니다.
//    (assets 폴더에 파일을 넣을 필요 없이, 이미지 주소만 붙여넣으면 됩니다)
const COVERS = {
  "spit-it-out": "뱉어.jpg",
  "honey": "꿀.jpg",
  "colors": "Colors.jpg",
  "but-i": "But_I.jpg",
  "want": "WANT.jpg",
  "floating-free": "Floating_Free.jpg",
  "starry-night": "https://image.bugsm.co.kr/album/images/original/7194/719455.jpg?version=undefined",
  "byeol-baram-kkot-taeyang": "https://image.bugsm.co.kr/album/images/original/7194/719455.jpg?version=undefined",
  "decalcomanie": "https://image.bugsm.co.kr/album/images/original/200648/20064819.jpg?version=undefined",
  "mr-ambiguous": "https://image.bugsm.co.kr/album/images/original/4354/435401.jpg?version=undefined",
  "piano-man": "https://image.bugsm.co.kr/album/images/original/4650/465048.jpg?version=undefined",
  "ahh-oop": "https://image.bugsm.co.kr/album/images/original/4937/493716.jpg?version=undefined",
  "um-oh-ah-yeh": "https://image.bugsm.co.kr/album/images/original/5119/511917.jpg?version=undefined",
  "neon-is-mwondeul": "https://image.bugsm.co.kr/album/images/original/200232/20023279.jpg?version=undefined",
  "yes-i-am": "https://image.bugsm.co.kr/album/images/original/201044/20104423.jpg?version=undefined",
  "ajae-gag": "https://image.bugsm.co.kr/album/images/original/201044/20104423.jpg?version=undefined",
  "neona-hae": "https://image.bugsm.co.kr/album/images/original/201800/20180057.jpg?version=undefined",
  "jamirado-jaji": "https://image.bugsm.co.kr/album/images/original/201800/20180057.jpg?version=undefined",
  "wind-flower": "https://image.bugsm.co.kr/album/images/original/202117/20211791.jpg?version=undefined",
  "no-more-drama": "https://image.bugsm.co.kr/album/images/original/202117/20211791.jpg?version=undefined",
  "gogobebe": "https://image.bugsm.co.kr/album/images/original/202376/20237602.jpg?version=undefined",
  "jaega-gyaeya": "https://image.bugsm.co.kr/album/images/original/202376/20237602.jpg?version=undefined",
  "hip": "https://image.bugsm.co.kr/album/images/original/9541/954132.jpg?version=undefined",
  "destiny": "https://image.bugsm.co.kr/album/images/original/9541/954132.jpg?version=undefined",
  "aya": "https://image.bugsm.co.kr/album/images/original/40120/4012071.jpg?version=undefined",
  "dingga": "https://image.bugsm.co.kr/album/images/original/40120/4012071.jpg?version=undefined",
  "where-are-we-now": "https://image.bugsm.co.kr/album/images/original/40464/4046483.jpg?version=undefined",
  "illella": "https://image.bugsm.co.kr/album/images/original/40805/4080525.jpg?version=undefined",
  "liec": "https://image.bugsm.co.kr/album/images/original/40805/4080525.jpg?version=undefined",
  "4-flowers": "https://image.bugsm.co.kr/album/images/original/41489/4148959.jpg?version=undefined"
};

function coverSrc(file){
  if(!file) return "";
  if(/^https?:\/\//i.test(file)) return file;
  return encodeURI("assets/" + file);
}

function sortedSongs(){
  return [...SONGS].sort((a, b) => a.order - b.order);
}

// group 필드(solar / mamamoo) 기준으로 곡을 묶고, 각 그룹 안에서는 order 순으로 정렬합니다.
const GROUP_LABELS = {
  solar: "솔라 응원법",
  mamamoo: "마마무 응원법"
};
const GROUP_ORDER = ["solar", "mamamoo"];
const GROUP_ARTIST = {
  solar: "Solar",
  mamamoo: "MAMAMOO"
};

function groupedSongs(){
  const bucket = {};
  SONGS.forEach(song => {
    const key = song.group || "etc";
    if(!bucket[key]) bucket[key] = [];
    bucket[key].push(song);
  });
  const keys = Object.keys(bucket).sort((a, b) => {
    const ia = GROUP_ORDER.indexOf(a);
    const ib = GROUP_ORDER.indexOf(b);
    if(ia === -1 && ib === -1) return a.localeCompare(b);
    if(ia === -1) return 1;
    if(ib === -1) return -1;
    return ia - ib;
  });
  return keys.map(key => ({
    key,
    label: GROUP_LABELS[key] || key,
    songs: bucket[key].slice().sort((a, b) => a.order - b.order)
  }));
}

function randomSongId(excludeId){
  const ids = SONGS.map(s => s.id);
  if(ids.length <= 1) return ids[0];
  let pick;
  do{
    pick = ids[Math.floor(Math.random() * ids.length)];
  } while(pick === excludeId);
  return pick;
}

// 헤더의 큰 커버 아트와 하단 미니 플레이어가 같은 곡을 함께 보여주도록
// 하나의 "현재 곡" 상태로 관리합니다.
let currentSong = null;

// 목록 화면에서 현재 선택된 그룹(솔라/마마무) 탭. null이면 첫 번째 그룹으로 시작합니다.
let activeGroup = null;

// 곡 검색어. 탭(그룹)을 전환해도 유지됩니다.
let searchQuery = "";

function escapeHtml(str){
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const GROUP_ICONS = {
  solar: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>`,
  mamamoo: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
};

function pickRandomSong(excludeId, pool){
  const list = pool && pool.length ? pool : SONGS;
  if(list.length <= 1) return list[0];
  let pick;
  do{
    pick = list[Math.floor(Math.random() * list.length)];
  } while(pick.id === excludeId);
  return pick;
}

function applyCurrentSong(song){
  currentSong = song;
  const file = COVERS[song.id];

  const heroCover = document.getElementById("heroCover");
  if(heroCover){
    const img = heroCover.querySelector("img");
    if(file){
      heroCover.classList.remove("img-fail");
      img.onerror = () => heroCover.classList.add("img-fail");
      img.src = coverSrc(file);
    } else {
      heroCover.classList.add("img-fail");
      img.removeAttribute("src");
    }
  }

  const miniPlayer = document.getElementById("miniPlayer");
  const miniCover = document.getElementById("miniCover");
  const miniTitle = document.getElementById("miniTitle");
  const miniSub = document.getElementById("miniSub");
  if(miniPlayer && miniCover && miniTitle){
    let img = miniCover.querySelector("img");
    if(!img){
      img = document.createElement("img");
      img.alt = "";
      miniCover.appendChild(img);
    }
    if(file){
      miniCover.classList.remove("img-fail");
      img.onerror = () => miniCover.classList.add("img-fail");
      img.src = coverSrc(file);
    } else {
      miniCover.classList.add("img-fail");
      img.removeAttribute("src");
    }
    miniTitle.textContent = song.titleKr;
    if(miniSub) miniSub.textContent = GROUP_ARTIST[song.group] || "Solar";
    miniPlayer.href = `#/${song.id}`;
  }
}

function renderList(){
  const sorted = sortedSongs();
  const groups = groupedSongs();

  // 활성 탭이 없거나 더 이상 존재하지 않는 그룹이면 첫 번째 그룹으로 맞춰줍니다.
  if(!activeGroup || !groups.some(g => g.key === activeGroup)){
    activeGroup = groups[0] ? groups[0].key : null;
  }

  const songRow = (song) => {
    const orderLabel = String(song.order).padStart(2, "0");
    return `
      <a class="convo" href="#/${song.id}">
        <span class="convo-index">${orderLabel}</span>
        <div class="convo-body">
          <div class="convo-name">${song.titleKr}</div>
          <div class="convo-eyebrow">${song.titleEn}</div>
        </div>
        <span class="convo-chevron">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </a>
    `;
  };

  const tabsHtml = groups.length > 1 ? `
    <div class="actions">
      ${groups.map(group => `
        <button class="tab ${group.key === activeGroup ? "active" : ""}" type="button" data-group="${group.key}">
          ${GROUP_ICONS[group.key] || ""}${group.label}
        </button>
      `).join("")}
    </div>
  ` : "";

  const current = groups.find(g => g.key === activeGroup) || groups[0];

  // 검색어와 현재 탭(그룹)에 맞는 곡 목록 HTML만 따로 만들어서,
  // 입력할 때마다 이 부분만 갈아끼웁니다 (검색창 자체는 다시 그리지 않아 포커스가 유지됩니다).
  const buildListHtml = () => {
    if(sorted.length === 0){
      return `<div class="empty-note">아직 등록된 곡이 없어요. songs-data.js에 곡을 추가해보세요.</div>`;
    }
    if(!current || current.songs.length === 0){
      return `<div class="empty-note">이 탭에는 아직 등록된 곡이 없어요.</div>`;
    }
    const q = searchQuery.trim().toLowerCase();
    const filtered = q
      ? current.songs.filter(s => s.titleKr.toLowerCase().includes(q) || s.titleEn.toLowerCase().includes(q))
      : current.songs;
    if(filtered.length === 0){
      return `<div class="empty-note">'${escapeHtml(searchQuery.trim())}'에 해당하는 곡이 없어요.</div>`;
    }
    return `<nav class="list">${filtered.map(songRow).join("")}</nav>`;
  };

  const searchHtml = sorted.length > 0 ? `
    <div class="search-wrap">
      <div class="search-box">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="songSearch" placeholder="곡 제목 검색" autocomplete="off" value="${escapeHtml(searchQuery)}">
        <button type="button" class="search-clear" id="searchClear" aria-label="검색어 지우기" style="${searchQuery ? "" : "display:none;"}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  ` : "";

  app.innerHTML = `
    <div class="top-bar">
      <a class="top-back" href="https://yong-archive.github.io/">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        처음으로
      </a>
    </div>

    <div class="hero-card">
      <div class="hero-cover" id="heroCover">
        <span class="cover-fallback" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        </span>
        <img alt="">
      </div>
      <div class="hero-meta">
        <div class="hero-eyebrow">Solar's Music · ${sorted.length}곡</div>
        <div class="hero-title">Fanchant Archive</div>
        <div class="hero-artist">Solar · MAMAMOO</div>
      </div>
    </div>

    ${tabsHtml}

    <div class="section-divider" style="margin-top:18px;"></div>
    <div class="section-label">곡 목록</div>
    ${searchHtml}

    <div id="songListWrap">${buildListHtml()}</div>
  `;

  applyCurrentSong(pickRandomSong(currentSong ? currentSong.id : null, current ? current.songs : null));

  app.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-group");
      if(key === activeGroup) return;
      activeGroup = key;
      renderList();
    });
  });

  const searchInput = document.getElementById("songSearch");
  const searchClear = document.getElementById("searchClear");
  const listWrap = document.getElementById("songListWrap");
  if(searchInput && listWrap){
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value;
      listWrap.innerHTML = buildListHtml();
      if(searchClear) searchClear.style.display = searchQuery ? "" : "none";
    });
  }
  if(searchClear && searchInput){
    searchClear.addEventListener("click", () => {
      searchQuery = "";
      searchInput.value = "";
      searchInput.focus();
      listWrap.innerHTML = buildListHtml();
      searchClear.style.display = "none";
    });
  }
}

function renderSong(id){
  const song = SONGS.find(s => s.id === id);

  if(!song){
    app.innerHTML = `
      <div class="empty-note">
        곡을 찾을 수 없어요.<br>
        <a href="#/" class="back" style="margin-top:10px;justify-content:center;">← 목록으로 돌아가기</a>
      </div>
    `;
    return;
  }

  const escapeHtml = (str) => String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // line은 이제 { text, tag } 하나가 아니라, 한 줄을 이루는
  // segment 배열입니다. 예: [{text:"하고 싶은 대로 ", tag:"lyric"}, {text:"다", tag:"cheer"}, ...]
  const renderCol = (col) => col.map(line => {
    if(!Array.isArray(line)){
      // 혹시 예전 spacer 표기가 남아있는 경우를 위한 안전장치
      if(line && line.tag === "spacer"){
        return `<div class="line spacer"></div>`;
      }
      return "";
    }

    const segsHtml = line.map(seg => {
      const text = escapeHtml(seg.text);
      if(seg.tag === "cheer" || seg.tag === "cue"){
        return `<span class="seg ${seg.tag}">${text}</span>`;
      }
      return text; // lyric은 일반 텍스트 그대로
    }).join("");

    return `<div class="line">${segsHtml}</div>`;
  }).join("");

  const colsHtml = song.columns.map(col => `<div class="col">${renderCol(col)}</div>`).join("");

  const linkChip = (label, iconSvg, url) => {
    if(url){
      return `<a class="chip" href="${escapeHtml(url)}" target="_blank" rel="noopener">${iconSvg}${label}</a>`;
    }
    return `<span class="chip is-empty">${iconSvg}${label}</span>`;
  };

  const youtubeIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>`;
  const videoIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>`;

  app.innerHTML = `
    <a class="back" href="#/">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      목록으로
    </a>

    <div class="song-hero">
      <div class="label">${GROUP_LABELS[song.group] || "Fan Chant"} · No.${String(song.order).padStart(2, "0")}</div>
      <div class="song-title">${song.titleKr}</div>
      <div class="song-en">${song.titleEn}</div>
    </div>

    <div class="chips">
      ${linkChip("MV", youtubeIcon, song.mvUrl)}
      ${linkChip("응원법 가이드", videoIcon, song.guideUrl)}
    </div>

    <div class="section-divider"></div>

    <div class="lyrics-wrap" data-group="${song.group}">
      <div class="lyrics">
        ${colsHtml}
      </div>
    </div>
  `;

  applyCurrentSong(song);
}

// 하단 미니 플레이어의 오디오 스펙트럼(파형) 막대를 생성합니다.
// 초록 -> 파랑 -> 보라 -> 핑크로 이어지는 그라데이션에, 가운데가 봉긋한
// 파형 형태로 배치해서 길게 이어지는 느낌을 줍니다.
function buildMiniEq(){
  const eq = document.getElementById("miniEq");
  if(!eq) return;

  const barCount = 26;
  const colors = ["#2f9d6f","#2fa89a","#38a0c9","#4a86e0","#6c5ce7","#9a5ce0","#c454c9","#e0459f","#ff5b7a"];

  let html = "";
  for(let i = 0; i < barCount; i++){
    const t = i / (barCount - 1);
    const envelope = Math.sin(Math.PI * t); // 가장자리는 낮고 가운데는 높은 파형
    const jitter = 0.85 + Math.sin(i * 2.3) * 0.15; // 막대마다 살짝 다른 높이
    const baseH = (4 + envelope * 16 * jitter).toFixed(1);
    const color = colors[Math.min(colors.length - 1, Math.floor(t * colors.length))];
    const delay = (-(i * 0.08)).toFixed(2);
    html += `<span style="--h:${baseH}px;background:${color};animation-delay:${delay}s"></span>`;
  }
  eq.innerHTML = html;
}

// 목록 화면을 벗어나기 전 스크롤 위치를 기억해뒀다가, 다시 목록으로 돌아왔을 때
// 그 위치에서 이어보이게 합니다. (곡 상세로 들어갈 때는 항상 맨 위에서 시작합니다.)
let prevPath = "";
let listScrollY = 0;

function router(){
  const hash = window.location.hash;
  const path = hash.replace(/^#\/?/, "");
  const scrollEl = document.querySelector(".scroll");

  // 전환되기 직전 화면이 목록이었다면, 지금 스크롤 위치를 저장해둡니다.
  if(scrollEl && !prevPath){
    listScrollY = scrollEl.scrollTop;
  }

  if(!path){
    renderList();
  } else {
    renderSong(path);
  }

  const newScrollEl = document.querySelector(".scroll");
  if(newScrollEl){
    newScrollEl.scrollTop = path ? 0 : listScrollY;
  }

  prevPath = path;
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
  router();
  buildMiniEq();
  // 곡 상세로 바로 들어온 경우(목록을 거치지 않은 딥링크)에는
  // renderList가 실행되지 않으므로, 미니 플레이어를 위해 한 번 채워줍니다.
  if(!currentSong){
    applyCurrentSong(pickRandomSong(null));
  }
});
