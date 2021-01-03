const TIGLManager = require("tiglmanager");


/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
var tm;
var myEntity;
var width;
var height;

function init()
{
    tm = new TIGLManager(this);
    let id = tm.addSprite({url: "Resources/sprite.png", x: 50, y: 50});
    myEntity = tm.getEntityById(id);
    //Ti.API.info("myEntity = " + myEntity);

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
    //Ti.API.info("myEntity2 = " + myEntity);
    myEntity.x = Math.cos(Date.now() * 0.001) * width * 0.5 - 128 + width * 0.5;

    tm.terminate();
}

$.win.open();