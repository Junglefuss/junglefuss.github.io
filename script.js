// Creating the array for the game and the user:
const buttonPattern = [];
let userPattern = [];
let level = 1;

// Adding sounds
const greenSound = new Audio("./sound/green.mp3");
const yellowSound = new Audio("./sound/yellow.mp3");
const redSound = new Audio("./sound/red.mp3");
const blueSound = new Audio("./sound/blue.mp3");

// Randomizing the buttonPattern() function so game is different every time
function randomizePattern() {
  let buttons = ["green", "yellow", "red", "blue"];
  for (let i = 0; i < 50; i++) {
    buttonPattern.push(buttons[Math.floor(Math.random() * buttons.length)]);
  }
}
randomizePattern();
console.log(buttonPattern);

// Setting some variables for global use
const buttons = document.querySelectorAll(".button");
const buttonsContainer = document.querySelector(".container");

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

// set to Start button
function computerTurn(n) {
  level++;
  console.log(n);
  if (n <= 0) {
    userPattern = [];
    return;
  } else {
    // for (let i = 0; i <= userPattern.length; i++) {
    // let compPatternSoFar = buttonPattern.slice(0, userPattern.length + 1);
    let x = 0;
    let buttonIdStr = buttonPattern[x];
    console.log(buttonIdStr);

    if (buttonIdStr === "green") {
      flashGreen();
    } else if (buttonIdStr === "yellow") {
      flashYellow();
    } else if (buttonIdStr === "red") {
      flashRed();
    } else if (buttonIdStr === "blue") {
      flashBlue();
    } else return;

    setTimeout(function() {
      x++;
      computerTurn(n - 1);
      console.log(x);
    }, 300);
  }
}
// }

// Listening for user input, adding to user array
buttonsContainer.addEventListener("click", function(evt) {
  // Play sounds and "flash" button
  if (evt.target.id === "green") {
    flashGreen();
  } else if (evt.target.id === "yellow") {
    flashYellow();
  } else if (evt.target.id === "red") {
    flashRed();
  } else if (evt.target.id === "blue") {
    flashBlue();
  }
  userPattern.push(evt.target.id);
  console.log(userPattern);

  // Check continue
  let compPatternSoFar = buttonPattern.slice(0, userPattern.length);
  console.log(compPatternSoFar);
  if (userPattern.length === compPatternSoFar.length) {
    if (JSON.stringify(userPattern) !== JSON.stringify(compPatternSoFar)) {
      alert("wrong!");
      // gameOver();
    } else {
      setTimeout(function() {
        computerTurn(userPattern.length + 1);
      }, 1000);
    }
    console.log(userPattern.length);
  }
});

// gameOver() {
//   ;
// }

// winGame() {

// }
