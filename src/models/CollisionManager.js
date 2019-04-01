import Collisions from 'collisions';


export default class CollisionManager {
    constructor(game) {
        this.game = game;
        this.system = new Collisions();
        //const result = system.createResult();
    }
}