window.onload=function(){
	var morinji=document.getElementById('morinji');
	var slider=document.getElementsByClassName('slider').item(0);
	var trainer=document.getElementsByClassName('trainer').item(0);
	var rows =trainer.getElementsByClassName('row');
	var sum=0;   //sum of slides
	 currentSlide=0; // current slide current p of slide
	 currentSlideI=0;
	 currentSlideJ=0;

	//initial html's
	var navNode=document.createElement('DIV'); //create div tag 
	navNode.className='nav'; // add nav class to navNode
	var arrowsNodeUp=document.createElement('DIV');
	var arrowsNodeDown=document.createElement('DIV');
	var arrowsNodeLeft=document.createElement('DIV');
	var arrowsNodeRight=document.createElement('DIV');
	arrowsNodeUp.className='up';
	arrowsNodeDown.className='down';
	arrowsNodeLeft.className='left';
	arrowsNodeRight.className='right';
	slider.appendChild(arrowsNodeUp);
	slider.appendChild(arrowsNodeDown); //add arrows but stupidity idea ever :) temporary
	slider.appendChild(arrowsNodeLeft);
	slider.appendChild(arrowsNodeRight);

	morinji.appendChild(navNode); // navNode with nav cssClass after morinji
	var nav =document.getElementsByClassName('nav').item(0);
	var	lists=nav.getElementsByTagName('li');

	for(var i=0 ; i < rows.length ; i++){
		var cols=rows.item(i).getElementsByClassName('slide');

		for(var j=0; j < cols.length ; j++){
			nav.innerHTML+="<li></li>"; //add li's related to slides
			cols.item(j).style.backgroundColor=rndColor();
		}
		nav.innerHTML+="<div class='clear'></div>";          //add clear to end of the row in li's
		rows.item(i).innerHTML+="<div class='clear'></div>"; //add clear to end of the row
	}

	//slider.innerHTML+="<div id='left'></div> <div id='right'></div> <div id='up'></div> <div id='down'></div>";  //add arrows to slider doesnt work

	for(var i=0 ; i < rows.length ; i++){
		var cols=rows.item(i).getElementsByClassName('slide');
		
		for(var j=0; j < cols.length ; j++){
			;(function(i,j,sum){
				lists.item(sum+j).onclick=function(){
					go2Slide(i,j,sum+j);
				}
			})(i,j,sum);
		}
		sum=sum+cols.length;
	}

	;(go2Slide=function(i,j,p){
		trainer.style.top=(-600*i)+'px';
		trainer.style.left=(-950*j)+'px';
		lists.item(currentSlide).className='';
		lists.item(p).className='active';
		currentSlide=p;
		currentSlideI=i;
		currentSlideJ=j;
		arrowsIconExistence(i,j); //check for none or blocking display of arrow icons
	})(0,0,0);

	upSlide = function(){
		go2Slide(currentSlideI-1,currentSlideJ,bringBackPlaceInList(currentSlideI-1,currentSlideJ));
	}

	downSlide = function(){
		go2Slide(currentSlideI+1,currentSlideJ,bringBackPlaceInList(currentSlideI+1,currentSlideJ));
	}

	leftSlide=function() {
		go2Slide(currentSlideI,currentSlideJ-1,currentSlide-1);
	}

	rightSlide=function() {
		go2Slide(currentSlideI,currentSlideJ+1,currentSlide+1);
	}

	arrowsNodeUp.onclick=upSlide; 
	arrowsNodeDown.onclick=downSlide; 
	arrowsNodeLeft.onclick=leftSlide; 
	arrowsNodeRight.onclick=rightSlide;

 	test=document.getElementById('test');

	 document.onkeydown=function(e){
	 	if (e.keyCode=='37' && checkNeighborSlides(currentSlideI,currentSlideJ-1)) {leftSlide();}
	 	if (e.keyCode=='38' && checkNeighborSlides(currentSlideI-1,currentSlideJ)) {upSlide();}
	 	if (e.keyCode=='39' && checkNeighborSlides(currentSlideI,currentSlideJ+1)) {rightSlide();}
	 	if (e.keyCode=='40' && checkNeighborSlides(currentSlideI+1,currentSlideJ)) {downSlide();}
	 }
	 


	function bringBackPlaceInList(row,col) {
		var p=0;
		for(var i=0 ; i < row ; i++) {
		var cols=rows.item(i).getElementsByClassName('slide');
			p+=cols.length;
		}
		return p+col;
	}

	function arrowsIconExistence(i,j) { 
		if(checkNeighborSlides(i,j-1)==false){morinji.getElementsByClassName('left').item(0).style.display='none';}
			else{morinji.getElementsByClassName('left').item(0).style.display='block';}
		if(checkNeighborSlides(i,j+1)==false){morinji.getElementsByClassName('right').item(0).style.display='none';}
			else{morinji.getElementsByClassName('right').item(0).style.display='block';}
		if(checkNeighborSlides(i-1,j)==false){morinji.getElementsByClassName('up').item(0).style.display='none';}
			else{morinji.getElementsByClassName('up').item(0).style.display='block';}
		if(checkNeighborSlides(i+1,j)==false){morinji.getElementsByClassName('down').item(0).style.display='none';}
			else{morinji.getElementsByClassName('down').item(0).style.display='block';}
	}

	function checkNeighborSlides(i,j) {
		if (i>=0 && j>=0 && i<rows.length) {
			if(rows.item(i).getElementsByClassName('slide').item(j)!=null) return true;
			else return false;
		}
		else return false;
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
}