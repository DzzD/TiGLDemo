/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
function init()
{
	/*
	* For Alloy project, at runtime "assets" folder become "Resources" folder
	*/
	this.addSprite({url: "Resources/sprite.png", x: 50, y: 50});
}

$.win.open();