
/*
 * Import TIGL manager and FPS
 */
const TIGLManager = require("tiglmanager");
const FPS = require("fps");
var fps = new FPS("JS", "Javascript loop");
var tm;


function init(e)
{
	tm = new TIGLManager(this);
	this.nb = 60;
	this.pause();
	let entity;
	entity = tm.addSprite({url : "Resources/background.png", width : 500, height: 500, tile : true, layer: 0});
	entity.addEventListener('touch',function(e){Ti.API.info("Touch !"), this.remove();});
	for(let n = 0; n < this.nb*this.nb; n++)
	{
		
		switch(n%4)
		{
			case 0:
				entity = tm.addSprite({url : "Resources/robot.png", width : 50, height: 50, layer: 1});
			break;
			case 1:
				entity = tm.addSprite({url : "Resources/robot2.png", width : 50, height: 50, layer: 2});
			break;
			case 2:
				entity = tm.addSprite({url : "Resources/robot3.png", width : 50, height: 50, layer: 3});
			break;
			case 3:
				entity = tm.addSprite({url : "Resources/logo.png", width : 72, height: 72, layer: 1});
			break;
		}
		entity.addEventListener('touch',function(e){Ti.API.info("Touch !"), this.remove();});
	}
	
	this.resume();
}


function resize(e)
{
	Ti.API.info("resize : " + e.width + "," + e.height);
	this.viewW = e.width;
	this.viewH = e.height;
}



function loop(e)
{
	
	fps.start();

	var now = Date.now();
	var spaceX = this.viewW / this.nb;
	var spaceY = this.viewH / this.nb;
	var angle = now*Math.PI/180.0 * 0.05;
	var n = 0;
	for (var [id, entity] of tm.getEntities())
	{
		entity.x = Math.floor(n%this.nb) * spaceX + Math.cos(n + angle) * spaceX - 25;
		entity.y = Math.floor(n/this.nb) * spaceY + Math.sin(n + angle) * spaceY - 25;
		n++;
	}
	fps.end();
	
}
