var board;
var game = new Chess();

var redo = null;

/*The "AI" part starts here */

var random = function (min, max) {
  return Math.floor(Math.random() * max + min);
};

var fenToArrays = function (fen) {
  var board = [[], [], [], [], [], [], [], []];
  var convertFen = fen.split(" ");
  convertFen = convertFen[0];
  var splitFen = [[], [], [], [], [], [], [], []];
  splitFen[0] = convertFen.split("/")[0].split("");
  splitFen[1] = convertFen.split("/")[1].split("");
  splitFen[2] = convertFen.split("/")[2].split("");
  splitFen[3] = convertFen.split("/")[3].split("");
  splitFen[4] = convertFen.split("/")[4].split("");
  splitFen[5] = convertFen.split("/")[5].split("");
  splitFen[6] = convertFen.split("/")[6].split("");
  splitFen[7] = convertFen.split("/")[7].split("");

  for (var i = 0; i <= 7; i++) {
    for (var j = 0; j <= 7; j++) {
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
        var num = parseInt(splitFen[i][j]);

        for (var k = 1; k <= num; k++) {
          board[i].push(null);
        }
      }
    }
  }
  return board;
};

var minimaxRoot = function (depth, game, isMaximisingPlayer) {
  var newGameMoves = game.moves();
  var bestMove = -9999;
  var bestMoveFound;

  for (var i = 0; i < newGameMoves.length; i++) {
    var newGameMove = newGameMoves[i];
    game.move(newGameMove);
    var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }
  return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
  if (depth === 0) {
    return -evaluateBoard(fenToArrays(game.fen()));
  }

  var newGameMoves = game.moves();

  if (isMaximisingPlayer) {
    var bestMove = -9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      if (game.in_threefold_repetition()) {
        continue;
      }
      if (game.in_stalemate()) {
        continue;
      }
      bestMove = Math.max(
        bestMove,
        minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer)
      );
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  } else {
    var bestMove = 9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      if (game.in_threefold_repetition()) {
        continue;
      }
      if (game.in_stalemate()) {
        continue;
      }
      bestMove = Math.min(
        bestMove,
        minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer)
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

var evaluateBoard = function (board) {
  var totalEvaluation = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
};

var reverseArray = function (array) {
  return array.slice().reverse();
};

var pawnEvalWhite = [
  [9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

var bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
];

var kingEvalWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
];

var kingEvalBlack = reverseArray(kingEvalWhite);

var getPieceValue = function (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  var getAbsoluteValue = function (piece, isWhite, x, y) {
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

  var absoluteValue = getAbsoluteValue(piece, piece.color === "w", x, y);
  return piece.color === "w" ? absoluteValue : -absoluteValue;
};

/* board visualization and games state handling */

var onDragStart = function (source, piece, position, orientation) {
  if (
    game.in_checkmate() === true ||
    game.in_draw() === true ||
    piece.search(/^b/) !== -1
  ) {
    return false;
  }
};

var makeBestMove = function () {
  var bestMove = getBestMove(game);
  game.move(bestMove);
  board.position(game.fen());
  if (game.game_over()) {
    alert("Game over");
  }
};

var getBestMove = function (game) {
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
            var randomIdx = random(0, res.data.moves.length - 1);
            console.log(randomIdx);
            game.move(res.data.moves[randomIdx].san);
            board.position(game.fen());
          } else {
            game.move(res.data.moves[0].san);
            board.position(game.fen());
          }
        } else {
          console.log("not opening");
          var depth = 3;

          var bestMove = minimaxRoot(depth, game, true);

          console.log(bestMove);
          game.move(bestMove);
          board.position(game.fen());
        }
      });
  } else {
    console.log("not opening");
    var depth = 3;

    var bestMove = minimaxRoot(depth, game, true);

    return bestMove;
  }
};

var onDrop = function (source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: "q",
  });

  if (move === null) {
    return "snapback";
  }

  window.setTimeout(makeBestMove, 250);
};

var onSnapEnd = function () {
  board.position(game.fen());
};

var undo = function () {
  if (!redo) {
    redo = game.undo();
    board.position(game.fen());
  }
};

var redo = function () {
  if (redo) {
    game.move(redo);
    board.position(game.fen());
    redo = null;
  }
};

var redoButton = document.querySelector(".redo");
var undoButton = document.querySelector(".undo");

undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);

var cfg = {
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  pieceTheme: "../img/chesspieces/wood/{piece}.png",
};
board = ChessBoard("board1", cfg);

if (cfg.pieceTheme) {
  document.querySelector(".piece-417db").style.width = "57px";
  document.querySelector(".piece-417db").style.height = "57px";
}

var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

columns.forEach((column) => {
  for (var i = 1; i <= 8; i++) {
    var el = document.querySelector(`.square-${column + i}`);

    el.addEventListener("mouseover", () => {
      console.log("hover");
      el.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        el.classList.toggle("highlight");
      });
    });
  }
});
