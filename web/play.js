var board;
var game = new Chess();
let socket = io("https://peaceful-ridge-17195.herokuapp.com");
let joinGame = document.querySelector(".join");
let gameStart = false;
let color = null;
let opponentId = null;

joinGame.addEventListener("click", (e) => {
  e.preventDefault();

  joinGame.disabled = true;

  socket.emit("joinGame", {
    socketid: socket.id,
  });
});

socket.on("connect", () => {
  console.log("connect");
  console.log(gameStart);
});

socket.on("startGame", (data) => {
  console.log("start game", data);
  gameStart = true;
  color = data.color;
  opponentId = data.opponentId;
  console.log(color);
});

socket.on("new move", (data) => {
  console.log(data.move);
  game.move(data.move);
  board.position(game.fen());
});

var onDragStart = function (source, piece, position, orientation) {
  if (game.in_checkmate()) {
    alert("game over");
    return false;
  }
  if (game.in_draw()) {
    alert("game over");
    return false;
  }
  if (game.turn() != color) {
    return false;
  }
  if (gameStart == false) {
    return false;
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
  } else {
    socket.emit("new move", {
      move: {
        from: source,
        to: target,
        promotion: "q",
      },
      opponentId: opponentId,
    });
  }
};

var onSnapEnd = function () {
  board.position(game.fen());
};

var cfg = {
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
};
board = ChessBoard("board1", cfg);
