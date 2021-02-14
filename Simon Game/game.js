buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];
var level = 0;
var cnt = 0;
/* 이벤트 */
$(document).keypress(nextSequence)
$(".btn").click(function(e){
    clickSequence(e);   
    if(gamePattern[cnt] === userPattern[cnt]){ 
        if(cnt === level){
            console.log("답을 맞춤!")
            userPattern = [];
            cnt = 0;
            level++;
            setTimeout(nextSequence, 1000);
        }
        else{
           cnt++ 
        }   
    }
    else {
        gameOver();
    } 
    //console.log(gamePattern.length);
});



function gameOver() {
    $("#level-title").text("Game Over, 아무키나 누르세요.");
    gamePattern = [];
    userPattern = [];
    cnt = 0;
    level = 0;
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 150);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function nextSequence(){
    $("#level-title").text("LEVEL "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoice = buttonColours[randomNumber];
    gamePattern.push(randomChoice);

    playSound(randomChoice);
    animatePress(randomChoice);

}

function clickSequence(e){
    var userChoice = e.target.id;
    userPattern.push(userChoice);

    playSound(userChoice);
    animatePress(userChoice);
}

function playSound(color){
    $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+color+".mp3")
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(()=>$("#"+color).removeClass("pressed"),100);
}







