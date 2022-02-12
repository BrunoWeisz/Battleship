class BattleshipPlayer{
    constructor(aNumber, aBattleshipGame){
        this.playerNumber = aNumber;
        this.game = aBattleshipGame;

        this.putting = true;

        this.ships = [];
        this.attackedPositions = [];
    }

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

    hasBeenAttackedAt(aPosition){
        return this.attackedPositions.some(pos => {
            return (pos[0] == aPosition[0] && pos[1] == aPosition[1]); 
        })
    }

    finishPutting(){
        if (this.ships.length < 10){
            throw new Error('Ships remaining');
        }
        this.putting = false;
    }

    isPutting(){
        return this.putting;
    }

    commandNewShip(length, position, orientation){
        this.game.playerPutsShip(this, length, position, orientation);
    }

    hasShipInPosition(position){
        return this.game.playerHasShipInPosition(this, position);
    }

    putNewShip(aShip){
        this.ships.push(aShip);
    }

    //----getters----//
    getShips(){
        return this.ships;
    }

    getNumber(){
        return this.playerNumber;
    }
    //---------------//

}

export default BattleshipPlayer;