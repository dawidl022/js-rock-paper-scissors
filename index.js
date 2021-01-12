function computerPlay() {
  let randNumber = Math.random() * 3;
  if (randNumber < 1) {
    return "rock";
  } else if (randNumber < 2) {
    return "paper";
  } else {
    return "scissors";
  }
}

function capitalise(text) {
  let firstLetter = text.charAt(0).toUpperCase();
  let restOfWord = text.slice(1);
  return firstLetter + restOfWord;
}

function gameEndMessage(winner, loser) {
  return `${capitalise(winner)} beats ${capitalise(loser)}`;
}

function tieMessage() {
  return "It's a tie!";
}

function winMessage(winner, loser) {
  return `You win! ${gameEndMessage(winner, loser)}`;
}

function lossMessage(winner, loser) {
  return `You lose! ${gameEndMessage(winner, loser)}`;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase()
  if (playerSelection == "rock") {
    switch (computerSelection) {
      case "rock":
        return "It's a tie!";
      case "paper":
        return lossMessage(computerSelection, playerSelection);
      case "scissors":
        return winMessage(playerSelection, computerSelection);
    }
  } else if (playerSelection == "paper") {
    switch (computerSelection) {
      case "paper":
        return "It's a tie!";
      case "scissors":
        return lossMessage(computerSelection, playerSelection);
      case "rock":
        return winMessage(playerSelection, computerSelection);
  }} else if (playerSelection == "scissors"){
    switch (computerSelection) {
      case "scissors":
        return "It's a tie!";
      case "rock":
        return lossMessage(computerSelection, playerSelection);
      case "paper":
        return winMessage(playerSelection, computerSelection);
  }} else {
    return "Invalid Input"
  }}

let userScore = 0;
let cpuScore =  0;

function checkScore() {
  if (cpuScore < 5 & userScore < 5) {
    return;
  } let result;
  if (userScore == 5) {
    result = "Well done! You win!";
  } else if (cpuScore == 5) {
    result = "Bad luck! You lose.";
  } return result;
}

function printEndMessage(roundResult) {
  userScore = 0;
  cpuScore = 0;
  const message = document.querySelector("#results");
  message.textContent = "Game Over. " + roundResult + " Play again?";
}

function updateScore() {
  const userResult = document.querySelector("#user-score");
  userResult.textContent = `User Score: ${userScore}`;

  const cpuResult = document.querySelector("#cpu-score");
  cpuResult.textContent = `Computer Score: ${cpuScore}`;
}


function playerSelect(e) {
  let selection = e.target.id;
  let result = playRound(selection, computerPlay());
  console.log(result);
  if (result.includes("win")) {
    userScore++;
  } else if (result.includes("lose")) {
    cpuScore++;
  }
  let roundResult = checkScore();
  updateScore();
  const message = document.querySelector("#results")
  message.textContent = "Round results: " + result
  if (roundResult) printEndMessage(roundResult);
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", playerSelect));
