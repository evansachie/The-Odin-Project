function getComputerChoice(){
    selection = Math.floor(Math.random() * 3)

    if (selection == 0){
        return "You have chosen rock"
    } else if (selection == 1){
        return "You have chosen Paper"
    } else {
        return "You hae chosen scissors"
    }
}

// console.log(getComputerChoice())
