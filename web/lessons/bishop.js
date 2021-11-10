var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "8/8/8/8/4B3/8/8/8 w - - 0 1",
  "2b2b2/8/8/8/8/8/8/2B2B2 w - - 0 1",
  "8/8/6p1/8/4B3/8/8/8 w - - 0 1",
  "8/8/8/8/3BB3/8/8/8 w - - 0 1",
  "8/8/3b4/4p3/2B1P1b1/4B3/8/8 w - - 0 1",
  "start",
];
var highlighted = [
  [],
  [],
  ["a8", "b7", "c6", "d5", "f5", "g6", "b1", "c2", "d3", "f3", "g2", "h1"],
  [
    "a8",
    "b7",
    "c6",
    "d5",
    "f5",
    "g6",
    "e4",
    "h7",
    "b1",
    "c2",
    "d3",
    "f3",
    "g2",
    "h1",
  ],
];
var highlightedalt = [
  [],
  [],
  [],
  [
    "a7",
    "b6",
    "c5",
    "c3",
    "b2",
    "a1",
    "e3",
    "f2",
    "g1",
    "e5",
    "f6",
    "g7",
    "h8",
    "d4",
  ],
];
var index = 0;
var text = [
  "The bishop is a long-range, minor piece (it is small compared to the rest of the pieces.",
  "There are two bishops for each color on the board - One on light squares and one on dark squares for each side.",
  "Bishops can move diagonally in all directions forever, except when blocked by a piece or pawn.",
  "Bishops are best put in the center of the board, as they control the most squares there.",
  "Pawns normally control the center, so bishops are normally put near the center.",
  "Congratulations! You finished the lesson.",
];

function checkDisabled() {
  console.log(index);
  if (index == 0) {
    prev.disabled = true;
    console.log("prev");
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
