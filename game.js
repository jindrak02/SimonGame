//Definování funkcí a proměných
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var clickCounter = 0;
var gameInitialized = false;
$(".btn").attr("disabled", true);

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

function nextColor(){
    randomColor = buttonColors[nextSequence()];
    
    playButtonSound(randomColor);

    $(".btn#" + randomColor).fadeOut();
    
    setTimeout(() => {
        $(".btn#" + randomColor).fadeIn(); 
    }, 200);

    gamePattern.push(randomColor);

    level+=1;
    $("h1").text("Level " + level);

    userClickedPattern = [];
}

function playButtonSound(color){
    switch (color) {
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;
        
        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;

        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;

        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;

        default: console.log(button[button.length - 1]);
            break;
    }
}

function clickedAnimation(clickedButton){
    
    $(".btn#" + clickedButton).addClass("pressed");

    setTimeout(
        function() {
            $(".btn#" + clickedButton).removeClass("pressed");
        }, 150);
}

function checkAnswer(answer){
    
}

function gameOver(){
    $("h1").text("Game over! Refresh the page");
    $(".btn").attr("disabled", true);
    
    var gameOverSound = new Audio("./sounds/wrong.mp3")
    gameOverSound.play();

    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 400);
}




//Hra

//Inicializace hry
$(document).keydown(function() {

    if (!gameInitialized) {

        gameInitialized = true;
        nextColor();
        $(".btn").attr("disabled", false);

    } else {
        alert("Hra je již spuštěna");
    }

});

$(".startingButton").on("click tap", function(event) {
    event.preventDefault(); // Zabrání výchozímu chování události

    if (!gameInitialized) {

        gameInitialized = true;
        nextColor();
        $(".btn").attr("disabled", false);

    } else {
        alert("Hra je již spuštěna");
    }
});

//Logika hry
$(".btn").on("click tap", function() {

    var clickedButton = this.id;

    clickedAnimation(clickedButton);
    playButtonSound(clickedButton);

    userClickedPattern.push(clickedButton);
    clickCounter+=1;
    
    console.log(userClickedPattern);
    console.log(gamePattern);
    console.log(clickCounter);

    if (userClickedPattern[clickCounter - 1] != gamePattern[clickCounter - 1]) {

        gameOver();

    } else {
        if (clickCounter === gamePattern.length) {

            setTimeout(() => {
                nextColor();
            }, 1000);

            clickCounter = 0;
        }
    }

});