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
		nav = null,
		lists = null,										// list of btns
		width = 720,										// slide's width 
		height = 480,										// slide's height
		keys  = null,										// 
 		icons = null,										// 
	 	currentSlide  = 0, 									// current slide (slide number) 
	 	I = 0,												// current row position of slide
	 	J = 0;												// current column position of slide

  	init=function(){ 
		morinji.append("<div class='nav'></div>"); 				// append div.nav after morinji (slider navigator)
		nav = $("div#morinji > div.nav");
		for(var i=0 ; i < rows.length ; i++){
			var cols=$("div.row:eq("+i+") > div.slide");
			for(var j=0; j < cols.length ; j++){
				nav.append("<li></li>"); 						//add li's related to slides
				cols.eq(j).css({"background-color":rndColor()});
			}
			nav.append("<div class='clear'></div>");          	//add clear to end of the row in li's
			//rows.eq(i).append("<div class='clear'></div>"); 	//add clear to end of the row
		}

	 	lists=$("div.nav > li");								// initials list of btns
	}();
	//init();


	// get the number of slide bring back the row(i) and column(j) position 
	function bringBackIAndJ(p) {
		var temp = 0;
		for(var i=0 ; i < rows.length ; i++){
			var cols = $("div.row:eq("+i+") > div.slide");
			for(var j=0 ; j < cols.length ; j++){
				if (temp==p) return { "i":i , "j":j };		//return the object include two variable(i,j)
				temp++;
			}
		}
	}

	// get the row and col nember bring back the number of slide
	function bringBackP(row,col) {
		var p=0;
		for(var i=0 ; i < row ; i++) {
			p+= $("div.row:eq("+i+") > div.slide").length;
		}
		return p+col;
	}

	//check row i and col j for existing of the slide
	function checkSlide(i,j){
		if (i>=0 && j>=0 && i < rows.length) {
			if($("div.row:eq("+i+") > div.slide").eq(j).hasClass('slide')) return true;
			else return false;
		}
		else return false;
	}


	// change the slide to a new one
	go2Slide=function(i,j,p){
		trainer.animate({"top":(-height*i)+'px',"left":(-width*j)+'px'},900);
		//console.log(lists.eq(currentSlide));
		lists.eq(currentSlide).removeClass('active');		// remove the active class from current slide
		//console.log(lists.eq(p));
		lists.eq(p).addClass('active');						// add the active class to new one
		currentSlide = p;
		I= i;
		J= j;
		//if(icons!=null)arrowsIconExistence(i,j); //check for none or blocking display of arrow icons
	}

	upSlide = function(){
		if(checkSlide(I-1,J,bringBackP(I-1,J))){
			go2Slide(I-1,J,bringBackP(I-1,J));
		}
		else console.log('up');
	}

	downSlide = function(){
		if(checkSlide(I+1,J,bringBackP(I+1,J))){
			go2Slide(I+1,J,bringBackP(I+1,J));
		}
		else console.log('down');
	}

	leftSlide = function() {
		if(checkSlide(I,J-1,currentSlide-1)){
			go2Slide(I,J-1,currentSlide-1);
		}
		else console.log('left');
	}

	rightSlide = function() {
		if(checkSlide(I,J+1,currentSlide+1)){
			go2Slide(I,J+1,currentSlide+1);
		}
		else console.log('right');
	}

	// set slides size(width and height) from data-size
	;(function(){
		size = morinji.attr('data-size');
		//console.log(size);
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
	 		slider.css({			// set width and height to div.slider and all the slides
	 			"width" : width,
	 			"height": height
	 		});

 			slides.css({
 				"width" : width,
	 			"height": height
 			});
	})();

	// customize the slider navigator from data-nav attribute
	;(function(){
 		var dataNav = morinji.attr("data-nav");
 		console.log(dataNav);
		if(dataNav=='right')	 nav.css("right","8px");// if data-nav was right display nav on the right side
		else if(dataNav=='left') nav.css("left","8px");	// if data-nav was left display nav on the left side
		else nav.remove();
	})();

	//customize interactive with keyboard arrow keys and arrow btns
	;(function(){
		var arrows = morinji.attr("data-arrows");

 		if(arrows!=null){
	 		if (arrows=='keys') { 
	 			keys = 'keys';
	 		}
	 		else if (arrows=='icons') {
 				icons = 'icons';
	 		}
	 		else {
	 			var keys=arrows.substr(0,arrows.indexOf(','));
 				icons=arrows.substr(arrows.indexOf(',')+1);
	 		}
	 		if (keys) {
				$(document).keydown(function(e){
					//console.log(e.which);
					switch(e.which){		//check the input'key pressed
						case 37 : 
							leftSlide(); 
							break;
						case 38 : 
							upSlide();	
							break;
						case 39 : 
							rightSlide(); 
							break;
						case 40 : 
							downSlide(); 
							break;
					}
				});
	 		}
	 		if (icons) {
	 			slider.append("<div class='up'></div><div class='down'></div><div class='left'></div><div class='right'></div>");		//append arrows btns

				$("#morinji > div.slider > div.up").click(upSlide);
				$("#morinji > div.slider > div.down").click(downSlide);
				$("#morinji > div.slider > div.left").click(leftSlide);
				$("#morinji > div.slider > div.right").click(rightSlide);
	 		}
 		}
	})();

	$("div.nav > li").click(function(){
		//console.log($(this).index("li"));
		p = $(this).index("li");
		temp = bringBackIAndJ(p);			// find out what is the i and j
		go2Slide(temp.i, temp.j, p );
	});

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