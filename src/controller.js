import BattleshipGame from "./model/battleship.js";

class Controller {
    constructor(aGame, aView){
        this.game = aGame;
        this.view = aView;
        this.selectedSize = 1;
        this.selectedOrientation = 'vertical';
    }

    startListening(){

        console.log('listening');
        this.view.createBoards();
        this.attachClickListeners();
    }

    attachClickListeners(){
        this.attachControllsListeners();
        this.view.sizeSelected(this.selectedSize);
        this.view.orientationSelected(this.selectedOrientation);

        this.attachPlayersListeners();
    }

    attachSizeListeners(){
        let sizeButtons = Array.from(document.querySelectorAll('.controlls .size li'));
        sizeButtons.forEach(aButton => {
            aButton.addEventListener('click', (ev) => {
                let newSize = parseInt(ev.target.textContent);
                this.selectedSize = newSize;
                this.view.sizeSelected(newSize);
                
            })
        })
    }

    attachOrientationListeners(){
        let orientationButtons = Array.from(document.querySelectorAll('.controlls .orientation li'));
        orientationButtons.forEach(aButton => {
            aButton.addEventListener('click', (ev) => {
                let newOrientation = ev.target.textContent;
                console.log(newOrientation);
                this.selectedOrientation = newOrientation;
                this.view.orientationSelected(newOrientation);
                
            })
        })
    }

    attachControllsListeners(){
        this.attachSizeListeners();
        this.attachOrientationListeners();
    }

    attachPlayersListeners(){
        this.attachPlayerListener(1);
        this.attachPlayerListener(2);
    }

    attachPlayerListener(n){
        let table = document.querySelector(`.board-container .player-${n}-self .table`);
        Array.from(table.children).forEach(square => {
            square.addEventListener('click', (ev) => {
                let style = window.getComputedStyle(ev.target);
                let positionClicked = 
                    [parseInt(style.getPropertyValue('--x')), 
                     parseInt(style.getPropertyValue('--y'))];
                this.putBoat(positionClicked, n);
            })
        })

        let readyButton = document.querySelector(`.board-container .player-${n}-ready`);
        readyButton.addEventListener('click', (ev) => {
            if (n == 1){
                this.game.playerOneFinishesPutting();
                this.view.playerOneFinishesPutting();
            } else {
                this.game.playerTwoFinishesPutting();
                this.view.playerTwoFinishesPutting();
            }    
        })   
        
        let randomButton = document.querySelector(`.board-container .random-disposition-${n}`);
        randomButton.addEventListener('click', ev => {
            this.putRandomShips(n);
        })
    }

    putBoat(aPosition, aPlayerNumber){ // handle exceptions.
        if (aPlayerNumber == 1){
            this.game.playerOnePutsShip(this.selectedSize, aPosition, this.selectedOrientation);
        } else {
            this.game.playerTwoPutsShip(this.selectedSize, aPosition, this.selectedOrientation);
        }
        
        this.view.updatePlayerSelf(aPlayerNumber);
    }

    putRandomShips(n){
        let func = (n == 1) ? this.game.playerOnePutsShip : this.game.playerTwoPutsShip;
        func.call(this.game, 1,[0,0], 'vertical');
        func.call(this.game, 1,[0,2], 'vertical');
        func.call(this.game, 1,[0,4], 'vertical');
        func.call(this.game, 1,[0,6], 'vertical');
        func.call(this.game, 2,[2,0], 'vertical');
        func.call(this.game, 2,[2,2], 'vertical');
        func.call(this.game, 2,[2,4], 'vertical');
        func.call(this.game, 3,[5,0], 'vertical');
        func.call(this.game, 3,[5,2], 'vertical');
        func.call(this.game, 4,[9,0], 'horizontal');
        
        this.view.updatePlayerSelf(n);
    }


}

export default Controller;