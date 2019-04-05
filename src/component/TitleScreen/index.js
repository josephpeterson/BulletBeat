import React from "react";
import "./main.css";

export default class TitleScreen extends React.Component {

  constructor(props)
  {
    super(props);
  }
  render() {    
    var canvas = this.props.game.canvas;
    return <div className="TitleScreen" style={{
        width: canvas.width,
        height: canvas.height
    }}>
        <h1>Bullet Beat</h1>
        <p>Interact with your music!</p>
        <button onClick={this.Play.bind(this)}>Play</button>
        <button>Help</button>
    </div>;
  }
  Play() {
    var game = this.props.game;
    //Preload objects
    game.test();
    game.toPlayScreen();
  }
  componentDidMount()
  {
    var game = this.props.game;
    game.reset();
  }
}