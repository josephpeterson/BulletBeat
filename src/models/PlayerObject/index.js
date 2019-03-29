import Entity from "../Entity.js";
import { KeyboardMap } from "../InputReciever.js";
import Victor from 'victor';

export default class PlayerObject extends Entity {
  constructor(props)
  {
    var playerType = {
      shapeName: "Player 1",
      class: "PlayerObject",
      bounds: new Victor(100,100)
    }
    super(Object.assign(playerType,props));
  }
  onKeyDown(evt)
  {
    var vel = this.velocity;
    var moveSpeed = 50;
    switch(evt.keyCode)
    {
      case KeyboardMap.KEY_DOWN:
        vel.y = moveSpeed;
        break;
      case KeyboardMap.KEY_UP:
        vel.y = -moveSpeed;
        break;
      case KeyboardMap.KEY_LEFT:
        vel.x = -moveSpeed;
        break;
      case KeyboardMap.KEY_RIGHT:
        vel.x = moveSpeed;
        break;
    }
  }
  onKeyUp(evt)
  {
    var vel = this.velocity;
    var moveSpeed = -0;
    switch(evt.keyCode)
    {
      case KeyboardMap.KEY_DOWN:
        vel.y = moveSpeed;
        break;
      case KeyboardMap.KEY_UP:
        vel.y = -moveSpeed;
        break;
      case KeyboardMap.KEY_LEFT:
        vel.x = -moveSpeed;
        break;
      case KeyboardMap.KEY_RIGHT:
        vel.x = moveSpeed;
        break;
    }
  }
  render()
  {
    super.render();
    var ctx = this.game.gameCanvas.getContext();
    ctx.save();

      //ShapeName
      var x = Math.round(this.position.x);
      var y = Math.round(this.position.y - this.bounds.y/2);
      ctx.translate(x,y);
      ctx.font = "12pt Calibri";
      ctx.textAlign = "center";
      ctx.fillText(this.shapeName,0,-22);

      //Health bar
      ctx.fillStyle = "black";
      var p = {
        x: (-this.bounds.x/2) + this.bounds.x/2 * 0.2,
        y: -15,
        w: this.bounds.x * 0.8,
        h: 10
      }
      ctx.fillRect(p.x,p.y,p.w,p.h);
      ctx.fillStyle = "limegreen";
      ctx.fillRect(p.x+1,p.y+1,p.w-2,p.h-2);

    ctx.restore();
  }
}