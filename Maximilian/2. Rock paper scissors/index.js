const startgamebtn = document.getElementById('start-game-btn')
const heading = document.querySelector('.heading')

const rock = 'ROCK'
const paper = 'PAPER'
const scissor = "SCISSOR"
let gameIsRunning = false 
let arr = ['ROCK', 'PAPER','SCISSOR']
const getPlayerChoice = function(){
    const selection = prompt(`${rock}, ${paper}, or ${scissor}`,'').toUpperCase()
    if(selection !== rock && selection !== paper && selection !== scissor){
        alert("Invalid input")
        return rock
    }
    return selection 
}

const getComputerChoice = function(){
    const computerSelection = Math.floor(Math.random()*3)
    gameIsRunning = false
    return arr[computerSelection]
}

const determineWinner = (player1, player2)=> {
    if (player1 === player2) {
      return "It's a draw!";
    }
  
    if (
      (player1 === rock && player2 === scissor) ||
      (player1 === scissor && player2 ===paper) ||
      (player1 === paper && player2 === rock)
    ) {
      return "Player wins!";
    }
  
    return "Computer wins!";
  }

startgamebtn.addEventListener('click',function(){
    if(gameIsRunning){
        return 
    }
    gameIsRunning = true 
    const playerSelection = getPlayerChoice()
    heading.textContent = `player selected ${playerSelection}`
    const computer = getComputerChoice()
    const result = determineWinner(playerSelection, computer)
    heading.textContent = result
})
