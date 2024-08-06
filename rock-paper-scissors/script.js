const prompt = require('prompt-sync')();

function getComputerChoice(){
    let selection = Math.floor(Math.random() * 3)

    if (selection == 0){
        return "Comouter has chosen rock"
    } else if (selection == 1){
        return "Computer has chosen Paper"
    } else {
        return "Computer has chosen scissors"
    }
}

// console.log(getComputerChoice())

function getHumanChoice(){
    let userInput = prompt("Enter a number(0 for Rock, 1 for Paper and 2 for Scissors): ")

    if (parseInt(userInput) == 0){
        return "You have chosen rock"
    } else if (parseInt(userInput) == 1){
        return "You have chosen Paper"
    } else if (parseInt(userInput) == 2) {
        return "You have chosen scissors"
    } else {
        return "Please enter a number from 0 - 2"
    }

}

console.log(getHumanChoice())