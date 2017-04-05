$(document).ready(function(){
var block1024={
		gridBox: $("ul#gridbox"),
		arr : [],
		slideOK  : true,
		actived: false
};
//functions of block1024 boject
block1024.creatGrids = function(num){
			for (var i = num; i >= 0; i--) {
				block1024.gridBox.append("<li class='grid'></li>");
			}
			block1024.grides = $("li.grid");
		};
block1024.creatPositionAndValueArr = function(num){
	for (var i = 0; i<= num; i++) {
		block1024.arr[i]=[];
		for (var j = 0; j<= num; j++) {
			block1024.arr[i][j] = [];
			block1024.arr[i][j][0]= i*100;
			block1024.arr[i][j][1]= j*100;
			block1024.arr[i][j][2]= 0;
			block1024.arr[i][j][3]= i*4+j;
		};
	};
};
block1024.setGridsPositionAndValue = function(){
	var arr =block1024.arr ;
	var index = 0;
	for (var i = 0; i<= arr.length-1; i++) {
		for (var j = 0; j<= arr[i].length-1; j++) {
			block1024.grides.eq(index).css("top",arr[i][j][0]+"px");
			block1024.grides.eq(index).css("left",arr[i][j][1]+"px");
			index++;
		};
	};
};
//creating grids ----------------------------------------------------------------------------------
block1024.creatGrids(15);

//creating movebox and obstacleBlock -------------------------------------------------------------
block1024.obstacleBlock = function(){
	var row = randomNumber(1) ? 2: 1,
		col = randomNumber(1) ? 2: 1;
		block1024.arr[row][col][2] = 1;	
	block1024.grides.eq(row*4+col).addClass("obstacleBlock");
}
block1024.arrAddValue = function(){	
	while(true){
		var row = randomNumber(3),
			col = randomNumber(3);

		if( block1024.arr[row][col][2] == 0 ){
			block1024.arr[row][col][2] = 2;
			var liMoveblock = $("<li/>",{
				html 		: block1024.arr[row][col][2],
				"class" 	: "moveblock scale"
			});
			liMoveblock.css({
				background	: "#eee",
				top 		: block1024.arr[row][col][0]+"px",
				left 		: block1024.arr[row][col][1]+"px",
				
			}).data({
				top         : block1024.arr[row][col][0],
				left 		: block1024.arr[row][col][1],
				val			: block1024.arr[row][col][2],
				pos			: block1024.arr[row][col][3]
			});
			$("ul#movebox").append(liMoveblock);
			//liMoveblock.fadeIn("slow");
			return;
		};
	};
};
block1024.startGame=function(){
	$(".moveblock").remove();
	block1024.grides.removeClass("obstacleBlock");

	block1024.creatPositionAndValueArr(3);
	block1024.setGridsPositionAndValue();
	block1024.obstacleBlock();
	block1024.arrAddValue();
	block1024.arrAddValue();	
};
block1024.startGame();
// slide function----------------------------------------------------------------------------------
function slidingAnimate(fn) {	
	var moveblocks =  $(".moveblock");
	for(var i = moveblocks.length-1 ; i>=0 ; i--){
		var moveblock= 	moveblocks.eq(i);
		if(moveblock.data("top") !== "undefind"){
			moveblock.animate({top : moveblock.data("top")+"px",
			left: moveblock.data("left")+"px"},function() {
				fn();
			});
		};
	};	
};
//changing moveblocks' position -------------------------------------------------------------------
function plusAnimation() {
	var moveblocks =  $(".moveblock"),
		moveblock = null,
		arr = block1024.arr;
	for (var i =0; i<=3; i++) {
		for (var j =0; j< 4; j++){
			for(var k = moveblocks.length-1 ; k>=0 ; k--){
				if( moveblocks.eq(k).data("pos")  == arr[i][j][3] ){
					moveblock = moveblocks.eq(k);
					if(arr[i][j][2]>1){
						if( parseInt(moveblock.html()) < arr[i][j][2] ){
							moveblock.addClass("scale-zoom-in");
						}
						moveblock.html(arr[i][j][2]);			
					}
					if(arr[i][j][2]==0) {
						moveblock.fadeOut(200,function(){
							$(this).remove();
						});
					};
				};
			};
		};
	};
	if( block1024.actived ){	
			block1024.arrAddValue();
			block1024.actived = false;
		};
}
//basic tools ,compute--------------------------------------------------------------------------
slideDerection();
function slideDerection(evt){
	$("body").on("keyup",function(evt){
		if(!block1024.slideOK) return;
		switch(evt.which){
			case 37 :
				executeTimes(slideLeft,2);
				var delay = setTimeout(plusLeft,402);
				break;
			case 38 :
				executeTimes(slideUp,2);
				var delay = setTimeout(plusUp,402);
				break;
			case 39 :
				executeTimes(slideRight,2);
				var delay = setTimeout(plusRight,402);
				break;
			case 40 :
				executeTimes(slideDown,2);
				var delay = setTimeout(plusDown,402);
				break;
		};
		slidingAnimate(function() {
			var delayEnd = setTimeout(function() {
					block1024.slideOK = true;
					if( noEqValue() ){		
						showgameOverMessage();
						return;
						};	
					if( get1024() ){ succesMessage() };
					$(".moveblock").removeClass("scale-zoom-in scale");
					clearTimeout(delayEnd);
			},200);			
		});
		
	});
};
function sliding(data1,data2) {
	var val1 = data1[2],
		val2 = data2[2],
		moveblocks =  $(".moveblock");
	if( (val1 < 1 )  ){
		for(var i = moveblocks.length-1 ; i>=0 ; i--){
			if( moveblocks.eq(i).data("pos")  == data2[3] ){
				moveblocks.eq(i).data( {top : data1[0],
										left: data1[1]} );
				moveblocks.eq(i).data("pos",data1[3]);
				data1[2]=val2;
				data2[2]=val1;
				block1024.actived= true;
			};
		};
	};
	if( (val1 == val2) && val1 >1 ) block1024.actived= true;
};
// row = i ; col = j;
//up arr[i][j] 		i-1
function slideUp(){
	for (var i = 1; i<=3; i++) {
		for (var j =0; j< 4; j++){
			sliding( block1024.arr[i-1][j], block1024.arr[i][j]);			
		};
	};	
};
//down block1024.arr[i][j] 	i+1
function slideDown(){
	for (var i = 2; i>=0; i--) {
		for (var j = 0; j< 4; j++){	
			sliding( block1024.arr[i+1][j], block1024.arr[i][j] );
		};
	};
}
//left block1024.arr[i][j]	j-1
function slideLeft(){
	for (var i = 0; i< 4; i++) {
		for (var j = 1; j<4; j++){
			sliding( block1024.arr[i][j-1], block1024.arr[i][j] );
		};
	};
};
//right block1024.arr[i][j]	j+1
function slideRight(){
	for (var i = 0; i< 4; i++) {
		for (var j = 2; j >=0 ;j--){
			sliding( block1024.arr[i][j+1], block1024.arr[i][j] );					
		};
	};
};
//plus functions
function plusUp(){
	for (var i = 1; i<=3; i++) {
		for (var j =0; j< 4; j++){
			plusSameValue( block1024.arr[i-1][j], block1024.arr[i][j] );			
		};
	};
	plusAnimation();
};
function plusDown(){
	for (var i = 2; i>=0; i--) {
		for (var j = 0; j< 4; j++){
			plusSameValue( block1024.arr[i+1][j], block1024.arr[i][j] );
		};
	};
	plusAnimation();
};
function plusLeft(){
	for (var i = 0; i< 4; i++) {
		for (var j = 1; j<4; j++){
			plusSameValue( block1024.arr[i][j-1], block1024.arr[i][j] );
		};
	};
	plusAnimation();
};
function plusRight(){
	for (var i = 0; i< 4; i++) {
		for (var j = 2; j >=0 ;j--){
			plusSameValue( block1024.arr[i][j+1], block1024.arr[i][j] );						
		};
	};
	plusAnimation();
};
//how many times should fn to execute
function executeTimes(fn,times){
	var cecyle = 0;
	block1024.slideOK = false;
	do{
		fn();
	}while( cecyle++ < times);
};
//no equel value
function noEqValue(){	
	for (var i = 0; i< 4; i++) {		
		for (var j = 0; j<4 ;j++){
			if ( block1024.arr[i][j][2] == 0)
				return 0 ;
			if ( i<3 && block1024.arr[i][j][2] == block1024.arr[i+1][j][2] ) 
				return 0;
			if ( j<3 && block1024.arr[i][j][2] == block1024.arr[i][j+1][2] )
				return 0;
		};
	};
	return 1;
};
function plusSameValue(data1,data2){
	var val1 = data1[2],
		val2 = data2[2];
	if( (val1== 0 && val2 > 1) || (val1 == val2 && val1 > 0) ){
			val1 += val2;
			val2= 0;			
			data1[2]=val1;
			data2[2]=val2;
	};	
};
//get 1024 
function get1024(){
	for (var i = 0; i< 4; i++) {
		for (var j = 0; j<4 ;j++){
			if(block1024.arr[i][j][2] == 1024) return true;
		}
	}
	return false;
};
function randomNumber(maxNum){
	return Math.floor(Math.random()*(maxNum+1));
};
//restart game---------------------------------------------------------------------------
tryAgain();
function tryAgain(){
	$(".tryAgain").on("click",function(){
		startGame();
		$(this).parent().fadeOut("fast");
	});
};
function showgameOverMessage(){
	$(".gameOverMessage").fadeIn("fast");
};
function succesMessage(){
	$(".succesMessage").fadeIn("fast");
};



$("#arr").click(function() {	
	for(var i = 0; i< 4; i++){
		var k = '';
		for(var j=0; j<4; j++){
			k += block1024.arr[i][j][2]+",";
		}
		console.log( k+"\n" );
	}
	console.log( noEqValue() );
});







});













