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

  // Updates the board using the coordinates and the mark of the player passed through setMark method
  // setMark method is triggered by the playRound.initialized method
  const update = (x, y, mark) => {
    board[x][y] = mark;
  };

  const getBoardState = () => {
    return board;
  };

  const render = () => {
    // Iterate over the board array and use a querySelector with data-attributes to link it to the DOM
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          document.querySelector(`[data-x="${i}"][data-y="${j}"]`).textContent =
            board[i][j];
        }
      }
    }
  };

  return { getBoardState, update, render, restart };
})();

const playTurn = (() => {
  const setMark = (e) => {
    // Get the coordinates using html data attributes (data-x, data-y)
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;

    // Call validation method to check if the cell is filled
    if (boardCheck.validateCell(x, y)) {
      // Call turnControl to check the current turn / pick a player from the list using it as the index
      // Call gameBoard.update and pass the coordinates with the picked player's mark
      switch (turnControl.getCurrentTurn()) {
        case 1:
          gameBoard.update(x, y, playerList[1].symbol);
          boardCheck.scanVertically(x, y, playerList[1].symbol);
          boardCheck.scanHorizontally(x, y, playerList[1].symbol);
          turnControl.changeTurn();
          break;
        case 2:
          gameBoard.update(x, y, playerList[2].symbol);
          boardCheck.scanVertically(x, y, playerList[2].symbol);
          boardCheck.scanHorizontally(x, y, playerList[2].symbol);
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

  // Switch between 1 and 2 when called
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
  // Use the coordenates passed through playturn.setMark and checks if the cell is already marked
  const validateCell = (x, y) => {
    if (gameBoard.getBoardState()[x][y] === 0) {
      return true;
    } else {
      return false;
    }
  };

  const scanVertically = (x, y, mark) => {
    const board = gameBoard.getBoardState();

    x = Number(x);
    y = Number(y);

    let matchCounter = 0;
    for (let i = 0; i <= 2; i++) {
      console.log(i, y);
      if (board[i][y] === mark) {
        matchCounter++;
      }
    }

    if (matchCounter === 3) {
      alert("Tree in a row!");
      return true;
    }
  };

  const scanHorizontally = (x, y, mark) => {
    const board = gameBoard.getBoardState();

    x = Number(x);
    y = Number(y);

    let matchCounter = 0;
    for (let i = 0; i <= 2; i++) {
      console.log(x, i);
      if (board[x][i] === mark) {
        matchCounter++;
      }
    }

    if (matchCounter === 3) {
      alert("Tree in a row!");
      return true;
    }
  };

  return { validateCell, scanVertically, scanHorizontally };
})();

playRound();
