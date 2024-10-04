document.querySelector("form").addEventListener("submit", (event) => {
	const formData = new FormData(event.target);

	playRound(getHumanChoice(formData.get("humanGuess")));

	event.preventDefault();
});

let roundsPlayed = 0;
let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice) {
	const computerChoice = getComputerChoice();

	switch (rpsDecideWinner(humanChoice, computerChoice)) {
		case "opp1": {
			console.log(`You win! ${rpsFormatWinText(humanChoice, computerChoice)}`);
			return "human";
		}
		case "opp2": {
			console.log(`You lose! ${rpsFormatWinText(computerChoice, humanChoice)}`);
			return "computer";
		}
		case "draw": {
			console.log("Draw!");
			return "draw";
		}
	}
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
