const humanGuessField = document.getElementById("humanGuess");
const roundText = document.getElementById("round");
const humanScoreText = document.getElementById("humanScore");
const computerScoreText = document.getElementById("computerScore");
const gameText = document.getElementById("gameText");
const gameOverText = document.getElementById("gameOverText");

let roundsPlayed = 1;
let humanScore = 0;
let computerScore = 0;

function resetGame() {
	computerScore = 0;
	humanScore = 0;
	roundsPlayed = 1;
	humanScoreText.innerText = humanScore;
	computerScoreText.innerText = computerScore;
	roundText.innerText = roundsPlayed;
	gameText.innerText = "Let's get started!";
	gameOverText.innerText = "";
}

function playGame(humanInput) {
	if (!humanInput) {
		gameText.innerText =
			'Invalid input! Type in "rock", "paper", or "scissors".';
		return;
	}

	if (roundsPlayed >= 5) {
		gameOverText.innerText = gameOver();
		return;
	}
	const humanChoice = getHumanChoice(humanInput);
	const computerChoice = getComputerChoice();

	switch (playRound(humanChoice, computerChoice)) {
		case "human": {
			humanScore++;
			humanScoreText.innerText = humanScore;
			break;
		}
		case "computer":
			computerScore++;
			computerScoreText.innerText = computerScore;
			break;
	}

	if (roundsPlayed < 5) roundsPlayed++;
	roundText.innerText = roundsPlayed;
}

function playRound(humanChoice, computerChoice) {
	switch (rpsDecideWinner(humanChoice, computerChoice)) {
		case "opp1": {
			gameText.innerText = `You win! ${rpsFormatWinText(
				humanChoice,
				computerChoice,
			)}`;
			return "human";
		}
		case "opp2": {
			gameText.innerText = `You lose! ${rpsFormatWinText(
				computerChoice,
				humanChoice,
			)}`;
			return "computer";
		}
		case "draw": {
			gameText.innerText = `Draw! You both picked ${humanChoice}!`;
			return "draw";
		}
	}
}

function gameOver() {
	const isDraw = humanScore === computerScore;
	return `Game over! ${
		isDraw
			? "It's a draw!"
			: humanScore > computerScore
				? "You won!"
				: "You lost!"
	}`;
}

function rpsDecideWinner(opp1, opp2) {
	const winCondition =
		(opp1 === "rock" && opp2 === "scissors") ||
		(opp1 === "paper" && opp2 === "rock") ||
		(opp1 === "scissors" && opp2 === "paper");

	if (opp1 === opp2) return "draw";

	return winCondition ? "opp1" : "opp2";
}

function rpsFormatWinText(opp1, opp2) {
	return `${opp1[0].toUpperCase() + opp1.slice(1)} beats ${opp2}.`;
}

function getComputerChoice() {
	const computerGuess = Math.floor(Math.random() * 3);

	switch (computerGuess) {
		case 0:
			return "rock";
		case 1:
			return "paper";
		case 2:
			return "scissors";
		default:
			return null;
	}
}

function getHumanChoice(choice) {
	const choiceLower = choice.toLowerCase();
	if (
		choiceLower === "rock" ||
		choiceLower === "paper" ||
		choiceLower === "scissors"
	)
		return choiceLower;

	return null;
}

document.addEventListener("submit", (event) => {
	playGame(humanGuessField.value);
	humanGuessField.value = "";
	humanGuessField.focus();

	event.preventDefault();
});

document.addEventListener("reset", resetGame);
