"use strict";

// GAMEPLAY LOGIC

const options = ["Rock", "Paper", "Scissors"];
const optionsLower = options.map(option => option.toLowerCase());


function beatsMessage (stronger, weaker){
  return `${options[stronger]} beats ${options[weaker]}`;
}


function computerPlay() {
  // return index of option
  return Math.floor(Math.random() * 3);
}


function userPlay(button) {
  const userInput = button.dataset.choice;
  return optionsLower.indexOf(userInput);
}


function playRound(playerSelection, computerSelection) {
  // rather than comparing strings in multiple if statements
  // the indexes are compared to see which combination gives the player a win
  const result = playerSelection - computerSelection;
  let msg;
  let score;

  if (result === 1 || result === -2) {
    msg = "You win! " + beatsMessage(playerSelection, computerSelection);
    score = 1;

  } else if (result === 0) {
    msg = "It's a draw!";
    score = 0;

  } else {
    msg = "You lose! " + beatsMessage(computerSelection, playerSelection);
    score = -1;
  }

  return {"msg": msg, "score": score};
}


// DOM presentation and interaction

const resultsArea = document.querySelector(".results");
const gameOverSection = document.querySelector(".game-over");
const overallResult = document.querySelector(".overall-result");
const userScoreDisplay = document.querySelector("#user-score");
const cpuScoreDisplay = document.querySelector("#cpu-score");

const scores = { user: 0, cpu: 0 };


function updateScores() {
  userScoreDisplay.textContent = scores.user;
  cpuScoreDisplay.textContent = scores.cpu;

  if (scores.user >= 5 || scores.cpu >= 5) {
    playerBtns.forEach(btn => {
      btn.classList.add("disabled");
      btn.setAttribute("disabled", "disabled");
      gameOverSection.classList.add("visible");
      if (scores.user > scores.cpu) {
        overallResult.textContent = "YOU WIN!!";
      } else {
        overallResult.textContent = "Sorry, the computer won this time.";
      }
   });
  }
}


function resetGame() {
  scores.user = 0;
  scores.cpu = 0;
  updateScores();
  playerBtns.forEach(btn => {
    btn.classList.remove("disabled");
    btn.removeAttribute("disabled", "disabled");
  });
  resultsArea.textContent = "";
  gameOverSection.classList.remove("visible");
}

const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", resetGame);


function choiceClick() {
  playerBtns.forEach(btn => {
    // prevent button spamming
    btn.removeEventListener("click", choiceClick);
  });
  
  const userOption = userPlay(this);
  const computerOption = computerPlay();
  const results = playRound(userOption, computerOption);

  resultsArea.textContent = results.msg;
  if (results.score === 1) {
    this.classList.add("win");
    playerBtns[computerOption].classList.add("loss");
    scores.user++;
  } else if (results.score === -1) {
    this.classList.add("loss");
    playerBtns[computerOption].classList.add("win");
    scores.cpu++;
  }
  else {
    this.classList.add("draw");
  }

  updateScores();
  
  setTimeout(() => {
    playerBtns.forEach(btn => {
      btn.addEventListener("click", choiceClick);
      btn.classList.remove("draw");
      btn.classList.remove("win");
      btn.classList.remove("loss");
    });
  }, 1000);
}

const playerBtns = document.querySelectorAll(".choice-btn");
playerBtns.forEach(btn => {
  btn.addEventListener("click", choiceClick);
});
