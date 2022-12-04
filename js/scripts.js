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
    if (roll === 1) {
      return 0;
    } else {
      this.currentTurn.push(roll);
    }
  }

  hold() {
    this.score += this.currentTurn.reduce((a, b) => a + b)
    this.current = [];
  }
}