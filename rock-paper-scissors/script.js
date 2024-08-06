const prompt = require('prompt-sync')();

let humanScore = 0;
let computerScore = 0;


// function to get computer choice
function getComputerChoice(){
    let selection = Math.floor(Math.random() * 3)

    if (selection == 0){
        return "rock"
    } else if (selection == 1){
        return "paper"
    } else {
        return "scissors"
    }
}

// Funtion to get humnan choice
function getHumanChoice(){
    while (true) {
        let userInput = prompt("Enter a number (0 for Rock, 1 for Paper and 2 for Scissors): ");
        if (userInput === '0') return "rock";
        if (userInput === '1') return "paper";
        if (userInput === '2') return "scissors";
        console.log("Invalid input. Please enter 0, 1, or 2.");
    }

}

// console.log(getComputerChoice())
// console.log(getHumanChoice())

function playRound(humanChoice, computerChoice){
    // humanChoice = prompt("Enter Rock, Paper or Scissors");

    // resHumanChoice = humanChoice.toLowerCase()
    switch(true){
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
            return "OOPs. Something wrong must have occured!. Try again"
    }
}

const humanSelection = getHumanChoice()
const computerSelection = getComputerChoice()

console.log(playRound(humanSelection, computerSelection));
console.log(`Human Score: ${humanScore}, Computer Score: ${computerScore}`);