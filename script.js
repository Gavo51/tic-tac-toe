// Player creation factory function
const player = (name, symbol) => {
  let score = 0;

  const getScore = () => score;
  const updateScore = () => score++;

  return { name, symbol, getScore, updateScore };
};

const playerList = {
  1: player("Gabriel", "X"),
  2: player("Gandalf", "0"),
};

const gameBoard = (() => {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const restart = () => {};

  const update = (x, y, mark) => {
    board[x][y] = mark;
  };

  const render = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          document.querySelector(`[data-x="${i}"][data-y="${j}"]`).textContent =
            board[i][j];
        }
      }
    }
  };

  return { update, render, restart };
})();

const playTurn = (() => {
  const setMark = (e) => {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;

    switch (turn.getCurrentTurn()) {
      case 1:
        gameBoard.update(x, y, playerList[1].symbol);
        turn.switchTurn();
        break;
      case 2:
        gameBoard.update(x, y, playerList[2].symbol);
        turn.switchTurn();
        break;
    }

    gameBoard.render();
  };

  return { setMark };
})();

// Turn change module
const turn = (() => {
  let currentTurn = 1;

  const switchTurn = () => {
    switch (currentTurn) {
      case 1:
        currentTurn = 2;
        break;
      case 2:
        currentTurn = 1;
        break;
    }
  };

  const getCurrentTurn = () => {
    return currentTurn;
  };

  const restart = () => {
    currentTurn = 1;
  };

  return { switchTurn, getCurrentTurn, restart };
})();

const playRound = () => {
  const initialize = (() => {
    document.querySelectorAll(".board-cell").forEach((cell) => {
      cell.addEventListener("click", playTurn.setMark);
    });
  })();
};

playRound();
