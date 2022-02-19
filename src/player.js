import Board from './board.js';

class BattleshipPlayer{
    constructor(aNumber, aBattleshipGame){
        this.playerNumber = aNumber;
        this.game = aBattleshipGame;
        this.putting = true;
        this.board = new Board();
    }

    // ---- Actions / board ---- //

    toBeAttackedAt(aPosition){
        return this.board.toBeAttackedAt(aPosition);
    }

    commandNewShip(length, position, orientation){
        this.board.commandNewShip(length, position, orientation);
    }

    // ---- actions / player ---- //

    finishPutting(){
        if (this.board.areShipsRemaining()){
            throw new Error('Ships remaining');
        }
        this.putting = false;
    }

    // ---- testing / board ---- //

    lost(){
        return this.board.allShipsSink();
    }

    hasBeenAttackedAt(aPosition){
        return this.board.hasBeenAttackedAt(aPosition);
    }

    hasShipInPosition(position){
        return this.board.hasShipInPosition(position);
    }

    hasNoShips(){
        return this.board.hasNoShips();
    }

    hitAt(aPosition){
        return this.board.hitAt(aPosition);
    }

    sinkAt(aPosition){
        return this.board.sinkAt(aPosition);
    }

    // ---- testing / player ---- //

    isPutting(){
        return this.putting;
    }

    //----getters (unused)----//
    getShips(){
        return this.ships;
    }

    getNumber(){
        return this.playerNumber;
    }
    //---------------//

}

export default BattleshipPlayer;