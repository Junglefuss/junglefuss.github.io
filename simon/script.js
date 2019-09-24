// HC: I can see that you refactored the code based on the feedback given during the presentation! Great work!

// Creating the array for the game and the user:
const buttonPattern = [];
let userPattern = [];
let arrayHolder = [];
let level = 1;

// Adding sounds
const greenSound = new Audio('./sound/green.mp3');
const yellowSound = new Audio('./sound/yellow.mp3');
const redSound = new Audio('./sound/red.mp3');
const blueSound = new Audio('./sound/blue.mp3');
const buzz = new Audio('./sound/buzz.mp3');

// Randomizing the buttonPattern() function so game is different every time
function randomizePattern() {
  let buttons = ['green', 'yellow', 'red', 'blue'];
  for (let i = 0; i < 100; i++) {
    buttonPattern.push(buttons[Math.floor(Math.random() * buttons.length)]);
  }
}
randomizePattern();
let buttonPatternCopyC = [...buttonPattern];
let buttonPatternCopyU = [...buttonPattern];

// Setting some variables for global use

const greenButton = document.querySelector('#green');
const yellowButton = document.querySelector('#yellow');
const redButton = document.querySelector('#red');
const blueButton = document.querySelector('#blue');

// HC: Here’s how we could refactor into a single function
function flashButtonHelper(colorLight, button, sound) {
  button.style.backgroundColor = 'rgba(0, 128, 0, 1)';
  sound.play();
  setTimeout(function() {
    button.style.backgroundColor = colorLight;
  }, 300);
}
// Making the buttons flash and play noise
function flashButton(color) {
  if (color === 'green') {
    flashButtonHelper('rgba(0, 128, 0, 0.3)', greenButton, greenSound);
  } else if (color === 'yellow') {
    flashButtonHelper('rgba(255, 255, 0, 0.3)', yellowButton, yellowSound);
  } else if (color === 'red') {
    flashButtonHelper('rgba(255, 0, 0, 0.3)', redButton, redSound);
  } else if (color === 'blue') {
    flashButtonHelper('rgba(0, 0, 255, 0.3)', blueButton, blueSound);
  }
}

// Starting game action
// set to Start button in html
function computerTurn(n) {
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
    flashButton(buttonIdStr);
    arrayHolder.push(buttonIdStr);
    // Then go on to the next...(recursively)
    // HC: nice work implementing this recursive function!
    setTimeout(function() {
      computerTurn(n - 1);
    }, 500);
  }
}

// Listening for user click...
const buttonsContainer = document.querySelector('.container');
buttonsContainer.addEventListener('click', function(evt) {
  // Then play sounds and "flash" button each time
  let buttonIdStr = evt.target.id;
  flashButton(buttonIdStr);
  // Push the clicked button id to an array
  userPattern.push(buttonIdStr);
  // ... then check if it's correct.
  checkContinue(userPattern);
});

// Check continue
function checkContinue(userArray) {
  // HC: - nice job using the spread operator to make a copy of the array!
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
  let levelDisplay = document.querySelector('.score');
  // HC: remove any console.log calls that you used during debugging and don’t need anymore
  console.log(levelDisplay.innerHTML);
  prependedScore = String(level).padStart(3, '0');
  console.log(prependedScore);
  levelDisplay.innerHTML = `LEVEL: ${prependedScore}`;
}

function gameOver() {
  buzz.play();
  alert("Whoops! Wrong button. \n\nClick 'START' to play again.");
  location.reload(true);
  randomizePattern();
}
