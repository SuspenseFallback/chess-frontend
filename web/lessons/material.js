var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "start",
  "8/8/8/8/8/8/4P3/8 w - - 0 1",
  "8/3ppp2/8/8/8/8/8/4N3 w - - 0 1",
  "4b3/8/8/8/8/8/8/4N3 w - - 0 1",
  "8/2ppppp1/8/8/8/8/8/4R3 w - - 0 1",
  "8/3npp2/8/8/8/8/8/4R3 w - - 0 1",
  "3n1b2/8/8/8/8/8/8/4R3 w - - 0 1",
  "8/pppppppp/4p3/8/8/8/8/4Q3 w - - 0 1",
  "8/3bbn2/8/8/8/8/8/4Q3 w - - 0 1",
  "4r3/5b2/8/8/8/8/8/4Q3 w - - 0 1",
  "4k3/8/8/8/8/8/8/4K3 w - - 0 1",
  "start",
];
var highlighted = [];
var highlightedalt = [];
var index = 0;
var text = [
  "Material is simply how much a piece is worth, measured in points.",
  "A pawn, the weakest piece is just 1 point.",
  "The knight is worth 3 points, or 3 pawns.",
  "The knight is also worth as much as a bishop.",
  "The rook is worth 5 points, or 5 pawns.",
  "The rook is also worth a minor piece and 2 pawns.",
  "Rooks are worse than a bishop and a knight, though.",
  "Queens are worth 9 points, or 9 pawns!",
  "Queens are worth the same as 3 minor pieces.",
  "Queens are also worth the same as a rook and a bishop.",
  "Kings, though weak, are worth an infinite number of points, as trapping the king is the goal of chess.",
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
