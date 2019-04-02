import React from "react";
import ReactDOM from "react-dom";
import Game from "../../models/Game.js";

import { Matter, Engine, Render, World, Bodies} from 'matter-js';


import "./main.css";

export default class GameCanvas extends React.Component {

  constructor(props)
  {
    super(props);
  }
  render() {
    return <div>
        <div id="game" ref="game"></div>
        <img id="rocket" src="./rocket.png"/>
        <img id="fighter" src="./fighter.png"/>
        <img id="asteroid" src="./asteroid.png"/>
    </div>;
  }
  componentDidMount()
  {
    //Matter-js: Create engine
    this.engine = Engine.create();

    this.engine.world.gravity.y = 0;

    //Matter-js: Create renderer
    this.renderer = Render.create({
        element: this.refs.game,
        engine: this.engine
    });

    this.createNewGame();
  }
  getCanvas()
  {
    return this.refs.game.children[0];
  }
  getContext()
  {
    return this.getCanvas().getContext('2d');
  }
  createNewGame()
  {
    var game = new Game(this);

    game.start();
  }
}