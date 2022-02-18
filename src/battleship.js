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

    isPuttingPhase(){
        return this.playerOne.isPutting() || this.playerTwo.isPutting();
    }

    isAttackingPhase(){
        return !(this.isPuttingPhase());
    }

    isEmpty(){
        return this.playerOne.hasNoShips() && this.playerTwo.hasNoShips(); 
    }

    playerOneAttacks(aPosition){
        this.chechCorrectTimeForAttack(this.playerOne);
        let hit = this.playerTwo.toBeAttackedAt(aPosition);
        this.turn = this.playerTwo;
        return hit;
    }

    playerTwoAttacks(aPosition){
        this.chechCorrectTimeForAttack(this.playerTwo)
        this.playerOne.toBeAttackedAt(aPosition);
        this.turn = this.playerOne;
    }

    playerTwoAttackedAt(aPosition){
        return this.playerTwo.hasBeenAttackedAt(aPosition);
    }

    playerOneAttackedAt(aPosition){
        return this.playerOne.hasBeenAttackedAt(aPosition);
    }

    playerTwoPutsShip(length, position, orientation){
        this.playerTwo.commandNewShip(length, position, orientation);
    }

    playerOnePutsShip(length, position, orientation){
        this.playerOne.commandNewShip(length, position, orientation);
    }

    playerOneHasBoatIn(position){
        return this.playerOne.hasShipInPosition(position);
    }

    playerTwoHasBoatIn(position){
        return this.playerTwo.hasShipInPosition(position);
    }

    playerOneFinishesPutting(){
        this.playerOne.finishPutting();
    }

    playerTwoFinishesPutting(){
        this.playerTwo.finishPutting();
    }

    isPlayerOnePuttingShips(){
        return this.playerOne.isPutting();
    }

    isPlayerTwoPuttingShips(){
        return this.playerTwo.isPutting();
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

    playerPutsShip(aPlayer, length, position, orientation){
        let aNewShip = new Ship(length, position, orientation);
        this.checkPlayerShipSuperposition(aPlayer,aNewShip);
        this.checkPlayerShipLimit(aPlayer, length);
        aPlayer.putNewShip(aNewShip);
    }

    // ------ Player Related Private Method ------ //

    checkPlayerShipLimit(aPlayer, length){
        if (aPlayer.shipLimitExceededForSize(length,5-length)){
            throw new Error('Ship limit exceeded');
        }   
    }

    checkPlayerShipSuperposition(aPlayer, aNewShip){
        if (aPlayer.shipSuperposesWith(aNewShip)){
            throw new Error('Position already occupied');
        }
        if (aPlayer.shipTouchesWith(aNewShip)){
            throw new Error('Ships cannot touch');
        }
    }


   
}

export default BattleshipGame;