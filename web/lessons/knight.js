var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "8/8/8/8/4N3/8/8/8 w - - 0 1",
  "8/8/8/8/4N3/8/8/8 w - - 0 1",
  "8/8/8/8/4N3/8/8/8 w - - 0 1",
  "8/8/8/4b3/4N3/8/8/8 w - - 0 1",
  "r1bqkb1r/pppp1ppp/2n1pn2/1N6/3PPB2/8/PPP2PPP/R2QKBNR w - - 0 1",
  "start",
];
var highlighted = [
  [],
  ["d6", "e6", "e5", "e4"],
  ["d6", "f6", "g5", "g3", "f2", "d2", "c3", "c5"],
  ["d6", "f6", "e4"],
  ["b5", "f4", "c7"],
  [],
];
var highlightedalt = [];
var index = 0;
var text = [
  "The knight is the second minor piece, which can be compared to the bishop.",
  "The knight has an odd movement system - It moves in an 'L' shape.",
  "Knights can move to 'L' shapes in 8 directions, though their movements, though they can't move off the board.",
  "Knights have a special ability: They can jump over pieces, so knight attacks can't be blocked.",
  "Knights are very useful for beginners, as their movements are unpredictable and easy to forget in your calculations.",
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
