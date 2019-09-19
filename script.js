// Creating the array for the game and the user:
const buttonPattern = [];
let userPattern = [];
let arrayHolder = [];
let level = 1;

// Adding sounds
const greenSound = new Audio("./sound/green.mp3");
const yellowSound = new Audio("./sound/yellow.mp3");
const redSound = new Audio("./sound/red.mp3");
const blueSound = new Audio("./sound/blue.mp3");
const buzz = new Audio("./sound/buzz.mp3");

// Randomizing the buttonPattern() function so game is different every time
function randomizePattern() {
  let buttons = ["green", "yellow", "red", "blue"];
  for (let i = 0; i < 100; i++) {
    buttonPattern.push(buttons[Math.floor(Math.random() * buttons.length)]);
  }
}
randomizePattern();
console.log(buttonPattern);
let buttonPatternCopyC = [...buttonPattern];
let buttonPatternCopyU = [...buttonPattern];

// Setting some variables for global use
// const buttons = document.querySelectorAll(".button");
// const buttonsContainer = document.querySelector(".container");

const greenButton = document.querySelector("#green");
const yellowButton = document.querySelector("#yellow");
const redButton = document.querySelector("#red");
const blueButton = document.querySelector("#blue");

// Making the buttons flash and play noise
function flashGreen() {
  greenButton.style.backgroundColor = "rgba(0, 128, 0, 1)";
  greenSound.play();
  setTimeout(function() {
    greenButton.style.backgroundColor = "rgba(0, 128, 0, 0.3)";
  }, 300);
}
function flashYellow() {
  yellowButton.style.backgroundColor = "rgba(255, 255, 0, 1)";
  yellowSound.play();
  setTimeout(function() {
    yellowButton.style.backgroundColor = "rgba(255, 255, 0, 0.3)";
  }, 300);
}
function flashRed() {
  redButton.style.backgroundColor = "rgba(255, 0, 0, 1)";
  redSound.play();
  setTimeout(function() {
    redButton.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
  }, 300);
}
function flashBlue() {
  blueButton.style.backgroundColor = "rgba(0, 0, 255, 1)";
  blueSound.play();
  setTimeout(function() {
    blueButton.style.backgroundColor = "rgba(0, 0, 255, 0.3)";
  }, 300);
}

// Starting game action
// set to Start button in html
function computerTurn(n) {
  console.log(`Level: ${n}`);
  // Setting countdown to stop at 0.
  if (n <= 0) {
    level = arrayHolder.length;
    for (let i = 0; arrayHolder.length > 0; i++) {
      buttonPatternCopyC.unshift(arrayHolder.pop());
    }
    return;
    // Otherwise, play the first button in the list.
  } else {
    let buttonIdStr = buttonPatternCopyC.shift();
    if (buttonIdStr === "green") {
      flashGreen();
    } else if (buttonIdStr === "yellow") {
      flashYellow();
    } else if (buttonIdStr === "red") {
      flashRed();
    } else if (buttonIdStr === "blue") {
      flashBlue();
    }
    arrayHolder.push(buttonIdStr);
    // Then go on to the next...(recursively)
    setTimeout(function() {
      computerTurn(n - 1);
    }, 500);
  }
}

// Listening for user click...
const buttonsContainer = document.querySelector(".container");
buttonsContainer.addEventListener("click", function(evt) {
  // Then play sounds and "flash" button each time
  let buttonIdStr = evt.target.id;

  if (buttonIdStr === "green") {
    flashGreen();
  } else if (buttonIdStr === "yellow") {
    flashYellow();
  } else if (buttonIdStr === "red") {
    flashRed();
  } else if (buttonIdStr === "blue") {
    flashBlue();
  }
  // Push the clicked button id to an array
  userPattern.push(buttonIdStr);
  // ... then check if it's correct.
  checkContinue(userPattern);
});

// Check continue
function checkContinue(userArray) {
  let tempArray = [...userArray];
  let compPatternPlayed = [];
  // Push the computer order (so far) into an array...
  for (let i = 0; i < tempArray.length; i++) {
    compPatternPlayed.push(buttonPatternCopyU.shift());
  }
  // ... check if user's input is right.
  if (JSON.stringify(tempArray) !== JSON.stringify(compPatternPlayed)) {
    gameOver();
    return;
    // If it is, check if they've clicked enough buttons to level up.
  } else if (tempArray.length === level) {
    level++;
    updateLevel(level);
    userPattern = [];
    setTimeout(function() {
      computerTurn(level);
    }, 1000);
    // If not, clear the arrays and wait for more input.
  } else {
    compPatternPlayed = [];
  }
  for (let i = 0; tempArray.length > 0; i++) {
    buttonPatternCopyU.unshift(tempArray.pop());
  }
}

function updateLevel(level) {
  let levelDisplay = document.querySelector(".score");
  console.log(levelDisplay.innerHTML);
  prependedScore = String(level).padStart(3, "0");
  console.log(prependedScore);
  levelDisplay.innerHTML = `LEVEL: ${prependedScore}`;
}

function gameOver() {
  buzz.play();
  alert("Whoops! Wrong button. Click 'start' to play again.");
  location.reload(true);
  randomizePattern();
}
