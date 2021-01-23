/*
 * Import TIGL manager
 */
const TIGLManager = require("tiglmanager");

/*
 * Some globals vars
 */
var tm;
var car;
var wheel1;
var wheel2;
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
    car = tm.addSprite({url: "Resources/car.png", px: 256, py: 100, layer: 1});
    wheel1 = tm.addSprite({url: "Resources/wheel.png", px: 40, py: 40, x: 123, y:153, layer: 2});
    wheel2 = tm.addSprite({url: "Resources/wheel.png", px: 40, py: 40, x: 430, y:153, layer: 2});

    /*
     * Set wheels as childs of car
     */
    wheel1.parent = car;
    wheel2.parent = car;
}


/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */ 
function resize(e)
{
    width = e.width;
    height = e.height;
    car.x = width /2;
    car.y = height /2;
}

/*
 * Loop must be declared as an attribute of the Alloy tag TIGLView (eg: onLoop="loop")
 */ 
function loop()
{
    /*
     * Rotate wheels
     */
    wheel1.r = wheel2.r = Date.now() * 0.5;

    
    /*
     * Rotate car
     */
    car.r = 10*Math.sin(Date.now() * 0.001);
}
