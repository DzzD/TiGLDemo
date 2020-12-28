function openIndex()
{
	var screen = Alloy.createController('index').getView();
	screen.open();
}

function close()
{
	$.win.close();
}