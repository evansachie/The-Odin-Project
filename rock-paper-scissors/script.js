const prompt = require('prompt-sync')();

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    // Function to get computer choice
    function getComputerChoice() {
        let selection = Math.floor(Math.random() * 3)
        if (selection == 0) {
            return "rock"
        } else if (selection == 1) {
            return "paper"
        } else {
            return "scissors"
        }
    }

    // Function to get human choice
    function getHumanChoice() {
        while (true) {
            let userInput = prompt("Enter a number (0 for Rock, 1 for Paper and 2 for Scissors): ");
            if (userInput === '0') return "rock";
            if (userInput === '1') return "paper";
            if (userInput === '2') return "scissors";
            console.log("Invalid input. Please enter 0, 1, or 2.");
        }
    }

    function playRound(humanChoice, computerChoice) {
        switch(true) {
            case humanChoice == computerChoice:
                return 'There is a tie, try again!';
            case humanChoice == 'rock' && computerChoice == 'paper':
                computerScore += 1
                return 'You lose! Paper beats Rock.';
            case humanChoice == 'rock' && computerChoice == 'scissors':
                humanScore += 1
                return 'You Win! Rock beats Scissors';
            case humanChoice == 'paper' && computerChoice == 'rock':
                humanScore += 1
                return 'You Win! Paper beats Rock';
            case humanChoice == 'paper' && computerChoice == 'scissors':
                computerScore += 1
                return 'You lose! Scissors beats Paper';
            case humanChoice == 'scissors' && computerChoice == 'rock':
                computerScore += 1
                return 'You lose! Rock beats Scissors';
            case humanChoice == 'scissors' && computerChoice == 'paper':
                humanScore += 1
                return 'You Win! Scissors beats Paper';
            default:
                return "OOPs. Something wrong must have occurred!. Try again"
        }
    }

    for (let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice()
        const computerSelection = getComputerChoice()
        console.log(playRound(humanSelection, computerSelection));
        console.log(`Current score - Human: ${humanScore}, Computer: ${computerScore}`);
    }
    

    console.log(`Final score - Human: ${humanScore}, Computer: ${computerScore}`);
    if (humanScore > computerScore) {
        return "You win the game!";
    } else if (computerScore > humanScore) {
        return "Computer wins the game!";
    } else {
        return "The game is a tie!";
    }
}

console.log(playGame());