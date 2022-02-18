import Ship from "./ship";

class Board {
    constructor(){
        this.ships = [];
        this.attackedPositions = [];
    }

    // ---- actions ---- //

    toBeAttackedAt(aPosition){
        this.assertPositionCanBeAttacked(aPosition);
        this.attackedPositions.push(aPosition);
        return this.hasShipInPosition(aPosition);
    }

    placeShip(aShip){
        this.ships.push(aShip);
    }

    commandNewShip(length, position, orientation){
        let aNewShip = new Ship(length, position, orientation);
        this.checkShipSuperposition(aNewShip);
        this.checkShipLimit(length);
        this.placeShip(aNewShip);
    }

    // ---- testing ---- //

    

    hitAt(aPosition){
        return this.hasShipInPosition(aPosition) &&
               this.positionAlreadyAttacked(aPosition);
    }

    sinkAt(aPosition){
        return (this.hasShipInPosition(aPosition) &&
               this.shipAtPosition(aPosition).isSink());
    }

    areShipsRemaining(){
        return this.ships.length < 10;
    }

    hasShipInPosition(position){
        return this.ships.some(aShip => {
            return aShip.hasPosition(position);
        })
    }

    hasNoShips(){
        return this.ships.length == 0;
    }

    // ---- private ---- //

    shipAtPosition(aPosition){
        let ship = this.ships.filter(aShip => {
            return aShip.hasPosition(aPosition);
        })[0];

        return ship;
    }

    assertPositionCanBeAttacked(aPosition){
        if(!this.positionInBounds(aPosition)){
            throw new Error('Attack position must be between bounds');
        }
        if(this.positionAlreadyAttacked(aPosition)){
            throw new Error('Cannot attack same position twice');
        }
    }

    positionInBounds(aPosition){
        return aPosition[0] >= 0 && aPosition[0] < 10 
            && aPosition[1] >= 0 && aPosition[1] < 10;
    }

    positionAlreadyAttacked(aPosition){
        return this.attackedPositions.some((attackedPosition) => {
            return attackedPosition[0] == aPosition[0] &&
                   attackedPosition[1] == aPosition[1]; 
            })
    }

    checkShipLimit(length){
        if (this.shipLimitExceededForSize(length,5-length)){
            throw new Error('Ship limit exceeded');
        }   
    }

    checkShipSuperposition(aNewShip){
        if (this.shipSuperposesWith(aNewShip)){
            throw new Error('Position already occupied');
        }
        if (this.shipTouchesWith(aNewShip)){
            throw new Error('Ships cannot touch');
        }
    }

    hasBeenAttackedAt(aPosition){
        return this.attackedPositions.some(pos => {
            return (pos[0] == aPosition[0] && pos[1] == aPosition[1]); 
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

    shipLimitExceededForSize(shipLength, maxAllowedAmount){
        return (this.ships.filter(aShip => {
            return aShip.size() == shipLength;
        }).length) == maxAllowedAmount  
    }
}

export default Board;