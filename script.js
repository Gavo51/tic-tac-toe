const gameBoard = (() => {
  const boardCells = document.querySelectorAll(".board-cell");
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let x = 0;
  let y = 0;

  const saveCoordinates = (e) => {
    x = e.target.dataset.x;
    y = e.target.dataset.y;

    storePLay();
    fillCell(e.target);
  };

  const addEvents = (() => {
    boardCells.forEach((cell) => {
      cell.addEventListener("click", saveCoordinates);
    });
  })();

  const storePLay = () => {
    board[x][y] = "X";
  };

  const fillCell = (clickedCell) => {
    clickedCell.textContent = "X";
  };

  return { board };
})();

console.log(gameBoard.board);
