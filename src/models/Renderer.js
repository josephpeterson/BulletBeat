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

		ctx.translate(canvas.width/2, canvas.height/2);
        ctx.scale(this.zoom, this.zoom);
		ctx.translate(-canvas.width/2, -canvas.height/2);
		
		if(trans) //Are we following an object?
			ctx.translate(trans.x,trans.y);
	}
	getTranslation() {
		var canvas = this.renderer.canvas;
		var pos = this.position;
		if(pos) //Are we following an object?
			return Entity.Vector.create(canvas.width/2 - pos.x,canvas.height/2 - pos.y);
		return false;
	}
}
export default class Renderer
{
	constructor(game)
	{
		var gameCanvas = game.gameCanvas;
		this.game = game;
		this.engine = gameCanvas.engine;
		this.ctx = gameCanvas.getContext();
		this.canvas = gameCanvas.getCanvas();

		this.camera = new Camera({
			renderer: this
		});
	}
	run() {
		this.clear();
        this.background();
		this.camera.apply();
		this.render();
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
		var objects = this.game.objects;

        //Objects
        objects.all(entity => {
			entity.render();
		});

		this.renderInput();
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
		var pos = obj.position;
		this.camera.position = pos;
	}
}