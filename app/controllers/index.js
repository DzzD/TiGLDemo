import Activity from "android.app.Activity";
import _GLView from "fr.dzzd.glsprite.GLView";
import _GLEntity from "fr.dzzd.glsprite.GLEntity";
import _GLSprite from "fr.dzzd.glsprite.GLSprite";


var GLView = require ("glview");


var glView =new GLView();


glView.oninit=function (glView)
{
	this.scene = this.getScene();
	this.nb = 32;
	glView.addSprite({url : "Resources/background.png", width : glView.getWidth(), height: glView.getHeight(), tile : "true"});
	for(let n = 1; n < this.nb*this.nb; n++)
	{
		glView.addSprite({url : "Resources/robot.png", width : "50", height: "50"});
	}
}

glView.onloop=function (glView)
{
	var now = Date.now();
	var spaceX = this.width / this.nb;
	var spaceY = this.height / this.nb;
	var angle = now*Math.PI/180.0 * 0.05;
	for(let n = 1; n < this.nb*this.nb; n++)
	{
		var x = (n%this.nb) * spaceX + Math.cos(n + angle) * spaceX;
		var y = (n/this.nb) * spaceY + Math.sin(n + angle) * spaceY;
		glView.entities[n].x = x;
		glView.entities[n].y = y;
	}
	
	$.label.text = (this.nb*this.nb) + " Sprites at " + this.getFps() + " FPS";
}


$.openGlContainer.add(glView);
$.index.open();
