heights = [300, 400];
lenghts = [100, 200, 300];
width = 800;
height = 800;
score = 0;
pace = 10;
countDist = 0;
record = 0;


Cloud = class {
	constructor(xCloud)
	{
		this.xCloud = xCloud;
	}
    	cloudWidth = 0;
	speed = 2;
}

CloudsParameters = [new Cloud(300), new Cloud(700)];

Obstacle = class {
  constructor(h, p0, length) {
    this.h = h;
    this.p0 = p0;
    this.length = length;
  }
}

function onLoad()
{
	canvas = document.getElementById('canvas1');
	ctx = canvas.getContext('2d');
	clouds = [document.getElementById('cloud_1').style,
	document.getElementById('cloud_2').style];

	obstacles = [document.getElementById('carriage_1').style,
	document.getElementById('carriage_2').style,
	document.getElementById('carriage_3').style];

}

function generuj()
{
	MoveHandler = window.setInterval('backgroundMove()', 30);
}

function backgroundMove()
{
	score += 0.1;
	countDist++;
	if (score > record)
		record = score;
	if (countDist == 1000 && pace < 30) {
		countDist = 0;
		pace += 2;
	}
	ctx.font = "30px Arial";
	ctx.clearRect(570, 20, 250, 50);
	ctx.fillText("Distance: " + Math.round(score), 570, 50)

	ctx.clearRect(0, 20, 250, 50);
	ctx.fillText("Record: " + Math.round(record), 30, 50)

	for (j = 0; j < floor.length; j++)
		floor[j] = 100;

	for(i = 0; i < obstacles.length; i++)
	{
		ObstacleParameters[i].p0 -= pace;
		obstacles[i].left = ObstacleParameters[i].p0 + 25 + 'px';
		obstacles[i].height = ObstacleParameters[i].h + 'px';
		obstacles[i].width = ObstacleParameters[i].length + 'px';
		obstacles[i].top = 810 - ObstacleParameters[i].h + 'px'; 
		shiftBackObstacle = 788 - ObstacleParameters[i].p0;
		shiftFrontObstacle = -15 - ObstacleParameters[i].p0;
		obstacles[i].clip = 'rect(0px,' + shiftBackObstacle + 'px,' + ObstacleParameters[i].h 		+ 'px,'
		+ shiftFrontObstacle + 'px)';
		if(ObstacleParameters[i].p0 + ObstacleParameters[i].length < 0)
		{
			ObstacleParameters[i].p0 = width;
			ObstacleParameters[i].h = heights[Math.floor(Math.random() * 2)];	
			ObstacleParameters[i].length = lenghts[Math.floor(Math.random() * 3)];
		}

		for(j = ObstacleParameters[i].p0; j < ObstacleParameters[i].p0 + ObstacleParameters		[i].length; j++)
			{
				if(floor[j] < ObstacleParameters[i].h)
					floor[j] = ObstacleParameters[i].h;
			}
	}



	//CHMURY
	for(i = 0; i < clouds.length; i++)
	{
		CloudsParameters[i].xCloud -= CloudsParameters[i].speed;
		clouds[i].left = CloudsParameters[i].xCloud + 'px';
		shiftBack = 812 - CloudsParameters[i].xCloud;
		shiftFront = 10 - CloudsParameters[i].xCloud;
		clouds[i].clip = 'rect(0px,' + shiftBack + 'px, 150px,'+ shiftFront + 'px)';
		if(CloudsParameters[i].xCloud + 200 < 0)
		{
			CloudsParameters[i].speed = 1 + Math.random() * 6;
			CloudsParameters[i].xCloud = 800 + Math.random() * 200;
			CloudsParameters[i].cloudWidth = 100 + Math.random() * 100;
		}
	}
}

function canvasStart()
{
	onLoad();
	generuj();
}