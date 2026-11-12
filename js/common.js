// ===== Funcții comune pentru toate paginile =====

// Datele se păstrează în browser (localStorage), fără server.
const STORAGE_KEY = "bib";

function loadState() {
  const implicit = { loans: {}, favs: [], messages: [] };
  try {
    return Object.assign(implicit, JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
  } catch (e) {
    return implicit;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage poate fi blocat (mod privat) – aplicația merge mai departe fără salvare
  }
}

function toast(text) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = text;
  el.className = "on";
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (el.className = ""), 1800);
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
