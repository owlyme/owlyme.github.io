$(function(argument) {

	(function(){
		var Slider = function(arg){
			return new Slider.fn(arg);
		}
		Slider.fn = function(arg){
			this.container = $(arg.container);			
			this.intervalTime = arg.inter || 3000;
			this.type = arg.type || 4;
			this.speed = !arg.speed ? 400 : arg.speed > 1000 ? 1000 : arg.speed;
			this.pointsPosition = arg.pointsPosition ;
			if ( typeof arg == 'string' ) this.container = $(arg);
			this.init();
		};
		Slider.fn.prototype = {
			len : 0,
			index: 0,
			init : function(){				
				this.getEles();
				this.len = this.slides.length;
				this.ready();
				this.auto();
				this.hoverEvent();
			},
			renderDOM: function(){
				var self = this;
				if ( !self.len ) {
					console.log('need slider data');
					return;
				};
				$.each(self.sliderList, function(index, ele){
					if ( !ele.tagName ){
						console.log('need a tag name');
						return;
					}
					var elementNode = $( ele.tagName ).setAttr('src', ele.src).innerHTML( ele.content );
					self.container.append( elementNode );
				});				
			},
			getEles: function(){
				var container = this.container;
				this.slides = container.find('.slide-box');
				this.points = container.find('.notice-point');
				this.noticeText = container.find('.notice-text');
			},
			ready: function(){
				var	container = this.container,
					slides = this.slides,
					points = this.points,
					noticeText = this.noticeText,
					type = this.type;
				var text = slides.eq(0).find('img').attr('alt');
				container.css({
					position : 'relative',
					overflow: "hidden",
				    height: "150px"
				});
				slides.css({
					position : 'absolute',
					height: '100%',
				    width: '100%',
				    display: 'block'
				});				
				noticeText.html( text ).css({
					position : 'absolute',
					width: '100%',
					background: '#444',
					opacity: .9,
					bottom: 0,
					zIndex: 9
				});
				points.css({
					display: 'inline-block',
					color: '#fff'
				});
				points.eq(0).css('color','#333');
				var position = this.pointsPosition || 'center' ;
				points.parent('ul').css({
					position : 'absolute',
					width: '100%',
					bottom: 0,
					zIndex: 10,
					textAlign: position
				})
				if(type == 1){
					slides.css('display','none');
					slides.eq(0).css('display','block');
				}else {
					slides.css('opacity', 0);
					slides.eq(0).css({ opacity: 1,
										zIndex: 1});
				}
			},
			run : function(current){
				var container = this.container,
					noticeText = this.noticeText,
					slides = this.slides,
					points = this.points,
					type = this.type,
					speed = this.speed,
					len = this.len;

				points.css('color','#fff');
				slides.css('zIndex','1');
				points.eq(current).css('color','#333');
				var text = slides.eq(current).find('img').attr('alt');
				noticeText.html( text );

				var prev = current -1;
					if ( prev < 0 ) prev = len-1;
				var next = current +1;
					if ( next > len-1) next = 0;

				if(type == 1){
					slides.css('display','none');
					slides.eq(current).css('display','block');		
				}else if (type == 2){
					slides.eq(prev).animate({
						opacity: 0
					});
					slides.eq(current).animate({
						opacity: 1
					}).css('zIndex','2');
				}else if (type == 3 ){
					slides.eq(current).css('opacity',1);
					slides.eq(prev).animate({
						top : '100%'
					},speed).css('zIndex',1);
					slides.eq(current).css('top','-100%').animate({
						top : 0
					},speed).css('zIndex','2');
				}else if( type == 4 || type == 'x' ){
					slides.eq(current).css('opacity',1);
					slides.eq(prev).animate({
						left : '-100%'
					},speed).css('zIndex',1);
					slides.eq(current).css('left','100%').animate({
						left : 0
					},speed).css('zIndex','2');
				}
			},
			auto : function(){
				var self = this;
				self.timer = setInterval(function(){
					self.run((++self.index)%self.len);
				}, self.intervalTime );
			},
			hoverEvent: function () {
				var self = this,
					slides = self.slides,
					points = self.points;
				self.container.hover(function(){
					clearInterval( self.timer );							
				},function(){							
					self.timer = setInterval(function(){
						self.run((++self.index)%self.len)
					},self.intervalTime );	
				});
				points.on('click',function(){
					var index = $(this).index();
					if( self.index == index ) return;
					self.run(index);
				});
			}
		}
		window.slider = Slider;
	})();
	window.slide = slider('.container');
})

