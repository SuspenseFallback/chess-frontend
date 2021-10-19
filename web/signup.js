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

let db = firebase.firestore();
let auth = firebase.auth();

function validateEmail(str) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    str
  );
}

function validatePassword(str) {
  if (str.split("").length < 6 || str.split("").length > 20) {
    return false;
  } else if (!/[a-z]/.test(str)) {
    return false;
  } else if (!/[A-Z]/.test(str)) {
    return false;
  } else if (!/[0-9]/.test(str)) {
    return false;
  } else {
    return true;
  }
}

function validateName(str) {
  if (str.split("").length < 3 || str.split("").length > 15) {
    return false;
  } else {
    return true;
  }
}

var usernameinput = document.querySelector("#username");
var emailinput = document.querySelector("#email");
var passwordinput = document.querySelector("#password");
var namevalid = false;
var emailvalid = false;
var passwordvalid = false;

function buttonDisable() {
  var btn = document.querySelector(".submit");
  if (namevalid && emailvalid && passwordvalid) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

var usernameChange = () => {
  var username = document.querySelector("#username").value;

  if (!validateName(username)) {
    if (usernameinput.classList.contains("correct")) {
      usernameinput.classList.remove("correct");
    }
    usernameinput.classList.add("wrong");
    namevalid = false;
  } else {
    if (usernameinput.classList.contains("wrong")) {
      usernameinput.classList.remove("wrong");
    }
    usernameinput.classList.add("correct");
    namevalid = true;
  }

  buttonDisable();
};

var emailChange = () => {
  console.log("change");
  var email = document.querySelector("#email").value;

  if (!validateEmail(email)) {
    if (emailinput.classList.contains("correct")) {
      emailinput.classList.remove("correct");
    }
    emailinput.classList.add("wrong");
    emailvalid = false;
  } else {
    if (emailinput.classList.contains("wrong")) {
      emailinput.classList.remove("wrong");
    }
    emailinput.classList.add("correct");
    emailvalid = true;
  }
  buttonDisable();
};

var passwordChange = () => {
  var password = document.querySelector("#password").value;

  if (!validatePassword(password)) {
    if (passwordinput.classList.contains("correct")) {
      passwordinput.classList.remove("correct");
    }
    passwordinput.classList.add("wrong");
    passwordvalid = false;
  } else {
    if (passwordinput.classList.contains("wrong")) {
      passwordinput.classList.remove("wrong");
    }
    passwordinput.classList.add("correct");
    passwordvalid = true;
  }
  buttonDisable();
};

function register() {
  var username = document.querySelector("#username").value;
  var email = document.querySelector("#email").value;
  var password = document.querySelector("#password").value;
  var newsletter = document.querySelector("#newsletter").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      let user = auth.currentUser;

      db.collection("user")
        .doc(user.uid)
        .set({
          username: username,
          email: email,
          lastlogin: Date.now(),
        })
        .then(() => {
          window.location.replace("/chess-frontend/ai.html");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    })
    .catch((err) => {
      alert(err.message);
    });
}
