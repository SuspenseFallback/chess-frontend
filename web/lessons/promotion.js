var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "8/P7/8/8/8/8/7p/8 w - - 0 1",
  "8/2PPPP2/8/8/8/8/8/8 w - - 0 1",
  "2N5/3PPP2/8/8/8/8/8/8 w - - 0 1",
  "2NB4/4PP2/8/8/8/8/8/8 w - - 0 1",
  "2NBR3/5P2/8/8/8/8/8/8 w - - 0 1",
  "2NBRQ2/8/8/8/8/8/8/8 w - - 0 1",
  "2QQQQ2/8/8/8/8/8/8/8 w - - 0 1",
  "8/P7/1P6/2P5/5p2/6p1/7p/8 w - - 0 1",
  "start",
];
var highlighted = [["a8", "a7"]];
var highlightedalt = [["h2", "h1"]];
var index = 0;
var text = [
  "In the lesson about pawns, the question 'What happens when a pawn reaches the edge of the board?' was left unanswered.",
  "When a pawn reaches the edge of the board, it becomes another piece.",
  "It can become a knight, ",
  "A bishop, ",
  "A rook, ",
  "Or a queen.",
  "Most of the time, it is advisable to make a queen, though for certain reasons, you should promote to another piece.",
  "Promotion normally happens nearing the end of the game, as then sometimes only pawns remain on the board,",
  "Congratulations! You finished the lesson.",
];

function checkDisabled() {
  if (index == 0) {
    prev.disabled = true;
  } else {
    prev.disabled = false;
  }

  if (index == fens.length - 1) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
}

function changeText() {
  document.querySelector(".lesson>.text").innerHTML = text[index];
}

checkDisabled();
changeText();

var cfg = {
  position: fens[index],
  pieceTheme:
    "https://suspensefallback.github.io/chess-frontend/img/chesspieces/wikipedia/{piece}.png",
};
board = ChessBoard("board1", cfg);

function highlight() {
  console.log("highlight");
  console.log(highlighted[index]);
  if (highlighted[index]) {
    highlighted[index].forEach((square) => {
      console.log(square);
      if (game.square_color(square) == "light") {
        document.querySelector(`.square-${square}`).classList.add("highlight");
      } else {
        console.log(`square-${square}`);
        document.querySelector(`.square-${square}`).classList.add("highlight2");
      }
    });
  }

  if (highlightedalt[index]) {
    highlightedalt[index].forEach((square) => {
      console.log(square);
      if (game.square_color(square) == "light") {
        document
          .querySelector(`.square-${square}`)
          .classList.add("highlightalt");
      } else {
        console.log(`square-${square}`);
        document
          .querySelector(`.square-${square}`)
          .classList.add("highlightalt2");
      }
    });
  }
}

highlight();

function changeBoard() {
  cfg.position = fens[index];
  board = ChessBoard("board1", cfg);
}

prev.addEventListener("click", () => {
  index--;
  checkDisabled();
  changeBoard();
  highlight();
  changeText();
});

next.addEventListener("click", () => {
  index++;
  checkDisabled();
  changeBoard();
  highlight();
  changeText();
});
