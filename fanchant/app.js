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

  const renderCol = (col) => col.map(line => {
    if(line.tag === "spacer"){
      return `<div class="line spacer"></div>`;
    }
    const cls = line.tag ? `line ${line.tag}` : "line";
    return `<div class="${cls}">${line.text}</div>`;
  }).join("");

  const colsHtml = song.columns.map(col => `<div class="col">${renderCol(col)}</div>`).join("");

  app.innerHTML = `
    <a class="back-link" href="#/"><i class="fa-solid fa-arrow-left"></i> 목록으로</a>

    <div class="song-head">
      <div class="song-kicker">SOLAR · No.${String(song.order).padStart(2,"0")}</div>
      <div class="song-title">${song.titleKr}</div>
      <div class="song-en">${song.titleEn}</div>
    </div>

    <div class="legend">
      <div class="filter-chip"><span class="dot cheer"></span>떼창 · 응원 문구</div>
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
