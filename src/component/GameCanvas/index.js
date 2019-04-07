import React from "react";
import Game from "../../models/Game.js";
import TitleScreen from "../TitleScreen/index.js";
import ScreenController from "../ScreenController";
import "./main.css";




export default class GameCanvas extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			screen: undefined
		}
	}
	render() {
		return <div>
			<div id="CurrentScreen" ref="screen">
				<ScreenController ref="screenController"/>
			</div>
			<div id="game" ref="game"></div>
			<img id="rocket" src="./rocket.png" />
			<img id="fighter" src="./fighter.png" />
			<img id="asteroid" src="./asteroid.png" />
		</div>;
	}
	componentDidMount() {
		setTimeout(() => this.createNewGame(), 0);
	}
	setScreen(scrn) {
		this.refs.screenController.switchToScreen(scrn);
	}
	getScreen() {
		return this.refs.screenController.refs.screenComponent;
	}
	getGameContainer() {
		return this.refs.game;
	}
	createNewGame() {
		var game = this.game = new Game(this);
		this.refs.screenController.game = game;
		game.test();
		game.toPlayScreen();
	}
}