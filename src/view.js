// import Controller from "./controller.js";

class View{

    constructor(aGame){
        this.game = aGame;
    }

    createBoards(){
        
        const playerOneEnemyGrid = document.querySelector(".board-container .player-1-enemy table");
        const playerTwoEnemyGrid = document.querySelector(".board-container .player-2-enemy table");

        this.createPlayersSelfTable();
    }

    createPlayersSelfTable(){
        this.createPlayerSelfTable(1);
        this.createPlayerSelfTable(2);
    }

    createPlayerSelfTable(n){
        const playerSelfGrid = document.querySelector(`.board-container .player-${n}-self .table`);
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let newSquare = document.createElement('div');
                newSquare.classList.add('empty');
                newSquare.style.cssText = `--x: ${i}; --y: ${j}`;
                            
                playerSelfGrid.appendChild(newSquare);
            }
        }
    }

    updatePlayerSelf(n){

        let table = document.querySelector(`.board-container .player-${n}-self .table`);
        Array.from(table.children).forEach(square => {
            let style = window.getComputedStyle(square);
            let position = 
                [parseInt(style.getPropertyValue('--x')), 
                parseInt(style.getPropertyValue('--y'))];

            if(n == 1 && this.game.playerOneHasBoatIn(position)){
                square.style.backgroundColor = 'red';
            } else if (n == 2 && this.game.playerTwoHasBoatIn(position)){
                square.style.backgroundColor = 'red';
            }
        });
    }

    updatePlayerOneSelf(){
        this.updatePlayerSelf(1);
    }

    updatePlayerTwoSelf(){
        this.updatePlayerSelf(2);
    }

    playerOneFinishesPutting(){
        this.playerFinishesPutting(1);
    }

    playerTwoFinishesPutting(){
        this.playerFinishesPutting(2);
    }

    playerFinishesPutting(n){
        // Show a 'waiting' sign if corresponds, block the self board for player n
        let waiting;
        if (n == 1){
            if(this.game.isPlayerOnePuttingShips()) return;
            waiting = this.game.isPlayerTwoPuttingShips();
        } else {
            if(this.game.isPlayerTwoPuttingShips()) return;
            waiting = this.game.isPlayerOnePuttingShips();
        }

        if (waiting){
            this.putWaitingSign(n);
        }
    }

    putWaitingSign(n){

        const playerEnemyGrid = document.querySelector(`.board-container .player-${n}-enemy .table`);
        

        let messageContainer = document.createElement('div');
        messageContainer.classList.add('waiting-message-container');

        let message = document.createElement('h2');
        message.textContent = "Waiting for opponent";
        message.classList.add('waiting-message');
        playerEnemyGrid.appendChild(message);
    }


    sizeSelected(aSize){
        let buttons = Array.from(document.querySelectorAll('.controlls .size li'));
        buttons.forEach(button => {
            if(parseInt(button.textContent) == aSize){
                button.style.backgroundColor = 'red';
            } else {
                button.style.backgroundColor = 'white';    
            }
        }) 
    }

    orientationSelected(anOrientation){
        let buttons = Array.from(document.querySelectorAll('.controlls .orientation li'));
        buttons.forEach(button => {
            if(button.textContent == anOrientation){
                button.style.backgroundColor = 'red';
            } else {
                button.style.backgroundColor = 'white';    
            }
        }) 
    }

}

export default View;