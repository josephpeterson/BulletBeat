import Entity from "./Entity.js";
import { Matter, Engine, Render, World, Bodies, Bounds,Vector,Body } from 'matter-js';

export default class Wall extends Entity {
  constructor(props)
  {
    var playerType = {
      class: "WallObject",
      color: "green",
      height:50,
      width:200,
    }
    super(Object.assign(playerType,props));
    this.body = Bodies.rectangle(this.position.x,this.position.y,this.width,this.height);
    this.static = true;
  }
}