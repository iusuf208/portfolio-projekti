const games = [
  // Esimerkkidata
  {
    id: 1,
    nimi: "Space Blaster",
    kuva: "assets/spaceblaster.jpg",
    parasTulos: 9230,
    kayttaja: "retroTom",
  },
  {
    id: 2,
    nimi: "Alien Run",
    kuva: "assets/alienrun.jpg",
    parasTulos: 8800,
    kayttaja: "mikko1980",
  },
  // Lisää vähintään 21 peliä...
];

const peliMaaraSivulla = 20;
let nykyinenSivu = 1;

function naytaPelit() {
  const haku = document.getElementById("search").value.toLowerCase();
  const suodatetut = games.filter((g) => g.nimi.toLowerCase().includes(haku));
  const alku = (nykyinenSivu - 1) * peliMaaraSivulla;
  const loppu = alku + peliMaaraSivulla;
  const pelitNayttoon = suodatetut.slice(alku, loppu);

  document.getElementById("game-list").innerHTML = pelitNayttoon
    .map(
      (g) => `
      <div class="game-card">
        <img src="${g.kuva}" alt="${g.nimi}" style="width:100%; height: 150px; object-fit: cover;"/>
        <h3><a href="peli.html?id=${g.id}">${g.nimi}</a></h3>
        <p>Paras tulos: ${g.parasTulos}</p>
        <p>Voittaja: ${g.kayttaja}</p>
      </div>`
    )
    .join("");

  naytaSivutus(suodatetut.length);
}

function naytaSivutus(pituus) {
  const sivuja = Math.ceil(pituus / peliMaaraSivulla);
  let html = "";
  for (let i = 1; i <= sivuja; i++) {
    html += `<button onclick="siirrySivulle(${i})">${i}</button> `;
  }
  document.getElementById("pagination").innerHTML = html;
}

function siirrySivulle(sivu) {
  nykyinenSivu = sivu;
  naytaPelit();
}

// debounce hakuun
let hakuAika = null;
document.getElementById("search").addEventListener("input", () => {
  clearTimeout(hakuAika);
  hakuAika = setTimeout(naytaPelit, 300);
});

naytaPelit();
