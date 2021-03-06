var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "3k4/3p4/2pPp3/1pP1Pp2/pP3Pp1/P5Pp/2K4P/8 w - - 0 1",
  "4k3/4P3/4K3/8/8/8/8/8 b - - 0 1",
  "4k3/pppppppp/ppp1p1pp/4K3/PPPPPPPP/PPPPPPPP/PPPPPPPP/8 w - - 0 1",
  "4k3/8/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/8/4K3 w - - 0 1",
  "4k3/8/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/8/4K3 w - - 0 1",
  "start",
];
var highlighted = [];
var highlightedalt = [];
var index = 0;
var text = [
  "The 50-move rule is when a pawn has not been moved and no captures have occured in the last 50 moves.",
  "The 50 move rule normally happens in positions where it is a draw if defended correctly.",
  "The 50-move rule is less common than draw by repetition.",
  "The 50-move rule was implemented so that if players did not want a draw, they wouldn't play forever.",
  "The 50-move rule is also like a safeguard for the draw by mutual agreement rule.",
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
