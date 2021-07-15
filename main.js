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


function userPlay() {
  let userInput;
  let promptMessage = "Your choice:";

  do {
    if (userInput) {
      promptMessage = `Incorrect option, choose between: ${options.join(", ")}`;
    }

    userInput = prompt(promptMessage).toLowerCase();
  } while (!optionsLower.includes(userInput))
  
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


function game() {
  let playerScore = 0;
  let cpuScore = 0;
  
  for (let i = 0; i < 5; i++) {
    const roundResults = playRound(userPlay(), computerPlay());
    if (roundResults.score === 1) {
      playerScore++;
    } else if (roundResults.score === -1) {
      cpuScore++;
    }

    console.log(roundResults.msg);
  }

  // display the final results
  if (playerScore > cpuScore) {
    console.log("YOU WIN!!");
  } else if (playerScore === cpuScore) {
    console.log("It's a tie.");
  } else {
    console.log("Sorry, the computer won this time.");
  }
}


game();
