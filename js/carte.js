// ===== Pagina de detalii a unei cărți (carte.html?id=3) =====

const MAX_LOANS = 5;
const LOAN_DAYS = 14;

let state = loadState();
const id = Number(new URLSearchParams(location.search).get("id"));
const book = BOOKS.find(b => b.id === id);

function render() {
  document.getElementById("cnt").textContent = Object.keys(state.loans).length;
  const box = document.getElementById("det");

  if (!book) {
    box.innerHTML = '<div class="emp">Cartea nu a fost găsită.</div>';
    return;
  }

  document.title = book.title + " – Biblioteca Online";
  const loaned = !!state.loans[book.id];
  const fav = state.favs.includes(book.id);
  const left = book.copies - (loaned ? 1 : 0);

  box.innerHTML = `
    <article class="det">
      <div class="cv big" style="background:${GENRE_COLORS[book.genre] || "#666"}">
        <span>${book.genre} · ${book.year}</span>
        <b>${esc(book.title)}</b>
      </div>
      <div class="info-carte">
        <h1>${esc(book.title)}</h1>
        <p class="autor">${esc(book.author)}</p>
        <table>
          <tr><th>Gen</th><td>${book.genre}</td></tr>
          <tr><th>An</th><td>${book.year}</td></tr>
          <tr><th>Exemplare disponibile</th><td>${left}</td></tr>
        </table>
        <p>${esc(book.desc)}</p>
        ${loaned ? `<p class="due">Returnează până la ${new Date(state.loans[book.id]).toLocaleDateString("ro-RO")}</p>` : ""}
        <div class="row">
          ${loaned
            ? '<button class="bt g" id="act">Returnează</button>'
            : '<button class="bt" id="act">Împrumută</button>'}
          <button class="bt g" id="fav">${fav ? "♥ În favorite" : "♡ Adaugă la favorite"}</button>
        </div>
      </div>
    </article>`;

  document.getElementById("act").onclick = () => {
    if (loaned) {
      delete state.loans[book.id];
      toast("Carte returnată");
    } else {
      if (Object.keys(state.loans).length >= MAX_LOANS) {
        toast(`Poți împrumuta maximum ${MAX_LOANS} cărți`);
        return;
      }
      state.loans[book.id] = Date.now() + LOAN_DAYS * 864e5;
      toast(`Carte împrumutată pe ${LOAN_DAYS} zile`);
    }
    saveState(state);
    render();
  };

  document.getElementById("fav").onclick = () => {
    const i = state.favs.indexOf(book.id);
    i < 0 ? state.favs.push(book.id) : state.favs.splice(i, 1);
    saveState(state);
    render();
  };
}

render();
