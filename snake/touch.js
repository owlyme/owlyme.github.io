
	;(function(){
	var TouchedObj = function(ele){
		return new TouchedObj.fn(ele);
	};

	TouchedObj.fn = function(ele){
		this.elem = ele;
		this.ongoingTouches = [];
		this.init();
	};

	TouchedObj.fn.prototype= {
		constructor : TouchedObj.fn,
		init : function(){
			//this.drag();
		},

		drag : function(){
			var self = this;
			var x , y , moveX, moveY ,oW, oH;
			var parentNodeOffsetX , parentNodeOffsetY;
			//var touches = null;
			self.elem.addEventListener('touchstart',handleStart, false);
			self.elem.addEventListener('touchmove', handleMove, false);
			self.elem.addEventListener('touchend', handleEnd, false);
			self.elem.addEventListener('touchcancel', handleCancel, false);

			function handleStart(evt){
				var touches = evt.changedTouches;
					x = touches[0].pageX;
					y = touches[0].pageY;
				var offset =  getParentOffset(evt.target);
					oW = x - (evt.target.offsetLeft-getStyle(evt.target,'margin-left',true)) - offset.x;
					oH = y - (evt.target.offsetTop-getStyle(evt.target,'margin-top',true)) - offset.y;
			};
			function handleMove(evt){
				evt.preventDefault();
				var touches = evt.changedTouches;
					moveX = touches[0].pageX;
					moveY = touches[0].pageY;
				var leftpx = moveX - oW;
					toppx = moveY - oH;
				self.elem.style.left = leftpx+ 'px';
				self.elem.style.top = toppx+ 'px';
			};
			function handleEnd(evt){
				var touches = evt.changedTouches;
				var x = touches[0].pageX,
					y = touches[0].pageY;
			};
			function handleCancel(evt){
				var touches = evt.changedTouches;
			};
		},
		slipDirertion : function(arg){
			var self = this;
			var direction = null;
			var startPointX , startPointY, endPointX, endPointY;
			self.elem.addEventListener('touchstart',slipStart, false);
			self.elem.addEventListener('touchend',slipEnd, false);
			return direction;
			function slipStart(evt){
				var touches = evt.changedTouches;
					startPointX = touches[0].pageX;
					startPointY = touches[0].pageY;				
			};
			function slipEnd(evt){
				var touches = evt.changedTouches;
					endPointX = touches[0].pageX,
					endPointY = touches[0].pageY;

				var slipX = endPointX-startPointX,
					slipY = endPointY - startPointY;
				if( slipY*slipY > slipX*slipX ){
					if( slipY > 0){
						if (arg.down){
							arg.down();
							direction = "down";
						}					
					}else if( slipY < 0){
						if (arg.up){
							arg.up();
							direction = "up";
						}
					}
				}else if( slipY*slipY < slipX*slipX ){
					if( slipX > 0){
						if (arg.right){
							arg.right();
							direction = "right";
						}
					}else if( slipX < 0){
						if (arg.left){
							arg.left();
							direction = "left";
						}
					}
				}
			};

		},
		scale : function(){
			var self = this;
			var selfWidth = getStyle(self.elem, 'width', true),
				selfHeight = getStyle(self.elem, 'height', true);
			//var touches = [];	
			var point1 = {
					idx : null,
					x :  null,
					y : null
				}, 
				point2 = {
					idx : null,
					x :  null,
					y : null
				},
				pointMove1 = {
					idx : null,
					x :  null,
					y : null
				}, 
				pointMove2 = {
					idx : null,
					x :  null,
					y : null
				};

			self.elem.addEventListener('touchstart',scaleStart, false);
			self.elem.addEventListener('touchmove', scaleMove, false);
			self.elem.addEventListener('touchend', csaleEnd, false);
			self.elem.addEventListener('touchcancel', csaleCancel, false);

			function scaleStart(evt){
				var touches = [];
				var touches = evt.changedTouches;		
					if(touches.length != 2) return;
				//for( var i = 0 ; i< touches.length; i++){
					point1.idx = touches[0].identifier;
					point1.x = touches[0].pageX;
					point1.y = touches[0].pageY;

					point2.idx = touches[1].identifier;
					point2.x = touches[1].pageX;
					point2.y = touches[1].pageY;
				//}	
				
			};
			function scaleMove(evt){
				evt.preventDefault();

				var touches = evt.changedTouches;
					if(touches.length != 2 ) return;
					pointMove1.idx = touches[0].identifier;
					pointMove1.x = touches[0].pageX;
					pointMove1.y = touches[0].pageY;

					pointMove2.idx = touches[1].identifier;
					pointMove2.x = touches[1].pageX;
					pointMove2.y = touches[1].pageY;

				var changePoint1x = point1.x - point2.x, 
					changePoint1y = point1.y - point2.y,
					changePoint2x = pointMove1.x - pointMove2.x,
					changePoint2y = pointMove1.y - pointMove2.y;

				if( changePoint1x*changePoint1x < changePoint2x*changePoint2x ){
					self.elem.style.width = selfWidth + Math.abs(changePoint2x)+'px';
					self.elem.style.height = selfHeight + Math.abs(changePoint2y) +'px';
				}
				if( changePoint1x*changePoint1x > changePoint2x*changePoint2x ){
					self.elem.style.width = selfWidth - Math.abs(changePoint2x) +'px';
					self.elem.style.height = selfHeight - Math.abs(changePoint2y) +'px'; 
				}
			};

			function scaleEnd(evt){
				var touches = evt.changedTouches;
				var x = touches[0].pageX,
					y = touches[0].pageY;
			};
			function scaleCancel(evt){
				self.elem.style.width = selfWidth;
				self.elem.style.height = selfHeight
			};
		}

	};

	function getStyle(element, attr, boolen) {
		var value;
		if (typeof window.getComputedStyle != 'undefined') {//W3C
			value = window.getComputedStyle(element, null)[attr];
		} else if (typeof element.currentStyle != 'undeinfed') {//IE
			value = element.currentStyle[attr];
		}
		if( !boolen )return value;
		if( boolen) return parseInt(value);		
	};
	function getParentOffset(ele){
		var offset = {
				x: null,
				y: null
			},
			parentnodes = ele.parentNode;
		var final = document.getElementsByTagName('html')[0];

		while( parentnodes != final){
			offset.x += parentnodes.offsetLeft- getStyle(parentnodes,'margin-left',true);
			offset.y += parentnodes.offsetTop- getStyle(parentnodes,'margin-top',true);
			parentnodes = parentnodes.parentNode;
		}
		return offset;
	}

	var touchEle =  document.getElementById('target');
	
	window.TouchedObj = TouchedObj;
	
})();



