//import Activity from "android.app.Activity";
//import GLView from "fr.dzzd.glsprite.GLView";

//var activity = new Activity(Titanium.App.Android.getTopActivity());

/*
var glView = new GLView(activity);
Ti.API.info("GLSprite", "glView is => " + glView);

var glEntity = glView.getEntity();
Ti.API.info("GLSprite", "glView.getEntity() glEntity is => " + glEntity);
*/


var win = Ti.UI.createWindow({backgroundColor:'white'});
var label = Ti.UI.createLabel();
win.add(label);
win.open();

/*
 * Create GLSprite module
 */
var glsprite = require('fr.dzzd.glsprite');
Ti.API.info("GLSprite.test", "Module is => " + glsprite);



var n=0;
var width = 0;
var height = 0;
var spriteCount = 100;

function onCreated(e)
{
	Ti.API.info("onCreated");
	for(var n = 0; n < 100; n++ )
	{
		//var s = proxy.createGLSprite("Resources/appicon.png");
		//s.x = n;
		//s.y = n;
		//proxy.getScene().add(s);
	}
}

function onChanged(e)
{
	var width = e.width;
	var height = e.height;
	Ti.API.info("onChanged");
	Ti.API.info("onChanged" + e);
	Ti.API.info("onChanged size=(" + width + "," + height + ")");
}

function onDraw(e)
{
	//if(n<10)
	//	Ti.API.info("OnDraw" + n++);
	Ti.API.info("proxy.getScene() : " + proxy.getScene());
	//Ti.API.info(event);
}




var proxy = glsprite.createGLView(
	{/*
		message: "Creating an example Proxy",
		backgroundColor: "red",*/
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		top: 0,
		left: 0,
		oncreated: onCreated,
		onchanged: onChanged,
		ondraw: onDraw

	});


win.add(proxy);



