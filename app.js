// Game values
let min = 1, max = 10, winningNumber = getRandomNumber(min, max), guessesLeft = 3;

// UI elements
const game = document.getElementById('game');
const minNumber = document.querySelector('.min-num');
const maxNumber = document.querySelector('.max-num');
const guessInput = document.querySelector('#guess-input');
const guessBtn = document.querySelector('#guess-btn');
const message = document.querySelector('.message');

// Assign UI min and max
minNumber.textContent = min;
maxNumber.textContent = max;

// play gain event listener
game.addEventListener('mousedown', function (e) {
    // if clicked on play again
    if (e.target.className === 'play-again') {
        // reload the page
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
    const guess = parseInt(guessInput.value);
    // validate 
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // check if won
    if (guess === winningNumber) {
        // game over - won 
        gameOver(true, `${winningNumber} is correct, you WIN :)`);
    } else {
        // wrong number
        guessesLeft = guessesLeft - 1;

        if (guessesLeft === 0) {
            // game over - lose
            gameOver(false, `Game over, you lost! The correct number was ${winningNumber}`);
        } else {
            // game continues - answer wrong
            // make border red
            guessInput.style.borderColor = 'red';
            // also clear input
            guessInput.value = '';
            // tell user it is wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // disabled input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = color;
    // change color message
    message.style.color = color;
    // set message
    setMessage(msg);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// get winning number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}