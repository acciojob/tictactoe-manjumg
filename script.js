//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");

const inputSection = document.getElementById("input-section");
const gameSection = document.getElementById("game-section");
const messageDiv = document.getElementById("message");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameOver = false;

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Start game
submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 && player2) {
    inputSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    messageDiv.textContent = `${player1}, you're up`;
  } else {
    alert("Please enter both player names!");
  }
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || gameOver) return;

    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      const winnerName = currentPlayer === "X" ? player1 : player2;
      messageDiv.textContent = `${winnerName}, congratulations you won!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const nextPlayer = currentPlayer === "X" ? player1 : player2;
    messageDiv.textContent = `${nextPlayer}, you're up`;
  });
});

function checkWin(playerSymbol) {
  const selected = Array.from(cells)
    .filter(cell => cell.textContent === playerSymbol)
    .map(cell => parseInt(cell.id));

  return winningCombinations.some(combination =>
    combination.every(num => selected.includes(num))
  );
}
