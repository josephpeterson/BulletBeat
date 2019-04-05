import {World} from 'matter-js';

export default class ObjectManager {
    constructor(game) {
        this.game = game;
        this.world = game.engine.world;
        this._objects = [];
    }
    get length() {
        return this._objects.length;
    }
    test() {
        console.log("test me");
    }
    push(entity) {
        if(this._objects.indexOf(entity) == -1)
            this._objects.push(entity);
        else
            return;
        
        this.sort();
        if(entity.collidable)
            //Matter-js Add body to the world
            World.add(this.world, entity.body);
        entity.triggerEvent("onAdd",this,this.world);
        
    }
    clear() {
        this._objects = [];
    }
    sort() {
        //Sort these objects to improve rendering speed
        this._objects.sort((a,b) => {
            if(a.class == b.class)
                return 0;
            return -1;
        });
    }
    getIndex(i)
    {
        return this._objects[i];
    }
    remove(element) {

        var i = this._objects.indexOf(element);
        if(i > -1)
            this._objects.splice(i,1);
        element.triggerEvent("onRemove",this,this.world);        
        //Matter-js Remove body from the world
        World.remove(this.world, element.body);
    }
    all(cb) {
        for (var i = 0; i < this._objects.length; i++)
            cb(this._objects[i]);
    }
}