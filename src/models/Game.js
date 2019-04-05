import React from "react";

import ObjectManager from "./ObjectManager.js";
import Enemy from "./Entity/Enemy";
import Wall from "./Entity/Wall.js";
import { Matter, Events, Composite, Engine, Vector, Render, Runner, World } from 'matter-js';

import Entity from "./Entity/Entity.js";
import InputReciever, { KeyboardMap } from "./InputReciever.js";

import Renderer from "./Renderer.js";
import Level from "./Level.js";
import {Spaceship,SpaceshipControllable} from "./Entity/Spaceship.js";
import TitleScreen from "../component/TitleScreen";
import PauseScreen from "../component/PauseScreen";
import Eventable from "./Entity/Eventable";

const ControllerMapping = {
	pauseScreen: KeyboardMap.KEY_ESC
}

export default class Game extends Eventable {
    constructor(gameCanvas) {
        super();
        //Matter-js: Create engine
        var engine = this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        //Matter-js: Create renderer
        this.renderer = Render.create({
            element: gameCanvas.getGameContainer(),
            engine: this.engine
        });
        this.gameCanvas = gameCanvas;
        this.canvas = this.renderer.element.getElementsByTagName("canvas")[0]

        //Matter-js bind engine events
        Events.on(engine, "beforeUpdate", this.update.bind(this));
        Events.on(engine, "collisionStart", (event) => this.collisionStart(event));

        this.running = false;
        this.objects = new ObjectManager(this);
        this.renderer = new Renderer(this);
        this.inputReciever = new InputReciever(this);
        this.runner = Runner.run(this.engine);

        //Allow this class to respond to input
        this.inputReciever.setResponsive(this,true);
    }

    onKeyUp(event) {
        if(event.keyCode == ControllerMapping.pauseScreen)
        {
            if(this.isRunning())
                this.toPauseScreen();
            else
                this.toPlayScreen();
            return;
        }
    }
    test() {
        var height = this.canvas.height;
        var width = this.canvas.width;
        //You
        var sprite = new SpaceshipControllable(this,{
            game: this,
            position: Entity.Vector.create(100, height / 2),
            velocity: Entity.Vector.create(0, 0),
            shapeName: "You",
        });
        this.objects.push(sprite);


        //Enemy respawn test
        var t = this;
        var respawn = function () {
            var e = new Spaceship(t,{
                position: Entity.Vector.create(sprite.position.x + 1000, Math.random() * height),
                shapeName: "Enemy",
                color: "red",
                maxLifetime: 2000
            });
            e.on("onDeath", respawn);
            t.objects.push(e);
        }
        //respawn();

        var wallWidth = 100;
        //Top
        this.objects.push(new Wall(this,{
            position: Vector.create(width * 100 / 2, wallWidth / 2),
            width: width * 100,
            height: wallWidth
        }));
        //Bottom
        this.objects.push(new Wall(this,{
            position: Vector.create(width * 100 / 2, height - wallWidth / 2),
            width: width * 100,
            height: wallWidth
        }));
        //Left
        this.objects.push(new Wall(this,{
            game: this,
            position: Vector.create(-wallWidth / 2, height / 2),
            width: wallWidth,
            height: height
        }));


        this.objects.push(new Spaceship(this,{
            game: this,
            position: Entity.Vector.create(300, height / 2),
            velocity: Entity.Vector.create(0, 0),
            forwardVector: Entity.Vector.create(5.1,0),
            shapeName: "Enemy",
        }));

        //Development
        window.game = this;
        window.sprite = this.objects.getIndex(0);

        this.renderer.lookAt(window.sprite);


        var level = new Level(this);

        this.level = level;

        level.start();

        window.level = level;
    }

    isRunning() { return this.running; }

    update(event) {
        if(!this.isRunning())
            return;
        this.renderer.run();
        
        this.objects.all(entity => {
            entity.update(event);
        });

        if (this.level) {
            this.level.update();
        }
    }

    getSimTime() {
        return this.engine.timing.timestamp;
    }
    getContext() {
        return this.canvas.getContext('2d');
    }
    setScreen(reactComp)
    {
        this.gameCanvas.setScreen(reactComp);
    }
    start() {
        if (this.isRunning()) return;
        this.running = true;
        this.runner.enabled = true;
    }
    stop() { this.running = false; this.runner.enabled = false;}

    reset() {
        //todo
        this.objects.clear();
        World.clear(this.engine.world);
        Engine.clear(this.engine);
        this.running = false;
        
    }
    toTitleScreen() {
        this.setScreen(<TitleScreen game={this}/>);
    }
    toPlayScreen() {
        this.start();
        this.setScreen();
    }
    toPauseScreen() {
        this.setScreen(<PauseScreen game={this}/>);
    }

    collisionStart(event) {
        var pairs = event.pairs.slice();

        pairs.forEach(p => {
            let a = p.bodyA;
            let b = p.bodyB;

            a.entity.triggerEvent("onCollision", b.entity);
            b.entity.triggerEvent("onCollision", a.entity);
        })

    }
}