$(document).ready(function(){
	var slider=$("div#slider"),
	train=$("div#slider > div.train"),
	slides=$("div#slider > div.train > div.slide"),
	lists=$("div.slideshow > ul.btns li"),
	autoPlayProgress=0;
	currentslide=0;
	autoPlayLoading=false;
	autoPlayIv=false;
	var c=document.getElementById("loading");
	
	(go2slide=function(n){
		if (n>=slides.length) n=0;
		if(n<0) n=slides.length-1;
		train.animate({"left":(-940*n+'px')},900);
		lists.eq(currentslide).removeClass('active');
		lists.eq(n).addClass('active');
		currentslide=n;
	})(0);

	playAndPause =function(play) {
		if(play==false){ 
			$("div#slider > div.loading > span").removeClass('pause').addClass('play');
			clearTimeout(autoPlayIv);
			autoPlayIv=false;
			drawLoadingCircle();
		}
		else{
			if (autoPlayIv) {
				$("div#slider > div.loading > span").removeClass('pause').addClass('play');
				clearTimeout(autoPlayIv);
				autoPlayIv=false;
				drawLoadingCircle();
			}
			else {
				$("div#slider > div.loading > span").removeClass('play').addClass('pause');
				autoPlayIv=setTimeout(nextSlideAuto,4000-(100*autoPlayProgress/9));
				drawLoadingCircle();
			}
		}
	}

	function drawCircle(deg){
		ctx.clearRect(0,0,40,40);
		ctx=c.getContext("2d");
		ctx.beginPath();
		ctx.arc(20,20,15,-.5*Math.PI,(deg-90)*(Math.PI/180));
		ctx.lineWidth=5;
		ctx.strokeStyle='#222';
		ctx.globalAlpha=0.8;
		ctx.stroke();
		ctx.closePath();
	}

	function drawLoadingCircle() {
		if (autoPlayIv) {
			autoPlayProgress+=9;
			autoPlayProgress%=360;
			drawCircle(autoPlayProgress);
			autoPlayLoading=setTimeout(drawLoadingCircle,100);
		}
		else clearTimeout(autoPlayLoading);
	}	

	nextSlideAuto = function(){
		go2slide(currentslide+1);
		autoPlayProgress=0; //reset the loading progress
		autoPlayIv=setTimeout(nextSlideAuto,4000);
	}

	$("div#slider > div.next").click(function(){
		playAndPause(false);
		go2slide(currentslide+1);
	});

	$("div#slider > div.previous").click(function(){
		playAndPause(false);
		go2slide(currentslide-1);
	});

	lists.click(function(){
		playAndPause(false);
		go2slide($(this).index());
	});

	$("div#slider > div.loading > span").click(playAndPause);
	playAndPause();
});
