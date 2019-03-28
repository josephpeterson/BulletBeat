import React from "react";
import ReactDOM from "react-dom";
import GameCanvas from "./component/GameCanvas";


class MainWrapper extends React.Component {
  render() {
    return <GameCanvas/>;
  }
}
ReactDOM.render(<MainWrapper/>, document.getElementById("app"));