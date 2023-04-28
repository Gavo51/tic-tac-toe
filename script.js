const gameBoard = (() => {
  const boardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const saveCoordinates = (e) => {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;

    storePlay(x, y);
    renderBoard();
  };

  const addEvents = (() => {
    document.querySelectorAll(".board-cell").forEach((cell) => {
      cell.addEventListener("click", saveCoordinates);
    });
  })();

  const storePlay = (x, y) => {
    boardState[x][y] = "X";
  };

  const renderBoard = () => {
    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState[i].length; j++) {
        if (boardState[i][j] !== 0) {
          document.querySelector(`[data-x="${i}"][data-y="${j}"]`).textContent =
            boardState[i][j];
        }
      }
    }
  };

  return { boardState };
})();
