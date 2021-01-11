
/*
 * Import TIGL manager 
 */
const TIGLManager = require("tiglmanager");
var tm;


function init(e)
{
	tm = new TIGLManager(this);
	this.nb = 60;
	this.pause();
	let entity;
	//entity = tm.addSprite({url : "Resources/background.png", width : 500, height: 500, tile : true, layer: 0});
	//entity.addEventListener('touch',function(e){Ti.API.info("Touch !"), this.remove();});
	for(let n = 0; n < this.nb*this.nb; n++)
	{
		
		switch(n%4)
		{
			case 0:
				entity = tm.addSprite({url : "Resources/robot4.png", width : 64, height: 64, layer: 4, px: 32, py:32});
			break;
			case 1:
				entity = tm.addSprite({url : "Resources/robot2.png", width : 64, height: 64, layer: 2, px: 32, py:32});
			break;
			case 2:
				entity = tm.addSprite({url : "Resources/robot3.png", width : 64, height: 64, layer: 3, px: 32, py:32});
			break;
			case 3:
				entity = tm.addSprite({url : "Resources/logoSprite.png", width : 72, height: 72, layer: 1, px: 36, py:36});
			break;
		}
		entity.addEventListener('touch',function(e){this.remove();});
		//entity.playAnimation({loop: 0});
	}
	
	this.resume();
}


function resize(e)
{
	Ti.API.info("resize : " + e.width + "," + e.height);
	this.viewW = e.width;
	this.viewH = e.height;

	var now = Date.now();
	var n = 0;
	for (var [id, entity] of tm.getEntities())
	{
		entity.startX = (n % this.nb) * this.viewW / this.nb ;
		entity.startY = Math.floor(n/this.nb) * this.viewH / this.nb;
		entity.index = n;
		n++;
	}
}


var loopCount = 0;
var loopTime = 0;
var dataSendTime = 0;
function loop(e)
{
	
	var loopTimeStart = Date.now();
	var now = Date.now();
	var spaceX = this.viewW / this.nb;
	var spaceY = this.viewH / this.nb;
	var angle = now*Math.PI/180.0 * 0.05;
	var n = 0;
	for (var [id, entity] of tm.getEntities())
	{
		entity.x = entity.startX + Math.cos(entity.index + angle) * spaceX;
		entity.y = entity.startY + Math.sin(entity.index + angle) * spaceY;
		n++;
	}
	loopTime += Date.now() - loopTimeStart;
	dataSendTime += tm.timeDataSend ? tm.timeDataSend : 0;
	loopCount++;

	
	if(loopCount % 300 == 299)
	{
		var timersUs =this.timersUs;
		Ti.App.fireEvent('app:webview', { java: this.timersUs, javascript:{loopTime: loopTime / loopCount, dataSend: dataSendTime / loopCount }});
		Ti.API.info("Javascript : Loop time : " + (loopTime/loopCount).toFixed(2) + " ms");
		Ti.API.info("Javascript : Data send : " + (dataSendTime/loopCount).toFixed(2) + " ms");
	}
	
}
