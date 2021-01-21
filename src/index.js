const minValue = 0;
const maxValue = 100;
const maxGuesses = 15;

const minValueText = document.querySelector(".minValue");
minValueText.innerHTML = " " + minValue + " ";
const maxValueText = document.querySelector(".maxValue");
maxValueText.innerHTML = " " + maxValue;
const maxGuessesText = document.querySelector(".maxGuesses");
maxGuessesText.innerHTML = " " + maxGuesses + " ";
const btnRobotPlay = document.querySelector(".robot-play");

// ******* counter and total guesses *******
const totalGuessesText = document.querySelector(".totalGuesses");
const counterText = document.querySelector(".counter");
let counterStart = "";
let counterEnd = "";

let randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

guessField.focus();

const checkGuess = () => {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
    counterStart = Date.now();
  }
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    counterEnd = Date.now();
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    lastResult.style.padding = "10px";
    lastResult.style.textAlign = "center";
    let counter = Math.floor((counterEnd - counterStart) / 1000);
    counterText.innerHTML = "counter: " + counter + " seconds";
    totalGuessesText.innerHTML = "total guesses: " + guessCount;
    setGameOver();
  } else if (guessCount === maxGuesses) {
    lastResult.textContent = "!!!GAME OVER!!!";
    setGameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    lastResult.style.padding = "10px";
    lastResult.style.textAlign = "center";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
};

guessSubmit.addEventListener("click", checkGuess);

const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  resetButton.classList.add("play-again");
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
};

const resetGame = () => {
  guessCount = 1;
  robotQuess = maxValue - Math.floor((maxValue - minValue) / 2);
  newMax = 0;
  newMin = 0;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
};

//robot algorithm
let robotQuess = maxValue - Math.floor((maxValue - minValue) / 2);
let newMax = maxValue;
let newMin = minValue;
console.log(robotQuess);

const robotPlay = () => {
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }

  while (guessCount <= maxGuesses) {
    guesses.textContent += robotQuess + " ";
    if (robotQuess === randomNumber) {
      setGameOver();
      break;
    } else if (guessCount === maxGuesses) {
      setGameOver();
      break;
    } else {
      if (robotQuess > randomNumber) {
        if (newMax == 0 && newMin == 0) {
          newMax = robotQuess;
          robotQuess -= Math.floor((maxValue - robotQuess) / 2);
          console.log("random: " + randomNumber);
          console.log(robotQuess);
        } else if (newMin !== 0) {
          newMax = robotQuess;
          robotQuess -= Math.floor((robotQuess - newMin) / 2);
          console.log("random: " + randomNumber);
          console.log(robotQuess);
        } else {
          newMax = robotQuess;
          robotQuess -= Math.ceil((robotQuess - minValue) / 2);
          console.log("random: " + randomNumber);
          console.log(robotQuess);
        }
      } else if (robotQuess < randomNumber) {
        if (newMin == 0 && newMax == 0) {
          newMin = robotQuess;
          robotQuess += Math.floor((maxValue - robotQuess) / 2);
          console.log("random: " + randomNumber);
          console.log(robotQuess);
        } else if (newMax == 0) {
          newMin = robotQuess;
          robotQuess += Math.floor((maxValue - newMin) / 2);
          console.log("random: " + randomNumber);
          console.log(robotQuess);
        } else {
          newMin = robotQuess;
          robotQuess += Math.floor((newMax - robotQuess) / 2);
          console.log("random: " + randomNumber);
          console.log(robotQuess);
        }
      }
      guessCount++;
    }
  }
  totalGuessesText.innerHTML = "total guesses: " + guessCount;
};

//let robot play
btnRobotPlay.addEventListener("click", () => {
  robotPlay();
});


//robot algorithm
let robotAlgorithm = () => {
  guessCount = 0;
  let robotArray = [];
  let robotQuess = maxValue - Math.floor((maxValue - minValue) / 2);
  let newMax = maxValue;
  let newMin = minValue;
  console.log(robotQuess);
  let wins = 0;
  let losses = 0;
  let totalQuessMin = 0;
  let totalQuessMax = 0;
  let totalQuessAverage = 0;

  for (let i = 0; i < 100; i++) {
    randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    if (guessCount === 1) {
      console.log("Previous guesses: ");
    }

    while (guessCount <= maxGuesses) {
      robotArray.push(robotQuess);

      if (robotQuess === randomNumber) {
        console.log("You won!");
        wins++;
        break;
      } else if (guessCount === maxGuesses) {
        console.log("Game Over!");
        losses++;
        break;
      } else {
        if (robotQuess > randomNumber) {
          if (newMax == 0 && newMin == 0) {
            newMax = robotQuess;
            robotQuess -= Math.floor((maxValue - robotQuess) / 2);
          } else if (newMin !== 0) {
            newMax = robotQuess;
            robotQuess -= Math.floor((robotQuess - newMin) / 2);
          } else {
            newMax = robotQuess;
            robotQuess -= Math.ceil((robotQuess - minValue) / 2);
          }
        } else if (robotQuess < randomNumber) {
          if (newMin == 0 && newMax == 0) {
            newMin = robotQuess;
            robotQuess += Math.floor((maxValue - robotQuess) / 2);
          } else if (newMax == 0) {
            newMin = robotQuess;
            robotQuess += Math.floor((maxValue - newMin) / 2);
          } else {
            newMin = robotQuess;
            robotQuess += Math.floor((newMax - robotQuess) / 2);
          }
        }
        guessCount++;
      }
    }
    for (quess of robotArray) {
      console.log(quess);
    }
    if (totalQuessMin == 0 && totalQuessMax == 0) {
      totalQuessMin = guessCount;
      totalQuessMax = guessCount;
    } else if (totalQuessMax < guessCount) {
      totalQuessMax = guessCount;
    } else if (totalQuessMin > guessCount) {
      totalQuessMin = guessCount;
    }
    console.log(randomNumber);
    console.log('min total guess count: ' + totalQuessMin);
    console.log('max total guess count: ' + totalQuessMax);
  }
  console.log('Total wins:' + wins);
  console.log('Total losses:' + losses);
};

console.log(robotAlgorithm());

