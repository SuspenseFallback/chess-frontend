var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "8/8/8/8/3Q4/8/8/8 w - - 0 1",
  "8/8/8/8/3Q4/8/8/8 w - - 0 1",
  "rnbqkbnr/pppppppp/8/8/2BPPB2/2N2N2/PPP2PPP/R2Q1RK1 w - - 0 1",
  "rnbqkbnr/pppppppp/8/8/8/4PQ2/PPPP1PPP/RNB1KBNR w - - 0 1",
  "7r/2bbpnn1/2r2p2/2ppQp2/3pp3/8/8/8 w - - 0 1",
  "8/8/8/Q6r/6b1/8/8/8 w - - 0 1",
  "start",
];
var highlighted = [
  [],
  [
    "a7",
    "b6",
    "c5",
    "d4",
    "e3",
    "f2",
    "g1",
    "h8",
    "g7",
    "f6",
    "e5",
    "c3",
    "b2",
    "a1",
    "a4",
    "b4",
    "c4",
    "e4",
    "f4",
    "g4",
    "h4",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
  ],
  ["d1"],
];
var highlightedalt = [];
var index = 0;
var text = [
  "The queen is the most powerful piece in chess and a major piece.",
  "The queen has the combined movement of the bishop and the rook, meaning that it can move infinitely horizontally, vertically and diagonally in all 4 directions.",
  "The queen is one of the last pieces to be moved (after the bishops and knights normally.)",
  "Queens are very powerful due to their ability to move to many squares, making them the first piece to move for many beginners.",
  "That is a bad idea as your queen can get trapped.",
  "Queens, though powerful, are equal to (or sometimes even worse than) a rook and bishop.",
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
