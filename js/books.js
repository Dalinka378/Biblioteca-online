// ===== Catalogul de cărți =====
// Pentru a adăuga o carte, adaugă un obiect nou în listă (id unic).

const BOOKS = [
  { id: 1,  title: "Povestea lui Harap-Alb", author: "Ion Creangă", genre: "Basme", year: 1877, desc: "Basmul cult al drumului inițiatic: un fiu de crai pornește spre împărăție și își găsește tovarăși neobișnuiți.", copies: 3 },
  { id: 2,  title: "Amintiri din copilărie", author: "Ion Creangă", genre: "Proză", year: 1881, desc: "Copilăria la Humulești, spusă cu umor și grai moldovenesc.", copies: 4 },
  { id: 3,  title: "Poezii", author: "Mihai Eminescu", genre: "Poezie", year: 1884, desc: "Luceafărul, Scrisorile și poeziile de dragoste ale poetului național.", copies: 5 },
  { id: 4,  title: "Sărmanul Dionis", author: "Mihai Eminescu", genre: "Proză", year: 1872, desc: "Nuvelă fantastică despre timp, vis și identitate.", copies: 2 },
  { id: 5,  title: "O scrisoare pierdută", author: "I. L. Caragiale", genre: "Teatru", year: 1884, desc: "Comedie politică despre o scrisoare compromițătoare într-un oraș de provincie.", copies: 3 },
  { id: 6,  title: "Momente și schițe", author: "I. L. Caragiale", genre: "Proză", year: 1901, desc: "Scene scurte și ironice din viața mahalalei și a funcționarilor.", copies: 3 },
  { id: 7,  title: "Ion", author: "Liviu Rebreanu", genre: "Roman", year: 1920, desc: "Pământul și setea de avere într-un sat ardelean.", copies: 2 },
  { id: 8,  title: "Pădurea spânzuraților", author: "Liviu Rebreanu", genre: "Roman", year: 1922, desc: "Drama unui ofițer prins între datorie și conștiință pe front.", copies: 2 },
  { id: 9,  title: "Moara cu noroc", author: "Ioan Slavici", genre: "Proză", year: 1881, desc: "Nuvelă despre lăcomie și destinul unei familii de cârciumari.", copies: 4 },
  { id: 10, title: "Ciocoii vechi și noi", author: "Nicolae Filimon", genre: "Roman", year: 1863, desc: "Ascensiunea unui parvenit în societatea fanariotă.", copies: 1 },
  { id: 11, title: "Poezii", author: "George Coșbuc", genre: "Poezie", year: 1893, desc: "Poezia satului, a muncii și a baladelor populare.", copies: 3 },
  { id: 12, title: "Maitreyi", author: "Mircea Eliade", genre: "Roman", year: 1933, desc: "Dragostea dintre un european și o tânără bengaleză.", copies: 2 },
  { id: 13, title: "Hamlet", author: "William Shakespeare", genre: "Teatru", year: 1603, desc: "Tragedia prințului Danemarcei și a răzbunării.", copies: 4 },
  { id: 14, title: "Micul prinț", author: "Antoine de Saint-Exupéry", genre: "Basme", year: 1943, desc: "Un pilot întâlnește pe un prinț venit de pe o planetă mică.", copies: 5 },
  { id: 15, title: "Divina Comedie", author: "Dante Alighieri", genre: "Poezie", year: 1320, desc: "Călătoria prin Infern, Purgatoriu și Paradis.", copies: 2 },
  { id: 16, title: "Crimă și pedeapsă", author: "Feodor Dostoievski", genre: "Roman", year: 1866, desc: "Vina și remușcarea unui student sărac după o crimă.", copies: 3 }
];

// Culoarea copertei pentru fiecare gen
const GENRE_COLORS = {
  "Basme": "#b45f3a",
  "Proză": "#4f7a5a",
  "Poezie": "#7a5a8c",
  "Teatru": "#a8453f",
  "Roman": "#3f6a8c"
};
