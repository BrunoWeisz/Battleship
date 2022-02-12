class BattleshipPlayer{
    constructor(aNumber, aBattleshipGame){
        this.playerNumber = aNumber;
        this.ships = [];
        this.game = aBattleshipGame;
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