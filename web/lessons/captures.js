var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [];
var highlighted = [];
var highlightedalt = [];
var index = 0;
var text = [
  "Captures are very interesting, as they allow to remove pieces off the board.",
  "Players are not allowed to capture their own pieces, though.",
  "But capturing anything with any piece is not a good idea.",
  "There are 3 types of captures - trading, capturing free (or 'hanging' in chess terms) pieces and sacrificing.",
  "Trading is when two pieces of the same value are traded by capturing a defended piece.",
  "Capturing hanging pieces is when a piece that is not defended is captured.",
  "And sacrificing is when a piece is given away for less or no material.",
  "There is a difference between blundering and sacrificing - Sacrifices are done for a purpose, and blunders are simply hanging pieces (or checkmate) for no reason.",
  "It is always best to first capture with the lowest value pieces, and then with higher valued pieces.",
  "Capturing is an important part of the game, as it allows players to remove pieces off the board.",
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
