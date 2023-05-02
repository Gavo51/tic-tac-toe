const gameBoard = (() => {
  const boardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const initialize = () => {
    document.querySelectorAll(".board-cell").forEach((cell) => {
      cell.addEventListener("click", playTurn.drawq);
    });
  };

  const update = (x, y, player) => {
    boardState[x][y] = player.symbol;
  };

  const render = () => {
    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState[i].length; j++) {
        if (boardState[i][j] !== 0) {
          document.querySelector(`[data-x="${i}"][data-y="${j}"]`).textContent =
            boardState[i][j];
        }
      }
    }
  };

  return { initialize, update, render };
})();

const playTurn = (() => {
  const drawq = (e) => {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;

    console.log("working");

    gameBoard.update(x, y, playerOne);
    gameBoard.render();
  };

  return { drawq };
})();

const playRound = (() => {})();

// Player creation factory function
const player = (name, symbol) => {
  let score = 0;

  const getScore = () => score;
  const updateScore = () => score++;

  return { name, symbol, getScore, updateScore };
};

const playerOne = player("Gabriel", "X");
const playerTwo = player("Gandalf", "0");

gameBoard.initialize();
