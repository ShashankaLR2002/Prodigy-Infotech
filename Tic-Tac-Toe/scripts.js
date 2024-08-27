const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) return 'T'; // Tie if no empty cells
    return null;
}

function handleClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        if (winner === 'T') {
            message.textContent = "It's a Tie!";
        } else {
            message.textContent = `Player ${winner} Wins!`;
        }
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
    message.textContent = `Player ${currentPlayer}'s Turn`;
}

board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetGame);
