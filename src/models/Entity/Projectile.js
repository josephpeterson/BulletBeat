import Entity from "./Entity.js";
import Emitter from "./Emitter.js";

export default class Projectile extends Entity {
    constructor(game,props) {
        var projectileType = {
            body: Entity.Bodies.rectangle(0, 0, 30, 10,{frictionAir: 0,mass: 500}),
            class: "Projectile",
            maxLifetime: 1200,
			directDamage: 10,
			trailEmitter: undefined,
			explosionEmitter: undefined,
        }
        super(game,Object.assign(projectileType, props));

        var body = this.body;
        var init = Entity.Vector.create(0,0);
        var theta = Entity.Vector.angle(init,this.velocity);
        Entity.Body.setAngle(body,theta);
    }
    onAdd() {
		var trailEmitter = this.trailEmitter;
		if(trailEmitter)
		{
			var trailEmitter = new trailEmitter(this.game,{
				position: this.position,
			});
			trailEmitter.attachToObject(this);
			this.game.objects.push(trailEmitter);
		}
    }
    render() {
        //super.render();
        var ctx = this.game.getContext();

        ctx.save();
            ctx.translate(this.position.x,this.position.y);
            ctx.rotate(this.body.angle);
            ctx.drawImage(document.getElementById("rocket"),-10,-2.6,20,5.3);
        ctx.restore();
    }
    onCollision(col) {
        this.expire();
    }
}