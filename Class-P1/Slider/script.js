window.onload=function(){
	var trainer=document.getElementsByClassName('trainer').item(0);
	var rows =trainer.getElementsByClassName('row');
	var nav =document.getElementsByClassName('nav').item(0);

	for(var i=0 ; i < rows.length ; i++){
		var row=rows.item(i).getElementsByClassName('slide');

		for(var j=0; j < row.length ; j++){
			nav.innerHTML+="<li></li>";
		}
		nav.innerHTML+="<div class='badboy'></div>";
		rows.item(i).innerHTML+="<div class='badboy'></div>";
	}

	
}