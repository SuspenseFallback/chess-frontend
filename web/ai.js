const firebaseConfig = {
  apiKey: "AIzaSyBw_iSpDopbvgkyaXWiEjkf28uoIdTDPnY",
  authDomain: "chess-24c73.firebaseapp.com",
  projectId: "chess-24c73",
  storageBucket: "chess-24c73.appspot.com",
  messagingSenderId: "173816910133",
  appId: "1:173816910133:web:b4ad73167b0feb6e613c7c",
  measurementId: "G-CXCEY5345Q",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();

let board;
let game = new Chess();

/*The "AI" part starts here */

let squares = [
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
];

let pieces = [];

let random = function (min, max) {
  return Math.floor(Math.random() * max + min);
};

let fenToArrays = function (fen) {
  let board = [[], [], [], [], [], [], [], []];
  let convertFen = fen.split(" ");
  convertFen = convertFen[0];
  let splitFen = [[], [], [], [], [], [], [], []];
  splitFen[0] = convertFen.split("/")[0].split("");
  splitFen[1] = convertFen.split("/")[1].split("");
  splitFen[2] = convertFen.split("/")[2].split("");
  splitFen[3] = convertFen.split("/")[3].split("");
  splitFen[4] = convertFen.split("/")[4].split("");
  splitFen[5] = convertFen.split("/")[5].split("");
  splitFen[6] = convertFen.split("/")[6].split("");
  splitFen[7] = convertFen.split("/")[7].split("");

  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      if (splitFen[i][j] == "P") {
        board[i].push({ type: "p", color: "w" });
      } else if (splitFen[i][j] == "N") {
        board[i].push({ type: "n", color: "w" });
      } else if (splitFen[i][j] == "B") {
        board[i].push({ type: "b", color: "w" });
      } else if (splitFen[i][j] == "R") {
        board[i].push({ type: "r", color: "w" });
      } else if (splitFen[i][j] == "Q") {
        board[i].push({ type: "q", color: "w" });
      } else if (splitFen[i][j] == "K") {
        board[i].push({ type: "k", color: "w" });
      } else if (splitFen[i][j] == "p") {
        board[i].push({ type: "p", color: "b" });
      } else if (splitFen[i][j] == "n") {
        board[i].push({ type: "n", color: "b" });
      } else if (splitFen[i][j] == "b") {
        board[i].push({ type: "b", color: "b" });
      } else if (splitFen[i][j] == "r") {
        board[i].push({ type: "r", color: "b" });
      } else if (splitFen[i][j] == "q") {
        board[i].push({ type: "q", color: "b" });
      } else if (splitFen[i][j] == "k") {
        board[i].push({ type: "k", color: "b" });
      } else {
        let num = parseInt(splitFen[i][j]);

        for (let k = 1; k <= num; k++) {
          board[i].push(null);
        }
      }
    }
  }
  return board;
};

let minimaxRoot = function (depth, game, isMaximisingPlayer) {
  let newGameMoves = game.moves();
  let bestMove = -9999;
  let bestMoveFound;

  let score = -evaluateBoard(fenToArrays(game.fen()));

  for (let i = 0; i < newGameMoves.length; i++) {
    let newGameMove = newGameMoves[i];
    game.move(newGameMove);
    if (-evaluateBoard(fenToArrays(game.fen())) < score) {
      game.undo();
      continue;
    }
    let value = minimax(
      depth - 1,
      game,
      -10000,
      10000,
      !isMaximisingPlayer,
      -evaluateBoard(fenToArrays(game.fen()))
    );
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }
  return bestMoveFound;
};

let minimax = function (
  depth,
  game,
  alpha,
  beta,
  isMaximisingPlayer,
  currentScore
) {
  if (depth === 0) {
    return -evaluateBoard(fenToArrays(game.fen()));
  }

  let newGameMoves = game.moves();

  if (isMaximisingPlayer) {
    let bestMove = -9999;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      if (game.in_threefold_repetition()) {
        game.undo();
        continue;
      }
      if (game.in_stalemate()) {
        game.undo();
        continue;
      }
      if (-evaluateBoard(fenToArrays(game.fen())) > currentScore) {
        console.log(newGameMoves[i]);
        console.log(currentScore);
        game.undo();
        continue;
      }
      bestMove = Math.max(
        bestMove,
        minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer, currentScore)
      );
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  } else {
    let bestMove = 9999;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      if (game.in_threefold_repetition()) {
        continue;
      }
      if (game.in_stalemate()) {
        continue;
      }
      if (-evaluateBoard(fenToArrays(game.fen())) > currentScore) {
        console.log(newGameMoves[i]);
        console.log(currentScore);
        game.undo();
        continue;
      }
      bestMove = Math.min(
        bestMove,
        minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer, currentScore)
      );
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  }
};

let evaluateBoard = function (board) {
  let totalEvaluation = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
};

let reverseArray = function (array) {
  return array.slice().reverse();
};

let pawnEvalWhite = [
  [9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

let pawnEvalBlack = reverseArray(pawnEvalWhite);

let knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

let bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];

let bishopEvalBlack = reverseArray(bishopEvalWhite);

let rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
];

let rookEvalBlack = reverseArray(rookEvalWhite);

let evalQueen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
];

let kingEvalWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
];

let kingEvalBlack = reverseArray(kingEvalWhite);

let getPieceValue = function (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  let getAbsoluteValue = function (piece, isWhite, x, y) {
    if (piece.type === "p") {
      return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
    } else if (piece.type === "r") {
      return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
    } else if (piece.type === "n") {
      return 30 + knightEval[y][x];
    } else if (piece.type === "b") {
      return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
    } else if (piece.type === "q") {
      return 90 + evalQueen[y][x];
    } else if (piece.type === "k") {
      return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
    }
    throw "Unknown piece type: " + piece.type;
  };

  let absoluteValue = getAbsoluteValue(piece, piece.color === "w", x, y);
  return piece.color === "w" ? absoluteValue : -absoluteValue;
};

/* board visualization and games state handling */

let onDragStart = function (source, piece, position, orientation) {
  if (
    game.in_checkmate() === true ||
    game.in_draw() === true ||
    piece.search(/^b/) !== -1
  ) {
    return false;
  }
};

let makeBestMove = function () {
  let bestMove = getBestMove(game);
  game.move(bestMove);
  board.position(game.fen());
  if (game.game_over()) {
    alert("Game over");
  }
};

let calculatePieces = function () {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var piece = game.get(squares[i][j]);
      if (piece) {
        pieces.push({
          type: piece.type,
          color: piece.color,
          square: squares[i][j],
        });
      }
    }
  }
};

let getIsolatedPawns = function () {
  let isolatedPawns = [];
  calculatePieces();

  pieces.forEach((piece) => {
    if (piece.split("")[0] == piece.split("")[0].toLowerCase()) {
      // let;
    }
  });
};

let getBestMove = function (game) {
  if (game.game_over()) {
    alert("Game over");
  }

  console.log(game.history().length < 20);
  if (game.history().length <= 20) {
    axios
      .get(`https://explorer.lichess.ovh/master?fen=${game.fen()}`)
      .then((res) => {
        if (res.data.moves.length > 0) {
          console.log(res.data);
          console.log(game.history().length == 1);
          if (game.history().length == 1) {
            let randomIdx = random(0, res.data.moves.length - 1);
            console.log(randomIdx);
            game.move(res.data.moves[randomIdx].san);
            board.position(game.fen());
          } else {
            game.move(res.data.moves[0].san);
            board.position(game.fen());
          }
        } else {
          console.log("not opening");
          let depth = 3;

          let bestMove = minimaxRoot(depth, game, true);

          console.log(bestMove);
          game.move(bestMove);
          board.position(game.fen());
        }
      });
  } else {
    console.log("not opening");
    let depth = 3;

    let bestMove = minimaxRoot(depth, game, true);

    return bestMove;
  }
};

let onDrop = function (source, target) {
  let move = game.move({
    from: source,
    to: target,
    promotion: "q",
  });

  if (move === null) {
    return "snapback";
  }

  window.setTimeout(makeBestMove, 250);
};

let onSnapEnd = function () {
  board.position(game.fen());
};

let undo = function () {
  if (!redo) {
    redo = game.undo();
    board.position(game.fen());
  }
};

let redo = function () {
  if (redo) {
    game.move(redo);
    board.position(game.fen());
    redo = null;
  }
};

let redoButton = document.querySelector(".redo");
let undoButton = document.querySelector(".undo");

undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);

let cfg = {
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  pieceTheme:
    "https://suspensefallback.github.io/chess-frontend/img/chesspieces/wikipedia/{piece}.png",
};
board = ChessBoard("board1", cfg);

if (cfg.pieceTheme) {
  document.querySelector(".piece-417db").style.width = "57px";
  document.querySelector(".piece-417db").style.height = "57px";
}

let columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

columns.forEach((column) => {
  for (let i = 1; i <= 8; i++) {
    let el = document.querySelector(`.square-${column + i}`);

    el.addEventListener("mouseover", () => {
      console.log("hover");
      el.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        if (game.square_color(column + i) == "light") {
          el.classList.toggle("highlight");
        } else {
          el.classList.toggle("highlight2");
        }
      });
    });
  }
});

document.querySelector("body").addEventListener("click", () => {
  columns.forEach((column) => {
    for (let i = 1; i <= 8; i++) {
      let el = document.querySelector(`.square-${column + i}`);

      if (el.classList.contains("highlight")) {
        el.classList.toggle("highlight");
      }
      if (el.classList.contains("highlight2")) {
        el.classList.toggle("highlight2");
      }
    }
  });
});
