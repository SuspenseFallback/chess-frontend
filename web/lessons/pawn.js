var board;
var game = new Chess();
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var fens = [
  "8/8/8/8/4P3/8/8/8 w - - 0 1",
  "8/4p3/8/8/8/8/4P3/8 w - - 0 1",
  "8/4p3/8/8/8/8/4P3/8 w - - 0 1",
  "8/8/8/4p3/3P4/8/8/8 w - - 0 1",
  "8/8/8/2p5/3P4/8/8/8 w - - 0 1",
  "8/8/8/3p4/3P4/8/8/8 w - - 0 1",
  "8/2p5/8/3P4/8/8/8/8 w - - 0 1",
  "8/8/8/2pP4/8/8/8/8 w - - 0 1",
  "8/8/2P5/8/8/8/8/8 w - - 0 1",
  "8/8/8/3pP3/8/8/8/8 w - - 0 1",
  "8/8/8/4pP2/8/8/8/8 w - - 0 1",
  "8/8/8/8/2Pp4/8/8/8 w - - 0 1",
  "8/8/2P5/8/8/8/8/8 w - - 0 1",
  "8/2p4p/8/3P4/8/8/7P/8 w - - 0 1",
  "8/2p4p/8/3P4/8/8/7P/8 w - - 0 1",
  "8/7p/8/2pP4/8/8/7P/8 w - - 0 1",
  "8/7p/8/2pP4/8/7P/8/8 w - - 0 1",
  "8/8/7p/2pP4/8/7P/8/8 w - - 0 1",
  "8/8/7p/2pP4/8/7P/8/8 w - - 0 1",
  "8/P7/8/8/8/8/7p/8 w - - 0 1",
  "start",
];
var highlighted = [
  ["e5"],
  [],
  ["e2", "e3", "e4"],
  [],
  [],
  [],
  [],
  ["c6", "d5"],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  ["c6", "d5"],
  [],
  [],
  [],
  ["a7", "a8"],
];
var highlightedalt = [
  [],
  [],
  ["e5", "e6", "e7"],
  [],
  [],
  [],
  [],
  ["c7", "c5"],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  ["h2", "h1"],
];
var index = 0;
var text = [
  "The pawn is the weakest piece in chess. It can only move one square forward, as shown on the board.",
  "The pawns' home square are on the second row of the board, or the seventh row.",
  "Pawns, when on the home row, can move two squares forward. This is one of their special movements.",
  "Pawns do not control the squares they are on or move to. They only control the squares diagonal one square forward from them. <br/> For example, these pawns can capture each other.",
  "These pawns can also capture each other.",
  "Pawns cannot move through other pawns or pieces.",
  "Now, these two pawns are on the board and it is Black to move.",
  "The pawn advances two squares, as if it moved one square forward, it would have been captured.",
  "But the pawn was still captured. This rule is called en passant (french for 'in passing').",
  "En passant is also possible here.",
  "And here.",
  "And here for black.",
  "En passant is possible for any pawn that is next to a pawn that just moved two squares forward.",
  "If a move other than en passant has been played, en passant is not possible.",
  "For example, we come to the same position, but with two extra pawns.",
  "Black moves his pawn two squares.",
  "But now, white pushes another pawn.",
  "Black does too.",
  "Now, en passant is not possible, as the first chance to do it is gone.",
  "What happens when a pawn moves to the end of the board? It's called 'promotion', a topic which will be taught in another lesson.",
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
