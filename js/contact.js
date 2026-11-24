// ===== Pagina de contact: validare și salvare locală a mesajelor =====
// Nu există server, deci mesajele se păstrează în browser (localStorage).

let state = loadState();
const form = document.getElementById("contactForm");

const rules = {
  name:    v => v.trim().length >= 3 || "Scrie cel puțin 3 caractere.",
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Adresa de e-mail nu este validă.",
  message: v => v.trim().length >= 10 || "Mesajul trebuie să aibă cel puțin 10 caractere."
};

function checkField(input) {
  const result = rules[input.name](input.value);
  const msg = input.parentElement.querySelector(".msg");
  const ok = result === true;
  input.classList.toggle("bad", !ok);
  msg.textContent = ok ? "" : result;
  return ok;
}

// Contorul de caractere pentru câmpul Mesaj
const MAX_CHARS = 500;
const textarea = form.querySelector("textarea[name=message]");
const counter = document.getElementById("counter");

function updateCounter() {
  const len = textarea.value.length;
  counter.textContent = `${len} / ${MAX_CHARS}`;
  counter.classList.toggle("warn", len >= MAX_CHARS * 0.9);
}

textarea.addEventListener("input", updateCounter);

function renderMessages() {
  const box = document.getElementById("sent");
  if (!state.messages.length) { box.hidden = true; return; }
  box.hidden = false;
  box.querySelector("ul").innerHTML = state.messages
    .map((m, i) => `
      <li>
        <button class="del" data-del="${i}" title="Șterge mesajul" aria-label="Șterge mesajul">✕</button>
        <small>${esc(m.name)} · ${new Date(m.date).toLocaleString("ro-RO")}</small>${esc(m.message)}
      </li>`)
    .reverse()
    .join("");
}

// Ștergerea unui mesaj din listă
function deleteMessage(index) {
  state.messages.splice(index, 1);
  saveState(state);
  renderMessages();
  toast("Mesajul a fost șters");
}

// Ștergerea tuturor mesajelor
function deleteAllMessages() {
  if (!confirm("Sigur vrei să ștergi toate mesajele?")) return;
  state.messages = [];
  saveState(state);
  renderMessages();
  toast("Toate mesajele au fost șterse");
}

document.getElementById("sent").addEventListener("click", e => {
  const btn = e.target.closest("[data-del]");
  if (btn) deleteMessage(Number(btn.dataset.del));
});

document.getElementById("delAll").addEventListener("click", deleteAllMessages);

form.querySelectorAll("input, textarea").forEach(input => {
  input.addEventListener("blur", () => checkField(input));
  input.addEventListener("input", () => input.classList.contains("bad") && checkField(input));
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("input, textarea")];
  const allOk = fields.map(checkField).every(Boolean);
  if (!allOk) { toast("Verifică câmpurile marcate"); return; }

  const data = Object.fromEntries(new FormData(form));
  state.messages.push({ ...data, date: Date.now() });
  saveState(state);
  form.reset();
  updateCounter();
  renderMessages();
  toast("Mesaj trimis. Mulțumim!");
});

document.getElementById("cnt").textContent = Object.keys(state.loans).length;
renderMessages();
