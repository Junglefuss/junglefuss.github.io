// First we make the board. ////////////////////////////////////////////////

let grid = document.createElement("grid");
for (let i = 0; i < 2; i++) {
  let tr = document.createElement("tr");
  tr.id = `row${i + 1}`;
  for (let j = 0; j < 2; j++) {
    let td = document.createElement("td");
    td.id = i + 1 + j * 2;
    td.className = `box`;
    tr.appendChild(td);
  }
  grid.appendChild(tr);
}
document.body.appendChild(grid);

// Messing around with some circles, seeing if I can make a segment for the board.

// window.onload = function() {
//   window.drawCircle = function(x, y) {
//     var can = document.getElementById("thecanvas"),
//       ctx = can.getContext("2d"),
//       segments = 10,
//       currentSegment = 0,
//       toRadians = function(deg) {
//         return (Math.PI / 180) * deg;
//       },
//         getTick = function(num) {
//           var tick = toRadians(360) / segments;
//           return tick * num;
//         },
//       segment = function(start, end) {
//         start = start || getTick(currentSegment);
//         end = end || getTick(currentSegment + 1);
//         ctx.beginPath();
//         ctx.arc(x, y, 60, 1 * Math.PI, 1.5 * Math.PI);
//         ctx.stroke();
//         ctx.closePath();
//       };
//     can.width = window.innerWidth;
//     can.height = window.innerHeight;
//     ctx.lineWidth = 50;
//     ctx.strokeStyle = "rgba(0,0,0,0.5)";
//     setTimeout(function render() {
//       segment(getTick(currentSegment), getTick(currentSegment + 1));
//       currentSegment += 1;
//       if (currentSegment < segments) {
//         setTimeout(render, 250);
//       } else {
//         currentTick = 0;
//       }
//     }, 250);
//   };
//   drawCircle(150, 150);
// };

// Creating the pattern the lights will follow:
let buttonPattern = [];

function randomPattern() {
  let buttons = [1, 2, 3, 4];
  for (let i = 0; i < 100; i++) {
    buttonPattern.push(buttons[Math.floor(Math.random() * buttons.length)]);
  }
}
randomPattern();
console.log(buttonPattern);

let greenButton = document.getElementById("1");
let yellowButton = document.getElementById("2");
let redButton = document.getElementById("3");
let blueButton = document.getElementById("4");

let testBox = document.querySelector(".box");

console.log(greenButton.style);

function changeColor() {
  testBox.style.opacity = 1;
}
setTimeout(changeColor(), 3000);
console.log(greenButton.style);

function playPattern([]) {}
