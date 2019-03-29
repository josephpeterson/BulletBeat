import Victor from "victor";

import ObjectManager from "./ObjectManager.js";
import PlayerObject from "../models/PlayerObject";

export default class Game {
  constructor(gameCanvas) {
    //Development
    window.game = this;

    this.running = false;
    this.gameCanvas = gameCanvas;
    this.objects = new ObjectManager(this);
    this.objects.push(new PlayerObject({
      position: new Victor(100,100),
      velocity: new Victor(0,0),
      shapeName: "You",
    }));

    this.objects[0].setResponsive(true);
  }

  isRunning() { return this.running; }

  update(delta) {
    this.objects.all(entity => {
      entity.update(delta);
    });
  }
  render() {
    //Clear screen
    var canvas = this.gameCanvas.getCanvas();
    canvas.width = canvas.width;

    this.objects.all(entity => {
      entity.render();
    });
  }

  start() {
    if (this.isRunning()) return;

    this.running = true;
    this.then = Date.now();
    this.tick();
  }
  stop() { this.running = false; }

  tick() {
    if(!this.isRunning()) return;

    var now = Date.now();
    var delta = now - this.then;
    this.update(delta / 1000);
    this.render();
    this.then = now;
    requestAnimationFrame(this.tick.bind(this));
  }
}