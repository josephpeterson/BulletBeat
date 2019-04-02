import Entity from "./Entity";

export default class Renderable extends Entity {
    constructor(props) {

        //Defaults
        var classType = {
            class: "Renderable",
            position: Entity.Vector.create(0, 0),
            body: Entity.Bodies.circle(0,0,2),
            color: "orange",
            border: 1,
            maxLifetime: 500,
            collidable: false,
            opacity: 1
        }
        //Merge properties with default values
        props = Object.assign(classType, props);
        super(props);
    }
    update(event) {
        super.update(event);

        var life = (this.maxLifetime-this.getLifetime())/this.maxLifetime;
        this.opacity = life;
        Entity.Body.scale(this.body,0.99,0.99);
		Entity.Body.update(this.body,16,1,1);
    }
    render() {
        var ctx = this.game.gameCanvas.getContext();
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