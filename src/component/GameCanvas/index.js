import React from "react";
import ReactDOM from "react-dom";
import Game from "../../models/Game.js";

import InputReciever from "../../models/InputReciever.js";
import { Matter, Engine, Render, World, Bodies} from 'matter-js';


import "./main.css";

export default class GameCanvas extends React.Component {

  constructor(props)
  {
    super(props);
  }
  render() {
    return <div ref="game" id="game"></div>;
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

    //Bind input reciever
    this.inputReciever = new InputReciever(this);

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