import Entity from './Entity/Entity.js';

export class Camera
{
	constructor(props)
	{

		this.position = props.position;
		this.renderer = props.renderer;
		this.zoom = props.zoom ? props.zoom:1;

		window.camera = this;
	}

	apply() {
		var canvas = this.renderer.canvas;
		var ctx = this.renderer.ctx;
		var trans = this.getTranslation();

		ctx.save();
		ctx.translate(canvas.width/2, canvas.height/2);
        ctx.scale(this.zoom, this.zoom);
		ctx.translate(-canvas.width/2, -canvas.height/2);
		
		ctx.translate(trans.x,trans.y);
	}
	getTranslation() {
        
        var canvas = this.renderer.canvas;
        if(this.target) //Are we following an object?
        {
            var target = this.target;
            return Entity.Vector.create(-target.position.x+100,0);
        }
        return Entity.Vector.create(0,0);
	}
}
export default class Renderer
{
	constructor(game)
	{
		this.game = game;
		this.engine = game.engine;
		this.ctx = game.getContext();
		this.canvas = game.canvas;

		this.camera = new Camera({
			renderer: this
		});
	}
	run() {
		this.clear();
        this.background();
		this.camera.apply();
		this.render();
		this.renderHUD();
	}

	clear() {
        this.canvas.width = this.canvas.width;
	}
	background() {
		var ctx = this.ctx;
		var canvas = this.canvas;
        ctx.save();
            ctx.fillStyle = "#C5C5C5";
            ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.restore();
	}
	
	render() {
		var ctx = this.ctx;
		var objects = this.game.objects;

		//Objects
		var renderClass = undefined; //Check if this changes, once it does, start stroking
		var rendered = 0;
		objects.all(entity => {
			if(entity.class != renderClass)
			{
				if(renderClass)
				{
					this.ctx.fill();
					this.ctx.stroke();
				}
				//console.log("now rendering ",entity.class,"Rendered " + rendered + " " + renderClass + " last iteration");
				rendered = 0;
				renderClass = entity.class;
			}
			rendered++;
			ctx.save();
			entity.render();
			ctx.restore();
		});
		this.ctx.fill();
		this.ctx.stroke();
		//console.log("Rendered " + rendered + " " + renderClass + " last iteration");

		this.renderInput();

		//this.game.stop();
	}
	renderHUD() {
		var font = {
			size: 12,
			lineSpacing: 5,
			family: "Calibri",
			color: "black"
		}
		var lines = [
			"Time: " + Math.round(this.game.getSimTime()),
			"Objects: " + this.game.objects.length,
			"World Bodies: " + this.game.engine.world.bodies.length,
		];
		//stuff
		var ctx = this.ctx;
		ctx.restore();
		ctx.save();
			ctx.font = font.size + "pt " + font.family;
			ctx.fillStyle = font.color;
			ctx.translate(10,20);
			lines.forEach((l,i) => {
				ctx.fillText(l,0,(font.size+font.lineSpacing) * i);
			});
		ctx.restore();
	}
	
	renderInput() {
		var ctx = this.ctx;
		//Render mouse location
		var pos = this.game.inputReciever.getWorldPosition();
		ctx.save();
		ctx.strokeStyle = "blue";
		ctx.translate(pos.x,pos.y);
		ctx.beginPath();
		ctx.arc(0,0,5,0,Math.PI * 2);
		ctx.stroke();
		ctx.restore();
	}

    renderBounds() {
        var engine = this.engine;
        var ctx = this.ctx;

        ctx.save();
            var bodies = engine.world.bodies;
            ctx.beginPath();
            for (var i = 0; i < bodies.length; i += 1) {
                var vertices = bodies[i].vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (var j = 1; j < vertices.length; j += 1) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
            }
            ctx.setLineDash([12, 3, 3]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'green';
            ctx.stroke();
        ctx.restore();
	}
	
	lookAt(obj) {
        this.camera.target = obj;
	}
}