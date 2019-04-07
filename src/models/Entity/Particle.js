import Entity from "./Entity";
export default class Particle extends Entity {
    constructor(game,props) {
        //Defaults
        var classType = {
            class: "Particle",
            position: Entity.Vector.create(0, 0),
            body: Entity.Bodies.circle(0,0,2),
            color: "darkorange",
            border: 0,
            maxLifetime: 1500,
            collidable: false,
            opacity: 1
        }
        //Merge properties with default values
        props = Object.assign(classType, props);
        super(game,props);
    }
    render() {
        var ctx = this.game.getContext();
        ctx.save();
            ctx.globalAlpha = this.opacity;
            super.render();
        ctx.restore();
	}
	update() {
		super.update();
	}
    onDeath() {
        var particles = this.emitter.particles;
        particles.splice(particles.indexOf(this),1);
    }
}