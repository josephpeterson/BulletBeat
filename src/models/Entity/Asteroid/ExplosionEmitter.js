import Emitter from "../Emitter";
import Particle from "../Particle";
import Entity from "../Entity";

export default class AsteroidExplosionEmitter extends Emitter {
	constructor(game,props) {
		super(game,Object.assign({
			class: "Emitter",
			collidable: false,
			static: true,
			maxLifetime: 300,
			emitSpeed: 20,
			maxParticles: 4,
			particles: [],
			particleClass: AsteroidExplosionParticle
		}, props));
	}
	emitParticle() {
		var size = 6;
		var pos = Entity.Vector.create((Math.random() * size*2-size) + this.position.x,(Math.random() * size*2-size) + this.position.y);

        var maxVariance = Math.PI/180*360; 
        var theta = Math.random() * maxVariance;
        theta -= maxVariance/2;
		var x = Math.cos(theta);
        var y = Math.sin(theta);
        
        var vel = Entity.Vector.mult(this.velocity,1);
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
export class AsteroidExplosionParticle extends Particle {
    constructor(game,props) {

        //Defaults
        var classType = {
            class: "Particle",
            position: Entity.Vector.create(0, 0),
            body: Entity.Bodies.circle(0,0,2),
            color: "gray",
            border: 0,
            maxLifetime: 900,
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
        Entity.Body.scale(this.body,1.04,1.04);
		Entity.Body.update(this.body,16,1,1);
    }
}