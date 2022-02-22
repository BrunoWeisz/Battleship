// import Controller from "./controller.js";

class View{

    constructor(aGame){
        this.game = aGame;
    }

    createBoards(){
        this.createPlayersSelfTable();
    }

    createPlayersSelfTable(){
        this.createPlayerSelfTable(1);
        this.createPlayerSelfTable(2);
    }

    createPlayersEnemyTable(){
        this.createPlayerEnemyTable(1);
        this.createPlayerEnemyTable(2);
    }

    createTable(n, which){
        console.log(`creating ${which} table for player ${n}`);
        const playerGrid = document.querySelector(`.board-container .player-${n}-${which} .table`);
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let newSquare = document.createElement('div');
                newSquare.classList.add('empty');
                newSquare.style.cssText = `--x: ${i}; --y: ${j}`;
                            
                playerGrid.appendChild(newSquare);
            }
        }
    }

    createPlayerEnemyTable(n){
        document.querySelector(`.board-container .player-${n}-enemy`).classList.add('board');
        let message = document.querySelector('.waiting-message');
        if (message) message.parentNode.removeChild(message);
        this.createTable(n, 'enemy');
    }

    createPlayerSelfTable(n){
        this.createTable(n, 'self');
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

        this.putWaitingSign(n);        
    }

    startAttackingPhase(){
        this.createPlayersEnemyTable();
    }

    putWaitingSign(n){

        const playerEnemyGrid = document.querySelector(`.board-container .player-${n}-enemy`);

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