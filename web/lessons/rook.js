var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "3rr3/8/8/8/8/8/8/3RR3 w - - 0 1",
  "8/4P3/8/8/4R3/8/8/8 w - - 0 1",
  "r6r/8/8/8/8/8/8/R6R w - - 0 1",
  "r3r1k1/ppp2ppp/8/8/8/8/PPP2PPP/R2R2K1 w - - 0 1",
  "3rr1k1/ppp2ppp/8/8/8/8/PPP2PPP/3RR1K1 w - - 0 1",
  "start",
];
var highlighted = [
  [],
  [
    "a4",
    "b4",
    "c4",
    "d4",
    "e4",
    "f4",
    "g4",
    "h4",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
  ],
  [],
  [],
  ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8"],
];
var highlightedalt = [
  [],
  [],
  [],
  [],
  ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"],
];
var index = 0;
var text = [
  "Rooks are long-range, major pieces (they are powerful).",
  "Rooks can move horizontally and vertically forever, except when blocked by another piece.",
  "Rooks are moved last, before all the other pieces come out, because they start the game in the corners of the board.",
  "Because of this, rooks normally remain on the board while all the other pieces are captured.",
  "Rooks love open files (columns with no pawns on them), as they can control the entire file.",
  "Congratulations! You completed the lesson.",
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
