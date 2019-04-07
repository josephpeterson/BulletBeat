import React from "react";
import "./main.css";

export default class PlayScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			maxHealth: 0,
			health: 0,
		}
	}
	render() {
		var canvas = this.props.game.canvas;

		const sprite = window.sprite;
		var score = sprite.score;
		var health = sprite.health;
		var maxHealth = sprite.maxHealth;

		return <div className="PlayScreen" style={{
			width: canvas.width,
			height: 100
		}}>
			<div className="hudContainer">
				<span>Score: {score}</span>
				<span>Healh: {health}/{maxHealth}</span>
				<progress value={health} max={maxHealth}></progress>
			</div>
		</div>;
	}
	componentDidMount() {
	}

}