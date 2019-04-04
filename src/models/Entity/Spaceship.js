import Entity from "./Entity.js";
import { KeyboardMap } from "../InputReciever.js";
import Victor from 'victor';
import Projectile from './Projectile.js';
import { Vector, Body } from "matter-js";
import Controllable from "./Controllable.js";

const ControllerMapping = {
	move_left: "",
	move_right: "",
	move_up: KeyboardMap.keyCode("W"),
    move_down: KeyboardMap.keyCode("S"),
    fire: KeyboardMap.KEY_SPACE,
}

export class Spaceship extends Controllable {
	constructor(game,props) {
		var playerType = {
			shapeName: "Apollo",
			class: "SpaceshipObject",
            muzzleVelocity: 15,                             //How fast is this enemy shooting
            moveForce: Vector.create(5,0),
            body: Entity.Bodies.rectangle(0,0,50,56),
            fireTimeout: 500,                               //How often can we shoot
		}
        super(game,Object.assign(playerType, props));
	}
	update(event) {
        //Body.setAngle(this.body,0);

        var vec = Vector.rotate(this.moveForce,this.body.angle);
        Body.setVelocity(this.body,vec);       
        super.update(event);
	}
	render() {
        //super.render();
        var ctx = this.game.getContext();

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
	}
}
export class SpaceshipControllable extends Spaceship {
    constructor(game,props)
    {
        super(game,props);
        this.setResponsive(true);
    }
    onKeyDown(evt) {
		//this.checkControls();
	}
	onKeyUp(evt) {
		//this.checkControls();
    }
    update() {
        this.checkControls();
        super.update();
    }
    render() {
        super.render();
        this.renderShapeName();
        this.renderHealthBar();
    }
	checkControls() {
		var speed = 2;
		var input = this.game.inputReciever;

		var controls = {
			move_up: input.getKey(ControllerMapping.move_up),
            move_down: input.getKey(ControllerMapping.move_down),
            firing: input.getKey(ControllerMapping.fire)
        }
        
        //Check if we're trying to move
		var y = 0;
		if (controls.move_up)
			y += -speed;
		if (controls.move_down)
            y += speed;
        this.moveForce = Vector.create(this.moveForce.x,y);
        
        //Are we firing
        if(controls.firing && this.canFire())
            this.fire(input.getWorldPosition());5
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

		var p = new Projectile(this.game,{
			position: pos,
			velocity: vel
		});
        this.game.objects.push(p);
        this.lastFire = this.game.getSimTime();
	}
}