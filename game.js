var buttonColours = [];

var allColours = ["green","yellow","red","blue"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Here edit game start 

window.addEventListener('load', () => {
  
var cw = $('#green').width();
for(var i=0;i<4;i++){
$('#'+allColours[i]).css({'height':cw+'px'});
}
});

$(".startGame").click(function() {
  //Here edit string
  buttonColours=localStorage.getItem("colour");
  buttonColours=JSON.parse(buttonColours);
  $(".startGame").hide();
  $(".gamesButton").hide();
  for (var i=0 ; i<buttonColours.length;i++){
    $("#"+buttonColours[i]).show();
  }

  if (!started) {  
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  });

// alert(buttonColours);

$(".gamesButton").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);  
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
       playSound("motivate");
        setTimeout(function () {
          nextSequence();
        }, 4000);
        
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("حظا اوفر , عد الى الاعدادات وابدا من جديد");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  //Here edit a randoum number 
  var randomNumber = Math.floor(Math.random() * buttonColours.length );

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  document.getElementById((randomChosenColour)).style.animation="moving 2s 1 linear";
   playSound2(randomChosenColour);
  setTimeout(function () {
    document.getElementById((randomChosenColour)).style.animation="";
  },1005);
 
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function playSound2(name) {
  var audio = new Audio("sounds/" + name + "2.mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


 $(".gamesGo").click(function() {
  buttonColours=[];
  localStorage.removeItem("colour");
}); 
  

/* Settings JS */

$(".Settings-button").click(function() {
  var settingsChosenColour = $(this).attr("id");
  buttonColours.push(settingsChosenColour);
  
  $(this).hide();
  
  playSound(settingsChosenColour);
  animatePress(settingsChosenColour);


});

$(".goSettings").click(function() {
localStorage.setItem("colour", JSON.stringify(buttonColours));
});

