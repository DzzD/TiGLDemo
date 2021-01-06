/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
var spriteId;
var spriteX;
var spriteY;
function init()
{
	/*
	* For Alloy project, at runtime "assets" folder become "Resources" folder
	*/
	spriteId = this.addSprite({url: "Resources/dragme.png", px: 128, py: 170, touchEnabled: true});
}
/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */
function resize(e)
{
	/*
	 * Set sprite positions to center
	 */
    spriteX = e.width * 0.5;
    spriteY = e.height * 0.5;
}

/*
 * Loop must be declared as an attribute of the Alloy tag TIGLView (eg: onLoop="loop")
 */
function loop()
{
	this.setEntityPositionById(spriteId, spriteX, spriteY);
}

/*
 * Initialise some value for dragging
 */
var dragging = false;
var dragStartX;
var dragStartY;
var dragStartPosX;
var dragStartPosY;


/*
 * Touch must be declared as an attribute of the Alloy tag TIGLView (eg: onTouch="touch")
 */
function touch(e)
{
	var action = e.action;
	var pointer = e.pointer;
	var entityId = e.entityId;
	var x = e.x;
	var y = e.y;
	var sceneX = e.sceneX;
    var sceneY = e.sceneY;
    
	switch(action)
	{
		case "down" :
            if(entityId == spriteId)
            {
                dragging = true;
                dragStartX = sceneX;
                dragStartY = sceneY;
                dragStartPosX = spriteX;
                dragStartPosY = spriteY;
            }
		break;

		case "move":
            if(dragging)
            {
                spriteX = dragStartPosX + sceneX - dragStartX;
                spriteY = dragStartPosY + sceneY - dragStartY;
            }
        break;
        
		case "up":
            dragging = false;
		break;
	}
}
