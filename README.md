# Biblioteca Online

Site de bibliotecă online cu catalog, împrumut de cărți, favorite și formular de contact.
Proiectul folosește **doar HTML, CSS și JavaScript** – nu are nevoie de server sau PHP.
Datele (împrumuturi, favorite, mesaje) se păstrează în browser, cu `localStorage`.

🔗 **Site publicat:** https://dalinka378.github.io/Bibliotec-/

## Cum se pornește
Deschide `index.html` direct în browser (dublu-click) sau cu extensia Live Server din VS Code.

## Funcționalități
- Catalog cu căutare după titlu sau autor, filtrare după gen și **sortare** (titlu, autor, an)
- **Pagina fiecărei cărți** (`carte.html?id=3`) cu detalii, împrumut și favorite
- Cărțile mele: termenul de returnare, **zilele rămase** și împrumuturile **întârziate** marcate cu roșu
- Favorite, cu mesaje clare când lista este goală
- Butonul **Înapoi** al browserului trece între secțiuni
- Contact: validare, **contor de caractere** (max. 500) și **ștergerea** mesajelor trimise

## Structură
```
Biblioteca/
├── index.html      – catalogul, cărțile mele, favorite
├── carte.html      – pagina de detalii a unei cărți
├── contact.html    – formular de contact (cu validare în JS)
├── css/
│   └── style.css   – stilurile comune tuturor paginilor
└── js/
    ├── common.js   – funcții comune (localStorage, notificări, regulile de împrumut)
    ├── books.js    – lista de cărți și culorile genurilor
    ├── app.js      – logica paginii principale
    ├── carte.js    – logica paginii de detalii
    └── contact.js  – logica formularului de contact
```

## Reguli
- Maximum 5 cărți împrumutate simultan, fiecare pe 14 zile.
- `index.html#imprumuturi` și `index.html#favorite` deschid direct secțiunea respectivă.

## Echipa
| Membru | Contribuții |
| --- | --- |
| Bălănici Mădălina | pagina cărții, README, organizarea repozitoriului |
| Pîslaraș Adelina | contor de caractere, ștergerea mesajelor, Issues și Labels |
| Morcodeanu Marina | sortarea catalogului, mesaje pentru liste goale, Milestone și Project Board |
| Palai Radu | termene depășite, butonul Înapoi, GitHub Pages și Release |

## Fluxul de lucru în echipă
Issue → Branch → Modificare → Pull Request → Code Review → Merge → Release

- Fiecare sarcină are un Issue, cu Label, Milestone și responsabil.
- Lucrul se face pe un branch separat (`feature/...`, `fix/...`, `docs/...`).
- Ramura `main` este protejată: modificările intră doar prin Pull Request aprobat de un coleg.
