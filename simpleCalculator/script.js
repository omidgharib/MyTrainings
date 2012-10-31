var first_operand;
var second_operand;
var first_operand_set=false;
var operator;

function plus_click() {
	set_operator('+');
}

function subtract_click() {
	set_operator('-');
}

function multiply_click() {
	set_operator('*');
}

function division_click() {
	set_operator('/');
}

function set_operator(op) {
		if (document.getElementById('screen').value!='') {
		var str = document.getElementById('screen').value;
		document.getElementById('screen').value ='';
		if (isNaN(str)) { alert('Please input number(digits)!!!\n Not a string'); }
		if (first_operand_set == false) 
		{ 
			first_operand = str;
			first_operand_set = true;
		}
		else 
		{
			second_operand=str;
			equal_click();
		}
		operator=op;
		document.getElementById('screen').value ='';
		if (first_operand!='')   { document.getElementById('screen').placeholder=first_operand; }
	}
	else alert('Please input number!!!');
	changecolor_operator();
}

function equal_click() {
	var result;

	if (first_operand_set == true && document.getElementById('screen').value!='' ) 
	{
		second_operand = document.getElementById('screen').value;
		document.getElementById('screen').value = '';
		first_operand_set =false;
	}

	if (first_operand!='' && second_operand!='') 
	{
		try 
		{
			switch (operator)
			{
				case '+': result = Number(first_operand) + Number(second_operand);
							break;
				case '-': result = Number(first_operand) - Number(second_operand);
							break;
				case '*': result = Number(first_operand) * Number(second_operand);
							break;
				case '/': result = Number(first_operand) / Number(second_operand);
							break;
			}
		}
		catch(error)
		{
			txt='An error occured.\n';
			txt+='Error description:'+ error.message +'\n Click OK to continue...';
			alert(txt);
		}
		first_operand = result;
		second_operand= '';
		operator = '';
		document.getElementById('screen').value = result;
	}
	else alert('Please input another number!!');
	changecolor_operator();
}

function clear_click() {
	first_operand = '';
	second_operand = '';
	first_operand_set = false;
	operator= '';
	document.getElementById('screen').value = '';
	document.getElementById('screen').placeholder = '0';
	changecolor_operator();
}

function addnum_click(id) {
	document.getElementById('screen').value += id.innerText;
}

function changecolor_operator() {

	switch(operator)
		{
			case '+' : document.getElementById('plus').style.color='green';
						break;
			case '-' : document.getElementById('subtract').style.color='green';
						break;
			case '*' : document.getElementById('multiply').style.color='green';
						break;	
			case '/' : document.getElementById('division').style.color='green';
						break;
			default  : 
						{
						 document.getElementById('plus').style.color='#eee';
						 document.getElementById('subtract').style.color='#eee';
						 document.getElementById('multiply').style.color='#eee';
						 document.getElementById('division').style.color='#eee';
						}
		}	
}