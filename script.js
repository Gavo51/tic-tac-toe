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

  const getBoardStatus = () => {
    return board;
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

  return { getBoardStatus, update, render, restart };
})();

const playTurn = (() => {
  const setMark = (e) => {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;

    if (boardCheck.validateCell(x, y)) {
      switch (turnControl.getCurrentTurn()) {
        case 1:
          gameBoard.update(x, y, playerList[1].symbol);
          turnControl.changeTurn();
          break;
        case 2:
          gameBoard.update(x, y, playerList[2].symbol);
          turnControl.changeTurn();
          break;
      }
      gameBoard.render();
    } else {
      alert("This cell isn't available, please choose a different one");
      return;
    }
  };

  return { setMark };
})();

// Turn change module
const turnControl = (() => {
  let currentTurn = 1;

  const changeTurn = () => {
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

  return { changeTurn, getCurrentTurn, restart };
})();

const playRound = () => {
  gameBoard.render();
  const initialize = (() => {
    document.querySelectorAll(".board-cell").forEach((cell) => {
      cell.addEventListener("click", playTurn.setMark);
    });
  })();
};

const boardCheck = (() => {
  // Use the coordenates of the click event and checks if the cell is already marked
  const validateCell = (x, y) => {
    if (gameBoard.getBoardStatus()[x][y] === 0) {
      return true;
    } else {
      return false;
    }
  };

  return { validateCell };
})();

playRound();
