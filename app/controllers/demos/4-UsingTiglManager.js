/*
 * Import TIGL manager
 */
const TIGLManager = require("tiglmanager");

/*
 * Some globals vars
 */
var tm;
var myEntity;
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
    myEntity = tm.addSprite({url: "Resources/sprite.png"});
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
     * Modify an entity properties
     */
    myEntity.px = 100;
    myEntity.py = 125;
    myEntity.x = Math.cos(Date.now() * 0.001) * width * 0.4 + width * 0.5;
    myEntity.y = height * 0.5;
    myEntity.sy = 1 + 0.25 * Math.cos(Date.now() * 0.003);
    myEntity.sx = 1 + 0.25 * Math.sin(Date.now() * 0.003);
    myEntity.r = 45 * Math.cos(Date.now() * 0.0025);
    
    /*
     * Send data to Java TIGL module
     */
    tm.terminate();
}
