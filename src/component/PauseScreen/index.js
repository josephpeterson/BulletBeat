import React from "react";
import "./main.css";

export default class PauseScreen extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		var canvas = this.props.game.canvas;

		var buttons = [
			() => this.props.game.toPlayScreen(),
			() => this.props.game.toPlayScreen(),
			() => this.props.game.toPlayScreen(),
			() => this.props.game.toTitleScreen()
		];
		return <div className="PauseScreen" style={{
			width: canvas.width,
			height: canvas.height
		}}>
			<div className="container">
				<button onClick={buttons[0]}>Resume</button>
				<button onClick={buttons[1]}>Stats</button>
				<button onClick={buttons[2]}>Controls</button>
				<button onClick={buttons[3]}>Quit Game</button>
			</div>

		</div>;
	}
	componentDidMount() {
		var game = this.props.game;
		game.stop();
	}

}