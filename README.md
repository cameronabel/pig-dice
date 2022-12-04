## Describe: rollDie()

#### Test: It should return a random number between 1 and 6

**Code:**\
rollDie();\
**Expected Output: "<random integer between 1 and 6>"**

## Describe: Player().takeTurn()

#### Test: It should update the currentTurn array with the rolled value

**Code:**\
Player().takeTurn();\
**Expected Output: none, internal array is updated**

#### Test: It should reset the internal array to empty if a 1 is rolled

**Code:**\
Player().takeTurn();\
**Expected Output: none, internal array is reset**

## Describe: Player().hold()

#### Test: It should update the Player's score and reset the internal array to empty

**Code:**\
player = new Player();\
player.currentTurn = [1, 2, 3];\
player.hold();\
player.score;\
player.currentTurn;\
**Expected Output: 6**
**[]**
