// Business Logic
function rollDie () {
  return Math.floor(Math.random() * 6) + 1;
}

class Player{
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.currentTurn = [];
  }

  takeTurn() {
    let roll = rollDie();
    
    if (roll === 1) {
      this.currentTurn = [];
    } else {
      this.currentTurn.push(roll);
    }
    return roll;
  }

  hold() {
    if (this.currentTurn) {
      this.score += this.currentTurn.reduce((a, b) => a + b);
    }
    this.currentTurn = [];
  }
}

class Game {
  constructor() {
    this.players = [new Player('Player 1'), new Player('Player 2')];
    this.activePlayerIndex = 0;
  }
  swapPlayer() {
    this.activePlayerIndex += 1;
    this.activePlayerIndex = this.activePlayerIndex % 2;
  }
  activePlayer() {
    return this.players[this.activePlayerIndex];
  }
}

// Interface Logic
const game = new Game();

function rollButtonHandler() {
  event.preventDefault();
  let roll = game.activePlayer().takeTurn();
 
  // if roll was 1, call another func to swap players
  
  console.log(game.activePlayer().name);
  console.log(roll);
  console.log(game.activePlayer().score); // update score display
  console.log(game.activePlayer().currentTurn); // update current roll display
  if (roll === 1) {
    game.swapPlayer();
  }
}

function holdButtonHandler() {
  event.preventDefault();
  game.activePlayer().hold();
  if (game.activePlayer().score >= 100) {
    return // Game over
  } else {
  game.swapPlayer();
  }
  // swap the display to the other player
  // check for 100 pts
}

window.onload = function () {
  const rollButton = document.getElementById('roll');
  rollButton.addEventListener("submit", rollButtonHandler);

  const holdButton = document.getElementById('hold');
  holdButton.addEventListener("submit", holdButtonHandler);
}

