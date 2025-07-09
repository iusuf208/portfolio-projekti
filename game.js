// game.js
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const gameId = parseInt(getQueryParam("id"));
const game = games.find((g) => g.id === gameId);

const gameDetailsEl = document.getElementById("game-details");
const scoreTableEl = document.getElementById("score-table");
const playerSearchInput = document.getElementById("player-search");

if (game) {
  gameDetailsEl.innerHTML = `
        <h2>${game.name}</h2>
        <img src="${game.image}" alt="${game.name}" width="100%">
      `;

  function renderScores(filter = "") {
    const scores = game.scores
      .filter((s) => s.username.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    scoreTableEl.innerHTML = `
          <tr><th>#</th><th>Käyttäjä</th><th>Tulos</th><th>Päivämäärä</th></tr>
          ${scores
            .map((s, i) => {
              let cls =
                i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
              return `<tr class="${cls}"><td>${i + 1}</td><td>${
                s.username
              }</td><td>${s.score}</td><td>${s.date}</td></tr>`;
            })
            .join("")}
        `;
  }

  let debounceTimeout2;
  playerSearchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout2);
    debounceTimeout2 = setTimeout(
      () => renderScores(playerSearchInput.value),
      300
    );
  });

  renderScores();
} else {
  gameDetailsEl.innerHTML = "<p>Peliä ei löytynyt.</p>";
}
