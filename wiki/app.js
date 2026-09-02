/*
  wiki/app.js
  ------------------------------------------------------------
  index.html의 "알쓸용잡" 탭에 있던 기능을 그대로 옮겨온 페이지입니다.
  같은 Firestore 'wiki' 컬렉션을 사용하기 때문에 기존에 등록된
  항목이 그대로 이어서 보입니다.

  이번 버전에서 추가된 것: 10개 단위 페이지 인덱스.
  등록 순서(createdAt)만으로 자동 계산되기 때문에, 새 항목을
  등록할 때 사용자가 따로 분류를 고를 필요는 없습니다.
*/

firebase.initializeApp({
  apiKey: "AIzaSyD7PwhcOZpYMEm4znPSkCTkKM2ZJzlmX0k",
  authDomain: "yong-schedule.firebaseapp.com",
  projectId: "yong-schedule"
});
const db = firebase.firestore();

const entriesEl = document.getElementById("entries");
const entryCountEl = document.getElementById("entryCount");
const pageTabsEl = document.getElementById("pageTabs");

const addToggle = document.getElementById("addToggle");
const composer = document.getElementById("composer");
const newEntryContent = document.getElementById("newEntryContent");
const composerSave = document.getElementById("composerSave");
const composerCancel = document.getElementById("composerCancel");

const PAGE_SIZE = 10;

let wikiData = [];
let editingId = null;
let currentPage = 1;

const escapeHtml = (str) => String(str || "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

function openComposer(){
  composer.hidden = false;
  addToggle.classList.add("is-open");
  addToggle.innerHTML = `<i class="ti ti-x" aria-hidden="true"></i> 닫기`;
  newEntryContent.focus();
}
function closeComposer(){
  composer.hidden = true;
  addToggle.classList.remove("is-open");
  addToggle.innerHTML = `<i class="ti ti-plus" aria-hidden="true"></i> 새 항목`;
  newEntryContent.value = "";
}

addToggle.addEventListener("click", () => {
  if(composer.hidden) openComposer();
  else closeComposer();
});
composerCancel.addEventListener("click", closeComposer);

composerSave.addEventListener("click", async () => {
  const content = newEntryContent.value.trim();
  if(!content){
    alert("내용을 입력해주세요.");
    return;
  }
  const data = { content, createdAt: Date.now() };
  const ref = await db.collection("wiki").add(data);
  wikiData.push({ id: ref.id, ...data });
  closeComposer();
  // 새 항목은 항상 맨 뒤에 붙으므로, 그 항목이 속한 마지막 페이지로 이동
  currentPage = Math.max(1, Math.ceil(wikiData.length / PAGE_SIZE));
  renderEntries();
});

function entryHTML(item, num){
  const label = String(num).padStart(2, "0");

  if(item.id === editingId){
    const val = escapeHtml(item.content);
    return `
      <div class="entry">
        <div class="entry-no">${label}</div>
        <div class="entry-main entry-edit">
          <textarea id="editContent-${item.id}" rows="3">${val}</textarea>
          <div class="entry-edit-actions">
            <button class="btn-ghost" data-cancel="${item.id}" type="button">취소</button>
            <button class="btn-solid" data-save="${item.id}" type="button">저장</button>
          </div>
        </div>
      </div>
    `;
  }

  const content = escapeHtml(item.content);
  return `
    <div class="entry">
      <div class="entry-no">${label}</div>
      <div class="entry-main">
        <div class="entry-text">${content}</div>
        <div class="entry-actions">
          <button data-edit="${item.id}" type="button"><i class="ti ti-pencil" aria-hidden="true"></i>수정</button>
          <button class="entry-del" data-del="${item.id}" type="button"><i class="ti ti-trash" aria-hidden="true"></i>삭제</button>
        </div>
      </div>
    </div>
  `;
}

function renderPageTabs(totalPages, totalCount){
  if(totalPages <= 1){
    pageTabsEl.hidden = true;
    pageTabsEl.innerHTML = "";
    return;
  }

  pageTabsEl.hidden = false;
  pageTabsEl.innerHTML = Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    const start = i * PAGE_SIZE + 1;
    const end = Math.min((i + 1) * PAGE_SIZE, totalCount);
    const activeClass = page === currentPage ? "is-active" : "";
    return `<button class="page-tab ${activeClass}" data-page="${page}" type="button">${start}–${end}</button>`;
  }).join("");

  pageTabsEl.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentPage = Number(btn.dataset.page);
      editingId = null;
      renderEntries();
    });
  });
}

function renderEntries(){
  const items = wikiData.slice().sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  if(currentPage > totalPages) currentPage = totalPages;
  if(currentPage < 1) currentPage = 1;

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageItems = items.slice(startIdx, startIdx + PAGE_SIZE);

  const rangeLabel = totalPages > 1
    ? ` · ${startIdx + 1}–${Math.min(startIdx + PAGE_SIZE, totalCount)}`
    : "";
  entryCountEl.textContent = `사전${rangeLabel} · ${totalCount}항목`;

  entriesEl.innerHTML = pageItems.length
    ? pageItems.map((item, i) => entryHTML(item, startIdx + i + 1)).join("")
    : `<div class="empty-note">아직 등록된 항목이 없어요.<br>위의 '새 항목' 버튼으로 첫 항목을 추가해보세요.</div>`;

  renderPageTabs(totalPages, totalCount);

  entriesEl.querySelectorAll("[data-edit]").forEach(el => {
    el.addEventListener("click", () => {
      editingId = el.dataset.edit;
      renderEntries();
    });
  });

  entriesEl.querySelectorAll("[data-cancel]").forEach(el => {
    el.addEventListener("click", () => {
      editingId = null;
      renderEntries();
    });
  });

  entriesEl.querySelectorAll("[data-save]").forEach(el => {
    el.addEventListener("click", async () => {
      const id = el.dataset.save;
      const content = document.getElementById(`editContent-${id}`).value.trim();
      if(!content){
        alert("내용을 입력해주세요.");
        return;
      }
      await db.collection("wiki").doc(id).update({ content });
      const idx = wikiData.findIndex(w => w.id === id);
      if(idx > -1) wikiData[idx] = { ...wikiData[idx], content };
      editingId = null;
      renderEntries();
    });
  });

  entriesEl.querySelectorAll("[data-del]").forEach(el => {
    el.addEventListener("click", async () => {
      if(!confirm("이 항목을 삭제할까요?")) return;
      const id = el.dataset.del;
      await db.collection("wiki").doc(id).delete();
      wikiData = wikiData.filter(w => w.id !== id);
      if(editingId === id) editingId = null;
      renderEntries();
    });
  });
}

(async () => {
  const snap = await db.collection("wiki").get();
  wikiData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderEntries();
})();
