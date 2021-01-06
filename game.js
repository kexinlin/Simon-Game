// some initializations for audio playing

function ColorAudio(color){
  this.color = color;
  this.audio = new Audio("sounds/" + color + ".mp3");
}

ColorAudio.prototype.play = function(){
  this.audio.play();
}

let blue = new ColorAudio("blue");
let green = new ColorAudio("green");
let red = new ColorAudio("red");
let yellow = new ColorAudio("yellow");
let wrong = new ColorAudio("wrong");

function playSoundByColor(color){
  switch(color) {
    case "blue":
      blue.play();
      break;
    case "green":
      green.play();
      break;
    case "red":
      red.play();
      break;
    case "yellow":
      yellow.play();
      break;
    case "wrong":
      wrong.play();
      break;
  }
}

// add a function for button animation

function animatePress(currentColour) {
  let buttonPressed = $("#"+currentColour);
  buttonPressed.addClass("pressed");
  setTimeout(function(){buttonPressed.removeClass("pressed");}, 100);
}


// add a function for generating next random sequence

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level "+level.toString());
  $("#level-title-sm").text("Level "+level.toString());
  let randomNumber = Math.floor(4 * Math.random());
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  let chosenButton = $("#"+randomChosenColour);
  chosenButton.fadeOut(150).fadeIn(150);
  playSoundByColor(randomChosenColour);
}

// add event listener for button clicking by user

$(".btn").on("touchstart click", function(){
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSoundByColor(userChosenColour);
  animatePress(userChosenColour);
  checkAnwer(userClickedPattern.length);
});


// add a function for checking user's answer

function checkAnwer(currentLevel){
  if (userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]) {
    if (currentLevel == level) {
      setTimeout(nextSequence, 1000);
    }
  } else if (userClickedPattern.length > gamePattern.length) {
    ;
  } else {
    gameOver();
  }
}


// start a game after a key is pressed
let firstStart = true;
let level = 0;
$(document).keydown(startNewGame);
$("#level-title-sm").on("touchstart click", NewGame);

function startNewGame(){
  if (firstStart) {
    console.log("New game!")
    nextSequence();
    firstStart = false;
  }
}

// add a function for handling wrong answer
function gameOver(){
  console.log("Game over!")
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");}, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("#level-title-sm").text("Game Over, Tap Here to Restart");
  startOver();
}

// add a function for starting over the game
function startOver() {
  level = 0;
  firstStart = true;
  gamePattern = [];
  userClickedPattern = [];
}
