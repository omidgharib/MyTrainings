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
		lists = null,										// list of btns navigating
		width = 720,										// slide's width 
		height = 480,										// slide's height
		keys  = null,										// key arrows navigating
 		icons = null,										// icon arrows navigating
	 	currentSlide  = 0, 									// current slide (slide number) 
	 	I = 0,												// current row position of slide
	 	J = 0,												// current column position of slide
	 	animationDue = 900,									// due of sliding animation
	 	lockAnimationDue = 200,								// due of lock sliding animation
	 	lockValueVibre = 100;								// distance for sliding to the lock area


	 // create navigator  
  	navCreate=function(){ 
		morinji.append("<div class='nav'></div>"); 				// append div.nav after morinji (slider navigator)
		morinji.append("<div class='rowslides cover'></div>");	// rowslide navigator
		morinji.append("<div class='colslides cover'></div>");	// colslide navigator
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

	// creat rowslide and colslide navigator
	function createRowAndColNav(){
		row = $("div#morinji > div.rowslides");
		col = $("div#morinji > div.colslides")
		row.html("");	// reset innerHTML
		col.html("");	// reset innerHTML
		slidesInRow = $("div.row:eq("+I+") > div.slide");
		for(var i=0 ; i<slidesInRow.length ; i++) {
			var title = $("div.row:eq("+I+") > div.slide:eq("+i+")").attr("data-title");
			if(title) row.append("<div class='thumb'>"+title+"</div>");
			 else row.append("<div class='thumb'>"+"No title"+"</div>");
		}

		for(var i=0; i<rows.length ; i++){
			slide=$("div.row:eq("+i+") > div.slide:eq("+J+")");
			title=slide.attr("data-title");
			if(slide.hasClass('slide')){
				if(title) col.append("<div class='thumb'>"+title+"</div>");
				else col.append("<div class='thumb'>"+"No title"+"</div>");
			}
			else col.append("<div class='thumb' style='display:none;'>"+title+"</div>");
		}

		$("div#morinji > div.rowslides > div.thumb").click(function(){
			j=$(this).index("div.thumb");
			go2Slide(I,j,bringBackP(I,j));
		});

		$("div#morinji > div.colslides > div.thumb").click(function(){
			i=$(this).index("div.colslides > div.thumb");
			console.log(i);
			go2Slide(i,J,bringBackP(i,J));
		});
	}

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

	// add effect for going to not existing slides(lock area)
	function lockSlide(i,j,p,aim){
		//console.log(aim);
		switch(aim){
			case 'top':
				trainer.animate({'top':(-height*i+lockValueVibre)+'px'},lockAnimationDue).animate({'top':(-height*i)+'px'},lockAnimationDue);
				break;
			case 'bottom':
				trainer.animate({'top':(-height*i-lockValueVibre)+'px'},lockAnimationDue).animate({'top':(-height*i)+'px'},lockAnimationDue);
				break;
			case 'left':
				trainer.animate({'left':(-width*j+lockValueVibre)+'px'},lockAnimationDue).animate({'left':(-width*j)+'px'},lockAnimationDue);
				break;
			case 'right':
				trainer.animate({'left':(-width*j-lockValueVibre)+'px'},lockAnimationDue).animate({'left':(-width*j)+'px'},lockAnimationDue);
				break;
		}
	}

	function arrowsIconExistence(i,j) { 
		if (icons) {
			if(checkSlide(i,j-1)==false){$("#morinji .left").css("display",'none');}
				else{$("#morinji .left").css("display",'block');}
			if(checkSlide(i,j+1)==false){$("#morinji .right").css("display",'none');}
				else{$("#morinji .right").css("display",'block');}
			if(checkSlide(i-1,j)==false){$("#morinji .up").css("display",'none');}
				else{$("#morinji .up").css("display",'block');}
			if(checkSlide(i+1,j)==false){$("#morinji .down").css("display",'none');}
				else{$("#morinji .down").css("display",'block');}
			}
	}
	
	// toggling the navigation 
	function navToggle(){
		nav.toggle();
	}


	// change the slide to a new one
	go2Slide=function(i,j,p){
		trainer.animate({"top":(-height*i)+'px',"left":(-width*j)+'px'},animationDue);
		lists.eq(currentSlide).removeClass('active');		// remove the active class from current slide
		lists.eq(p).addClass('active');						// add the active class to new one
		currentSlide = p;
		I= i;
		J= j;
		createRowAndColNav();
		if(icons!=null)arrowsIconExistence(i,j); 			//check for none or blocking display of arrow icons depends on existence of slides in those aim
	}

	upSlide = function(){
		if(checkSlide(I-1,J,bringBackP(I-1,J))){
			go2Slide(I-1,J,bringBackP(I-1,J));
		}
		else lockSlide(I,J,currentSlide,"top");
	}

	downSlide = function(){
		if(checkSlide(I+1,J,bringBackP(I+1,J))){
			go2Slide(I+1,J,bringBackP(I+1,J));
		}
		else lockSlide(I,J,currentSlide,'bottom');
	}

	leftSlide = function() {
		if(checkSlide(I,J-1,currentSlide-1)){
			go2Slide(I,J-1,currentSlide-1);
		}
		else lockSlide(I,J,currentSlide,'left');
	}

	rightSlide = function() {
		if(checkSlide(I,J+1,currentSlide+1)){
			go2Slide(I,J+1,currentSlide+1);
		}
		else lockSlide(I,J,currentSlide,'right');
	}

	// set slides size(width and height) from data-size
	;(function(){
		size = morinji.attr('data-size');
		//console.log(size);
		if(size!=null){
	 		if(size=='full'){	//if data-size set with full make the width and height maximum depends on LCD resolution and browser
	 			width = $(window).width(); 
	 			height= $(window).height();
	 		}
	 		else{
	 			width=size.substr(0,size.indexOf(','));
	 			height=size.substr(size.indexOf(',')+1);
	 			if (width=='full')  width = $(window).width(); 	//make the width maximum depends on the LCD resolution
	 			if (height=='full') height= $(window).height();	//make the height maximum depends on the LCD resolution
	 		}
	 	}
	 		slider.css({		// set width and height to div.slider and all the slides
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
	 			keys=arrows.substr(0,arrows.indexOf(','));
 				icons=arrows.substr(arrows.indexOf(',')+1);
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

	// customize keyboard shortcuts keydown
	;(function(){
		$(document).keydown(function(e){ // occures when a key pressed
			keyPressed = e.which;
			console.log(e.which);
			console.log(e.ctrlKey);
			console.log(keys);
			// arrow keys using for navigating the slides
			if (keys && keyPressed==37) leftSlide();				
			if (keys && keyPressed==38) upSlide();				
			if (keys && keyPressed==39) rightSlide();				
			if (keys && keyPressed==40) downSlide();

			if (e.ctrlKey && keyPressed==65) navToggle();		// when ctr+a occur
			if (e.ctrlKey && keyPressed==86) createRowAndColNav();		// when ctr+r occur
		});
	})();

	//nvigate when clicked on navigation btns
	;(function(){
		//createRowAndColNav()
		$("div.nav > li").click(function(){
			p = $(this).index("li");
			//temp = bringBackIAndJ(p);			// find out what is the i and j
			go2Slide(bringBackIAndJ(p).i, bringBackIAndJ(p).j, p );
		});

		// initial for the first time
	})();

	//draging touch interactive
	// ;(function(){
	// 	var leftStart=0,
	// 		topStart=0,
	// 		aimDragging=null;
	// 	$(".trainer").draggable({ addClasses: false, cursor: "crosshair", delay: 200, distance: 10 });
	// 	$(".trainer").draggable({ start:function(event, ui){
	// 	 	leftStart = ui.position.left;
	// 	 	topStart = ui.position.top;
	// 	 }});
	// 	$(".trainer" ).draggable({drag: function( event, ui ) {
	// 		console.log("left: "+ui.position.left+" top: "+ui.position.top+" offset-left:"+ui.offset.left);
	// 		if(-(ui.position.left-leftStart)>width/3) {
	// 			aimDragging='right';
	// 		}
	// 		if (-(leftStart-ui.position.left)>width/3) {
	// 			aimDragging='left';
	// 		}
	// 		if (-(ui.position.top-topStart)>height/3) {
	// 			aimDragging='bottom';
	// 		}
	// 		if (-(topStart-ui.position.top)>height/3) {
	// 			aimDragging='top';
	// 		}
	// 	}});
	// 	$(".trainer").draggable({ stop:function(event, ui){
	// 		if (aimDragging=='right')	rightSlide();
	// 		else if (aimDragging=='left') 	leftSlide();
	// 		else if (aimDragging=='bottom')  downSlide();
	// 		else if (aimDragging=='top') 	upSlide();
	// 		else go2Slide(I,J,currentSlide);
	// 		aimDragging=null;
	// 	}});
	// })();

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

	go2Slide(0,0,0);					// reset goto first slide	
	fixZoom(width,height,0,0);			// Call the fixZoom
});