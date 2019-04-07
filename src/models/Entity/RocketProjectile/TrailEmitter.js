import Emitter from "../Emitter";
import Particle from "../Particle";
import Entity from "../Entity";

export default class RocketTrailEmitter extends Emitter {
	constructor(game,props) {
		super(game,Object.assign({
			class: "RocketTrailEmitter",
			maxLifetime: 1000,
			emitSpeed: 10,
			maxParticles: 40,
			particleClass: RocketTrailParticle
		}, props));
	}
	emitParticle() {
		var size = 2;
		var pos = Entity.Vector.create((Math.random() * size*2-size) + this.position.x,(Math.random() * size*2-size) + this.position.y);

        var maxVariance = Math.PI/180*6; 
        var theta = Math.random() * maxVariance;
        theta -= maxVariance/2;
		var x = Math.cos(theta);
        var y = Math.sin(theta);
        
        var vel = Entity.Vector.mult(this.velocity,0.5);
        vel = Entity.Vector.rotate(vel,theta);
		var p = new this.particleClass(this.game,{
			emitter: this,
			position: Entity.Vector.create(pos.x,pos.y),
			velocity: vel
		});
		this.particles.push(p);
		this.game.objects.push(p);
	}
}
export class RocketTrailParticle extends Particle {
    constructor(game,props) {
		
        //Defaults
        var classType = {
            class: "RocketTrailParticle",
            position: Entity.Vector.create(0, 0),
            body: Entity.Bodies.circle(0,0,2),
            color: "darkorange",
            border: 0,
            maxLifetime: 500,
            collidable: false,
            opacity: 1
        }
        //Merge properties with default values
        props = Object.assign(classType, props);
		super(game,props);
	}
	update() {
		super.update();
		

        var life = (this.maxLifetime-this.getLifetime())/this.maxLifetime;
        this.opacity = life;
        Entity.Body.scale(this.body,1.005,1.005);
		Entity.Body.update(this.body,16,1,1);
    }
}