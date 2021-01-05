


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
		backgroundColor: "blue",
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		top: 0,
		left: 0
	});

tiglView.addEventListener('init', function init()
{
	Ti.API.info("init");
	this.addSprite({url : "Resources/logo.png"});
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



