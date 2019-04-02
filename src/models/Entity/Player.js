import Entity from "./Entity.js";
import { KeyboardMap } from "../InputReciever.js";
import Victor from 'victor';
import Projectile from './Projectile.js';
import { Vector, Body } from "matter-js";

const ControllerMapping = {
	move_left: KeyboardMap.keyCode("A"),
	move_right: KeyboardMap.keyCode("D"),
	move_up: KeyboardMap.keyCode("W"),
	move_down: KeyboardMap.keyCode("S"),
}

export default class Player extends Entity {
	constructor(props) {
		var playerType = {
			shapeName: "Player 1",
			class: "PlayerObject",
			muzzleVelocity: 8,
			moveForce: Vector.create(0, 0)
		}
		super(Object.assign(playerType, props));
	}
	onKeyDown(evt) {
		this.checkControls();
	}
	onKeyUp(evt) {
		this.checkControls();
	}
	checkControls() {
		var speed = 2;
		var input = this.game.inputReciever;

		var controls = {
			move_left: input.getKey(ControllerMapping.move_left),
			move_right: input.getKey(ControllerMapping.move_right),
			move_up: input.getKey(ControllerMapping.move_up),
			move_down: input.getKey(ControllerMapping.move_down),
		}
		var x = 0;
		var y = 0;
		if (controls.move_left)
			x += -speed;
		if (controls.move_right)
			x += speed;
			if (controls.move_up)
			y += -speed;
		if (controls.move_down)
			y += speed;
		this.moveForce = Vector.create(x,y);
	}
	update(event) {
		Body.setVelocity(this.body, this.moveForce);
		super.update(event);
	}
	render() {
		super.render();
		var ctx = this.game.gameCanvas.getContext();
		ctx.save();

		//ShapeName
		var w = this.body.bounds.max.x-this.body.bounds.min.x;
		var x = (this.body.bounds.min.x + w/2);
		var y = (this.body.bounds.min.y);
		ctx.translate(x, y-10);
		ctx.font = "12pt Calibri";
		ctx.textAlign = "center";
		ctx.fillText(this.shapeName + " (" + this.health + "/" + this.maxHealth + ")", 0, -22);

		//Health bar
		ctx.fillStyle = "black";
		var p = {
			x: -50,
			y: -10,
			w: 100,
			h: 10
		}
		ctx.fillRect(p.x, p.y, p.w, p.h);
		ctx.fillStyle = "limegreen";
		ctx.fillRect(p.x + 1, p.y + 1, (p.w - 2) * (this.health / this.maxHealth), p.h - 2);

		ctx.restore();
	}

	onMouseClick(evt) {
		var reciever = this.game.inputReciever;
		this.fire(reciever.getWorldPosition(evt));
	}
	fire(des) {
		var y = des.y - this.position.y;
		var x = des.x - this.position.x;

		var vel = Vector.create(x, y);
		vel = Vector.normalise(vel);

        var pos = Vector.add(this.position,Vector.mult(vel,80));

        vel.x *= this.muzzleVelocity;
		vel.y *= this.muzzleVelocity;
		var p = new Projectile({
			position: pos,
			velocity: vel
		});
		this.game.objects.push(p);
	}
}