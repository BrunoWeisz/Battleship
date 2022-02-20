import BattleshipGame from "./model/battleship.js";

class Controller {
    constructor(aGame, aView){
        this.game = aGame;
        this.view = aView;
    }

    setUpStartButton(){
        let startButton = document.querySelector(".start-button");
        startButton.addEventListener('click', ev => {
            this.view.start();
        });
    }
}

export default Controller;