import React from "react";
import "./main.css";

export default class PauseScreen extends React.Component {

  constructor(props)
  {
    super(props);
  }
  render() {    
    var canvas = this.props.game.canvas;
    return <div className="PauseScreen" style={{
        width: canvas.width,
        height: canvas.height
    }}>
    Game Paused</div>;
  }
  componentDidMount()
  {
    var game = this.props.game;
    game.stop();
  }
  
}