import Entity from "./Entity.js";
import { KeyboardMap } from "../InputReciever.js";
import Victor from 'victor';
import Projectile from './Projectile.js';
import { Vector, Body } from "matter-js";

const ControllerMapping = {
	move_left: "",
	move_right: "",
	move_up: KeyboardMap.keyCode("W"),
    move_down: KeyboardMap.keyCode("S"),
    fire: KeyboardMap.KEY_SPACE,
}

export default class Player extends Entity {
	constructor(props) {
		var playerType = {
			shapeName: "Player 1",
			class: "PlayerObject",
            muzzleVelocity: 15,
            body: Entity.Bodies.rectangle(0,0,50,56),
            moveForce: Vector.create(0, 0),
            forwardSpeed: 5,
            fireTimeout: 1000,
		}
        super(Object.assign(playerType, props));
        this.moveForce = Vector.create(this.forwardSpeed,0);
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
        
        x = this.forwardSpeed;
		this.moveForce = Vector.create(x,y);
	}
	update(event) {
        Body.setAngle(this.body,0);

        var height = this.game.gameCanvas.getCanvas().height;
        var minY = height/4;
        var maxY = minY*4;

        var atTop = this.position.y <= minY && this.moveForce.y < 0;
        var atBottom = this.position.y >= maxY && this.moveForce.y > 0;
        if(atTop || atBottom)
            Body.setVelocity(this.body,Entity.Vector.create(this.forwardSpeed,0));
        else
            Body.setVelocity(this.body, this.moveForce);
            
        if(this.game.inputReciever.getKey(ControllerMapping.fire) && this.canFire())
            this.fire(this.game.inputReciever.getWorldPosition());
        super.update(event);
	}
	render() {
        //super.render();
        var ctx = this.game.gameCanvas.getContext();

        ctx.save();
            ctx.translate(this.position.x,this.position.y);
            ctx.rotate(this.body.angle);
            
            var min = this.body.bounds.min;
            var max = this.body.bounds.max;
            var w = max.x-min.x;
            var h = max.y-min.y;
            

            //50x56

            var y = -h/2;
            y += Math.sin(this.getLifetime()/500) * 3;

            ctx.rotate(Math.cos(this.getLifetime()/500) * Math.PI/180 * 2);
            ctx.drawImage(document.getElementById("fighter"),-w/2,y,w,h);
        ctx.restore();
        this.renderShapeName();
        this.renderHealthBar();
	}

	onMouseClick(evt) {
		var reciever = this.game.inputReciever;
    }
    canFire() {
        if(!this.lastFire || this.game.getSimTime() - this.lastFire >= this.fireTimeout)
            return true;
        return false;
    }
	fire(des) {
		var y = des.y - this.position.y;
		var x = des.x - this.position.x;

		var vel = Vector.create(x, y);
		vel = Vector.normalise(vel);

        var min = this.body.bounds.min;
        var max = this.body.bounds.max;
        var w = max.x-min.x + 20;
        var pos = Vector.add(this.position,Vector.create(w/2,0));

        vel.x *= this.muzzleVelocity;
        vel.y *= this.muzzleVelocity;
        vel.y = 0;

		var p = new Projectile({
            game: this.game,
			position: pos,
			velocity: vel
		});
        this.game.objects.push(p);
        this.lastFire = this.game.getSimTime();
        console.log("Last Fire:",this.lastFire);
	}
}