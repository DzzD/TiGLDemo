

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

function open4UsingTiglManager()
{
	var view = Alloy.createController('demos/4-UsingTiglManager').getView();
	view.open();
}

function open4UsingTiglManager()
{
	var view = Alloy.createController('demos/4-UsingTiglManager').getView();
	view.open();
}

function open5TiglManagerAndTween()
{
	var view = Alloy.createController('demos/5-TiglManagerAndTween').getView();
	view.open();
}

function openMoreDemo()
{
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['Ok'],
		message: 'New demos and tutorials will be added shortly',
		title: 'More to come'
	  });	
	  dialog.show();
}

function openBenchmark3600()
{
	var view = Alloy.createController('Benchmark3600').getView();
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