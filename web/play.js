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

var board;
var game = new Chess();
let socket = io("https://whispering-forest-54439.herokuapp.com/");
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

let columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

let arrow = null;

columns.forEach((column) => {
  for (let i = 1; i <= 8; i++) {
    let el = document.querySelector(`.square-${column + i}`);

    el.addEventListener("arrow", (e) => {
      console.log("drag", e);
    });

    el.addEventListener("mouseover", () => {
      console.log("hover");
      var alt = false;
      el.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        console.log(e);

        if (
          el.classList.contains("highlightalt") ||
          el.classList.contains("highlightalt2") ||
          el.classList.contains("highlightctrl") ||
          el.classList.contains("highlightctrl2") ||
          el.classList.contains("highlightshift") ||
          el.classList.contains("highlightshift2")
        ) {
          if (el.classList.contains("highlightalt")) {
            el.classList.toggle("highlightalt");
          } else if (el.classList.contains("highlightalt2")) {
            el.classList.toggle("highlightalt2");
          } else if (el.classList.contains("highlightctrl")) {
            el.classList.toggle("highlightctrl");
          } else if (el.classList.contains("highlightctrl2")) {
            el.classList.toggle("highlightctrl2");
          } else if (el.classList.contains("highlightshift")) {
            el.classList.toggle("highlightshift");
          } else if (el.classList.contains("highlightshift2")) {
            el.classList.toggle("highlightshift2");
          }
        }
        if (game.square_color(column + i) == "light" && e.altKey) {
          el.classList.toggle("highlightalt");
        } else if (game.square_color(column + i) == "dark" && e.altKey) {
          el.classList.toggle("highlightalt2");
        } else if (game.square_color(column + i) == "light" && e.ctrlKey) {
          el.classList.toggle("highlightctrl");
        } else if (game.square_color(column + i) == "dark" && e.ctrlKey) {
          el.classList.toggle("highlightctrl2");
        } else if (game.square_color(column + i) == "light" && e.shiftKey) {
          el.classList.toggle("highlightshift");
        } else if (game.square_color(column + i) == "dark" && e.shiftKey) {
          el.classList.toggle("highlightshift2");
        } else if (game.square_color(column + i) == "light") {
          el.classList.toggle("highlight");
        } else if (game.square_color(column + i) == "dark") {
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
      if (el.classList.contains("highlightalt")) {
        el.classList.toggle("highlightalt");
      }
      if (el.classList.contains("highlightalt2")) {
        el.classList.toggle("highlightalt2");
      }
      if (el.classList.contains("highlightctrl")) {
        el.classList.toggle("highlightctrl");
      }
      if (el.classList.contains("highlightctrl2")) {
        el.classList.toggle("highlightctrl2");
      }
      if (el.classList.contains("highlightshift")) {
        el.classList.toggle("highlightshift");
      }
      if (el.classList.contains("highlightshift2")) {
        el.classList.toggle("highlightshift2");
      }
    }
  });
});
