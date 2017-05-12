$(document).ready(function() {
(function(){
	var gridBox = $("#grids"),
		len = gridBox.length,
		grid = "<li class='grid'></li>",
		grids="";

		for (var i = 400; i > 0; i--) {
			grids+=grid;
		};
		gridBox.append(grids);
})();

(function(){
	var Snake = function(arg){
		return new Snake.fn(arg);
	}
	//#snake
	Snake.fn = function(selector){
		this.elem = $(selector);
		this.score = 0;
		this.boundingTop = this.elem.css("top");
		this.boundingBottom = this.elem.css("height");
		this.boundingLeft = this.elem.css("left");
		this.boundingRight = this.elem.css("width");
		this.speed = 500;
		this.dirs = [37, 38, 39, 40, 32];

		this.init();
	}
	Snake.fn.prototype = {
		constructor : Snake.fn,
		positionList : [],
		nextPositionList : [],
		size : 0,
		highestScore: 0,
		goOn : undefined,

		init : function(){
			this.score = 0;
			this.size = parseInt(this.elem.css("width"))/20;
			this.appendChild();
			this.getSnakeBody();	
			this.getPosition();
			this.circle();
			this.creatFood();
		},
		getSnakeBody: function(){
			this.snakeBody = $('.snake-body');;
			this.snakeLength = this.snakeBody.length;
		},
		getPosition : function(){
			this.positionList = [];
			this.positionList[0]={x: 0, y: 0};
			for (var i =0; i < this.snakeLength; i++) {
					this.positionList.push({x : this.snakeBody.eq(i).css("left"),
										y : this.snakeBody.eq(i).css("top")
									});
			};
		},
		setPosition : function(){
			for (var i =0; i < this.snakeLength; i++) {
				this.snakeBody.eq(i).css({"left" : this.positionList[i].x,
									 "top": this.positionList[i].y});
			};
		},
		appendChild : function(){
			var self= this;
			self.elem.append($("<li/>",{
				"class" : 'snake-body',
				"style" : "left: "+self.size*10+"px; top:"+self.size*8+"px"
			})).append($("<li/>",{
				"class" : 'snake-body',
				"style" : "left: "+self.size*11+"px; top:"+self.size*8+"px"
			})).append($("<li/>",{
				"class" : 'snake-body',
				"style" :"left: "+self.size*12+"px; top:"+self.size*8+"px"
			}))
					},
		addTail : function(){
			var len = this.positionList.length,
				tailLeft = parseInt(this.positionList[len-1].x),
				tailTop = parseInt(this.positionList[len-1].y),
				tailPrevLeft = parseInt(this.positionList[len-2].x),
				tailPrevTop = parseInt(this.positionList[len-2].y);
		
			var addedTailLeft = tailLeft, 
				addedTailTop = tailTop;

			if( tailPrevLeft - tailLeft > 0 ){
				addedTailLeft = tailLeft -this.size;
			}
			if( tailPrevLeft - tailLeft < 0 ){
				addedTailLeft = tailLeft +this.size;
			}
			if( tailPrevTop - tailTop > 0 ){
				addedTailTop = tailTop -this.size;
			}
			if( tailPrevTop - tailTop < 0 ){
				addedTailTop = tailTop +this.size;
			}
			this.elem.append($("<li/>",{
				"class" : 'snake-body',
				'style' : 'left:'+addedTailLeft+'px; top:'+addedTailTop+'px'
			}));
			this.getSnakeBody();
		},
		circle : function(){
			var self = this;
			$(document).on("keydown",animate);
			$('.upbtn').on('click',function(evt){
				animate(evt, self.dirs[1]);
			});
			$('.downbtn').on('click',function(evt){
				animate(evt, self.dirs[3]);
			});
			$('.leftbtn').on('click',function(evt){
				animate(evt, self.dirs[0]);
			});
			$('.rightbtn').on('click',function(evt){
				animate(evt, self.dirs[2]);
			});

			function animate(evt, value){
				var direction = value || evt.which;

				if( self.dirs.indexOf(direction) >=0 ){
					if( self.dead() ) {
						return;
					};
					autoRun(direction);

					clearInterval(self.goOn);
					self.goOn = setInterval(function(){
						if(self.dead()) { 
							clearInterval(self.goOn--);//stop interval
							return;	//stop current function
						};
						autoRun(direction);
						self.changeSpeed();						
					},self.speed);
				};				
			};
			function autoRun(arg){
				switch(arg){
					case self.dirs[0] ://[37, 38, 39, 40, 32];
						stepLeft();
					break;
					case self.dirs[1] :
						stepUP();
					break;
					case self.dirs[2] :
						stepRight();
					break;
					case self.dirs[3] :
						stepDown();
					break;
					case self.dirs[4] :
						self.pause();
						return;
					break;
				};
				if(self.dirs.indexOf(arg) >=0 ){
					self.setPosition();
					self.getSnakeBody();
					self.getPosition();
					self.eatFood();
				};
			};			
			function stepLeft(){	
				self.positionList[0]={x : parseInt(self.positionList[1].x)-self.size+'px',
								 y : self.positionList[1].y
				};
			};
			function stepRight(){
				self.positionList[0]={x : parseInt(self.positionList[1].x)+self.size+'px',
								 y : self.positionList[1].y
				};
			};
			function stepUP(){
				self.positionList[0]={x : self.positionList[1].x,
								 y :  parseInt(self.positionList[1].y)-self.size+'px'
				};
			};
			function stepDown(){
				self.positionList[0]={x : self.positionList[1].x,
								 y :  parseInt(self.positionList[1].y)+self.size+'px'
				};
			};
		},
		creatFood : function(){
			this.foodPosition = {
				x : randomNumber(19)*this.size,
				y : randomNumber(19)*this.size
			};
			while(true){
				var flag = true;
				for (var i = this.snakeLength-1; i >= 0; i--) {
					if( parseInt(this.positionList[i].x) == this.foodPosition.x && 
						parseInt(this.positionList[i].y) == this.foodPosition.y ){
							this.foodPosition = {
								x : randomNumber(19)*this.size,
								y : randomNumber(19)*this.size
							};
						flag = false;
						break;
					};
				};
				if(flag) break;
			};

			var  x = this.foodPosition.x,
				 y = this.foodPosition.y;

			this.elem.append($('<li/>',{
				'id' : 'food',
				'style' : 'left:'+x+'px; top:'+y+'px'
			}));
		},
		eatFood : function(){
			if(parseInt(this.positionList[1].x) == this.foodPosition.x && 
			   parseInt(this.positionList[1].y) == this.foodPosition.y ){
				this.addTail();
				$('#food').remove();
				this.creatFood();				
				$(".score span").text(++this.score);
			}
		},
		dead : function(){
				for(var i = this.positionList.length-1; i >1; i--) {
					if( this.positionList[i].x == this.positionList[1].x && 
						this.positionList[i].y == this.positionList[1].y ){	
						this.gameOver();
						return true;
					};
				};

				if( this.positionList[1].x == -this.size+'px'||
					this.positionList[1].x == this.boundingRight ||
					this.positionList[1].y == -this.size+'px' ||
					this.positionList[1].y == this.boundingBottom
				  ){
				  	this.gameOver();
					return true;
				};
		},
		changeSpeed : function(){
			if( !this.begin ) {
				this.begin = 1;
			}
			if(this.snakeBody.length > this.begin ){ 
				this.begin = this.snakeBody.length;
				if( this.speed >= 100 && !(this.begin % 10) ){
					this.speed -= 20;
				}
			}			
		},
		setHighestScore : function(){
			if(this.score > this.highestScore){
				this.highestScore = this.score;
			}			
		},
		defaultSetting : function(){
			this.defaultDirectionKeys = [37, 38, 39, 40, 32];
			this.speed = 500;
		},
		pause : function(){
			clearInterval(this.self);
		},
		gameOver : function(){
			var self= this;
			self.setHighestScore();
			$(".game-over-center").css("display","flex");

			$('.highest-score span').text( self.highestScore );
			$('.current-score span').text( self.score );
			$(".game-over button").eq(0).on('click',function(){
				$(".game-over-center").css("display","none");
				self.positionList = [];
				self.elem.html("");
				$(document).off('keydown');
				$('.upbtn').off('click');
				$('.downbtn').off('click');
				$('.leftbtn').off('click');
				$('.rightbtn').off('click');
				self.init();
			});
			$('.game-over button').eq(1).on('click',function(){
				window.close();
			})
		}
	};
	Snake.fn.prototype.extend = function(obj){
		var self = this,
			copy = null;
		for( name in obj){
			this[name] = obj[name];
		};
	}
	function randomNumber(maxNum){
		return Math.floor(Math.random()*(maxNum+1));
	};

	window.Snake = Snake;
	
})();


(function(){
	var GetKeyCodes = function(selector){
		return new GetKeyCodes.fn(selector);
	};
	GetKeyCodes.fn = function(selector){
		this.elem = $(selector);
		this.tempKeyCodeArr = [];
		this.defaultKeyCodes = {
			dirs: [37, 38, 39, 40, 32],
			speed : 500
		};
		this.init();
	};
	GetKeyCodes.fn.prototype = {
		constructor : GetKeyCodes.fn,
		init : function(){
			this.getNewKeyCodes();
		},
		getNewKeyCodes : function(){
			var self = this,
				len = self.elem.length;
			for (var i = len - 1; i >= 0; i--) {
				(function(i){
					self.elem.eq(i).on('focus',function(evt){
						self.elem.eq(i).select();
						self.elem.eq(i).on('keydown',function(evt){
							self.tempKeyCodeArr[i] = evt.which;
							self.elem.eq(i).off('keydown');
						});
					});
				})(i);
			};
			$('form select').on('change',function(evt){
				self.defaultKeyCodes.speed = 500;
				self.defaultKeyCodes.speed = (self.defaultKeyCodes.speed/parseInt($('form select').val())).toFixed(0);
				self.defaultKeyCodes.speed = parseInt(self.defaultKeyCodes.speed);
			});
		},
		setting : function(){
			for (var i = this.tempKeyCodeArr.length - 1; i >= 0; i--){
				this.defaultKeyCodes.dirs[i] = this.tempKeyCodeArr[i];
			};
			return this.defaultKeyCodes;
		},
		default : function(){
			this.defaultKeyCodes = {
				dirs: [37, 38, 39, 40, 32],
				speed : 500
			};
			return this.defaultKeyCodes;
		}
	
	};
	window.GetKeyCodes = GetKeyCodes;
	
})();



var snake = Snake("#snake");
var keys = GetKeyCodes('form input');

$('.setting').on('click',function(){
	$('.setting-box-center').css('display','flex');
});
$('#changed').on('click',function(evt){
	snake.extend( keys.setting() );
	$('.setting-box-center').css('display','none');
});
$('#default').on('click',function(){
	snake.extend( keys.default() );
	$('.setting-box-center').css('display','none');
});

$(document).on('keydown',function(evt){
	if(evt.which == 32 ){
		evt.preventDefault();
	}
});






});