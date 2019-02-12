var answer = ["GET OUT", "TITANIC", "CITIZEN KANE", "MOONLIGHT"]

var randomAnswer = "";
var answerArray = [];
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

var wins = 0;
var losses = 0;
var guessesRemaining = 6;

function reset() {
    guessesRemaining = 6;
    wrongGuess = [];
    blanksAndCorrect = [];

    function resetButton() {
        
        var a = document.createElement("button");
        var b = document.createTextNode("Click to begin!");
        
        a.appendChild(b);
        document.getElementById("interface").appendChild(a);
    }

    document.getElementById("winsBox").innerHTML = wins;
    document.getElementById("lossesBox").innerHTML = losses;
    wholeGame();
    resetButton();
}

function checkLetters(letter) {

    var letterInWord = false;

    for (var j = 0; j < blanks; j++) {
        if (randomAnswer[j] === letter) {
            letterInWord = true;
        }
    }

    if (letterInWord) {
        for (var k = 0; k < blanks; k++) {
            if (randomAnswer[k] === letter) {
                blanksAndCorrect[k] = letter;
            }
        }
    }

    else {
        wrongGuess.push(letter);
        guessesRemaining--;
        console.log("wrongGuess: " + wrongGuess);
        document.getElementById("wrongGuessesBox").innerHTML = wrongGuess;
        document.getElementById("guessesLeftBox").innerHTML = guessesRemaining;
    }
    document.getElementById("interface").innerHTML = " " + blanksAndCorrect.join(" ");

    if (guessesRemaining === 5) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-1.png";
    }

    if (guessesRemaining === 4) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-2.png";
    }

    if (guessesRemaining === 3) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-3.png";
    }

    if (guessesRemaining === 2) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-4.png";
    }

    if (guessesRemaining === 1) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-5.png";
    }

    if (guessesRemaining === 0) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-6.png";
        alert("NOOOO! You lost.");
        losses++;
        reset();
    }
}

function endGame() {
    
    if (answerArray.toString() == blanksAndCorrect.toString()) {
        alert("winner!");
    
    }
}

function wholeGame() {

    randomAnswer = answer[Math.floor(Math.random() * answer.length)];
    console.log(answer);

    var answerArray = randomAnswer.split("");
    console.log(answerArray);

    blanks = answerArray.length;
    console.log(blanks);

    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");        
    };

    document.getElementById("interface").innerHTML = " " + blanksAndCorrect.join(" ");

    console.log("answerArray:" + answerArray);

    document.onkeyup = function (event) {
        
        var capGuesses = String.fromCharCode(event.keyCode).toUpperCase();

        checkLetters(capGuesses);

        console.log("answerArray: " + answerArray);
        console.log("blanksAndCorrect (to match): " + blanksAndCorrect)
        if (answerArray.toString() === blanksAndCorrect.toString()) {
            alert("winner!");
        
        }
     
    }

}

function startGame(event) {
    
    wholeGame();

}