// Creating the array for the game and the user:
const buttonPattern = [];
const userPattern = [];
const level = 1;

// Adding sounds
const oneSound = new Audio("./sound/green.mp3");
const twoSound = new Audio("./sound/yellow.mp3");
const threeSound = new Audio("./sound/red.mp3");
const fourSound = new Audio("./sound/blue.mp3");

// Randomizing the pattern so game is different every time
function randomizePattern() {
  let buttons = ["one", "two", "three", "four"];
  for (let i = 0; i < 20; i++) {
    buttonPattern.push(buttons[Math.floor(Math.random() * buttons.length)]);
  }
}
randomizePattern();
console.log(buttonPattern);

// Starting game action

function startGame() {
  flashAndSound();
}

// Listening for user input, adding to user array

let buttons = document.querySelectorAll(".button");
let buttonsDiv = document.querySelector(".container");

function userInput() {
  buttonsDiv.addEventListener("click", function(evt) {
    // Check continue
    userPattern.push(evt.target.id);
    let buttonPatternSoFar = buttonPattern.slice(0, userPattern.length);

    // else {
    //   XXXXXXXXXXXXXXXXXXXXXXXX;
    // }

    // evt.target.style.backgroundColor = 1;

    if (evt.target.id === "one") {
      oneSound.play();
      evt.target.style.backgroundColor = "rgba(0, 128, 0, 1)";
      setTimeout(function() {
        evt.target.style.backgroundColor = "rgba(0, 128, 0, 0.3)";
      }, 300);
      console.log(evt.target.style.backgroundColor);
    } else if (evt.target.id === "two") {
      twoSound.play();
      evt.target.style.backgroundColor = "rgba(255, 255, 0, 1)";
      setTimeout(function() {
        evt.target.style.backgroundColor = "rgba(255, 255, 0, 0.3)";
      }, 300);
    } else if (evt.target.id === "three") {
      threeSound.play();
      evt.target.style.backgroundColor = "rgba(255, 0, 0, 1)";
      setTimeout(function() {
        evt.target.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      }, 300);
    } else if (evt.target.id === "four") {
      fourSound.play();
      evt.target.style.backgroundColor = "rgba(0, 0, 255, 1)";
      setTimeout(function() {
        evt.target.style.backgroundColor = "rgba(0, 0, 255, 0.3)";
      }, 300);
    }

    if (JSON.stringify(userPattern) !== JSON.stringify(buttonPatternSoFar)) {
      alert("loser!");
      // gameOver();
    }
  });
}
userInput();

// Making buttons flash and play sound
function flashColor() {}

// Setting the flash to a pattern
function playPattern([]) {
  for (let i = 0; i < buttonPattern.length; i++) {
    let currentPattern = [];
    let userTurns = userPattern.length;
    currentPattern.push(buttonPattern[userTurns + 1]);
  }
}

let greenButton = document.getElementById("one");
let yellowButton = document.getElementById("two");
let redButton = document.getElementById("three");
let blueButton = document.getElementById("four");

let testBox = document.querySelector(".box");

// gameOver() {
//   ;
// }
