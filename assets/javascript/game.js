var answer = ["VERTIGO", "TITANIC", "CHINATOWN", "MOONLIGHT", "RATATOUILLE"]

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
    document.getElementById("startGame").classList.remove("d-none");
    document.getElementById("hintBox").innerHTML = "Hint:";
    document.getElementById("hintBox2").innerHTML = "";


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
        if (randomAnswer === "VERTIGO") {
            document.getElementById("hintBox").innerHTML = "Hint: This movie was released in 1958.";
        }
        if (randomAnswer === "TITANIC") {
            document.getElementById("hintBox").innerHTML = "Hint: This movie was released in 1997.";
        }
        if (randomAnswer === "CHINATOWN") {
            document.getElementById("hintBox").innerHTML = "Hint: This movie was released in 1974.";
        }
        if (randomAnswer === "MOONLIGHT") {
            document.getElementById("hintBox").innerHTML = "Hint: This movie was released in 2016.";
        }
        if (randomAnswer === "RATATOUILLE") {
            document.getElementById("hintBox").innerHTML = "Hint: This movie was released in 2007.";
        }
    }

    if (guessesRemaining === 2) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-4.png";
    }

    if (guessesRemaining === 1) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-5.png";
        if (randomAnswer === "VERTIGO") {
            document.getElementById("hintBox2").innerHTML = "Last hint: It was directed by Alfred Hitchcock.";
        }
        if (randomAnswer === "TITANIC") {
            document.getElementById("hintBox2").innerHTML = "Last hint: It made a lot of money.";
        }
        if (randomAnswer === "CHINATOWN") {
            document.getElementById("hintBox2").innerHTML = "Last hint: It starred Jack Nicholson.";
        }
        if (randomAnswer === "MOONLIGHT") {
            document.getElementById("hintBox2").innerHTML = "Last hint: It won a Best Picture Academy Award.";
        }
        if (randomAnswer === "RATATOUILLE") {
            document.getElementById("hintBox2").innerHTML = "Last hint: It involved food.";
        }
    }

    if (guessesRemaining === 0) {
        document.getElementById("hangmanPic").src = "assets/images/Hangman/Hangman-6.png";

        var lossSound = new Audio("assets/Sounds/Sad_Trombone.wav");

        lossSound.play();
        losses++;
        document.getElementById("lossesBox").innerHTML = losses;
        reset();
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
            var winSound = new Audio("assets/sounds/1_person_cheering.wav");
            winSound.play();
            wins++;
            document.getElementById("winsBox").innerHTML = wins;
            reset();
        }
    }
}

function startGame(event) {

    document.getElementById("startGame").classList.add("d-none");
    document.getElementById("interface").setAttribute("class", "m-auto");
    
    wholeGame();
}