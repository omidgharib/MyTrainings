$(document).ready(function(){
	var slider=$("div#slider"),
	train=$("div#slider > div.train"),
	slides=$("div#slider > div.train > div.slide"),
	currentslide=0;
	
	(go2slide=function(n){
		if (n>=slides.length) n=0;
		if(n<0) n=slides.length-1;
		train.css("left",-940*n+'px');
		currentslide=n;
	})(0);

	$("div#slider > div.next").click(function(){
		go2slide(currentslide+1);
	});

	$("div#slider > div.previous").click(function(){
		go2slide(currentslide-1);
	});
});