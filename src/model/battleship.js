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

    isGameOver(){
        return true;
    }

    isPuttingPhase(){
        return this.playerOne.isPutting() || this.playerTwo.isPutting();
        // return this.isPlayerOnePuttingShips() || this.isPlayerTwoPuttingShips.
    }

    isAttackingPhase(){
        // return !(this.isPuttingPhase());
        return (!this.gameEnded()) && (!this.isPuttingPhase());
    }

    isPlayerOneWinner(){
        return this.playerTwo.lost();
    }

    isPlayerTwoWinner(){
        return this.playerOne.lost();
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

    playerOneSinkAt(aPosition){
        return this.playerOne.sinkAt(aPosition);
    }

    playerTwoSinkAt(aPosition){
        return this.playerTwo.sinkAt(aPosition);
    }

    //---private methods---//

    gameEnded(){
        return this.playerOne.lost() || this.playerTwo.lost();
    }

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