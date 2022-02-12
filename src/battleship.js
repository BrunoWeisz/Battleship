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

class BattleshipGame {

    constructor(){
        this.empty = true;
        this.playerOneShipPositions = [];
    }

    isPuttingPhase(){
        return true;
    }
    isEmpty(){
        return this.empty;
    }
    //--------Type Checks------------------------------------//
    typeCheckLength(length){
        if(!_.isInteger(length)) {throw new Error("Ship length must be integer")}
    }
    typeCheckPosition(position){
        if(!(_.isArray(position) && position.length == 2)){
            throw new Error('Ship position must be a length 2 array');
        }
        if(!(_.isInteger(position[0]) && _.isInteger(position[1]))){
            throw new Error('Ship position must be integer');
        }
        
    }
    //-------------------------------------------------------//

    playerOnePutsShip(length, position, orientation){
        
        this.typeCheckLength(length);
        this.typeCheckPosition(position);

        if(!(position[0] >= 0 && position[0] < 10 && 
            position[1] >= 0 && position[1] < 10)){
           throw new Error('Ship position must be between bounds');
        }
        if (this.playerOneHasBoatIn(position)){
            throw new Error('Position already occupied');
        }
        
        if (length == 1) {
            this.playerOneShipPositions.push(position);
            this.empty = false;
            return
        };
        
        if (length == 2) {
            if (orientation == 'horizontal'){
                if (length - 1 + position[1] >= 10){
                    throw new Error('Ship position must be between bounds');
                }
                if (this.playerOneHasBoatIn([position[0], position[1]+1])){
                    throw new Error('Position already occupied');
                }
                this.playerOneShipPositions.push(position);
                this.playerOneShipPositions.push([position[0], position[1]+1]);
                this.empty = false;

            }else if (orientation == 'vertical'){    

                if (length - 1 + position[0] >= 10){
                    throw new Error('Ship position must be between bounds');
                }
                if (this.playerOneHasBoatIn([position[0]+1, position[1]])){
                    throw new Error('Position already occupied');
                }
                this.playerOneShipPositions.push(position);
                this.playerOneShipPositions.push([position[0]+1, position[1]]);
                this.empty = false;
            }
        }
        // let newShip = new Ship(length,position,orientation);
        
    }
    playerOneHasBoatIn(position){
        return this.playerOneShipPositions.some(pos => {
            return position[0] == pos[0] && position[1] == pos[1];
        });
    }
}

export default BattleshipGame;