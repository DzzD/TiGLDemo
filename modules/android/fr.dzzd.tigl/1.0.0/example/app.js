


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
	this.addSprite({url : "Resources/appicon.png", x: 50, y: 300});
	this.addShape({url : "Resources/appicon.png", x: 250, y: 300, tile: true, vertices: [0,0, 100,0, 100,100, 0,100] , uvs: [0,0, 100,0, 100,100, 0,100]});
	this.addShape({url : "Resources/appicon.png", x: 50, y: 500, tile: true, vertices: [0,0, 0,100, 100,100, 100,0] , uvs: [0,0, 0,100, 100,100, 100,0]});

	let vertices = new Array();
	let uvs = new Array();

	let nbVertice = 100;
	let radius = 400;
	for(let n = 0; n < nbVertice; n++)
	{
		let angleRad = (n * 360 / nbVertice) * 2.0 * Math.PI / 360;
		let cosA = radius * Math.cos(angleRad);
		let sinA = radius * Math.sin(angleRad);
		vertices.push(cosA);
		vertices.push(sinA);
		uvs.push(cosA);
		uvs.push(sinA);
	}
	let time = Date.now();
	this.addShape({url : "Resources/box.png", x: 750, y: 500, tile: true, vertices: vertices , uvs: uvs});
	let duration = Date.now() - time;
	Ti.API.info(" polygone time for " + nbVertice + " vertices is " + duration + "ms" );
	//this.units = "dp";
	// this.addText({font : "Resources/KidGame.fnt", text: "TEST", x: 50, y: 50, r: 10, fontSize: 64, color: "red", outlineColor: "white"});
	// this.addText({font : "Resources/KidGame.fnt", text: "WOW!", x: 50, y: 150, r: -20, fontSize: 64, color: "green", outlineColor: "white"});
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



