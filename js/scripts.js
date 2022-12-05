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

function updateDisplay() {
  const rollArea = document.getElementById('show-roll');
  rollArea.innerHTML = '';
  const p = document.createElement('p');
  const lastRoll = game.activePlayer().currentTurn.slice(-1)[0] || 1;
  p.append(`${game.activePlayer().name} rolled a ${lastRoll}`);
  rollArea.append(p);
}

function displayStreak() {
  const streakArea = document.getElementById('streak');
  streakArea.innerHTML = '';
  //const ul = document.createElement('ul');
  game.activePlayer().currentTurn.forEach( function(element) {
    //const li = document.createElement('li');
    //li.append(element);
    //ul.append(li);
    streakArea.innerText += `${element}\n`;
  });
  //streakArea.append(ul);
}


function rollButtonHandler() {
  event.preventDefault();
  let roll = game.activePlayer().takeTurn();
  updateDisplay()
  displayStreak()
  // if roll was 1, call another func to swap players
  if (roll === 1) {
    
    game.swapPlayer();
    // swap display to other player
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
  
}

window.onload = function () {
  const rollButton = document.getElementById('roll');
  rollButton.addEventListener("submit", rollButtonHandler);

  const holdButton = document.getElementById('hold');
  holdButton.addEventListener("submit", holdButtonHandler);
}

