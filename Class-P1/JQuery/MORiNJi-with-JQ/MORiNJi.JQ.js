/*
 OmidGharib - MORiNJi ver 0.4 trial
 Copyright (c) 2013 Omid Gharib .
 https://github.com/omidgharib/MORiNJi
 fork me on github.
*/

$(document).ready(function(){
	var morinji = $("div#morinji"),				
		slider = $("div.slider"),							// 
		trainer = $("div.trainer"),
		rows = $("div.trainer > div.row"),					// rows of slides
		slides = $("div.trainer > div.row > div.slide"), 	// all of slide
		lists = 0,											// list of btns
		width = 720,										// slide's width 
		height = 480,										// slide's height
 		icons = null,
	 	currentSlide = 0, 									// current slide  
	 	currentSlideI = 0,									// current row position of slide
	 	currentSlideJ = 0;									// current column position of slide

  	init=function(){ 
		morinji.append("<div class='nav'></div>"); 		// navNode with nav cssClass after morinji
		var nav = $("div.nav");
		for(var i=0 ; i < rows.length ; i++){
			var cols=$("div.row:eq("+i+") > div.slide");

			for(var j=0; j < cols.length ; j++){
				nav.append("<li></li>"); 						//add li's related to slides
				cols.eq(j).css({"background-color":rndColor()});
			}
			nav.append("<div class='clear'></div>");          	//add clear to end of the row in li's
			//rows.eq(i).append("<div class='clear'></div>"); 	//add clear to end of the row
		}

	 	lists=$("div.nav > li");			// initials list of btns
	}();
	//init();

	// set slides size(width and height) from data-size
	(function(){
		size = morinji.attr('data-size');
		console.log(size);
		if(size!=null){
	 		if(size=='full'){
	 			width = $(window).width(); 
	 			height= $(window).height();
	 		}
	 		else{
	 			width=size.substr(0,size.indexOf(','));
	 			height=size.substr(size.indexOf(',')+1);
	 			if (width=='full')  width = $(window).width(); 
	 			if (height=='full') height= $(window).height();
	 		}
	 	}
	 		slider.css({			//set width and height to slider and all the slides
	 			"width" : width,
	 			"height": height
	 		});

 			slides.css({
 				"width" : width,
	 			"height": height
 			});
	})();

	$("div.nav > li").click(function(){
		//console.log($(this).index("li"));
		p = $(this).index("li");
		temp = bringBackIAndJ(p);			// find out what is the i and j
		go2Slide(temp.i, temp.j, p );
	});

	// change the slide to a new one
	go2Slide=function(i,j,p){
		trainer.animate({"top":(-height*i)+'px',"left":(-width*j)+'px'},300);
		//console.log(lists.eq(currentSlide));
		lists.eq(currentSlide).removeClass('active');		// remove the active class from current slide
		//console.log(lists.eq(p));
		lists.eq(p).addClass('active');						// add the active class to new one
		currentSlide = p;
		currentSlideI= i;
		currentSlideJ= j;
		//if(icons!=null)arrowsIconExistence(i,j); //check for none or blocking display of arrow icons
	}

	//get the number of slide bring back the row(i) and column(j) position 
	function bringBackIAndJ(p) {
		var temp = 0;
		for(var i=0 ; i < rows.length ; i++){
			var cols = $("div.row:eq("+i+") > div.slide");
			for(var j=0 ; j < cols.length ; j++){
				if (temp==p) return { "i":i , "j":j };
				temp++;
			}
		}
	}

	//random and  randomcolors functions
	function rnd(a,b) {
		return Math.floor(Math.random()*(b-a))+a;
	}

	function rndColor() {
	var c='#';
	for(var i=0;i<6;i++){
		c+=rnd(0,15).toString(16);
		}
		return c;
	}
});