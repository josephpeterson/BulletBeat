import Entity from "./Entity";
import Particle from "./Particle";

export default class Emitter extends Entity {
	constructor(game,props) {
		super(game,Object.assign({
			class: "Emitter",
			collidable: false,
			static: true,

			emitSpeed: 10,
			maxParticles: 100,
			particles: [],
			particleClass: Particle
		}, props));
	}
	render() {

	}
	update(event) {
		//Are we attached?
		if(this.attachedTo)
		{
			if(this.attachedTo.isDead())
				return this.remove();
			this.position = this.attachedTo.position;
		}
		super.update(event);

		var particles = this.particles;
		if(particles.length < this.maxParticles)
		{
			if(particles.length == 0 || this.game.getSimTime() - particles[particles.length-1].creationDate > this.emitSpeed)
				this.emitParticle();
		}
	}

	attachToObject(obj)
	{
        this.attachedTo = obj;
        this.position = obj.position;
        this.velocity = obj.velocity;
	}
	emitParticle() {
		var pos = this.position;

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