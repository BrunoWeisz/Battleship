import BattleshipGame from './battleship.js';
import {bothPlayersEndPuttingPhase} from './battleship_end_putting.test';

let almostAllShipsSinked = function(game){
    game.playerOneAttacks([0,0]);
    game.playerTwoAttacks([0,0]);
    game.playerOneAttacks([0,2]);
    game.playerTwoAttacks([0,2]);
    game.playerOneAttacks([0,4]);
    game.playerTwoAttacks([0,4]);
    game.playerOneAttacks([0,6]);
    game.playerTwoAttacks([0,6]);
    game.playerOneAttacks([2,0]);
    game.playerTwoAttacks([2,0]);
    game.playerOneAttacks([3,0]);
    game.playerTwoAttacks([3,0]);
    game.playerOneAttacks([2,2]);
    game.playerTwoAttacks([2,2]);
    game.playerOneAttacks([3,2]);
    game.playerTwoAttacks([3,2]);
    game.playerOneAttacks([2,4]);
    game.playerTwoAttacks([2,4]);
    game.playerOneAttacks([3,4]);
    game.playerTwoAttacks([3,4]);
    game.playerOneAttacks([5,0]);
    game.playerTwoAttacks([5,0]);
    game.playerOneAttacks([6,0]);
    game.playerTwoAttacks([6,0]);
    game.playerOneAttacks([7,0]);
    game.playerTwoAttacks([7,0]);
    game.playerOneAttacks([5,2]);
    game.playerTwoAttacks([5,2]);
    game.playerOneAttacks([6,2]);
    game.playerTwoAttacks([6,2]);
    game.playerOneAttacks([7,2]);
    game.playerTwoAttacks([7,2]);
    game.playerOneAttacks([9,0]);
    game.playerTwoAttacks([9,0]);
    game.playerOneAttacks([9,1]);
    game.playerTwoAttacks([9,1]);
    game.playerOneAttacks([9,2]);
    game.playerTwoAttacks([9,2]);
}

let playerOneSinksAllShips = function(game){
    almostAllShipsSinked(game);
    game.playerOneAttacks([9,3]);
}

let playerTwoSinksAllShips = function(game){
    almostAllShipsSinked(game);
    game.playerOneAttacks([9,4]);
    game.playerTwoAttacks([9,3]);
}


test('Player One wins when sinks all player two ships', ()=>{
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    playerOneSinksAllShips(game);

    expect(game.isGameOver()).toEqual(true);
    expect(game.isPuttingPhase()).toEqual(false);
    expect(game.isAttackingPhase()).toEqual(false);
    expect(game.isPlayerOneWinner()).toEqual(true);
    expect(game.isPlayerTwoWinner()).toEqual(false);
})

test('Player Two wins when sinks all player one ships', ()=>{
    let game = new BattleshipGame();
    bothPlayersEndPuttingPhase(game);
    playerTwoSinksAllShips(game);

    expect(game.isGameOver()).toEqual(true);
    expect(game.isPuttingPhase()).toEqual(false);
    expect(game.isAttackingPhase()).toEqual(false);
    expect(game.isPlayerOneWinner()).toEqual(false);
    expect(game.isPlayerTwoWinner()).toEqual(true);
})

test('No hay ganador si el juego no termino', ()=>{});