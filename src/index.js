import Controller from "./controller.js";
import View from "./view.js";
import BattleshipGame from "./model/battleship.js";

// const Controller = require('./controller.js');
// const View = require('./view.js');
// const BattleshipGame = require('./model/battleship.js');

let game = new BattleshipGame();
let view = new View()
let controller = new Controller(game, view);
controller.setUpStartButton();
