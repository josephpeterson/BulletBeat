import AfricaLevel from '../songs/africa.json';
import Entity from './Entity/Entity';
import Asteroid from './Entity/Asteroid/Asteroid';

export default class Level
{
    constructor(game)
    {
        this.game = game;
		this.levelData = AfricaLevel;
		this.creationDate = game.getSimTime();
    }
    start() {
        this.lifetime = 0;
        this.spawned = 0;
    }
    update() {
        this.lifetime = this.game.getSimTime()-this.creationDate;

        var track = this.levelData.track[0].event;

        var data = track.sort((a,b) => {
            return a.deltaTime < b.deltaTime;
		});
		
		//console.log(data);

        var objs = [];
        for(var i=0;i<data.length;i++)
        {
            var obj = data[i];
            if(obj.deltaTime*1000 < this.lifetime)
                objs.push(obj);
        }

        //Spawn new ones
        for(var i=this.spawned;i<objs.length;i++)
        {
            var obj = objs[i];
			this.spawned++;
            var e = new Asteroid(game,{
                position: Entity.Vector.create(sprite.position.x + 1000, Math.random() * this.game.canvas.height),
                shapeName: "Enemy",
                color: "red",
            });
            this.game.objects.push(e);
		}
    }

}