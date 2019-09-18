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

// Randomizing the buttonPattern() function so game is different every time
function randomizePattern() {
  let buttons = ["green", "yellow", "red", "blue"];
  for (let i = 0; i < 50; i++) {
    buttonPattern.push(buttons[Math.floor(Math.random() * buttons.length)]);
  }
}
randomizePattern();
// console.log(buttonPattern);
let buttonPatternCopyC = [...buttonPattern];
let buttonPatternCopyU = [...buttonPattern];
// console.log(buttonPatternCopy);

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
// function computerTurn(n) {
//   console.log(`n = ${n}`);
//   if (n <= 0) {
//     return;
//   } else {
//     for (let i = 0; i <= n; i++) {
//       (function(x) {
//         setTimeout(function() {
//           console.log(x);
//           // let buttonIdStr = buttonPattern[i];

//           // if (buttonIdStr === "green") {
//           //   flashGreen();
//           // } else if (buttonIdStr === "yellow") {
//           //   flashYellow();
//           // } else if (buttonIdStr === "red") {
//           //   flashRed();
//           // } else if (buttonIdStr === "blue") {
//           //   flashBlue();
//           // }
//         }, 5000);
//       })(i);
//     }
//   }
// }

function computerTurn(n) {
  console.log(`Level: ${n}`);
  if (n <= 0) {
    for (let i = 0; arrayHolder.length > 0; i++) {
      let last = arrayHolder.pop();
      buttonPatternCopyC.unshift(last);
    }
    console.log(buttonPatternCopyC);
    console.log(arrayHolder);
    return;
  } else {
    console.log(buttonPattern);
    console.log(buttonPatternCopyC);

    let buttonIdStr = buttonPatternCopyC[0];
    console.log(buttonIdStr);
    buttonPatternCopyC.shift();

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
    console.log(arrayHolder);

    setTimeout(function() {
      computerTurn(n - 1);
    }, 500);
  }
}

// Listening for user input, adding to user array
buttonsContainer.addEventListener("click", function(evt) {
  // Play sounds and "flash" button
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
  userPattern.push(buttonIdStr);
  // console.log(userPattern);
  checkContinue(userPattern);
});

// Check continue
function checkContinue(array) {
  if (array.length === level) {
    let compPatternPlayed = [];
    for (let i = 0; i < array.length; i++) {
      compPatternPlayed.push(buttonPatternCopyU.shift());
    }
    if (JSON.stringify(array) !== JSON.stringify(compPatternPlayed)) {
      alert("wrong!");
      // gameOver();
    } else {
      level++;
      setTimeout(function() {
        computerTurn(level);
      }, 1000);
      console.log(userPattern);
      userPattern = [];
      for (let i = 0; compPatternPlayed.length > 0; i++) {
        let last = compPatternPlayed.pop();
        buttonPatternCopyC.unshift(last);
        console.log(compPatternPlayed);
      }
    }
  }
}

// gameOver() {
//   ;
// }

// winGame() {

// }
