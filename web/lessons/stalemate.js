var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "7k/5Q2/8/8/8/8/8/4K3 b - - 0 1",
  "7k/6R1/5K2/8/8/8/8/8 w - - 0 1",
  "6Q1/7p/7k/7p/7K/8/8/8 w - - 0 1",
  "8/2kbK3/8/8/8/8/8/5q2 w - - 0 1",
];
var highlighted = [];
var highlightedalt = [];
var index = 0;
var text = [
  "Stalemate is when the opponent has no legal moves, rendering the game a draw.",
  "Stalemate normally happens in the endgame, as there are less pieces, so there are more chances of accidentally stalemating.",
  "Stalemate happens when trying to checkmate in the endgame, as players forget that the opponent has no legal moves.",
  "Stalemate is to be avoided by the winning side, but the losing side, who should be aiming for a draw, should try for stalemate, as it is very easy to miss stalemate for the winning side.",
  "Stalemate is only one of some ways to draw.",
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
