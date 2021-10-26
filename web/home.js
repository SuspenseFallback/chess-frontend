var spinnerpuzzle = document.querySelector(".spinnerpuzzle");
var spinnervideos = document.querySelector(".spinnervideos");
var spinnerarticles = document.querySelector(".spinnerarticles");
var spinnerdrills = document.querySelector(".spinnerdrills");
var spinnerlessons = document.querySelector(".spinnerlessons");
var spinnerbullet = document.querySelector(".spinnerbullet");
var spinnerblitz = document.querySelector(".spinnerblitz");
var spinnerrapid = document.querySelector(".spinnerrapid");
var spinnerclassical = document.querySelector(".spinnerclassical");
var puzzle = document.querySelector(".puzzle");
var videos = document.querySelector(".videos");
var articles = document.querySelector(".articles");
var drills = document.querySelector(".drills");
var lessons = document.querySelector(".lessons");
var bullet = document.querySelector(".bullet");
var blitz = document.querySelector(".blitz");
var rapid = document.querySelector(".rapid");
var classical = document.querySelector(".classical");
var puzzlecontent = document.querySelector(".puzzle>.content");
var videoscontent = document.querySelector(".videos>.content");
var articlescontent = document.querySelector(".articles>.content");
var drillscontent = document.querySelector(".drills>.content");
var lessonscontent = document.querySelector(".lessons>.content");
var bulletcontent = document.querySelector(".bullet>.content");
var blitzcontent = document.querySelector(".blitz>.content");
var rapidcontent = document.querySelector(".rapid>.content");
var classicalcontent = document.querySelector(".classical>.content");

puzzle.addEventListener("click", () => {
  console.log("click");
  spinnerpuzzle.classList.toggle("invisible");
  puzzlecontent.classList.toggle("invisible");
});
videos.addEventListener("click", () => {
  spinnervideos.classList.toggle("invisible");
  videoscontent.classList.toggle("invisible");
});
articles.addEventListener("click", () => {
  spinnerarticles.classList.toggle("invisible");
  articlescontent.classList.toggle("invisible");
});
drills.addEventListener("click", () => {
  spinnerdrills.classList.toggle("invisible");
  drillscontent.classList.toggle("invisible");
});
lessons.addEventListener("click", () => {
  spinnerlessons.classList.toggle("invisible");
  lessonscontent.classList.toggle("invisible");
});
bullet.addEventListener("click", () => {
  spinnerbullet.classList.toggle("invisible");
  bulletcontent.classList.toggle("invisible");
});
blitz.addEventListener("click", () => {
  spinnerblitz.classList.toggle("invisible");
  blitzcontent.classList.toggle("invisible");
});
rapid.addEventListener("click", () => {
  spinnerrapid.classList.toggle("invisible");
  rapidcontent.classList.toggle("invisible");
});
classical.addEventListener("click", () => {
  spinnerclassical.classList.toggle("invisible");
  classicalcontent.classList.toggle("invisible");
});
