class BattleshipPlayer{
    constructor(aNumber, aBattleshipGame){
        // ---- player ---- //
        this.playerNumber = aNumber;
        this.game = aBattleshipGame;
        this.putting = true;

        // ---- board ---- //
        this.ships = [];
        this.attackedPositions = [];
    }

    // ---- Actions / board ---- //

    toBeAttackedAt(aPosition){
        if(!(aPosition[0] >= 0 && aPosition[0] < 10 && 
            aPosition[1] >= 0 && aPosition[1] < 10)){
           throw new Error('Attack position must be between bounds');
        }
        if(this.attackedPositions.some((attackedPosition) => {
            return attackedPosition[0] == aPosition[0] &&
                   attackedPosition[1] == aPosition[1]; 
        })){
            throw new Error('Cannot attack same position twice');
        }
        this.attackedPositions.push(aPosition);
        
    }

    putNewShip(aShip){
        this.ships.push(aShip);
    }

    // ---- actions / player ---- //

    finishPutting(){
        if (this.ships.length < 10){
            throw new Error('Ships remaining');
        }
        this.putting = false;
    }

    commandNewShip(length, position, orientation){
        this.game.playerPutsShip(this, length, position, orientation);
    }

    // ---- testing / board ---- //

    hasBeenAttackedAt(aPosition){
        return this.attackedPositions.some(pos => {
            return (pos[0] == aPosition[0] && pos[1] == aPosition[1]); 
        })
    }

    hasShipInPosition(position){
        return this.ships.some(aShip => {
            return aShip.hasPosition(position);
        })
    }

    shipTouchesWith(aShip){
        return this.ships.some(anotherShip => {
            return anotherShip.touchesWith(aShip);
        })
    }

    shipSuperposesWith(aShip){
        return this.ships.some(anotherShip => {
            return anotherShip.superposesWith(aShip);
        })
    }

    hasNoShips(){
        return this.ships.length == 0;
    }

    shipLimitExceededForSize(shipLength, maxAllowedAmount){
        return (this.ships.filter(aShip => {
            return aShip.size() == shipLength;
        }).length) == maxAllowedAmount  
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