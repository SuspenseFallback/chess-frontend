var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "5rk1/pppn4/nbqp2Q1/1bpp4/2r5/2P5/PP3PPP/R4RK1 w - - 0 1",
  "4k3/4P3/4K3/8/8/8/8/8 w - - 0 1",
  "rnbkqbnr/ppp2ppp/8/8/8/3Q4/PPP2PPP/RNBK1BNR w - - 0 1",
  "rnb1k1nr/ppp2p1p/6p1/q7/1b6/1P3NP1/PBPPPPBP/RN1QK2R w - - 0 1",
  "start",
];
var highlighted = [];
var highlightedalt = [];
var index = 0;
var text = [
  "Draw by repetition is when the same position is achieved three times (doesnt have to be in a row).",
  "Draw by repetition normally occurs when the position is impossible to win, or when one side is losing but misses the repition.",
  "Repetition also happens in grandmaster games, as when equals play, the game is likely to be a draw.",
  "Draw by repetition is less likely at lower levels, as more losing mistakes occur.",
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
