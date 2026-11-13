// ===== Pagina principală: catalog, împrumuturi, favorite =====

const MAX_LOANS = 5;
const LOAN_DAYS = 14;

const VIEWS = {
  catalog:     { title: "Descoperă cărți", sub: "Caută în catalog, împrumută pe 14 zile și păstrează-ți lista de favorite." },
  imprumuturi: { title: "Cărțile mele",    sub: "Cărțile împrumutate și termenul de returnare." },
  favorite:    { title: "Cărți favorite",  sub: "Cărțile pe care le-ai marcat cu inimă." }
};

let state = loadState();
let view = VIEWS[location.hash.slice(1)] ? location.hash.slice(1) : "catalog";
let genre = "Toate";
let query = "";

function dueDate(id) {
  return new Date(state.loans[id]).toLocaleDateString("ro-RO");
}

// Câte exemplare mai sunt (scade cu 1 dacă utilizatorul a împrumutat cartea)
function available(book) {
  return book.copies - (state.loans[book.id] ? 1 : 0);
}

function renderChips() {
  const genres = ["Toate", ...new Set(BOOKS.map(b => b.genre))];
  const box = document.getElementById("chips");
  box.innerHTML = genres
    .map(g => `<button class="${g === genre ? "on" : ""}" data-g="${g}">${g}</button>`)
    .join("");
  box.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => { genre = btn.dataset.g; render(); };
  });
}

function filteredBooks() {
  if (view === "imprumuturi") return BOOKS.filter(b => state.loans[b.id]);
  if (view === "favorite") return BOOKS.filter(b => state.favs.includes(b.id));
  return BOOKS.filter(b =>
    (genre === "Toate" || b.genre === genre) &&
    (b.title + " " + b.author).toLowerCase().includes(query)
  );
}

function bookCard(b) {
  const loaned = !!state.loans[b.id];
  const fav = state.favs.includes(b.id);
  return `
    <article class="bk">
      <div class="cv" style="background:${GENRE_COLORS[b.genre] || "#666"}">
        <span>${b.genre} · ${b.year}</span>
          <b><a href="carte.html?id=${b.id}">${esc(b.title)}</a></b>
        <button class="fv" data-fav="${b.id}" title="Favorite" aria-label="Favorite">${fav ? "♥" : "♡"}</button>
      </div>
      <div class="bd">
        <small>${esc(b.author)}</small>
        <p>${esc(b.desc)}</p>
        ${loaned
          ? `<span class="due">Returnează până la ${dueDate(b.id)}</span>`
          : `<span class="st">${available(b)} exemplare disponibile</span>`}
        <div class="row">
          ${loaned
            ? `<button class="bt g" data-return="${b.id}">Returnează</button>`
            : `<button class="bt" data-borrow="${b.id}">Împrumută</button>`}
        </div>
      </div>
    </article>`;
}

function render() {
  document.getElementById("cnt").textContent = Object.keys(state.loans).length;
  document.querySelectorAll("nav [data-view]").forEach(btn => {
    btn.className = btn.dataset.view === view ? "on" : "";
  });
  document.getElementById("tools").style.display = view === "catalog" ? "block" : "none";
  document.getElementById("ttl").textContent = VIEWS[view].title;
  document.getElementById("sub").textContent = VIEWS[view].sub;
  renderChips();

  const grid = document.getElementById("g");
  const list = filteredBooks();
  grid.innerHTML = list.length
    ? list.map(bookCard).join("")
    : '<div class="emp">Nicio carte găsită.</div>';
}

// Un singur ascultător pentru toate butoanele din grilă
document.getElementById("g").addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.borrow) {
    if (Object.keys(state.loans).length >= MAX_LOANS) {
      toast(`Poți împrumuta maximum ${MAX_LOANS} cărți`);
      return;
    }
    state.loans[btn.dataset.borrow] = Date.now() + LOAN_DAYS * 864e5;
    toast(`Carte împrumutată pe ${LOAN_DAYS} zile`);
  } else if (btn.dataset.return) {
    delete state.loans[btn.dataset.return];
    toast("Carte returnată");
  } else if (btn.dataset.fav) {
    const id = +btn.dataset.fav;
    const i = state.favs.indexOf(id);
    i < 0 ? state.favs.push(id) : state.favs.splice(i, 1);
  } else {
    return;
  }
  saveState(state);
  render();
});

document.getElementById("q").addEventListener("input", e => {
  query = e.target.value.toLowerCase();
  render();
});

document.querySelectorAll("nav [data-view]").forEach(btn => {
  btn.addEventListener("click", () => {
    view = btn.dataset.view;
    history.replaceState(null, "", view === "catalog" ? location.pathname : "#" + view);
    render();
  });
});

render();
