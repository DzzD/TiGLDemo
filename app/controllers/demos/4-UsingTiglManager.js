/*
 * Import TIGL manager
 */
const TIGLManager = require("tiglmanager");

/*
 * Some globals vars
 */
var tm;
var myEntity1;
var myEntity2;
var width;
var height;

/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
function init()
{
    /*
     * Create and initialise TIGL manager
     */
    tm = new TIGLManager(this);
    myEntity1 = tm.addSprite({url: "Resources/sprite.png"});
    myEntity2 = tm.addSprite({url: "Resources/spritesheet.png", width: 256, height: 256});
    myEntity2.playAnimation({duration: 500, loop: 0});
}


/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */ 
function resize(e)
{
    width = e.width;
    height = e.height;
}

/*
 * Loop must be declared as an attribute of the Alloy tag TIGLView (eg: onLoop="loop")
 */ 
function loop()
{
    /*
     * Modify some entities properties
     */
    myEntity1.px = 100;
    myEntity1.py = 125;
    myEntity1.x = Math.cos(Date.now() * 0.001) * width * 0.4 + width * 0.5;
    myEntity1.y = height * 0.5;
    myEntity1.sy = 1 + 0.25 * Math.cos(Date.now() * 0.003);
    myEntity1.sx = 1 + 0.25 * Math.sin(Date.now() * 0.003);
    myEntity1.r = 45 * Math.cos(Date.now() * 0.0025);
    
    myEntity2.x = Math.sin(Date.now() * 0.001) * width * 0.4 + width * 0.5;
    myEntity2.y = Math.cos(Date.now() * 0.001) * height * 0.2 + height * 0.5;
    myEntity2.px = 128;
    myEntity2.py = 128;
}
