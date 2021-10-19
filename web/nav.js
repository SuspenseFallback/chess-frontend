let homelink = document.querySelector(".homelink");
let homemenu = document.querySelector(".homemenu");
let playlink = document.querySelector(".playlink");
let playmenu = document.querySelector(".playmenu");
let puzzleslink = document.querySelector(".puzzleslink");
let puzzlesmenu = document.querySelector(".puzzlesmenu");
let studylink = document.querySelector(".studylink");
let studymenu = document.querySelector(".studymenu");
let settingslink = document.querySelector(".settingslink");
let settingsmenu = document.querySelector(".settingsmenu");
let logoutlink = document.querySelector(".logoutlink");
let loginlink = document.querySelector(".loginlink");
let signuplink = document.querySelector(".signuplink");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    logoutlink.classList.remove("invisible");
    loginlink.classList.add("invisible");
    signuplink.classList.add("invisible");
  } else {
    logoutlink.classList.add("invisible");
    settingslink.classList.add("invisible");
  }
});

homelink.addEventListener("mouseover", () => {
  homemenu.classList.remove("invisible");
});

homelink.addEventListener("mouseout", () => {
  homemenu.classList.add("invisible");
});

playlink.addEventListener("mouseover", () => {
  playmenu.classList.remove("invisible");
});

playlink.addEventListener("mouseout", () => {
  playmenu.classList.add("invisible");
});

puzzleslink.addEventListener("mouseover", () => {
  puzzlesmenu.classList.remove("invisible");
});

puzzleslink.addEventListener("mouseout", () => {
  puzzlesmenu.classList.add("invisible");
});

studylink.addEventListener("mouseover", () => {
  studymenu.classList.remove("invisible");
});

studylink.addEventListener("mouseout", () => {
  studymenu.classList.add("invisible");
});

settingslink.addEventListener("mouseover", () => {
  settingsmenu.classList.remove("invisible");
});

settingslink.addEventListener("mouseout", () => {
  settingsmenu.classList.add("invisible");
});

logoutlink.addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
});
