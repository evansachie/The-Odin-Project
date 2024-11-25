// Module for the Gameboard
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
    const updateCell = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker;
        return true;
      }
      return false;
    };
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, updateCell, resetBoard };
  })();
  
  // Factory for Players
  const Player = (name, marker) => {
    return { name, marker };
  };
  
  // Module for Game Logic
  const Game = (() => {
    const playerX = Player("Player X", "X");
    const playerO = Player("Player O", "O");
    let currentPlayer = playerX;
    let gameOver = false;
  
    const checkWinner = () => {
      const board = Gameboard.getBoard();
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      if (board.every(cell => cell)) return "Tie";
      return null;
    };
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };
  
    const playRound = (cellIndex) => {
      if (!gameOver && Gameboard.updateCell(cellIndex, currentPlayer.marker)) {
        renderBoard();
        const winner = checkWinner();
        if (winner) {
          document.getElementById("player-turn").textContent =
            winner === "Tie" ? "It's a Tie!" : `${currentPlayer.name} Wins!`;
          gameOver = true;
        } else {
          switchPlayer();
          document.getElementById("player-turn").textContent = `${currentPlayer.name}'s Turn`;
        }
      }
    };
  
    const restartGame = () => {
      Gameboard.resetBoard();
      currentPlayer = playerX;
      gameOver = false;
      renderBoard();
      document.getElementById("player-turn").textContent = `${currentPlayer.name}'s Turn`;
    };
  
    return { playRound, restartGame };
  })();
  
  // Rendering and Event Listeners
  const renderBoard = () => {
    const board = Gameboard.getBoard();
    const gameboardDiv = document.querySelector(".gameboard");
    gameboardDiv.innerHTML = "";
  
    board.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      if (cell) cellDiv.classList.add("taken");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => Game.playRound(index));
      gameboardDiv.appendChild(cellDiv);
    });
  };
  
  document.getElementById("restart-btn").addEventListener("click", Game.restartGame);
  
  renderBoard();
  