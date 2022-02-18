import BattleshipGame from './battleship.js';


test("Players are putting if there are ships remaining", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position1 = [0,0];
    game.playerOnePutsShip(size, position1);
    
    expect(game.isPlayerOnePuttingShips()).toEqual(true);
    expect(game.isPlayerTwoPuttingShips()).toEqual(true);
    expect(game.isPuttingPhase()).toEqual(true);
    expect(game.isAttackingPhase()).toEqual(false);
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
    expect(game.isPlayerOnePuttingShips()).toEqual(false);
    expect(game.isPlayerTwoPuttingShips()).toEqual(true);
    expect(game.isPuttingPhase()).toEqual(true);
    expect(game.isAttackingPhase()).toEqual(false);
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
    expect(game.isPlayerTwoPuttingShips()).toEqual(false);
    expect(game.isPlayerOnePuttingShips()).toEqual(true);
    expect(game.isPuttingPhase()).toEqual(true);
    expect(game.isAttackingPhase()).toEqual(false);
})


test("Players cannot stop putting if there are ships remaining", () => {
    let game = new BattleshipGame();
    
    expect(()=>{game.playerTwoFinishesPutting()}).toThrow(Error);
    expect(()=>{game.playerTwoFinishesPutting()}).toThrow('Ships remaining');

    expect(()=>{game.playerOneFinishesPutting()}).toThrow(Error);
    expect(()=>{game.playerOneFinishesPutting()}).toThrow('Ships remaining');

    expect(game.isPlayerTwoPuttingShips()).toEqual(true);
    expect(game.isPlayerOnePuttingShips()).toEqual(true);
    expect(game.isPuttingPhase()).toEqual(true);
    expect(game.isAttackingPhase()).toEqual(false);
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

    expect(game.isPlayerTwoPuttingShips()).toEqual(false);
    expect(game.isPlayerOnePuttingShips()).toEqual(false);
    expect(game.isPuttingPhase()).toEqual(false);
    expect(game.isAttackingPhase()).toEqual(true);
})

test("Player one can attack in attacking phase", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [0,0];
    let notAPositionToAttack = [0,1];

    game.playerOneAttacks(aPositionToAttack);
    expect(game.playerTwoAttackedAt(aPositionToAttack)).toEqual(true);
    expect(game.playerTwoAttackedAt(notAPositionToAttack)).toEqual(false);
})

test("Player one cannot attack in putting phase", () => {
    let game = new BattleshipGame();
    let aPositionToAttack = [0,0];

    expect(()=>{game.playerOneAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=>{game.playerOneAttacks(aPositionToAttack)}).toThrow("Is putting phase");

    expect(game.playerTwoAttackedAt(aPositionToAttack)).toEqual(false);
})

test("Player two can attack in attacking phase", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [0,0];
    let notAPositionToAttack = [0,1];

    game.playerOneAttacks(aPositionToAttack);
    game.playerTwoAttacks(aPositionToAttack);
    expect(game.playerOneAttackedAt(aPositionToAttack)).toEqual(true);
    expect(game.playerOneAttackedAt(notAPositionToAttack)).toEqual(false);
})

test("Player two cannot attack in putting phase", () => {
    let game = new BattleshipGame();
    let aPositionToAttack = [0,0];

    expect(()=>{game.playerTwoAttacks(aPositionToAttack)}).toThrow(Error);
    expect(()=>{game.playerTwoAttacks(aPositionToAttack)}).toThrow("Is putting phase");

    expect(game.playerOneAttackedAt(aPositionToAttack)).toEqual(false);
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
    expect(game.playerOneAttackedAt(aPositionToAttack)).toEqual(false);
    expect(game.isPlayerOneTurn()).toEqual(true);
    expect(game.isPlayerTwoTurn()).toEqual(false);
})

test("Player one cannot attack outside its turn", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [1,1];
    let anotherPositionToAttack = [1,2];

    game.playerOneAttacks(aPositionToAttack);

    expect(()=>{game.playerOneAttacks(anotherPositionToAttack)}).toThrow(Error);
    expect(()=>{game.playerOneAttacks(anotherPositionToAttack)}).toThrow("Wrong turn");
    expect(game.playerTwoAttackedAt(anotherPositionToAttack)).toEqual(false);
    expect(game.isPlayerOneTurn()).toEqual(false);
    expect(game.isPlayerTwoTurn()).toEqual(true);
})

test("Player 2 notices when player 1 hits ship", ()=>{
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [0,0];

    let hit = game.playerOneAttacks(aPositionToAttack);

    expect(hit).toEqual(true);
    expect(game.playerTwoHitAt(aPositionToAttack)).toEqual(true);
})

test("Player 2 notices when player 1 doesnt hit ship", ()=>{
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [1,0];

    let hit = game.playerOneAttacks(aPositionToAttack);

    expect(hit).toEqual(false);
    expect(game.playerTwoHitAt(aPositionToAttack)).toEqual(false);
})

test("Player 1 notices when player 2 hits ship", ()=>{
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [0,0];

    game.playerOneAttacks(aPositionToAttack);
    let hit = game.playerTwoAttacks(aPositionToAttack);

    expect(hit).toEqual(true);
    expect(game.playerOneHitAt(aPositionToAttack)).toEqual(true);
})

test("Player 1 notices when player 2 doesnt hit ship", ()=>{
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [1,0];

    game.playerOneAttacks(aPositionToAttack);
    let hit = game.playerTwoAttacks(aPositionToAttack);

    expect(hit).toEqual(false);
    expect(game.playerOneHitAt(aPositionToAttack)).toEqual(false);
})

test("Player one can sink player 2 ships of size 1", () => {
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    let aPositionToAttack = [0,0];
    game.playerOneAttacks(aPositionToAttack);

    expect(game.playerTwoSinkAt(aPositionToAttack)).toEqual(true);
})
