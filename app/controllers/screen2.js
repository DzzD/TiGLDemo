
function close()
{
	Ti.API.info("Window closed");
}


function close2()
{
	$.win.close();
}

var FPS = require("fps");
fps = new FPS();

function init(e)
{
	this.entities = new Array();
	this.nb = 60;
	this.pause();
	this.addSprite({url : "Resources/background.png", width : 500, height: 500, tile : true});
	for(let n = 0; n < this.nb*this.nb; n++)
	{
		let entityId;
		switch(n%4)
		{
			case 0:
				entityId = this.addSprite({url : "Resources/robot.png", width : 50, height: 50});
			break;
			case 1:
				entityId = this.addSprite({url : "Resources/robot2.png", width : 50, height: 50});
			break;
			case 2:
				entityId = this.addSprite({url : "Resources/robot3.png", width : 50, height: 50});
			break;
			case 3:
				entityId = this.addSprite({url : "Resources/logo.png", width : 72, height: 72});
			break;
		}
		this.entities[n] = new Object();
		this.entities[n].id = entityId;
	}
	Ti.API.info("init finished " + this.entities.length);
	
	this.resume();
}


function resize(e)
{
	Ti.API.info("resize : " + e.width + "," + e.height);
	this.viewW = e.width;
	this.viewH = e.height;
}


var index = new Array();
var xs = new Array();
var ys = new Array();


function loop(e)
{
	
	fps.start();
	//Ti.API.info("loop started " + this.entities.length);
	var packedPos = new Array();
	var now = Date.now();
	var spaceX = this.viewW / this.nb;
	var spaceY = this.viewH / this.nb;
	var angle = now*Math.PI/180.0 * 0.05;
	var n = 0;
	for(let n = 0; n < this.entities.length; n++)
	{
		var x = (n%this.nb) * spaceX + Math.cos(n + angle) * spaceX;
		var y = (n/this.nb) * spaceY + Math.sin(n + angle) * spaceY;
		this.entities[n].x = x;
		this.entities[n].y = y;
		/*
		index[n] = this.entities[n].id;
		xs[n] = x;
		ys[n] = y;
		*/
		
		let packedXY = ((parseInt(x + 32768)<<16)&0xFFFF0000) | (parseInt(y + 32768)&0xFFFF);
		packedPos[n*2] = this.entities[n].id;
		packedPos[n*2 + 1] = packedXY;
		
		
	}
	this.setEntityPosPacked(packedPos);
	//this.setEntityPos(index, xs, ys, this.entities.length);
	fps.end();
	
}


$.win.open();