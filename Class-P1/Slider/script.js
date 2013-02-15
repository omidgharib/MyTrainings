window.onload=function(){
	var morinji=document.getElementById('morinji');
	var slider=document.getElementById('slider');
	var trainer=document.getElementsByClassName('trainer').item(0);
	var rows =trainer.getElementsByClassName('row');
	var sum=0;   //sum of slides
	 currentSlide=0; // current slide

	//initial html's
	var navNode=document.createElement('DIV'); //create div tag 
	navNode.className='nav'; // add nav class to navNode
	morinji.appendChild(navNode); // navNode with nav cssClass after morinji
	var nav =document.getElementsByClassName('nav').item(0);
	var	lists=nav.getElementsByTagName('li');
	//slider.innerHTML+="<div id='left'></div> <div id='right'></div> <div id='top'></div> <div id='bottom'></div>";  //add arrows to slider

	for(var i=0 ; i < rows.length ; i++){
		var cols=rows.item(i).getElementsByClassName('slide');

		for(var j=0; j < cols.length ; j++){
			nav.innerHTML+="<li></li>"; //add li's related to slides
			cols.item(j).style.backgroundColor=rndColor();
		}
		nav.innerHTML+="<div class='clear'></div>";          //add clear to end of the row in li's
		rows.item(i).innerHTML+="<div class='clear'></div>"; //add clear to end of the row
	}

	for(var i=0 ; i < rows.length ; i++){
		var cols=rows.item(i).getElementsByClassName('slide');
		
		for(var j=0; j < cols.length ; j++){
			(function(i,j,sum){
				lists.item(sum+j).onclick=function(){
					go2Slide(i,j,sum+j);
				}
			})(i,j,sum);
		}
		sum=sum+cols.length;
	}

	;(go2Slide=function(i,j,obj){
		trainer.style.top=(-600*i)+'px';
		trainer.style.left=(-950*j)+'px';
		// obj.className='active';
		// currentSlide.className='';
		// currentSlide=obj;
		lists.item(currentSlide).className='';
		lists.item(obj).className='active';
		currentSlide=obj;
	})(0,0,0);

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