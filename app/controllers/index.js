import Activity from "android.app.Activity";


var GLView = require ("glview");


var glView =new GLView();

/*

Ti.App.addEventListener('resume', () => 
{
	Ti.API.info("Ti.App RESUME");
    glView.onPause();
});

Ti.App.addEventListener('pause', () => {
    Ti.API.info('PAUSE');
    glView.onPause();
});


Ti.App.addEventListener('pause', () => {
    Ti.API.info('PAUSE');
    glView.onPause();
});
*/

var act = Ti.Android.currentActivity;





glView.oninit = function (glView)
{
	this.scene = this.getScene();
	this.nb = 32;
	glView.addSprite({url : "Resources/background.png", width : glView.getWidth(), height: glView.getHeight(), tile : "true"});
	for(let n = 1; n < this.nb*this.nb; n++)
	{
		switch(n%3)
		{
			case 0:
				glView.addSprite({url : "Resources/robot.png", width : "50", height: "50"});
			break;
			case 1:
				glView.addSprite({url : "Resources/robot2.png", width : "50", height: "50"});
			break;
			case 2:
				glView.addSprite({url : "Resources/robot3.png", width : "50", height: "50"});
			break;
		}
	}
}


glView.onloop = function (glView)
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



function pause()
{
	Ti.API.info('Ti.App PAUSE');
	glView.onPause();
}

function resume()
{
	Ti.API.info("Ti.App RESUME");
	glView.onResume();
}

$.openGlContainer.add(glView);


$.win.open();
