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
    }

    //----------Interface------------//

    isPuttingPhase(){
        return true;
    }
    isEmpty(){
        return this.playerOne.getShips().length + this.playerTwo.getShips().length == 0;
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

    //---private methods---//

    checkPlayerShipLimit(aPlayer, length){
        if (this.playerShipLimitExceededForSize(aPlayer,length,5-length)){
            throw new Error('Ship limit exceeded');
        }   
    }

    checkPlayerShipSuperposition(aPlayer, aNewShip){
        if (this.playerShipsSuperposeWith(aPlayer, aNewShip)){
            throw new Error('Position already occupied');
        }
        if (this.playerShipsTouchWith(aPlayer,aNewShip)){
            throw new Error('Ships cannot touch');
        }
    }

    playerShipLimitExceededForSize(aPlayer, shipLength, maxAllowedAmount){
        return (aPlayer.getShips().filter(aShip => {
            return aShip.size() == shipLength;
        }).length) == maxAllowedAmount     
    }

    playerPutsShip(aPlayer, length, position, orientation){
        let aNewShip = new Ship(length, position, orientation);
        this.checkPlayerShipSuperposition(aPlayer,aNewShip);
        this.checkPlayerShipLimit(aPlayer, length);
        aPlayer.putNewShip(aNewShip);
    }

    playerHasShipInPosition(aPlayer, position){
        return aPlayer.getShips().some(aShip => {
            return aShip.hasPosition(position);
        })
    }

    playerShipsSuperposeWith(aPlayer, aShip){
        return aPlayer.getShips().some(anotherShip => {
            return anotherShip.superposesWith(aShip);
        })
    }

    playerShipsTouchWith(aPlayer, aShip){
        return aPlayer.getShips().some(anotherShip => {
            return anotherShip.touchesWith(aShip);
        })  
    }  
}

export default BattleshipGame;