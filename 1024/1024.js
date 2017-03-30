$(document).ready(function(){
var block1024={
		outerBox: $("ul#outerbox"),
		arr : [],
		actived: false,
		creatLis : function(num){
			for (var i = num; i >= 0; i--) {
				block1024.outerBox.append("<li class='movebox'> </li>");
			}
			this.moveboxes = $("li.movebox");
		}
	};
//functions of block1024 boject
block1024.creatPositionAndValue = function(num){
	for (var i = 0; i<= num; i++) {
		block1024.arr[i]=[];
		for (var j = 0; j<= num; j++) {
			block1024.arr[i][j] = [];
			block1024.arr[i][j][0]= i*100;
			block1024.arr[i][j][1]= j*100;
			block1024.arr[i][j][2]= 0;
		};
	};		
};
block1024.obstacleBlock = function(){
	var row = randomNumber(1) ? 2: 1,
		col = randomNumber(1) ? 2: 1;
		block1024.arr[row][col][2] = 1;	
}
block1024.setLisPositionAndValue = function(){
	var arr =block1024.arr ;
	var index = 0;
	for (var i = 0; i<= arr.length-1; i++) {
		for (var j = 0; j<= arr[i].length-1; j++) {
			block1024.moveboxes.eq(index).css("top",arr[i][j][0]+"px");
			block1024.moveboxes.eq(index).css("left",arr[i][j][1]+"px");
			if( arr[i][j][2] == 1 ){
				block1024.moveboxes.eq(index).addClass("obstacleBlock");
			}else if(arr[i][j][2] !=0 ){
				block1024.moveboxes.eq(index).text(arr[i][j][2]);
			};
			index++;			
		};
	};
};
block1024.setLisValue = function(){
	var index = 0;
	for (var i = 0; i<= 3; i++) {
		for (var j = 0; j<= 3; j++) {
			block1024.moveboxes.eq(index).text("");
			if(block1024.arr[i][j][2] >1){
				block1024.moveboxes.eq(index).text(block1024.arr[i][j][2]);
			};
			index++;			
		};
	};
}
block1024.arrAddValue = function(){
	var row = randomNumber(3),
		col = randomNumber(3);
	while(true){		
		if( block1024.arr[row][col][2] == 0 && block1024.arr[row][col][2] != 1){
			block1024.arr[row][col][2] = 2;
			return;
		}else{
			row = randomNumber(3),
			col = randomNumber(3);
		}
	};
};
//DOM --------------------------------------------------------------------------------------
block1024.creatLis(15);
block1024.creatPositionAndValue(3);
block1024.obstacleBlock();
block1024.arrAddValue();
block1024.setLisPositionAndValue();
// slide function----------------------------------------------------------------------------------
//up arr[i][j] 		i-1
function slideUp(){	
	for (var i = 1; i<=3; i++) {
		for (var j =0; j< 4; j++){				
				var changeArrValue = plusSameValue( block1024.arr[i-1][j][2], block1024.arr[i][j][2] );
				block1024.arr[i-1][j][2]= changeArrValue.ele1;
				block1024.arr[i][j][2] = changeArrValue.ele2;
			};
		};
	};	

//down block1024.arr[i][j] 	i+1
function slideDown(){
	for (var i = 2; i>=0; i--) {
		for (var j = 0; j< 4; j++){				
			var changeArrValue = plusSameValue( block1024.arr[i+1][j][2], block1024.arr[i][j][2] );
			block1024.arr[i+1][j][2] = changeArrValue.ele1;
			block1024.arr[i][j][2]= changeArrValue.ele2;
		};
	};		
}
//left block1024.arr[i][j]	j-1
function slideLeft(){
	for (var i = 0; i< 4; i++) {
		for (var j = 1; j<4; j++){	
			var changeArrValue = plusSameValue( block1024.arr[i][j-1][2], block1024.arr[i][j][2] );
			block1024.arr[i][j-1][2]= changeArrValue.ele1;
			block1024.arr[i][j][2]= changeArrValue.ele2;
		};
	};
};
//right block1024.arr[i][j]	j+1
function slideRight(){
	for (var i = 0; i< 4; i++) {
		for (var j = 2; j >=0 ;j--){
			var changeArrValue = plusSameValue( block1024.arr[i][j+1][2], block1024.arr[i][j][2] );
			block1024.arr[i][j+1][2]= changeArrValue.ele1;
			block1024.arr[i][j][2] = changeArrValue.ele2;									
		}
	};
};
//how many times should fn to execute
function executeTimes(fn,times){
	var cecyle = 0;
	do{
		fn();
	}while( cecyle++ < times);
};
//no equel value
function noEqValue(){
	var flag1 = 0 , flag2 =0;
	for (var i = 0; i< 4; i++) {
		for (var j = 0; j<4 ;j++){
			if ( i<3 && block1024.arr[i][j][2] == block1024.arr[i+1][j][2] ) 
				flag1=1;
			if ( j<3 && block1024.arr[i][j][2] == block1024.arr[i][j+1][2] )
				flag2=1;
		};
	}
	if(flag1 || flag2) {return 0;}
		else {return 1;}
}
//get 1024
function get1024(){
	for (var i = 0; i< 4; i++) {
		for (var j = 0; j<4 ;j++){
			if(block1024.arr[i][j][2] == 1024) return true;
		}
	}
	return false;
};
function bigerThanZero(){
	for (var i = 0; i< 4; i++) {
		for (var j = 0; j<4 ;j++){
			if(block1024.arr[i][j][2] <=0) return false;
		}
	}
	return true;
};
function slideDerection(evt){
	$("body").on("keyup",function(evt){
		switch(evt.which){
			case 37 :
				executeTimes(slideLeft,1);
				break;
			case 38 :
				executeTimes(slideUp,1);
				break;
			case 39 :
				executeTimes(slideRight,1);
				break;
			case 40 :
				executeTimes(slideDown,1);
				break;
		};		
		if( block1024.actived ){	
			block1024.arrAddValue();
			block1024.setLisValue();
			block1024.actived = false;
		}else{
			if( bigerThanZero() && noEqValue() ){		
				showgameOverMessage();
				return;
			};	
		};
		if( get1024() ){ succesMessage() };
	});
};
slideDerection();

//basic tools--------------------------------------------------------------------------
function showgameOverMessage(){
	$(".gameOverMessage").fadeIn("fast");
};
function succesMessage(){
	$(".succesMessage").fadeIn("fast");
};
//plus span value
function plusSameValue(ele1,ele2){
	if(ele1 == ele2  && ele2 !=0 ){
		ele1 += ele2;
		ele2= 0;
		block1024.actived= true;
	}else if( ele1== 0 && ele2 > 1){
		ele1= ele2;
		ele2= 0;
		block1024.actived= true;
	}
	return {ele1: ele1,
			ele2: ele2};
};
//children is null
function hasValue(liEle){
	if( parseInt(liEle.text())) return true;
	return false;
};
function randomNumber(maxNum){
	return Math.floor(Math.random()*(maxNum+1));
};
//try again 
tryAgain();
function tryAgain(){
	$(".tryAgain").on("click",function(){
		block1024.moveboxes.html("").removeClass("obstacleBlock");
		block1024.creatPositionAndValue(3);
		block1024.obstacleBlock();
		block1024.arrAddValue();
		block1024.setLisPositionAndValue();
		$(this).parent().fadeOut("fast");
	});
};








//
});













