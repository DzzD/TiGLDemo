/*
 * Import TIGL manager
 */
const TIGLManager = require("tiglmanager");

/*
 * Import Tween module (https://github.com/tweenjs/tween.js/)
 */
const TWEEN = require("tween.cjs");


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

    /*
     * Load a sprite andsets its pivots
     */
    myEntity = tm.addSprite({url: "Resources/sprite.png"});
    myEntity.px = 100;
    myEntity.py = 128;
}


/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */ 
function resize(e)
{
    width = e.width;
    height = e.height;
    myEntity.x = width * 0.5;
    myEntity.y = height * 0.5;
}

/*
 * Loop must be declared as an attribute of the Alloy tag TIGLView (eg: onLoop="loop")
 */ 
function loop()
{
    TWEEN.update();
}


function doTweenLeft()
{
    var tween = new TWEEN.Tween(myEntity).to({x: 120, y: 200, r: 359}, 2000)
                .easing(TWEEN.Easing.Quadratic.Out)
    tween.start();
}


function doTweenRight()
{
    var tween = new TWEEN.Tween(myEntity).to({x: width - 120, y: height * 0.5, r: 0}, 2000)
                .easing(TWEEN.Easing.Quadratic.Out)
    tween.start();
}

