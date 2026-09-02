/*
  app.js
  ------------------------------------------------------------
  #/           -> 곡 목록 (플레이리스트 헤더 스타일)
  #/song-id    -> 해당 곡 상세 (기존 그대로)
*/

const app = document.getElementById("app");

// 곡 id -> assets 폴더 안 앨범 커버 파일명 매핑
// (assets/ 폴더에 아래 파일명 그대로 넣어두면 커버가 보여요)
const COVERS = {
  "spit-it-out": "뱉어.jpg",
  "honey": "꿀.jpg",
  "colors": "Colors.jpg",
  "but-i": "But_I.jpg",
  "want": "WANT.jpg",
  "floating-free": "Floating_Free.jpg"
};

function coverSrc(file){
  return encodeURI("assets/" + file);
}

function sortedSongs(){
  return [...SONGS].sort((a, b) => a.order - b.order);
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

function pickRandomSong(excludeId){
  if(SONGS.length <= 1) return SONGS[0];
  let pick;
  do{
    pick = SONGS[Math.floor(Math.random() * SONGS.length)];
  } while(pick.id === excludeId);
  return pick;
}

function applyCurrentSong(song){
  currentSong = song;
  const file = COVERS[song.id];

  const heroCover = document.getElementById("heroCover");
  if(heroCover){
    heroCover.classList.remove("img-fail");
    const img = heroCover.querySelector("img");
    img.onerror = () => heroCover.classList.add("img-fail");
    img.src = coverSrc(file);
  }

  const miniPlayer = document.getElementById("miniPlayer");
  const miniCover = document.getElementById("miniCover");
  const miniTitle = document.getElementById("miniTitle");
  if(miniPlayer && miniCover && miniTitle){
    miniCover.classList.remove("img-fail");
    let img = miniCover.querySelector("img");
    if(!img){
      img = document.createElement("img");
      img.alt = "";
      miniCover.appendChild(img);
    }
    img.onerror = () => miniCover.classList.add("img-fail");
    img.src = coverSrc(file);
    miniTitle.textContent = song.titleKr;
    miniPlayer.href = `#/${song.id}`;
  }
}

function renderList(){
  const sorted = sortedSongs();

  let listHtml = "";
  if(sorted.length === 0){
    listHtml = `<div class="empty-note">아직 등록된 곡이 없어요. songs-data.js에 곡을 추가해보세요.</div>`;
  } else {
    const rows = sorted.map(song => {
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
    }).join("");
    listHtml = `<nav class="list">${rows}</nav>`;
  }

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
        <div class="hero-artist">Solar</div>
      </div>
    </div>

    <div class="actions">
      <button class="btn-primary" id="playBtn" type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16l13-8-13-8z"/></svg>
        처음부터
      </button>
      <button class="btn-outline" id="shuffleBtn" type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
        랜덤으로
      </button>
    </div>

    <div class="section-divider" style="margin-top:18px;"></div>
    <div class="section-label">곡 목록</div>
    ${listHtml}
  `;

  applyCurrentSong(pickRandomSong(currentSong ? currentSong.id : null));

  document.getElementById("playBtn").addEventListener("click", () => {
    if(sorted.length === 0) return;
    window.location.hash = `#/${sorted[0].id}`;
  });

  document.getElementById("shuffleBtn").addEventListener("click", () => {
    if(sorted.length === 0) return;
    window.location.hash = `#/${randomSongId()}`;
  });
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
      <div class="label">Solar Fan Chant · No.${String(song.order).padStart(2, "0")}</div>
      <div class="song-title">${song.titleKr}</div>
      <div class="song-en">${song.titleEn}</div>
    </div>

    <div class="chips">
      ${linkChip("MV", youtubeIcon, song.mvUrl)}
      ${linkChip("응원법 가이드", videoIcon, song.guideUrl)}
    </div>

    <div class="section-divider"></div>

    <div class="lyrics-wrap">
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

function router(){
  const hash = window.location.hash;
  const path = hash.replace(/^#\/?/, "");

  if(!path){
    renderList();
  } else {
    renderSong(path);
  }
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
