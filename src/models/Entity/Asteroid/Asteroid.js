import Entity from "../Entity.js";
import { KeyboardMap } from "../../InputReciever.js";
import AsteroidExplosionEmitter  from "./ExplosionEmitter";

export default class Asteroid extends Entity {
	constructor(game,props) {
		var playerType = {
			shapeName: "Enemy",
            class: "PlayerObject",
            color: "black",
            body: Entity.Bodies.rectangle(0,0,20,20,{angularSpeed: 10,frictionAir: 0}),
			maxLifetime: 5000,
			directDamage: 13,
		}
		super(game,Object.assign(playerType, props));
    }
    onAdd()
    {
        //Entity.Body.setAngularVelocity(this.body,100);
	}
	onDeath() {
		var explosionEmitter = new AsteroidExplosionEmitter(this.game,{
            position: Entity.Vector.create(this.position.x,this.position.y),
        });
        this.game.objects.push(explosionEmitter);
	}
	update(event) {
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
    onCollision(col)
    {
		if(col.class == this.class)
			return;
		this.die();
		col.damage(this.directDamage);
    }
}