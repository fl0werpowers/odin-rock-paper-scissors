document.querySelector("form").addEventListener("submit", (event) => {
	const formData = new FormData(event.target);
	console.log(getHumanChoice(formData.get("humanGuess")));

	event.preventDefault();
});

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
	const computerGuess = Math.floor(Math.random() * 3);

	switch (computerGuess) {
		case 0:
			return "rock";
		case 1:
			return "paper";
		case 2:
			return "scissors";
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
