/*
 OmidGharib - MORiNJi ver 0.4 trial
 Copyright (c) 2013 Omid Gharib .
 https://github.com/omidgharib/MORiNJi
 fork me on github.
*/
$(document).ready(function(){
	var morinji=$("div#morinji"),
	slider=$("div.slider"),
	trainer=$("div.trainer"),
	rows =$("div.trainer > div.row"),
	width=950,
	height=600,
	sum=0,   //sum of slides
 	icons=null;
	 currentSlide=0; // current slide current p of slide
	 currentSlideI=0;
	 currentSlideJ=0;


  	(init=function(){
		//var navNode=document.createElement('DIV'); //create div tag 
		//navNode.className='nav'; // add nav class to navNode
		//morinji.appendChild(navNode); 
		morinji.append("<div class='nav'></div>"); // navNode with nav cssClass after morinji
		var nav =$("div.nav");
		//lists=$("div.nav > li");

		for(var i=0 ; i < rows.length ; i++){
			//var cols=rows.item(i).getElementsByClassName('slide');
			var cols=$("div.row:eq("+i+") > div.slide");

			for(var j=0; j < cols.length ; j++){
				nav.append("<li></li>"); //add li's related to slides
				cols.eq(j).css({"background-color":rndColor()});
			}
			nav.append("<div class='clear'></div>");          //add clear to end of the row in li's
			rows.eq(i).append("<div class='clear'></div>"); //add clear to end of the row
		}

		// for(var i=0 ; i < rows.length ; i++){
		// 	var cols=rows.item(i).getElementsByClassName('slide');
			
		// 	for(var j=0; j < cols.length ; j++){
		// 		;(function(i,j,sum){
		// 			lists.item(sum+j).onclick=function(){
		// 				go2Slide(i,j,sum+j);
		// 			}
		// 		})(i,j,sum);
		// 	}
		// 	sum=sum+cols.length;
		// }
		$("div.nav > li").click(function(){
			alert($(this).index());
		});

	})();

	go2Slide=function(i,j,p){
		//trainer.style.top=(-height*i)+'px';
		trainer.animate({"top":(-height*i)+'px',"left":(-width*j)+'px'},900);
		//trainer.style.left=(-width*j)+'px';
		lists.eq(current).removeClass('active');
		lists.eq(p).addClass('active');
		//lists.item(currentSlide).className='';
		//lists.item(p).className='active';
		currentSlide=p;
		currentSlideI=i;
		currentSlideJ=j;
		if(icons!=null)arrowsIconExistence(i,j); //check for none or blocking display of arrow icons
	}

	function bringBackI(p) {
		var temp=0;
		for(var i=0; i < rows.length ; i++){
			temp+=$("div.row:eq("+i+") > div.slide").length-1;
			if(temp > p) return i;
		}

		//var cols=$("div.row:eq("+i+") > div.slide:eq("+j+")");
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