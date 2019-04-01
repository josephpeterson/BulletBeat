import Victor from "victor";
import Controllable from "./Controllable.js";
import { Matter, Engine, Render, World, Bodies, Bounds,Vector,Body } from 'matter-js';



export default class Entity extends Controllable {
    constructor(props) {

        //Defaults
        var classType = {
            class: "Entity",
            body: Bodies.rectangle(0, 0, 80, 80),
            position: Vector.create(0, 0),
            color: "lightblue",
            maxLifetime: undefined,
            maxHealth: 100,
            collidingMasks: 0x0001
        }
        //Merge properties with default values
        props = Object.assign(classType, props);
        super(props);
        for (var i in props)
            this[i] = props[i];

        //Initialize properties
        this.lifetime = 0;
        this.health = this.maxHealth;
        this.creationDate = Date.now();
    }

    get static() {
        return this.isStatic;
    }
    set static(val) {
        Body.setStatic(this.body,val);
    }

    //Position
    get position()
    {
        return this.body.position;
    }
    set position(vec)
    {
        Body.setPosition(this.body,Vector.create(vec.x,vec.y));
    }

    //Velocity
    get velocity() {
        return this.body.velocity;
    }
    set velocity(vec) {
        Body.setVelocity(this.body,vec);
    }
    addVelocity(x,y)
    {
        Body.applyForce(this.body,this.position,Vector.create(x,y));
    }
    update(event) {

        //One day fix this..
        var now = Date.now();
        if (this.maxLifetime != undefined && this.getLifetime() >= this.maxLifetime)
            this.expire();

    }
    getLifetime() {
        return Date.now()-this.creationDate;
    }
    setResponsive(respond) {
        var reciever = this.game.gameCanvas.inputReciever;
        if (!respond) {
            if (reciever.listeners.indexOf(this) != -1) reciever.splice(reciever.indexOf(this), 1);
            return;
        }
        reciever.listeners.push(this);
    }
    render() {
        var game = this.game;
        var ctx = game.gameCanvas.getContext();

        //Default render matter-js bounds
        ctx.save();
            ctx.fillStyle = this.color;
            ctx.strokeStyle = "black";
            var body = this.body;
            var vertices = body.vertices;
            ctx.beginPath();
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (var j = 1; j < vertices.length; j += 1) {
                ctx.lineTo(vertices[j].x, vertices[j].y);
            }
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.fill();
            ctx.stroke();
        ctx.restore();
    }

    damage(amt) {
        this.health -= amt;
        if (this.health <= 0)
            this.die();
    }
    die() {
        this.expire();
    }
    //onDeath lifetime
    expire() {
        this.game.objects.remove(this);
        this.onDeath();
    }
    onDeath() {

    }
}
Entity.Bodies = Bodies;
Entity.Body = Body;
Entity.Vector = Vector;