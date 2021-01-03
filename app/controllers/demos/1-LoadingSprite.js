/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
var spriteId;
function init()
{
	/*
	* For Alloy project, at runtime "assets" folder become "Resources" folder
	*/
	spriteId = this.addSprite({url: "Resources/sprite.png"});
}

function resize(e)
{
	/*
	 * Center sprite
	 */
	this.setEntityPositionById(spriteId, e.width * 0.5 - 100, e.height * 0.5 - 125);
}

//$.win.open();