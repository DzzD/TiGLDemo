/*
 * Import TIGL manager
 */
const TIGLManager = require("tiglmanager");


/*
 * Import Tween module
 */
const TWEEN = require("tween.cjs");

/*
 * Some globals vars
 */
var tm;
var width;
var height;

var entityDragged = null;
var entities = new Array();

/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
function init()
{
    /*
     * Create and initialise TIGL manager
     */
    tm = new TIGLManager(this);
    for(var n = 0; n < 16; n++)
    {
        var entity = tm.addSprite({url: "Resources/puzzle/jigsaw" + n + ".png", px: 60, py: 60});
        entity.addEventListener('touch', onTouchEntity);
        entities.push(entity);
    }

}

/*
 * Called when an entity is touched
 *  => "this" represent the touched entity
 */
function onTouchEntity(e)
{
    switch(e.action)
    {
        case "down" :
            if(entityDragged == null)
            {
                entityDragged = this;
                this.startX = this.x;
                this.startY = this.y;
                this.sceneX = e.sceneX;
                this.sceneY = e.sceneY;
            }
        break;
    }
}


/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */ 
function resize(e)
{
    width = e.width;
    height = e.height;

    /*
     * Dispose entities all over the screen
     */
    for(var n = 0; n < entities.length; n++)
    {
        var entity = entities[n];
        entity.x = width * 0.5 - 180 + Math.floor(n%4) * 120;
        entity.y = height * 0.5 - 180 + Math.floor(n/4) * 120;
    }
}

/*
 * Loop must be declared as an attribute of the Alloy tag TIGLView (eg: onLoop="loop")
 */ 
function loop()
{
    TWEEN.update();   
}


/*
 * Touch must be declared as an attribute of the Alloy tag TIGLView (eg: onTouch="touch")
 */ 
function touch(e)
{
    /*
     * Discard all events wich not come from the scene
     */
   if(e.entityId != 0)
   {
       return;
   }

   
   switch(e.action)
   {
        case "move" :
            if(entityDragged != null)
            {
                entityDragged.x = entityDragged.startX + e.sceneX - entityDragged.sceneX;
                entityDragged.y = entityDragged.startY + e.sceneY - entityDragged.sceneY;
            }
        break;

       case "up" :
           if(entityDragged != null)
           {
               entityDragged = null;
           }
       break;
   }

}

/*
 * Scramble all entities position
 */
function scramble()
{
    for(var n = 0; n < entities.length; n++)
    {
        var entity = entities[n];
        var x = 100 + Math.random() * (width - 200);
        var y = 100 + Math.random() * (height - 200);
        var tween = new TWEEN.Tween(entity)
                             .to({x: x, y: y}, 2000)
                             .easing(TWEEN.Easing.Quadratic.Out).start();
    }
}
