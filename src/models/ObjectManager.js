import Victor from "victor";
import { Matter, Engine, Render, World, Bodies } from 'matter-js';


export default class ObjectManager extends Array {
    constructor(game) {
        super();
        this.game = game;
        this.world = game.gameCanvas.engine.world;
    }
    test() {
        console.log("test me");
    }
    push(entity) {
        super.push(entity);

        entity.game = this.game;

        //Matter-js Add body to the world
        World.add(this.world, entity.body);
    }
    remove(element) {
        let index = this.indexOf(element);
        if (index > -1) {
            const newLength = this.length - 1;
            while (index < newLength) {
                this[index] = this[index + 1];
                ++index;
            }
            this.length = newLength;
            //Matter-js Remove body from the world
            World.remove(this.world, element.body);
            return [element];
        }
        return [];
    }
    all(cb) {
        for (var i = 0; i < this.length; i++)
            cb(this[i]);
    }
}