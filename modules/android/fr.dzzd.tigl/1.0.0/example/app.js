


var win = Ti.UI.createWindow({backgroundColor:'white', title: "TIGL"});
win.open();

/*
 * Create tigl module
 */
var tigl = require('fr.dzzd.tigl');

var width;
var height;


var tiglView =  tigl.createTIGLView(
	{
		backgroundColor: "lightgray",
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		top: 0,
		left: 0
	});

tiglView.addEventListener('init', function init()
{
	Ti.API.info("init");
	this.addSprite({url : "Resources/dzzd.logo.png", x: 50, y:300});
	this.setUnits("dp");
	this.addText({font : "Resources/KidGame.fnt", text: "TEST", x: 50, y: 50, r: 10, fontSize: 64, color: "red", outlineColor: "white"});
	this.addText({font : "Resources/KidGame.fnt", text: "WOW!", x: 50, y: 150, r: -20, fontSize: 64, color: "green", outlineColor: "white"});
});

tiglView.addEventListener('resize',function resize(e)
{
	width = e.width;
	height = e.height;
});

tiglView.addEventListener('loop',function loop()
{
	
});
tiglView.addEventListener('touch',function touch()
{
	Ti.API.info("touch");
});


win.add(tiglView);



