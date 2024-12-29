const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const statusDiv = document.getElementById('status');
const currentPlayerSpan = document.getElementById('current-player');

let currentPlayer = 'X';
let board = Array(9).fill(null);

// Handle cell clicks
cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = cell.dataset.index;

  // Check if the cell is already taken
  if (board[index]) return;

  // Update the board and UI
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for a win or draw
  if (checkWin()) {
    displayMessage(`Player ${currentPlayer} Wins!`);
    disableBoard();
  } else if (board.every(cell => cell)) {
    displayMessage(`It's a Draw!`);
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayer();
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function updateCurrentPlayer() {
  currentPlayerSpan.textContent = currentPlayer;
}

function displayMessage(message) {
  statusDiv.textContent = message;
}

function disableBoard() {
  cells.forEach(cell => cell.classList.add('taken'));
}

function resetBoard() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  updateCurrentPlayer();
  displayMessage(`Current Player: ${currentPlayer}`);
}

// Restart button functionality
restartBtn.addEventListener('click', resetBoard);
