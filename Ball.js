lock = false; up = 23; down = 0; gravity = true; x = 50, y = 0, jumpHandler = null, jumpCount = 0, frames = 20, deltaH = 2; dUp = up;

document.onkeydown = jump;


function ballStart()
{
	BallHandler = window.setInterval('move()', frames);
}

var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode] = true;
},true);

window.addEventListener('keyup',function(e){
    keyState[e.keyCode] = false;
},true);

function move() 
{
	if(x < 0 || y > 500)
	{
		window.clearInterval(MoveHandler);
		window.clearInterval(BallHandler);
		document.getElementById('btnStart').style.display = 'inline';
		document.getElementById('btnStart').value = 'Restart';
		restart = true;
	}

	if(y + 60 >= width - floor[x + 110])
		x -= pace;

	if(x <= 690 && (keyState[39] || keyState[68]) && y + 135 <= width - floor[x + 125])
		x += 7;
	if(x > 0 && (keyState[37] || keyState[65]) && y + 135 <= width - floor[x - 40])
		x -= 7; 
	if(y < width - floor[x] -135 && gravity)
	{
		y += down;
		down += deltaH;

		for(i = x; i < x + 90; i++)
			if(y + down >= width - floor[i] - 135)
			{
				jumpCount = 0;
				y = width - floor[i] - 135;
				down = 0;
			}
	}
	shiftBackBall = 36 - x;
	shiftFrontBall = 800 - (x - 36);
	document.getElementById('heros').style.clip = 'rect(0px,' + shiftFrontBall 
	+ 'px, 150px,' + shiftBackBall+'px)';
	document.getElementById('heros').style.left = x - 25 + 'px';
	document.getElementById('heros').style.top = y + 'px';
}

function jump() 
{
	if (event.keyCode == 38 || event.keyCode == 87) 
	{
		if(jumpHandler != null)
			window.clearInterval(jumpHandler);
		gravity = false;
	if(jumpCount < 2)
	{
		jumpCount++;
		jumpHandler = window.setInterval('hop()', frames);
	}
	else 
	 	gravity = true;
	}
}
        

function hop()
{
	gravity = false;
	y -= dUp;
	dUp -= deltaH;
	if(dUp <= 0)
	{
		dUp = up;
		window.clearInterval(jumpHandler);
		jumpHandler = null;
		gravity = true;
	}
} 