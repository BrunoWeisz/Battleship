import BattleshipGame from '../model/battleship.js';

test("New game should have no boats", () => {
    let game = new BattleshipGame();

    expect(game.isEmpty()).toBeTruthy();
    expect(game.isPuttingPhase()).toBeTruthy();
})

test("Player 1 can put a boat of size 1 in valid position", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position = [0,0];
    game.playerOnePutsShip(size, position);

    expect(game.isEmpty()).toBeFalsy();
    expect(game.playerOneHasBoatIn(position)).toBeTruthy();
})

test("Boat put by player 1 should have integer size", () => {
    let game = new BattleshipGame();
    let size = "notInt";
    let position = [0,0];
    
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow("Ship length must be integer");
    expect(game.playerOneHasBoatIn(position)).toBeFalsy();
})

test("Boat put by player 1 should have array of length 2 as position", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position = "[0,0]";
    
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow("Ship position must be a length 2 array");
    expect(game.playerOneHasBoatIn(position)).toBeFalsy();
})

test("Boat put by player 1 should have integer positions", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position = ["hola","chau"];
    
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow("Ship position must be integer");
    expect(game.playerOneHasBoatIn(position)).toBeFalsy();
})

test("Boat put by player 1 should have inbound positions", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position = [12,11];
    
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow("Ship position must be between bounds");
    expect(game.playerOneHasBoatIn(position)).toBeFalsy();
})

test("Player 1 cannot put two boats of length 1 on same origin position", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position = [5,5];
    game.playerOnePutsShip(size, position);
    
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position)}).toThrow("Position already occupied");
    expect(game.playerOneHasBoatIn(position)).toBeTruthy();
})

test("Player 1 can put a boat of size 2 vertically", () => {
    let game = new BattleshipGame();
    let size = 2;
    let orientation = 'vertical';
    let position = [0,0];
    let position2 = [1,0]; 
    game.playerOnePutsShip(size, position, orientation);

    expect(game.isEmpty()).toBeFalsy();
    expect(game.playerOneHasBoatIn(position)).toBeTruthy();
    expect(game.playerOneHasBoatIn(position2)).toBeTruthy();
})

test("Player 1 cannot put a boat of size 2 vertically out of bounds", () => {
    let game = new BattleshipGame();
    let size = 2;
    let orientation = 'vertical';
    let position = [9,0];

    expect(()=>{game.playerOnePutsShip(size, position, 'vertical')}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position, 'vertical')}).toThrow('Ship position must be between bounds');
    expect(game.playerOneHasBoatIn(position)).toBeFalsy();
    expect(game.isEmpty()).toBeTruthy();
})

test("Player 1 cannot put a boat of size 2 vertically supraposing an existing one", () => {
    let game = new BattleshipGame();
    let size1 = 1;
    let orientation = 'vertical';
    let position1 = [9,0];
    game.playerOnePutsShip(size1, position1, orientation);
    let size2 = 2;
    let position2 = [8,0];

    expect(()=>{game.playerOnePutsShip(size2, position2, orientation)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size2, position2, orientation)}).toThrow('Position already occupied');
    expect(game.playerOneHasBoatIn(position1)).toBeTruthy();
    expect(game.playerOneHasBoatIn(position2)).toBeFalsy();
    expect(game.isEmpty()).toBeFalsy();
})

test("Player 1 can put a boat of size 2 horizontally", () => {
    let game = new BattleshipGame();
    let size = 2;
    let orientation = 'horizontal';
    let position = [0,0];
    let position2 = [0,1]; 

    game.playerOnePutsShip(size, position, orientation);
    expect(game.isEmpty()).toBeFalsy();
    expect(game.playerOneHasBoatIn(position)).toBeTruthy();
    expect(game.playerOneHasBoatIn(position2)).toBeTruthy();
})

test("Player 1 cannot put a boat of size 2 horizontally out of bounds", () => {
    let game = new BattleshipGame();
    let size = 2;
    let orientation = 'horizontal';
    let position = [0,9];

    expect(()=>{game.playerOnePutsShip(size, position, orientation)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position, orientation)}).toThrow('Ship position must be between bounds');
    expect(game.playerOneHasBoatIn(position)).toBeFalsy();
    expect(game.isEmpty()).toBeTruthy();
})

test("Player 1 cannot put a boat of size 2 horizontally supraposing an existing one", () => {
    let game = new BattleshipGame();
    let size1 = 1;
    let orientation = 'horizontal';
    let position1 = [0,1];
    game.playerOnePutsShip(size1, position1, orientation);
    let size2 = 2;
    let position2 = [0,0];

    expect(()=>{game.playerOnePutsShip(size2, position2, orientation)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size2, position2, orientation)}).toThrow('Position already occupied');
    expect(game.playerOneHasBoatIn(position1)).toBeTruthy();
    expect(game.playerOneHasBoatIn(position2)).toBeFalsy();
    expect(game.isEmpty()).toBeFalsy();
})

test("Orientation must be vertical or horizontal", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position = [5,5];
    let orientation = 1;
    
    expect(()=>{game.playerOnePutsShip(size, position, orientation)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position, orientation)}).toThrow("Orientation must be valid");
    expect(game.playerOneHasBoatIn(position)).toBeFalsy();
})

test("Ships cannot exceed 4 length", () => {
    let game = new BattleshipGame();
    let size = 5;
    let position = [0,0];
    let orientation = 'vertical';
    
    expect(()=>{game.playerOnePutsShip(size, position, orientation)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position, orientation)}).toThrow("Ship length must be 4 or less");
    expect(game.playerOneHasBoatIn(position)).toBeFalsy();
})

test("Player one can have at most 4 length 1 ships", () => {
    let game = new BattleshipGame();
    let size = 1;
    game.playerOnePutsShip(size, [0,0]);
    game.playerOnePutsShip(size, [0,2]);
    game.playerOnePutsShip(size, [0,4]);
    game.playerOnePutsShip(size, [0,6]);
    
    expect(()=>{game.playerOnePutsShip(size, [0,8])}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, [0,8])}).toThrow("Ship limit exceeded");
    expect(game.playerOneHasBoatIn([0,8])).toBeFalsy();
})

test("Player one can have at most 3 length 2 ships", () => {
    let game = new BattleshipGame();
    let size = 2;
    let orientation = 'vertical';
    game.playerOnePutsShip(size, [0,0], orientation);
    game.playerOnePutsShip(size, [0,2], orientation);
    game.playerOnePutsShip(size, [0,4], orientation);
    
    expect(()=>{game.playerOnePutsShip(size, [0,8], orientation)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, [0,8], orientation)}).toThrow("Ship limit exceeded");
    expect(game.playerOneHasBoatIn([0,8])).toBeFalsy();
})

test("Player one can have at most 2 length 3 ships", () => {
    let game = new BattleshipGame();
    let size = 3;
    let orientation = 'vertical';
    game.playerOnePutsShip(size, [0,0], orientation);
    game.playerOnePutsShip(size, [0,2], orientation);
    
    expect(()=>{game.playerOnePutsShip(size, [0,8], orientation)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, [0,8], orientation)}).toThrow("Ship limit exceeded");
    expect(game.playerOneHasBoatIn([0,8])).toBeFalsy();
})

test("Player one can have at most 1 length 4 ship", () => {
    let game = new BattleshipGame();
    let size = 4;
    let orientation = 'vertical';
    game.playerOnePutsShip(size, [0,0], orientation);
    
    expect(()=>{game.playerOnePutsShip(size, [0,8], orientation)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, [0,8], orientation)}).toThrow("Ship limit exceeded");
    expect(game.playerOneHasBoatIn([0,8])).toBeFalsy();
})

test("Player one ships cannot touch", () => {
    let game = new BattleshipGame();
    let size = 1;
    let position1 = [0,0], position2 = [0,1];
    game.playerOnePutsShip(size, position1);
    
    expect(()=>{game.playerOnePutsShip(size, position2)}).toThrow(Error);
    expect(()=>{game.playerOnePutsShip(size, position2)}).toThrow("Ships cannot touch");
    expect(game.playerOneHasBoatIn(position2)).toBeFalsy();
})

//-----------------------------------------------------//
