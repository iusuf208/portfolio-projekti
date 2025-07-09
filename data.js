// data.js
const games = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Peli ${i + 1}`,
  image: `assets/game${(i % 5) + 1}.jpg`,
  bestScore: 10000 - i * 123,
  bestPlayer: `Pelaaja${(i % 5) + 1}`,
  scores: Array.from({ length: 20 }, (_, j) => ({
    username: `Pelaaja${j + 1}`,
    score: 10000 - j * 137,
    date: `2024-06-${String((j % 30) + 1).padStart(2, "0")}`,
  })),
}));

// index.js
const gameListEl = document.getElementById("game-list");
const searchInput = document.getElementById("search");
const paginationEl = document.getElementById("pagination");

let currentPage = 1;
const itemsPerPage = 20;

function renderGames(page, filter = "") {
  const start = (page - 1) * itemsPerPage;
  const filtered = games.filter((game) =>
    game.name.toLowerCase().includes(filter.toLowerCase())
  );
  const paginated = filtered.slice(start, start + itemsPerPage);

  gameListEl.innerHTML = paginated
    .map(
      (game) => `
      <div class="game-card">
        <img src="${game.image}" alt="${game.name}" width="100%">
        <h3><a href="peli.html?id=${game.id}">${game.name}</a></h3>
        <p>Paras tulos: ${game.bestScore}</p>
        <p>Voittaja: ${game.bestPlayer}</p>
      </div>
    `
    )
    .join("");

  const pageCount = Math.ceil(filtered.length / itemsPerPage);
  paginationEl.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => renderGames(i, searchInput.value);
    paginationEl.appendChild(btn);
  }
}

let debounceTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => renderGames(1, searchInput.value), 300);
});

renderGames(currentPage);

