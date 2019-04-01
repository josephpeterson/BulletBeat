import Victor from "victor";

import ObjectManager from "./ObjectManager.js";
import PlayerObject from "../models/PlayerObject";
import Wall from "./Wall.js";
import { Matter, Events,Composite, Engine, Vector } from 'matter-js';

import Emitter from "./Emitter.js";
import Entity from "./Entity.js";


export default class Game {
    constructor(gameCanvas) {
        
        //Matter-js bind engine events
        Events.on(gameCanvas.engine, "beforeUpdate",this.update.bind(this));
        Events.on(gameCanvas.engine, "collisionStart",(event) => this.collisionStart(event));

        this.running = false;
        this.gameCanvas = gameCanvas;
        this.objects = new ObjectManager(this);


        this.test();
    }

    test() {
        //You
        this.objects.push(new PlayerObject({
            game: this,
            position: new Victor(100, 100),
            velocity: new Victor(0, 0),
            shapeName: "You",
        }));


        //Enemy test
        this.objects.push(new PlayerObject({
            game: this,
            position: new Victor(600, 200),
            velocity: new Victor(0, 0),
            shapeName: "Enemy",
            color: "red"
        }));


        //Ground
        var width = this.gameCanvas.getCanvas().width;
        var height = this.gameCanvas.getCanvas().height;
        this.objects.push(new Wall({
            game: this,
            position: Vector.create(width/2,height),
            width: width,
            height:50
        }));
        this.objects.push(new Wall({
            game: this,
            position: Vector.create(width/2,0),
            width: width,
            height:50
        }));

        //Development
        window.game = this;
        window.sprite = this.objects[0];

        window.sprite.setResponsive(true);
    }

    isRunning() { return this.running; }

    update(event) {
        this.objects.all(entity => {
            entity.update(event);
        });
    }
    background(ctx,canvas) {
        ctx.save();
            ctx.fillStyle = "#C5C5C5";
            ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.restore();
    }
    render() {
        //Init variables
        var engine = this.gameCanvas.engine;
        var ctx = this.gameCanvas.getContext();
        var canvas = this.gameCanvas.getCanvas();


        canvas.width = canvas.width;
        this.background(ctx,canvas);

        
        //Objects
        this.objects.all(entity => {
			entity.render();
        });
    }

    renderBounds() {
        var engine = this.gameCanvas.engine;
        var ctx = this.gameCanvas.getContext();

        ctx.save();
            var bodies = Composite.allBodies(engine.world);
            ctx.beginPath();
            for (var i = 0; i < bodies.length; i += 1) {
                var vertices = bodies[i].vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (var j = 1; j < vertices.length; j += 1) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
            }
            ctx.setLineDash([12, 3, 3]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'green';
            ctx.stroke();
        ctx.restore();
    }

    start() {
        if (this.isRunning()) return;

        this.running = true;
        this.then = Date.now();
        this.tick();

        var g = this.gameCanvas;
        Engine.run(g.engine);
    }
    stop() { this.running = false; }

    tick() {
        if (!this.isRunning()) return;

        var now = Date.now();
        var delta = now - this.then;

        requestAnimationFrame(this.tick.bind(this));
        this.render();
        this.then = now;
    }

    collisionStart(event) {
        var pairs = event.pairs.slice();

        pairs.forEach(p => {
            let a = p.bodyA;
            let b = p.bodyB;

            a.entity.onCollision(b.entity);
            b.entity.onCollision(a.entity);
        })
        
    }
}