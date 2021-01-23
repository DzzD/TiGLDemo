/*
 * Import TIGL manager & tweenjs(https://github.com/tweenjs/tween.js/)
 */
const TIGLManager = require("tiglmanager");
const Tween = require("tween.cjs");

/*
 * Some globals vars
 */
var tm;
var textA;
var sprite;
var textB;
var width;
var height;
var counter = 0;
var tween = null;

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
     * If font is not specified, Arial font embeded in module will be used
     * Also if not specified color default to grey, outline to transparent and fontSize to bitmapfont size
     */
    textA = tm.addText({text: ""});

    /*
     * Ofcourse hierarchy work also on texts
     */
    sprite = tm.addSprite({url: "Resources/textBackground.png"});
    sprite.px = sprite.width/2;
    sprite.py = sprite.height/2;
    sprite.parent = textA;

    /*
     * In addition to commons properties there are some specifics properties for Text :
     * - font
     * - fontSize
     * - color
     * - outlineColor
     */
    textB = tm.addText({font : "Resources/bitmapfont/KidGame.fnt", text: "KIDGAME FONT!", color: "green", outlineColor: "white", r: 90, fontSize: 64, sx: 0.8, sy: 0.8});
  
  

}


/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */ 
function resize(e)
{
    width = e.width;
    height = e.height;

    textB.px = textB.width/2;
    textB.py = textB.height/2;
    textB.x = width - 50;
    textB.y = height/2;

    textA.x = width/2;
    textA.y = height/2;



    /*
     * As other entities, tweening can be used to animate Text
     */
    if(tween)
    {
        tween.stop();
    }
    tween = new Tween.Tween(textB)
                .to({x: width/2 , y: 50, r: 0, sx: 1.2, sy: 1.5}, 2000)
                .easing(Tween.Easing.Elastic.InOut).yoyo(true)
                .repeat(Infinity).start();
}

/*
 * Loop must be declared as an attribute of the Alloy tag TIGLView (eg: onLoop="loop")
 */ 
function loop()
{
    /*
     * Update text entities
     */
    textA.text = "C-" + counter++;
    textA.px = textA.width/2;
    textA.py = 32;
    sprite.x = textA.width/2;
    sprite.y = textA.height/2 + 8;
    textA.r++;

    Tween.update(); //Requiere to update tweens
}
