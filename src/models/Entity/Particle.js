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
    update(event) {
        super.update(event);

        var life = (this.maxLifetime-this.getLifetime())/this.maxLifetime;
        this.opacity = life;
        Entity.Body.scale(this.body,1.005,1.005);
		Entity.Body.update(this.body,16,1,1);
    }
    render() {
        var ctx = this.game.getContext();
        ctx.save();
            ctx.globalAlpha = this.opacity;
            super.render();
        ctx.restore();
    }
    onDeath() {
        var particles = this.emitter.particles;
        particles.splice(particles.indexOf(this),1);
    }
}