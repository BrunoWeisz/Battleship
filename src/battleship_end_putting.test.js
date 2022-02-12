import BattleshipGame from './battleship.js';


test("Players are putting if there are ships remaining", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position1 = [0,0];
    game.playerOnePutsShip(size, position1);
    
    expect(game.isPlayerOnePuttingShips()).toBeTruthy();
    expect(game.isPlayerTwoPuttingShips()).toBeTruthy();
    expect(game.isPuttingPhase()).toBeTruthy();
    expect(game.isAttackingPhase()).toBeFalsy();
})

test("Player one can stop putting if all ships have been put", () => {
    let game = new BattleshipGame();
    game.playerOnePutsShip(1, [0,0]);
    game.playerOnePutsShip(1, [0,2]);
    game.playerOnePutsShip(1, [0,4]);
    game.playerOnePutsShip(1, [0,6]);
    game.playerOnePutsShip(2, [2,0]);
    game.playerOnePutsShip(2, [2,2]);
    game.playerOnePutsShip(2, [2,4]);
    game.playerOnePutsShip(3, [5,0]);
    game.playerOnePutsShip(3, [5,2]);
    game.playerOnePutsShip(4, [9,0], 'horizontal');
    
    game.playerOneFinishesPutting();
    expect(game.isPlayerOnePuttingShips()).toBeFalsy();
    expect(game.isPlayerTwoPuttingShips()).toBeTruthy();
    expect(game.isPuttingPhase()).toBeTruthy();
    expect(game.isAttackingPhase()).toBeFalsy();
})

test("Player two can stop putting if all ships have been put", () => {
    let game = new BattleshipGame();
    game.playerTwoPutsShip(1, [0,0]);
    game.playerTwoPutsShip(1, [0,2]);
    game.playerTwoPutsShip(1, [0,4]);
    game.playerTwoPutsShip(1, [0,6]);
    game.playerTwoPutsShip(2, [2,0]);
    game.playerTwoPutsShip(2, [2,2]);
    game.playerTwoPutsShip(2, [2,4]);
    game.playerTwoPutsShip(3, [5,0]);
    game.playerTwoPutsShip(3, [5,2]);
    game.playerTwoPutsShip(4, [9,0], 'horizontal');
    
    game.playerTwoFinishesPutting();
    expect(game.isPlayerTwoPuttingShips()).toBeFalsy();
    expect(game.isPlayerOnePuttingShips()).toBeTruthy();
    expect(game.isPuttingPhase()).toBeTruthy();
    expect(game.isAttackingPhase()).toBeFalsy();
})


test("Players cannot stop putting if there are ships remaining", () => {
    let game = new BattleshipGame();
    
    expect(()=>{game.playerTwoFinishesPutting()}).toThrow(Error);
    expect(()=>{game.playerTwoFinishesPutting()}).toThrow('Ships remaining');

    expect(()=>{game.playerOneFinishesPutting()}).toThrow(Error);
    expect(()=>{game.playerOneFinishesPutting()}).toThrow('Ships remaining');

    expect(game.isPlayerTwoPuttingShips()).toBeTruthy();
    expect(game.isPlayerOnePuttingShips()).toBeTruthy();
    expect(game.isPuttingPhase()).toBeTruthy();
    expect(game.isAttackingPhase()).toBeFalsy();
})

let bothPlayersEndPuttingPhase = function(game){
    game.playerTwoPutsShip(1, [0,0]);
    game.playerTwoPutsShip(1, [0,2]);
    game.playerTwoPutsShip(1, [0,4]);
    game.playerTwoPutsShip(1, [0,6]);
    game.playerTwoPutsShip(2, [2,0]);
    game.playerTwoPutsShip(2, [2,2]);
    game.playerTwoPutsShip(2, [2,4]);
    game.playerTwoPutsShip(3, [5,0]);
    game.playerTwoPutsShip(3, [5,2]);
    game.playerTwoPutsShip(4, [9,0], 'horizontal');

    game.playerOnePutsShip(1, [0,0]);
    game.playerOnePutsShip(1, [0,2]);
    game.playerOnePutsShip(1, [0,4]);
    game.playerOnePutsShip(1, [0,6]);
    game.playerOnePutsShip(2, [2,0]);
    game.playerOnePutsShip(2, [2,2]);
    game.playerOnePutsShip(2, [2,4]);
    game.playerOnePutsShip(3, [5,0]);
    game.playerOnePutsShip(3, [5,2]);
    game.playerOnePutsShip(4, [9,0], 'horizontal');
    
    game.playerTwoFinishesPutting();
    game.playerOneFinishesPutting();
}

test("Putting phase ends when both players finished putting", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);

    expect(game.isPlayerTwoPuttingShips()).toBeFalsy();
    expect(game.isPlayerOnePuttingShips()).toBeFalsy();
    expect(game.isPuttingPhase()).toBeFalsy();
    expect(game.isAttackingPhase()).toBeTruthy();
})

test("Player one can attack in attacking phase", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [0,0];
    let notAPositionToAttack = [0,1];

    game.playerOneAttacks(aPositionToAttack);
    expect(game.playerTwoAttackedAt(aPositionToAttack)).toBeTruthy();
    expect(game.playerTwoAttackedAt(notAPositionToAttack)).toBeFalsy();
})

test("Player one cannot attack in putting phase", () => {
    let game = new BattleshipGame();
    let aPositionToAttack = [0,0];

    expect(()=>{game.playerOneAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=>{game.playerOneAttacks(aPositionToAttack)}).toThrow("Is putting phase");

    expect(game.playerTwoAttackedAt(aPositionToAttack)).toBeFalsy();
})

test("Player two can attack in attacking phase", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [0,0];
    let notAPositionToAttack = [0,1];

    game.playerOneAttacks(aPositionToAttack);
    game.playerTwoAttacks(aPositionToAttack);
    expect(game.playerOneAttackedAt(aPositionToAttack)).toBeTruthy();
    expect(game.playerOneAttackedAt(notAPositionToAttack)).toBeFalsy();
})

test("Player two cannot attack in putting phase", () => {
    let game = new BattleshipGame();
    let aPositionToAttack = [0,0];

    expect(()=>{game.playerTwoAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=>{game.playerTwoAttacks(aPositionToAttack)}).toThrow("Is putting phase");

    expect(game.playerOneAttackedAt(aPositionToAttack)).toBeFalsy();
})

test("Players cannot attack in invalid positions", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [10,11];

    expect(()=> {game.playerOneAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=> {game.playerOneAttacks(aPositionToAttack)}).toThrow('Attack position must be between bounds');

    game.playerOneAttacks([0,0]);

    expect(()=> {game.playerTwoAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=> {game.playerTwoAttacks(aPositionToAttack)}).toThrow('Attack position must be between bounds');
})

test("Players cannot attack same position twice", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [1,1];

    game.playerOneAttacks(aPositionToAttack);
    game.playerTwoAttacks(aPositionToAttack);

    expect(()=> {game.playerOneAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=> {game.playerOneAttacks(aPositionToAttack)}).toThrow('Cannot attack same position twice');
    game.playerOneAttacks([0,1]);

    expect(()=> {game.playerTwoAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=> {game.playerTwoAttacks(aPositionToAttack)}).toThrow('Cannot attack same position twice');
})

test("Player two cannot attack outside its turn", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [1,1];

    expect(()=>{game.playerTwoAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=>{game.playerTwoAttacks(aPositionToAttack)}).toThrow("Wrong turn");
    expect(game.playerOneAttackedAt(aPositionToAttack)).toBeFalsy();
})

test("Player one cannot attack outside its turn", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [1,1];
    let anotherPositionToAttack = [1,2];

    game.playerOneAttacks(aPositionToAttack);

    expect(()=>{game.playerOneAttacks(anotherPositionToAttack)}).toThrow(Error);
    expect(()=>{game.playerOneAttacks(anotherPositionToAttack)}).toThrow("Wrong turn");
    expect(game.playerTwoAttackedAt(anotherPositionToAttack)).toBeFalsy();
})

