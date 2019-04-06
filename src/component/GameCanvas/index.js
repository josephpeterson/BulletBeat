import React from "react";
import ReactDOM from "react-dom";
import Game from "../../models/Game.js";

import { Matter, Engine, Render, World, Bodies} from 'matter-js';


import "./main.css";

export default class GameCanvas extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
        screen: <></>
    }
  }
  render() {
    var screen = this.state.screen;
    return <div>
        <div id="CurrentScreen" ref="screen">
            {screen}
        </div>
        <div id="game" ref="game"></div>
        <img id="rocket" src="./rocket.png"/>
        <img id="fighter" src="./fighter.png"/>
        <img id="asteroid" src="./asteroid.png"/>
    </div>;
  }
  componentDidMount()
  {
    setTimeout(() => this.createNewGame(),0);
  }
  setScreen(scrn)
  {
      this.setState({
          screen: scrn
      });
  }
  getGameContainer()
  {
    return this.refs.game;
  }
  createNewGame()
  {
    var game = new Game(this);
    game.test();
    game.toPauseScreen();
  }
}