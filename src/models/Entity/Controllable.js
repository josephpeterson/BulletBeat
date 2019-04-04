import Entity from "./Entity.js";

export default class Controllable extends Entity {
    constructor(game,props) {
        super(game,props);
    }
    onMouseMove(evt)
    {
        
    }
    onMouseClick(evt)
    {
        console.log("Controllable Default: Mouse has been clicked!");
    }
    onMouseRightClick(evt)
    {
        console.log("Controllable Default: Mouse has been right clicked!");
    }
    onKeyDown(evt)
    {
        console.log("Controllable Default: Keyboard key down");
    }
    onKeyUp(evt)
    {
        console.log("Controllable Default: Keyboard key up");
    }
    setResponsive(respond) {
        var reciever = this.game.inputReciever;
        if (!respond) {
            if (reciever.listeners.indexOf(this) != -1) reciever.splice(reciever.indexOf(this), 1);
            return;
        }
        reciever.listeners.push(this);
    }
}