"use strict";

const options = ["Rock", "Paper", "Scissors"];
const optionsLower = options.map(option => option.toLowerCase());


function beatsMessage (stronger, weaker){
  return `${options[stronger]} beats ${options[weaker]}`;
}


function computerPlay() {
  // return index of option
  return Math.floor(Math.random() * 3);
}

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

}


function userPlay(button) {
  const userInput = button.dataset.choice;
  return optionsLower.indexOf(userInput);
}

function choiceClick() {
  playerBtns.forEach(btn => {
    btn.removeEventListener("click", choiceClick)
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


function game() {
  
  // for (let i = 0; i < 5; i++) {
  //   const roundResults = playRound(userPlay(), computerPlay());
  //   if (roundResults.score === 1) {
  //     playerScore++;
  //   } else if (roundResults.score === -1) {
  //     cpuScore++;
  //   }

  // // display the final results
  // if (playerScore > cpuScore) {
  //   console.log("YOU WIN!!");
  // } else if (playerScore === cpuScore) {
  //   console.log("It's a tie.");
  // } else {
  //   console.log("Sorry, the computer won this time.");
  // }
}
