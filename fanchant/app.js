/*
  app.js
  ------------------------------------------------------------
  #/           -> 트랙 목록
  #/song-id    -> 해당 곡 상세 (songs-data.js의 id 사용)
*/

const app = document.getElementById("app");

function renderList(){
  const sorted = [...SONGS].sort((a,b)=>a.order-b.order);

  let rows = "";
  if(sorted.length === 0){
    rows = `<div class="empty-note">아직 등록된 곡이 없어요. songs-data.js에 곡을 추가해보세요.</div>`;
  } else {
    rows = sorted.map(song => `
      <a class="track-row" href="#/${song.id}">
        <span class="track-num">${String(song.order).padStart(2,"0")}</span>
        <span class="track-kr">${song.titleKr}</span>
        <span class="track-en">${song.titleEn}</span>
        <span class="track-arrow"><i class="fa-solid fa-chevron-right"></i></span>
      </a>
    `).join("");
  }

  app.innerHTML = `<div class="track-list">${rows}</div>`;
}

function renderSong(id){
  const song = SONGS.find(s => s.id === id);

  if(!song){
    app.innerHTML = `
      <div class="empty-note">
        곡을 찾을 수 없어요.<br>
        <a href="#/" class="back-link" style="margin-top:10px;justify-content:center;">← 목록으로 돌아가기</a>
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

  const linkChip = (label, icon, url) => {
    if(url){
      return `<a class="filter-chip link-chip" href="${escapeHtml(url)}" target="_blank" rel="noopener"><i class="fa-solid ${icon}"></i>${label}</a>`;
    }
    return `<span class="filter-chip link-chip is-empty"><i class="fa-solid ${icon}"></i>${label}</span>`;
  };

  app.innerHTML = `
    <a class="back-link" href="#/"><i class="fa-solid fa-arrow-left"></i> 목록으로</a>

    <div class="song-head">
      <div class="song-kicker">SOLAR · No.${String(song.order).padStart(2,"0")}</div>
      <div class="song-title">${song.titleKr}</div>
      <div class="song-en">${song.titleEn}</div>
    </div>

    <div class="legend">
      ${linkChip("MV", "fa-film", song.mvUrl)}
      ${linkChip("응원법 가이드", "fa-video", song.guideUrl)}
    </div>

    <div class="divider-line"></div>

    <div class="lyrics">
      ${colsHtml}
    </div>
  `;
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
window.addEventListener("DOMContentLoaded", router);
