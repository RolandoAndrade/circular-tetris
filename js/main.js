let board=new Board();
board.draw();

document.onkeydown = function (e)
{
	if ((e.keyCode==40))
		board.drop();
	else if ((e.keyCode==37||e.keyCode==65))
		board.move(-1);
	else if ((e.keyCode==39||e.keyCode==68))
		board.move(1);
};