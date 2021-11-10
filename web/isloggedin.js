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
