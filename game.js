gamePattern = [];
userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
var level = 0 ;
var started = false;

$(document).on("keydown",function() {
    if(started === false){
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(4 * Math.random());

    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer( currentLevel ){
    if( gamePattern[ currentLevel ] === userClickedPattern[ currentLevel ]  ){
        if( gamePattern.length === userClickedPattern.length ){
            setTimeout(function() {
                console.log("Success");
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
        console.log("Failure");
    }
}

function startOver(){
    level = 0 ;
    started = false;
    gamePattern = [];
}


