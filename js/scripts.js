// Business Logic
function rollDie () {
  return Math.floor(Math.random() * 6) + 1;
}

class Player{
  constructor() {
    this.score = 0;
    this.currentTurn = [];
  }

  takeTurn() {
    let roll = rollDie();
    console.log(roll);
    if (roll === 1) {
      this.currentTurn = [];
    } else {
      this.currentTurn.push(roll);
    }
    return roll;
  }

  hold() {
    this.score += this.currentTurn.reduce((a, b) => a + b);
    this.currentTurn = [];
  }
}

class Game {
  constructor() {
    this.players = [new Player(), new Player()];
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


function pigDice() {
  
  let activePlayer = game.activePlayer();

}
  


// Interface Logic
const game = new Game();

function rollButtonHandler() {
  event.preventDefault();
  let roll = game.activePlayer().takeTurn();
  if (roll === 1) {
    game.swapPlayer();
  }
  // if roll was 1, call another func to swap players
  console.log(game.activePlayer().score); // update score display
  console.log(game.activePlayer().currentTurn); // update current roll display
}

function holdButtonHandler(event) {
  event.preventDefault();
  game.activePlayer().hold();
  game.swapPlayer();
  // swap the display to the other player
  // check for 100 pts
}


window.onload = function () {
  const rollButton = document.getElementById('roll');
  rollButton.addEventListener("submit", rollButtonHandler);

  const holdButton = document.getElementById('hold');
  holdButton.addEventListener("submit", holdButtonHandler);

  pigDice();
}