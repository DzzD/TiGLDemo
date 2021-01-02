/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
var spriteUid;
var width;
function init()
{
	/*
	* For Alloy project, at runtime "assets" folder become "Resources" folder
	*/
    sprite1Uid = this.addSprite({url: "Resources/numbersBlue.png", x: 0, y: 0, width: 46, height: 46});
    sprite2Uid = this.addSprite({url: "Resources/numbersBlue.png", x: 0, y: 50, width: 46, height: 46});
    sprite3Uid = this.addSprite({url: "Resources/numbersBlue.png", x: 0, y: 100, width: 46, height: 46});
    sprite4Uid = this.addSprite({url: "Resources/spritesheet.png", x: 100, y: 50, width: 256, height: 256});


    this.playEntityAnimationById(sprite1Uid, {duration: 5000});
    this.playEntityAnimationById(sprite2Uid, {duration: 5000, start: 9, end: 0});
    this.playEntityAnimationById(sprite3Uid, {duration: 4000, pingpong: true, loop: 50});
    this.playEntityAnimationById(sprite4Uid, {duration: 500, loop: 0});
}


/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */ 
function resize(e)
{
    width = e.width;
}


/*
 * Loop must be declared as an attribute of the Alloy tag TIGLView (eg: onLoop="loop")
 */ 
function loop()
{
   
    
}

$.win.open();