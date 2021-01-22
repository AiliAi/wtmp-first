const minValue = 100;
const maxValue = 200;
const maxGuesses = 15;

const minValueText = document.querySelector(".minValue");
minValueText.innerHTML = " " + minValue + " ";
const maxValueText = document.querySelector(".maxValue");
maxValueText.innerHTML = " " + maxValue;
const maxGuessesText = document.querySelector(".maxGuesses");
maxGuessesText.innerHTML = " " + maxGuesses + " ";
const btnRobotPlay = document.querySelector(".robot-play");

//counter and total guesses
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
  ceilingMax = 0;
  floorMin = 0;

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

  letRobotPlaybtn.disabled = false;
};

//robot algorithm for html, robotAlgorithm with statistics for the console.log at the bottom of the document
const robotPlay = () => {
  let robotQuess = maxValue - Math.floor((maxValue - minValue) / 2);
  let ceilingMax = maxValue;
  let floorMin = minValue;
  guessCount = 1;

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
        ceilingMax = robotQuess;
        robotQuess -= Math.ceil((robotQuess - floorMin) / 2);
      } else {
        floorMin = robotQuess;
        robotQuess += Math.floor((ceilingMax - robotQuess) / 2);
      }
      guessCount++;
    }
  }
  totalGuessesText.innerHTML = "total guesses: " + guessCount;
};

//create let robot play button
const letRobotPlay = document.querySelector(".let-robot-play");
let letRobotPlaybtn = document.createElement("button");
letRobotPlaybtn.textContent = "Let a robot play";
letRobotPlaybtn.classList.add("robot-play");
letRobotPlay.append(letRobotPlaybtn);
letRobotPlay.addEventListener("click", () => {
  letRobotPlaybtn.disabled = true;
  robotPlay();
  });


/**
 * robot play Algorith in console.log with statistics
 *
 * how algorith works:
 * it always tries to guess number from the middle of minimum and maximum values.
 * if the quessed number is too big, algorith sets a new minimum value
 * if the quessed number is too small, algorith sets a new maximum value
 *
 */
let robotAlgorithm = () => {
  //for statistics
  let wins = 0;
  let losses = 0;
  let totalQuessMin = 0;
  let totalQuessMax = 0;
  let maxTimePlayed = 2;
  let totalQuessAverage = [];

  //robot plays theoreticalMax times
  for (let i = 0; i < maxTimePlayed; i++) {
    //creates array for all robot quessed values
    let robotArray = [];
    //first robot quess, always from the middle of min and max
    let robotQuess = maxValue - Math.floor((maxValue - minValue) / 2);
    const maxGuessesforRobot = maxGuesses;
    let ceilingMax = maxValue;
    let floorMin = minValue;
    randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    console.log("random number: ", randomNumber);
    guessCount = 1;

    //loop for robot play
    while (guessCount < maxGuessesforRobot) {
      robotArray.push(robotQuess);

      //when robot wins
      if (robotQuess === randomNumber) {
        console.log("You won!");
        wins++;
        break;
      //when robot looses
      } else if (guessCount === maxGuessesforRobot) {
        console.log("Game Over!");
        losses++;
        break;
      //when robot quesses
      } else {
        //when quessed number was bigger than random
        if (robotQuess > randomNumber) {
            //algorithm sets an new max value
            ceilingMax = robotQuess;
            robotQuess -= Math.ceil((robotQuess - floorMin) / 2);
        //when quessed number was smaller than random
        } else {
            //algorithm sets an new min value
            floorMin = robotQuess;
            robotQuess += Math.floor((ceilingMax - robotQuess) / 2);
        }
      //counts all quesses
      guessCount++;
      }
    }
    //prints an array after the game has finished
    for (quess of robotArray) {
      console.log(quess);
    }
    //for statistics, calculates what is the min and max number for total guess counts
    if (totalQuessMin == 0 && totalQuessMax == 0) {
      totalQuessMin = guessCount;
      totalQuessMax = guessCount;
    } else if (totalQuessMax < guessCount) {
      totalQuessMax = guessCount;
    } else if (totalQuessMin > guessCount) {
      totalQuessMin = guessCount;
    }
    //pushes all values in array for average total guess counts
    totalQuessAverage.push(guessCount);

    console.log('Total quesses:', guessCount);
    console.log('minimum number of total guess counts:', totalQuessMin);
    console.log('maximum number of total guess counts:', totalQuessMax);
    console.log('theoretical maximum:', maxGuesses);
    //calculates average total quess counts
    let sum = totalQuessAverage.reduce((previous, current) => current += previous);
    let avg = Math.floor(sum / totalQuessAverage.length);
    console.log('average number of total guess counts', avg);
  }
  console.log('Total wins:' + wins);
  console.log('Total losses:' + losses);
};

console.log(robotAlgorithm());

