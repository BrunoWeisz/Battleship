/*Requirements of the game:

Ships{
    -length
    -where have been hit
    -have been sunk
    -hit(n)
    -isSunk()
}

Gameboard{
    -Place ships at coordinates
    -receiveAttack() -> sends 'hit()' to a ship
    -remember attack positions 
}*/

import _ from 'lodash';
import Ship from './ship.js';
import BattleshipPlayer from './player.js';

class BattleshipGame {

    constructor(){
        this.playerOne = new BattleshipPlayer(1,this);
        this.playerTwo = new BattleshipPlayer(2,this);
        this.turn = this.playerOne;
    }

    //----------Interface------------//

    // ---- player actions ---- //

    playerTwoPutsShip(length, position, orientation){
        this.playerTwo.commandNewShip(length, position, orientation);
    }

    playerOnePutsShip(length, position, orientation){
        this.playerOne.commandNewShip(length, position, orientation);
    }

    playerOneFinishesPutting(){
        this.playerOne.finishPutting();
    }

    playerTwoFinishesPutting(){
        this.playerTwo.finishPutting();
    }

    playerOneAttacks(aPosition){
        this.chechCorrectTimeForAttack(this.playerOne);
        let hit = this.playerTwo.toBeAttackedAt(aPosition);
        this.turn = this.playerTwo;
        return hit;
    }

    playerTwoAttacks(aPosition){
        this.chechCorrectTimeForAttack(this.playerTwo)
        let hit = this.playerOne.toBeAttackedAt(aPosition);
        this.turn = this.playerOne;
        return hit;
    }

    // ---- testing ---- //

    isPuttingPhase(){
        return this.playerOne.isPutting() || this.playerTwo.isPutting();
    }

    isAttackingPhase(){
        return !(this.isPuttingPhase());
    }

    isEmpty(){
        return this.playerOne.hasNoShips() && this.playerTwo.hasNoShips(); 
    }

    playerTwoAttackedAt(aPosition){
        return this.playerTwo.hasBeenAttackedAt(aPosition);
    }

    playerOneAttackedAt(aPosition){
        return this.playerOne.hasBeenAttackedAt(aPosition);
    }

    playerOneHasBoatIn(position){
        return this.playerOne.hasShipInPosition(position);
    }

    playerTwoHasBoatIn(position){
        return this.playerTwo.hasShipInPosition(position);
    }

    isPlayerOnePuttingShips(){
        return this.playerOne.isPutting();
    }

    isPlayerTwoPuttingShips(){
        return this.playerTwo.isPutting();
    }

    isPlayerOneTurn(){
        return this.playerOne == this.turn;
    }

    isPlayerTwoTurn(){
        return this.playerTwo == this.turn;
    }

    playerTwoHitAt(aPosition){
        return this.playerTwo.hitAt(aPosition);
    }

    playerOneHitAt(aPosition){
        return this.playerOne.hitAt(aPosition);
    }

    playerTwoSinkAt(aPosition){
        return this.playerTwo.sinkAt(aPosition);
    }

    //---private methods---//

    chechCorrectTimeForAttack(aPlayer){
        if (this.isPuttingPhase()){
            throw new Error('Is putting phase');
        }
        if (this.turn !== aPlayer){
            throw new Error('Wrong turn');
        }
    }  
}

export default BattleshipGame;