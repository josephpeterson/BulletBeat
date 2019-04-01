import Entity from "../Entity.js";
import { KeyboardMap } from "../InputReciever.js";
import Victor from 'victor';
import Projectile from '../Projectile.js';
import { Vector, Body } from "matter-js";

export default class PlayerObject extends Entity {
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
		var input = this.game.gameCanvas.inputReciever;

		var controls = {
			move_left: input.getKey(KeyboardMap.KEY_LEFT),
			move_right: input.getKey(KeyboardMap.KEY_RIGHT),
			move_up: input.getKey(KeyboardMap.KEY_UP),
			move_down: input.getKey(KeyboardMap.KEY_DOWN),
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
		var x = Math.round(this.position.x);
		var y = Math.round(this.position.y);
		ctx.translate(x, y - 60);
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
		var m = Vector.create(evt.clientX, evt.clientY);
		this.fire(m);
	}
	fire(des) {
		var y = des.y - this.position.y;
		var x = des.x - this.position.x;

		var vel = Vector.create(x, y);
		vel = Vector.normalise(vel);

        var pos = Vector.add(this.position,Vector.mult(vel,60));

        vel.x *= this.muzzleVelocity;
		vel.y *= this.muzzleVelocity;
		var p = new Projectile({
			position: pos,
			velocity: vel
		});
		this.game.objects.push(p);
	}
}