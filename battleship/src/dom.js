import GameController from './game.js';

const gc = new GameController();

const $ = (id) => document.getElementById(id);

const playerBoardEl = $('player-board');
const computerBoardEl = $('computer-board');
const statusEl = $('status');
const restartBtn = $('restart-btn');

function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

// render one board
function renderBoard(boardEl, boardObj, hideShips = false) {
  clear(boardEl);
  boardEl.style.gridTemplateColumns = `repeat(${boardObj.size}, 1fr)`;

  for (let r = 0; r < boardObj.size; r++) {
    for (let c = 0; c < boardObj.size; c++) {
      const cell = boardObj.getCell(r, c);
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.dataset.row = r;
      cellEl.dataset.col = c;

      if (cell.isHit) {
        // hit or miss
        if (cell.ship) {
          cellEl.classList.add('hit');
          cellEl.textContent = '✹';
        } else {
          cellEl.classList.add('miss');
          cellEl.textContent = '•';
        }
      } else {
        // not hit yet
        if (cell.ship && !hideShips) {
          cellEl.classList.add('ship'); // show ship on player's board
          cellEl.textContent = '▦';
        }
      }

      boardEl.appendChild(cellEl);
    }
  }
}

// render both boards
function renderAll() {
  renderBoard(playerBoardEl, gc.human.board, false);
  renderBoard(computerBoardEl, gc.computer.board, true); // hide computer ships
}

// central UI update handler (registered with GameController)
function handleUpdate(event) {
  if (!event) return;

  if (event.type === 'init') {
    statusEl.textContent = 'Game started — your move.';
  } else if (event.type === 'attack') {
    if (event.by === 'human') {
      if (event.result.result === 'hit') {
        statusEl.textContent = `You hit at (${event.coord[0]}, ${event.coord[1]})`;
      } else if (event.result.result === 'miss') {
        statusEl.textContent = `You missed at (${event.coord[0]}, ${event.coord[1]})`;
      } else {
        statusEl.textContent = `You already attacked (${event.coord[0]}, ${event.coord[1]}). Choose another.`;
      }
    } else {
      // computer move
      if (event.result.result === 'hit') {
        statusEl.textContent = `Computer hit your ship at (${event.coord[0]}, ${event.coord[1]})`;
      } else {
        statusEl.textContent = `Computer missed at (${event.coord[0]}, ${event.coord[1]})`;
      }
    }
    // re-render both boards after each attack
    renderAll();
  } else if (event.type === 'gameOver') {
    if (event.winner === 'human') {
      statusEl.textContent = 'You win! 🎉';
    } else {
      statusEl.textContent = 'Computer wins. 💀';
    }
    // Render final boards (reveal computer ships)
    renderBoard(playerBoardEl, gc.human.board, false);
    renderBoard(computerBoardEl, gc.computer.board, false);
  } else if (event.type === 'restart') {
    statusEl.textContent = 'Game restarted — your move.';
  }
}

// when user clicks on a cell of the computer board
function onComputerBoardClick(e) {
  if (gc.gameOver) return;

  const el = e.target.closest('.cell');
  if (!el) return;

  const row = Number(el.dataset.row);
  const col = Number(el.dataset.col);

  // only allow click when it's human's turn
  if (gc.current !== 'human') {
    statusEl.textContent = "Wait for the computer's move...";
    return;
  }

  gc.playerAttack([row, col]);
}

// set up listeners and kick off the game
function init() {
  gc.setUpdateCallback(handleUpdate);
  computerBoardEl.addEventListener('click', onComputerBoardClick);

  restartBtn.addEventListener('click', () => {
    gc.restart();
  });

  gc.setupDefaultShips();
  renderAll();
}

// start when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
