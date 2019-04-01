import Entity from "./Entity.js";

export default class Projectile extends Entity {
    constructor(props) {
        var projectileType = {
            shapeName: "Player 1",
            body: Entity.Bodies.rectangle(0, 0, 30, 10),
            class: "Projectile",
            maxLifetime: 50005,
            collidingMasks: 0x010
        }
        super(Object.assign(projectileType, props));

        var body = this.body;
        var init = Entity.Vector.create(0,0);
        var theta = Entity.Vector.angle(init,this.velocity);
        Entity.Body.setAngle(body,theta);
    }
    render() {
        super.render();
        var ctx = this.game.gameCanvas.getContext();
    }

    update(event) {
        super.update(event);
        //Rotate on velocity
    }

    expire() {
        super.expire();
    }
}