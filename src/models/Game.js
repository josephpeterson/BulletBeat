import Victor from "victor";

import ObjectManager from "./ObjectManager.js";
import Player from "./Entity/Player";
import Enemy from "./Entity/Enemy";
import Wall from "./Entity/Wall.js";
import { Matter, Events,Composite, Engine, Vector } from 'matter-js';

import Emitter from "./Entity/Emitter.js";
import Entity from "./Entity/Entity.js";
import InputReciever from "./InputReciever.js";

import Renderer from "./Renderer.js";


export default class Game {
    constructor(gameCanvas) {
        
        //Matter-js bind engine events
        Events.on(gameCanvas.engine, "beforeUpdate",this.update.bind(this));
        Events.on(gameCanvas.engine, "collisionStart",(event) => this.collisionStart(event));

        this.running = false;
        this.gameCanvas = gameCanvas;
		this.objects = new ObjectManager(this);
		this.renderer = new Renderer(this);
		this.inputReciever = new InputReciever(this);

    }

    test() {
        var height = this.gameCanvas.getCanvas().height;
        var width = this.gameCanvas.getCanvas().width;
        //You
        var sprite = new Player({
            game: this,
            position: Entity.Vector.create(100, height/2),
            velocity: Entity.Vector.create(0, 0),
            shapeName: "You",
        });
        this.objects.push(sprite);


        //Enemy respawn test
        var t = this;
        var respawn = function() {
            var e = new Enemy({
                game: t,
                position: Entity.Vector.create(sprite.position.x + 1000, Math.random() * height),
                moveForce: Entity.Vector.create(0, 0),
                shapeName: "Enemy",
                color: "red",
            });
            e.on("onDeath",respawn);
            t.objects.push(e);
        }
        respawn();

        var wallWidth = 100;
		//Top
        this.objects.push(new Wall({
            game: this,
            position: Vector.create(width*100/2,wallWidth/2),
            width: width*100,
            height:wallWidth
        }));
        //Bottom
		this.objects.push(new Wall({
            game: this,
            position: Vector.create(width*100/2,height-wallWidth/2),
            width: width*100,
            height:wallWidth
		}));
		//Left
		this.objects.push(new Wall({
            game: this,
            position: Vector.create(-wallWidth/2,height/2),
            width: wallWidth,
            height:height
        }));
		

        //Development
        window.game = this;
        window.sprite = this.objects[0];

		window.sprite.setResponsive(true);
		this.renderer.lookAt(window.sprite);
    }

    isRunning() { return this.running; }

    update(event) {
        this.objects.all(entity => {
            entity.update(event);
        });
    }

    start() {
        if (this.isRunning()) return;

        this.test();


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
        this.renderer.run();
        this.then = now;
    }

    collisionStart(event) {
        var pairs = event.pairs.slice();

        pairs.forEach(p => {
            let a = p.bodyA;
            let b = p.bodyB;

            a.entity.triggerEvent("onCollision",b.entity);
            b.entity.triggerEvent("onCollision",a.entity);
        })
        
    }
}