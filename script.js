const gameBoard = (() => {
  const boardState = [
    [0, "X", 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const storePlay = (x, y) => {
    boardState[x][y] = "X";
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

  return { storePlay, render, boardState };
})();

const playTurn = (() => {
  const saveCoordinates = (e) => {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;

    gameBoard.storePlay(x, y, player);
    gameBoard.render();
  };

  const addEvents = (() => {
    document.querySelectorAll(".board-cell").forEach((cell) => {
      cell.addEventListener("click", saveCoordinates);
    });
  })();

  return {};
})();

/* const player = () => {
  let name = "Gabriel";
  let symbol = "X";
  let score = 0;

  const getPlayerSymbol = () => {
    this.symbol;
  };

  return { getPlayerSymbol };
};

console.log(player.getPlayerSymbol); */
