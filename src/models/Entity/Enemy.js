import Entity from "./Entity.js";
import { KeyboardMap } from "../InputReciever.js";
import Victor from 'victor';
import Projectile from './Projectile.js';
import { Vector, Body } from "matter-js";
import Player from './Player';

const ControllerMapping = {
	move_left: "",
	move_right: "",
	move_up: KeyboardMap.keyCode("W"),
	move_down: KeyboardMap.keyCode("S"),
}

export default class Enemy extends Entity {
	constructor(props) {
		var playerType = {
			shapeName: "Enemy",
            class: "PlayerObject",
            color: "black",
            body: Entity.Bodies.rectangle(0,0,20,20,{angularSpeed: 10,frictionAir: 0}),
            maxLifetime: 5000,
		}
		super(Object.assign(playerType, props));
    }
    onAdd()
    {
        //Entity.Body.setAngularVelocity(this.body,100);
    }
	update(event) {
		Body.setVelocity(this.body, this.moveForce);
		super.update(event);
	}

	onMouseClick(evt) {
		//var reciever = this.game.inputReciever;
		//this.fire(reciever.getWorldPosition(evt));
    }
    render() {
        var ctx = this.game.getContext();
        ctx.save();
            ctx.translate(this.position.x,this.position.y);
            ctx.rotate(Math.cos(this.getLifetime()/3000) * Math.PI * 4);
            
            var min = this.body.bounds.min;
            var max = this.body.bounds.max;
            var w = max.x-min.x;
            var h = max.y-min.y;

            //50x56
            ctx.drawImage(document.getElementById("asteroid"),-w/2,-h/2,w,h);
        ctx.restore();
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
    onCollision(col)
    {
        this.die();
    }
}