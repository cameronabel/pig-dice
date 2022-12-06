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
    this.players = [new Player(''), new Player('')];
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
  const p = document.createElement('p');
  const lastRoll = game.activePlayer().currentTurn.slice(-1)[0] || 1;
  p.append(`${game.activePlayer().name} rolled a ${lastRoll}`);
  rollArea.append(p);
}

function displayStreak() {
  const streakArea = document.getElementById('streak');
  game.activePlayer().currentTurn.forEach( function(element) {
    streakArea.innerText += `${element}\n`;
  });
}

function clearDisplays() {
  const rollArea = document.getElementById('show-roll');
  rollArea.innerHTML = '';
  const streakArea = document.getElementById('streak');
  streakArea.innerHTML = '';
}

function rollButtonHandler() {
  event.preventDefault();
  let roll = game.activePlayer().takeTurn();
  clearDisplays();
  updateDisplay();
  displayStreak();
  if (roll === 1) {
    game.swapPlayer();
  }
}

function holdButtonHandler() {
  event.preventDefault();
  game.activePlayer().hold();
  document.getElementById(game.activePlayer().scoreField).innerText= game.activePlayer().score;
  clearDisplays();
  if (game.activePlayer().score >= 100) {
    return // Game over
  } else {
  game.swapPlayer();
  }
  
}

function startPageHandler() {
  event.preventDefault();
  const player1Name = document.getElementById('player1').value;
  const player2Name = document.getElementById('player2').value;
  document.getElementById('start-page').classList.add('hidden');
  document.getElementById('game-play').classList.remove('hidden');
  game.players[0].name = player1Name;
  game.players[0].scoreField = 'score1';
  game.players[1].scoreField = 'score2';
  game.players[1].name = player2Name;
  document.getElementById('p1-name').innerText= player1Name + "'s" + ' Score:';
  document.getElementById('p2-name').innerText= player2Name + "'s" + ' Score:';
  document.getElementById(game.players[0].scoreField).innerText= 0;
  document.getElementById(game.players[1].scoreField).innerText= 0;
}

window.onload = function () {
  const rollButton = document.getElementById('roll');
  rollButton.addEventListener("submit", rollButtonHandler);

  const holdButton = document.getElementById('hold');
  holdButton.addEventListener("submit", holdButtonHandler);

  const goButton = document.getElementById('game-setup');
  goButton.addEventListener("submit", startPageHandler);
}


