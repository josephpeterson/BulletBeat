import Entity from "./Entity.js";
import Emitter from "./Emitter.js";

export default class Projectile extends Entity {
    constructor(props) {
        var projectileType = {
            shapeName: "Player 1",
            body: Entity.Bodies.rectangle(0, 0, 30, 10,{frictionAir: 0,mass: 500}),
            class: "Projectile",
            maxLifetime: 50005,
            directDamage: 10,
            collidingMasks: 0x010
        }
        super(Object.assign(projectileType, props));

        var body = this.body;
        var init = Entity.Vector.create(0,0);
        var theta = Entity.Vector.angle(init,this.velocity);
        Entity.Body.setAngle(body,theta);

        
    }
    onAdd() {
        var trailEmitter = new Emitter({
            position: this.position,
        });
        trailEmitter.attachToObject(this);
        this.game.objects.push(trailEmitter);
    }
    render() {
        super.render();
        var ctx = this.game.gameCanvas.getContext();
    }

    update(event) {
        super.update(event);
        //Rotate on velocity
        Entity.Body.setInertia(this.body,500);
    }

    expire() {
        super.expire();
    }
    onCollision(col) {
        this.expire();

        if(col.collidingMasks == this.collidingMasks)
            col.damage(this.directDamage);
    }
}