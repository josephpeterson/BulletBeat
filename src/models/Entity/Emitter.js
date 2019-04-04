import Entity from "./Entity";
import Renderable from "./Renderable";

export default class Emitter extends Entity {
	constructor(game,props) {
		super(game,Object.assign({
			class: "Emitter",
			collidable: false,
			static: true,

			emitSpeed: 100,
			maxParticles: 50,
			particles: [],
			particleClass: Renderable
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
			if(particles.length == 0 || Date.now() - particles[particles.length-1].creationDate > this.emitSpeed)
				this.emitParticle();
		}
	}

	attachToObject(obj)
	{
		this.attachedTo = obj;
	}
	emitParticle() {
		var pos = this.position;

		var theta = Math.random() * Math.PI * 2;
		var x = Math.cos(theta);
		var y = Math.sin(theta);
		var vel = Entity.Vector.create(x,y);
		vel = Entity.Vector.mult(vel,0.7);
		var p = new this.particleClass(this.game,{
			emitter: this,
			position: Entity.Vector.create(pos.x,pos.y),
			velocity: Entity.Vector.add(vel,this.velocity)
		});
		this.particles.push(p);
		this.game.objects.push(p);
	}
}