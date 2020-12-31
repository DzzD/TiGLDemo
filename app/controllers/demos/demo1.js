/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (onInit="init")
 */
function init()
{
	/*
	* For Alloy project, at runtime "assets" folder become "Resources" folder
	*/
	this.addSprite({url: "Resources/sprite.png", x: 150, y: 150});
}

$.win.open();