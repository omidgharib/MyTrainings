var first_operand;
var second_operand;
var first_operand_set=false;

function plus_click() {
	var str = document.getElementById('screen').value;
	document.getElementById('operator').innerText='+';
	if (isNaN(str)) { alert('Please input number!!!'); }
	if (!first_operand_set) 
	{ 
		first_operand=str;
	}
	else second_operand=str;
}