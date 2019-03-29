import React from "react";
import ReactDOM from "react-dom";
import GameCanvas from "./component/GameCanvas";
import "./main.css";

class MainWrapper extends React.Component {
  render() {
    return <GameCanvas/>;
  }
}
ReactDOM.render(<MainWrapper/>, document.getElementById("app"));