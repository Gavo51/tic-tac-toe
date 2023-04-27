const gameBoard = (() => {
  const boardCells = document.querySelectorAll(".board-cell");
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const initBoard = () => {
    addEvents();
  };

  const addEvents = () => {
    boardCells.forEach((cell) => {
      cell.addEventListener("click", getCoordinates);
    });
  };

  const getCoordinates = (e) => {
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;

    fillCell(x, y);
  };

  const fillCell = (x, y) => {
    board[x][y] = "X";
  };

  const renderBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        boardCells.forEach((cell) => {
          console.log(cell);
        });
      }
    }
  };

  return { initBoard, renderBoard };
})();

gameBoard.initBoard();
