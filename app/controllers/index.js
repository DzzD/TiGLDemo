
function openScreen()
{
	var screen = Alloy.createController('screen2').getView();
	screen.open();
}



function init(e)
{
	this.entities = new Array();
	this.nb = 60;
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
				entityId = this.addSprite({url : "Resources/logo.png", width : 64, height: 64});
			break;
		}
		this.entities[n] = new Object();
	}
	Ti.API.info("init finished " + this.entities.length);
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
	//Ti.API.info("loop started " + this.entities.length);

	var now = Date.now();
	var spaceX = this.viewW / this.nb;
	var spaceY = this.viewH / this.nb;
	var angle = now*Math.PI/180.0 * 0.05;

	for(let n = 0; n < 100; n++)
	{
		var x = (n%this.nb) * spaceX + Math.cos(n + angle) * spaceX;
		var y = (n/this.nb) * spaceY + Math.sin(n + angle) * spaceY;
		this.entities[n].x = x;
		this.entities[n].y = y;
		index[n] = n;
		xs[n] = x;
		ys[n] = y;
	}

	this.setEntityPos(index, xs, ys, 100);
	
}


$.win.open();