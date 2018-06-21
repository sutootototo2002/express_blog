var myjs={}
myjs.showtime=function(myform,t){
	document.myform.phone.disabled=true;
	for(i=1;i<=t;i++) {
		window.setTimeout("myjs.update_p(" + i + ","+t+")", i * 1000);
	}
}

myjs.update_p=function(num,t) {
	if(num == t) {
		document.myform.phone.value =" 重新发送 ";
		document.myform.phone.disabled=false;
	}
	else {
		printnr = t-num;
		document.myform.phone.value = " (" + printnr +")秒后重新发送";
	}
}