import { Matter, Engine, Render, World, Bodies, Bounds,Vector,Body, Svg, Vertices } from 'matter-js';
import Eventable from "./Eventable";

export default class Entity extends Eventable {
    constructor(game,props) {
        super(game,props);
        //Defaults
        var classType = {
            game: game,
            class: "Entity",
            body: Bodies.rectangle(0, 0, 20, 20,{}),
            position: Vector.create(0, 0),
            color: "lightblue",
            maxLifetime: undefined,
            maxHealth: 100,
            //collidingMasks: 0x0001,
            collidable: true,
            border: 1,
        }
        //Merge properties with default values
        props = Object.assign(classType, props);
        for (var i in props)
            this[i] = props[i];

        //Initialize properties
        this.lifetime = 0;
        this.health = this.maxHealth;
        this.creationDate = game.getSimTime();
        this._eventListeners = {}
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

    set body(body)
    {
        var world = this.game.engine.world;
        if(world.bodies.indexOf(this.body) != -1)
        {
            World.remove(world,this.body);
            World.add(world,body);
        }
        this._body = body;
        body.entity = this;
    }
    get body()
    {
        return this._body;
    }
    set collidingMasks(val) {
        Body.set(this.body,"collisionFilter",{
            mask: val
        });
    }
    get collidingMasks() {
        return this.body.collisionFilter.mask;
    }
    addVelocity(x,y)
    {
        Body.applyForce(this.body,this.position,Vector.create(x,y));
    }
    update(event) {
        if(this.forwardVector)
            Body.setVelocity(this.body,this.forwardVector);
        this.lifetime = this.game.getSimTime() - this.creationDate;
        //One day fix this..
        if (this.maxLifetime != undefined && this.game.getSimTime() >= this.creationDate + this.maxLifetime)
        {
            this.expire();
        }

    }
    getLifetime() {
        return this.lifetime;
        return Date.now()-this.creationDate;
    }
    render() {
        var game = this.game;
        var ctx = game.getContext();

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

            if(this.border > 0)
                ctx.stroke();
        ctx.restore();
    }
    renderShapeName() {
        var ctx = this.game.getContext();
        ctx.save();
            var w = this.body.bounds.max.x-this.body.bounds.min.x;
            var x = (this.body.bounds.min.x + w/2);
            var y = (this.body.bounds.min.y);
            ctx.translate(x, y-10);
            ctx.font = "12pt Calibri";
            ctx.textAlign = "center";
            ctx.fillText(this.shapeName + " (" + this.health + "/" + this.maxHealth + ")", 0, -22);
        ctx.restore();
    }
    renderHealthBar() {
        var ctx = this.game.getContext();
        ctx.save();
            var w = this.body.bounds.max.x-this.body.bounds.min.x;
            var x = (this.body.bounds.min.x + w/2);
            var y = (this.body.bounds.min.y);
            ctx.translate(x, y-10);
            ctx.fillStyle = "black";
            var p = {
                x: -50,
                y: -10,
                w: 100,
                h: 10
            }
            ctx.fillRect(p.x, p.y, p.w, p.h);
            ctx.fillStyle = "limegreen";
            ctx.fillRect(p.x + 1, p.y + 1, (p.w - 2) * (this.health / this.maxHealth), p.h - 2);
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
        this.remove();
        this.dead = true;
        this.triggerEvent("onDeath");
    }
    remove() {
        this.game.objects.remove(this);
    }
    isDead() {
        return this.dead;
    }
    onDeath() {
        //console.log("Default onDeath event");
    }
    onCollision(col) {
        //console.log("Default onCollision event");
    }
    onAdd() {
        //console.log("Default onAdd event");
        //this.creationDate = this.game.getSimTime();
    }
    
}
Entity.Bodies = Bodies;
Entity.Svg = Svg;
Entity.Body = Body;
Entity.Vector = Vector;
Entity.Vertices = Vertices;