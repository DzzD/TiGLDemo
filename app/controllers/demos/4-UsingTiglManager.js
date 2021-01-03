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
    let id = tm.addSprite({url: "Resources/sprite.png", x: 50, y: 50});
    myEntity = tm.getEntityById(id);
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
    myEntity.x = Math.cos(Date.now() * 0.001) * width * 0.5 - 128 + width * 0.5;

    /*
     * Send data to Java TIGL module
     */
    tm.terminate();
}
