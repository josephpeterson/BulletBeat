import Entity from "./Entity.js";

export default class Eventable {
    constructor() {
        this._eventListeners = {};
    }
    triggerEvent(listener,...params)
    {
        var listeners = this._eventListeners[listener];
        if(this[listener])
            this[listener].apply(this,params);
        if(listeners)
        this._eventListeners[listener].forEach(trigger => {
            trigger.apply(this,params);
        });
    }
    on(listener,callback)
    {
        var listeners = this._eventListeners[listener];
        if(!listeners)
            listeners = this._eventListeners[listener] = [];
        listeners.push(callback);
    }
    onMouseMove(evt)
    {
        
    }
    onMouseClick(evt)
    {
        //console.log("Controllable Default: Mouse has been clicked!");
    }
    onMouseRightClick(evt)
    {
        //console.log("Controllable Default: Mouse has been right clicked!");
    }
    onKeyDown(evt)
    {
        //console.log("Controllable Default: Keyboard key down");
    }
    onKeyUp(evt)
    {
        //console.log("Controllable Default: Keyboard key up");
    }
}