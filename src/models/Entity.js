import Victor from "victor";
import Controllable from "./Controllable.js";

export default class Entity extends Controllable {
    constructor(props) {
        
        //Defaults
        var classType = {
            class: "Entity",
            position: new Victor(0,0),
            velocity: new Victor(0,0),
            bounds: new Victor(10,10),
            color: "lightblue",
        }
        //Merge properties with default values
        props = Object.assign(classType,props);
        super(props);
        for (var i in props)
            this[i] = props[i];
    }
    getPosition() {
        return this.position;
    }
    update(delta)
    {
        this.lifetime += delta;
        this.position.x += (this.velocity.x * delta);
        this.position.y += (this.velocity.y * delta);
    }
    setResponsive(respond)
    {
        var reciever = this.game.gameCanvas.inputReciever;
        if(!respond)
        {
            if(reciever.listeners.indexOf(this) != -1)  reciever.splice(reciever.indexOf(this),1);
            return;
        }
        reciever.listeners.push(this);
    }
    render() {
        var game = this.game;
        var ctx = game.gameCanvas.getContext();

        var w = this.bounds.x;
        var h = this.bounds.y;
        var x = Math.round(this.position.x);
        var y = Math.round(this.position.y);
        ctx.save();
            ctx.fillStyle = this.color;
            ctx.translate(x,y);
            ctx.fillRect(Math.round(-w/2),Math.round(-h/2),w,h);
            ctx.strokeRect(Math.round(-w/2),Math.round(-h/2),w,h);
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.arc(0,0, 10, 0, 2 * Math.PI);
            ctx.stroke();
        ctx.restore();
    }
}