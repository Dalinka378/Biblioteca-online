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

function renderMessages() {
  const box = document.getElementById("sent");
  if (!state.messages.length) { box.hidden = true; return; }
  box.hidden = false;
  box.querySelector("ul").innerHTML = state.messages
    .slice()
    .reverse()
    .map(m => `<li><small>${esc(m.name)} · ${new Date(m.date).toLocaleString("ro-RO")}</small>${esc(m.message)}</li>`)
    .join("");
}

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
  renderMessages();
  toast("Mesaj trimis. Mulțumim!");
});

document.getElementById("cnt").textContent = Object.keys(state.loans).length;
renderMessages();
