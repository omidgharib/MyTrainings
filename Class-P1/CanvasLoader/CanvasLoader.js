// a callibrate func for change range of numbers
Math.getInRange=function (x, arr) {// arr = [x1,x2,y1,y2] // x is input and new y return
  return ((arr[3] - arr[2]) * (x - arr[0])) / (arr[1] - arr[0]) + arr[2];
}

$(function(){
	var canvas=$('#loading')[0],
		ctx = canvas.getContext("2d"),
		d2r = Math.PI/180,
		degshift = 90,
		startArc = -1*degshift*d2r,
		density=50,
		trackAngle=360/density,
		tracksShift=0,
		frame=24,	// frame per second
		x=70, 		// x position center of official circle 
		y=70, 		// y position center of official circle 
		R=60, 		// radius of official circle
		r=10;  		// radius of small circles
//draw circle with specefic x=postion on x axis y=position on y axis , y , r=radis and c=color with hsl , o=opacity
	var drawCircle = function(x,y,r,c,o){
		ctx.fillStyle=c;
		ctx.globalAlpha=o;
		ctx.beginPath();
		ctx.arc(x,y,r,startArc,360*d2r);
		ctx.fill();
	},

	drawMultipleCircles = function(){
		ctx.clearRect(0,0,140,140);
		if (tracksShift==density) tracksShift=0;
		var shiftingAngle=tracksShift*trackAngle;
		for(var i=360-shiftingAngle ; i >= 0-shiftingAngle ; i-=trackAngle){
		drawCircle(x+Math.sin(i*d2r)*R,y+Math.cos(i*d2r)*R,r,'hsl(300,50%,'+Math.getInRange(i,[360-shiftingAngle,0-shiftingAngle,50,45])+'%)',Math.getInRange(i,[360-shiftingAngle,0-shiftingAngle,0.01,0.9]));
		}
		tracksShift++;
	}

	setInterval(drawMultipleCircles,1000/frame);


});