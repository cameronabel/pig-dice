// Business Logic
function rollDie () {
  return Math.floor(Math.random() * 6) + 1;
}

class Player{
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.currentTurn = [];
    this.winStreak = 0;
    this.cpu = false;
  }

  takeTurn() {
    let roll = rollDie();
    console.log(`${this.name} rolled a ${roll}`)
    if (roll === 1) {
      this.currentTurn = [];
    } else {
      this.currentTurn.push(roll);
    }
    return roll;
  }

  hold() {
    if (this.currentTurn.length) {
      this.score += this.currentTurn.reduce((a, b) => a + b);
    }
    this.currentTurn = [];
  }

  runningTotal() {
    if (this.currentTurn.length) {
      return this.currentTurn.reduce((a, b) => a + b);
    } else {
      return 0;
    }
  }
}

class Game {
  constructor() {
    this.players = [new Player(''), new Player('')];
    this.activePlayerIndex = 0;
  }


  swapPlayer() {
    const oldPlayer = game.activePlayer();
    const oldPlayerField = document.getElementById(oldPlayer.playerField);
    oldPlayerField.classList.remove('highlighted');
    oldPlayerField.classList.add('not-highlighted');

    this.activePlayerIndex += 1;
    this.activePlayerIndex = this.activePlayerIndex % 2;
    const newPlayer = game.activePlayer();
    const newPlayerField = document.getElementById(newPlayer.playerField)
    newPlayerField.classList.add('highlighted');
    newPlayerField.classList.remove('not-highlighted');
    if (newPlayer.cpu) {
      setUpCpuTurn();
    } else {
      enableButtons();
    }
  }
  activePlayer() {
    return this.players[this.activePlayerIndex];
  }
  inactivePlayer() {
    return this.players[(this.activePlayerIndex + 1) % 2];
  }
}

// Interface Logic
const game = new Game();

function updateDisplay() {
  const rollArea = document.getElementById('show-roll');
  const lastRoll = game.activePlayer().currentTurn.slice(-1)[0] || 1;
  rollArea.innerText = `${game.activePlayer().name} rolled a ${lastRoll}`

}

function displayStreak() {
  const streakArea = document.getElementById('streak');
  game.activePlayer().currentTurn.forEach( function(element) {
    streakArea.innerText += `${element}\n`;
  });
}

function clearDisplays() {
  const rollArea = document.getElementById('show-roll');
  rollArea.innerText = ' ';
  const streakArea = document.getElementById('streak');
  streakArea.innerHTML = '';
}

function setUpCpuTurn() {
  disableButtons();
  cpuTurn();
}

function cpuTurn() {
  console.log('cpu turn')
  let cpu = game.activePlayer();
  let human = game.inactivePlayer()
  if (optimalToRoll(cpu, human)) {
    console.log('cpu rolling')
    rollButtonHandler();
  } else {
    console.log('cpu holding')
    holdButtonHandler();
  }
  if (game.activePlayer() === cpu) {
    cpuTurn();
  }
}

function optimalToRoll(me, you) {
  console.log(`Computer's running total: ${me.runningTotal()}`)
  const scoreThreshold = 21 + (Math.abs(me.score - you.score) / 8);
  console.log(scoreThreshold)
  if (me.score >= 71 || you.score >= 71) {
    if (me.score + me.runningTotal() < 100) {
      return true;
    } else {
      return false;
    }
  } else if (me.runningTotal() < scoreThreshold) {
      return true;
  } else {
      return false;
  }
}

function enableButtons() {
  document.getElementById('roll-die').disabled = false;
  document.getElementById('hold-die').disabled = false;
}

function disableButtons() {
  document.getElementById('roll-die').disabled = true;
  document.getElementById('hold-die').disabled = true;
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
    endPageHandler();
  } else {
  game.swapPlayer();
  }
  
}

function startPageHandler() {
  event.preventDefault();
  const player1Name = document.getElementById('player1').value || 'Player 1';
  const player2Name = document.getElementById('player2').value || 'Player 2';
  setUpGame(player1Name, player2Name);
}

function cpuButtonHandler() {
  event.preventDefault();
  const player1Name = document.getElementById('player1').value || 'Player 1';
  setUpGame(player1Name);
}

function setUpGame(p1Name, p2Name='') {
  const player1Name = p1Name;
  let player2Name;
  document.getElementById('player1').value = "";
  document.getElementById('player2').value = "";
  document.getElementById('start-page').classList.add('hidden');
  document.getElementById('game-play').classList.remove('hidden');
  game.players[0].name = p1Name;
  game.players[0].scoreField = 'score1';

  if (p2Name) {
    game.players[1].name = p2Name;
    player2Name = p2Name;
  } else {
    game.players[1].name = "Computer";
    game.players[1].cpu = true;
    player2Name = "Computer";
  }  
  game.players[1].scoreField = 'score2';
  document.getElementById('p1-name').innerText= player1Name + "'s" + ' Score:';
  document.getElementById('p2-name').innerText= player2Name + "'s" + ' Score:';
  document.getElementById(game.players[0].scoreField).innerText= 0;
  document.getElementById(game.players[1].scoreField).innerText= 0;
  game.players[0].playerField = 'player1-score';
  game.players[1].playerField = 'player2-score';
  document.getElementById(game.players[0].playerField).classList.remove('not-highlighted');
  document.getElementById(game.players[0].playerField).classList.add('highlighted');
}


function endPageHandler() {
  document.getElementById('start-page').classList.add('hidden');
  document.getElementById('game-play').classList.add('hidden');
  document.getElementById('game-over').classList.remove('hidden');
  document.getElementById('final-score').innerText = game.activePlayer().score;
  document.getElementById('final-score').classList.add('spinner');
  document.getElementById('winner').innerText = `${game.activePlayer().name} wins!`
  const rematchButton = document.getElementById('rematch');
  rematchButton.addEventListener("click", rematchHandler);
  const newGameButton = document.getElementById('new-game');
  newGameButton.addEventListener("click", newGameHandler);
}

function newGameHandler() {
  document.getElementById('start-page').classList.remove('hidden');
  document.getElementById('game-play').classList.add('hidden');
  document.getElementById('game-over').classList.add('hidden');
  game.players[0].score = 0;
  game.players[1].score = 0;
}

function rematchHandler() {
  document.getElementById('game-play').classList.remove('hidden');
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById(game.players[0].scoreField).innerText= 0;
  document.getElementById(game.players[1].scoreField).innerText= 0;
  game.players[0].score = 0;
  game.players[1].score = 0;
}


window.onload = function () {
  const rollButton = document.getElementById('roll');
  rollButton.addEventListener("submit", rollButtonHandler);

  const holdButton = document.getElementById('hold');
  holdButton.addEventListener("submit", holdButtonHandler);

  const goButton = document.getElementById('game-setup');
  goButton.addEventListener("submit", startPageHandler);

  const cpuButton = document.getElementById('cpu-btn');
  cpuButton.addEventListener("click", cpuButtonHandler);
}


