const gameBoard = (() => {
  const boardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const initialize = () => {
    document.querySelectorAll(".board-cell").forEach((cell) => {
      cell.addEventListener("click", getData.readCoordinates);
    });
  };

  const restart = () => {};

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

const getData = (() => {
  const readCoordinates = (e) => {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;

    return x, y;
  };

  return { readCoordinates };
})();

// Player creation factory function
const player = (name, symbol) => {
  let score = 0;

  const getScore = () => score;
  const updateScore = () => score++;

  return { name, symbol, getScore, updateScore };
};

const createPlayers = () => {
  const playerList = {
    0: player("Gabriel", "X"),
    1: player("Gandalf", "0"),
  };

  console.log(playerList[0].symbol);
};

const playRound = () => {
  gameBoard.initialize();

  let playerTurn = 0;

  for (let i = 0; i <= 10; i++) {
    switch (playerTurn) {
      case 0:
        console.log(playerTurn);
        playerTurn++;
        break;
      case 1:
        console.log(playerTurn);
        playerTurn = 0;
        break;
    }
  }
};

createPlayers();
playRound();
