// a callibrate func for change range of numbers
Math.getInRange=function (x, arr) {// arr = [x1,x2,y1,y2] // x is input and new y return
  return ((arr[3] - arr[2]) * (x - arr[0])) / (arr[1] - arr[0]) + arr[2];
}

$(function(){
	var slider=$("div#slider"),
		train=$("div#slider > div.train"),
		slides=$("div#slider > div.train > div.slide"),
		lists=$("div.slideshow > ul.btns li"),
		playAndPauseBtn=$("div#slider > div.loading > span"),
		canvas =document.getElementById("loading"),
		ctx = canvas.getContext("2d"),
		d2r = Math.PI/180,
		degshif = 90,
		currentDegree = 0,
		currentslide = 0,
		aniDue = 4000,
		lastDraw = 0,
		iv=0,
		saresh = 6*d2r,
		starArc = -1*degshif*d2r;


	(go2slide=function(n){
		if (n>=slides.length) n=0;
		if(n<0) n=slides.length-1;
		train.animate({"left":(-940*n+'px')},900);
		lists.eq(currentslide).removeClass('active');
		lists.eq(n).addClass('active');
		currentslide=n;
	})(0);

	var drawCircle = function (deg){
		ctx.clearRect(0,0,40,40);

		deg-=degshif;
		deg*=d2r;

		// sahdow
		ctx.lineWidth=7;
		ctx.globalAlpha=0.2;
		ctx.strokeStyle='hsl(60,20%,20%)';
		ctx.beginPath();
		ctx.arc(20,20,15,0,360*d2r);
		ctx.stroke();

		if(!deg) return;

		// body
		ctx.lineWidth=5;
		ctx.globalAlpha=0.8;
		//ctx.strokeStyle='hsl(60,10%,20%)';
		ctx.beginPath();
		ctx.arc(20,20,15,starArc,deg-saresh);
		ctx.stroke();

		// saresh
		ctx.beginPath();
		ctx.strokeStyle='hsl(60,5%,70%)';
		ctx.arc(20,20,15,deg-saresh,deg);
		ctx.stroke();
	},

	circleAni = function(){
		var now = Date.now();
		currentDegree += Math.getInRange(now-lastDraw,[0,aniDue,0,360]);
		if(currentDegree>=360){
			currentDegree%=360;
			//console.log('nextSlide');
			//console.log(currentDegree);
			go2slide(currentslide+1);
		}

		drawCircle(currentDegree);
		lastDraw = now;
	},

	startInt = function(){
		if(iv) return;
		lastDraw = Date.now();
		iv = setInterval(circleAni,1000/60);
		playAndPauseBtn.removeClass('play').addClass('pause');
	}

	stopInt = function(){
		clearInterval(iv);
		iv=0;
		playAndPauseBtn.removeClass('pause').addClass('play');
	}

	$("div#slider > div.next").click(function(){
		stopInt();
		go2slide(currentslide+1);
	});

	$("div#slider > div.previous").click(function(){
		stopInt();
		go2slide(currentslide-1);
	});

	lists.click(function(){
		stopInt();
		go2slide($(this).index());
	});

	playAndPauseBtn.click(function(){
		if ($(this).hasClass('pause')) {
			stopInt();
		}
		else{
			startInt();
		}
	});

	startInt();
});