/*
 * Import TIGL manager
 */
const Tigl = require("tiglmanager");


var tm;

var ground; //Invisible ground
var wallsL; //Invisible left wall
var wallsR; //Invisible right wall

var width;
var height;

var entitiesDragged = new Array();

/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
function init()
{
    /*
     * Create and initialise TIGL manager with Physics
     */
    tm = new Tigl.Physics(this);

    /*
     * Add somes boxes,
      * => To enable physics we only need to add the "physics{}" parameter to the entity, if this parameter is omitted the entity behave the same as usual
     */
    for(let n = 0; n < 21; n++)
    {
        let box = tm.addSprite({url: "Resources/box.png", r: 1, x: 50 + (n%3) * 65, y: Math.floor(n/3) * 65, physics: {restitution: 0.5}});
        box.addEventListener('touch', onTouchEntity);
    }


    /*
     * Add wall and ground
     * => Those are invisible/not drawn but will be used by the physics engine as bounds
     */
    ground = tm.addEntity({width: 10000, height: 50, x: 0, y: 0, physics: { isStatic: true, restitution: 0.8 }});
    wallsL = tm.addEntity({width: 50, height: 10000, x: 0, y: 0, physics: { isStatic: true }});
    wallsR = tm.addEntity({width: 50, height: 10000, x: 0, y: 0, physics: { isStatic: true }});
}


/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */ 
function resize(e)
{
    width = parseInt(e.width);
    height = parseInt(e.height);

    /*
     * Sets the walls and ground to the bounds of view
     * => When using physics it is important to use "Physics" method to move entity
     */
    Tigl.Physics.Body.setPosition(ground.body, {x: 0, y: height + 25});
    Tigl.Physics.Body.setPosition(wallsL.body, {x: -25, y: 0});
    Tigl.Physics.Body.setPosition(wallsR.body, {x: width + 25, y: 0});
}

/*
 * We dont need to do anything on loop
 */ 
function loop()
{
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
            /*
             * When touching down on a sprite set some properties to enable dragging it
             */
            if(entitiesDragged[e.pointer] == null)
            {
                entitiesDragged[e.pointer] = this;
                this.startX = this.x;
                this.startY = this.y;
                this.sceneX = e.sceneX;
                this.sceneY = e.sceneY;
            }
        break;
    }
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

   /*
    * Get the dragged entity if any for this pointer event
    */
   let entityDragged = entitiesDragged[e.pointer];

   switch(e.action)
   {
        case "move" :
            if(entityDragged)
            {
                let x = entityDragged.startX + e.sceneX - entityDragged.sceneX;
                let y = entityDragged.startY + e.sceneY - entityDragged.sceneY;
                Tigl.Physics.Body.setPosition(entityDragged.body, {x: x, y: y});
            }
        break;

       case "up" :
           
            if(entityDragged)
            {
                entitiesDragged[e.pointer] = null;   
            }
            else
            {        
                /*
                * If not dragging, add a ball
                */
                let ball = tm.addSprite({url: "Resources/ball.png", x: e.sceneX, y: e.sceneY, physics: {friction: 0.00001, restitution: 0.999, type: "circle"}});
                ball.addEventListener('touch', onTouchEntity);
                
            }
       break;
   }

}
