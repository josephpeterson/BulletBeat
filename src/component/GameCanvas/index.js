import React from "react";
import ReactDOM from "react-dom";
import Game from "../../models/Game.js";

import InputReciever from "../../models/InputReciever.js";


import "./main.css";

export default class GameCanvas extends React.Component {

  constructor(props)
  {
    super(props);
  }
  render() {
    return <canvas ref="canvas" id="game"></canvas>;
  }
  componentDidMount()
  {
    var Canvas = this.getCanvas();

    Canvas.width = window.innerWidth;
    Canvas.height = window.innerHeight;

    //Bind input reciever
    this.inputReciever = new InputReciever(this);

    this.createNewGame();
  }
  getCanvas()
  {
    return this.refs.canvas;
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