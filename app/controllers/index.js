

function open1LoadingSprite()
{
	var view = Alloy.createController('demos/1-LoadingSprite').getView();
	view.open();
}


function open2MovingSprite()
{
	var view = Alloy.createController('demos/2-MovingSprite').getView();
	view.open();
}

function open3AnimatingSprite()
{
	var view = Alloy.createController('demos/3-AnimatingSprite').getView();
	view.open();
}




/*
 *Todo: clean below...
 */

function openScreen2()
{
	var screen = Alloy.createController('screen2').getView();
	screen.open();
}


function openScreen3()
{
	var screen = Alloy.createController('screen3').getView();
	screen.open();
}


$.win.open();