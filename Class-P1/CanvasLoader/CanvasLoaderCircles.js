// a callibrate func for change range of numbers
Math.getInRange=function (x, arr) {// arr = [x1,x2,y1,y2] // x is input and new y return
  return ((arr[3] - arr[2]) * (x - arr[0])) / (arr[1] - arr[0]) + arr[2];
}

$(function(){
	var canvas=$('#loading')[0],
		ctx = canvas.getContext("2d"),
		d2r = Math.PI/180,
		degshift = 90,
		currentDegree = 0,
		aniDue = 4000,
		startArc = -1*degshift*d2r,
		density=40;
		x=50,
		y=50,
		r=40; //radiu for official circle

		ctx.clearRect(0,0,80,80);

//draw circle with specefic x=postion on x axis y=position on y axis , y , r=radis and c=color with hsl
	var drawCircle = function(x,y,r,c){
		ctx.globalAlpha=0.8;
		ctx.fillStyle=c;
		ctx.beginPath();
		ctx.arc(x,y,r,startArc,360*d2r);
		ctx.fill();
	},

	drawMultipleCircles = function(){
		if(currentDegree==0){currentDegree=360;}
		drawCircle(x+Math.sin(currentDegree*d2r)*r,y+Math.cos(currentDegree*d2r)*r,5,'hsl(60,20%,'+Math.getInRange(currentDegree,[0,360,40,95])+'%)');
		currentDegree-=Math.floor(360/density);
	}

	setInterval(drawMultipleCircles,1000/24);


});