$(function(){
		//注册框
		$('.reg').click(function(){
			$('#reg').css('display','block').center();	
			$('#lock').lock();	
		});
			
		$('#reg .close').click(function(){	
			$('#reg').css('display','none');
			$('#lock').unlock();
		});
		//登录框
		$('.login').click(function(){
			$('#login').css('display','block').center();
			$('#lock').lock();	
		});
		
		$('#login h2 .close').click(function(){
			$('#login').css('display','none');
			$('#lock').unlock();
		});
	//拖动功能
		$('#login').drag($('#login h2').first());	
		$('#reg').drag($('#reg h2').first());	
	//个人中心
		$('#center').hover(function(){
			$('#center').css('background','url(images/arrow2.png) no-repeat right center'),
			$('#set').show();
		},function(){
			$('#center').css('background','url(images/arrow.png) no-repeat right center'),
			$('#set').hide();
		});

	//导航
	$('#nav .about li').hover(function () {
			var target = $(this).first().offsetLeft;
			$('#nav .nav_bg').animate({
				attr : 'x',
				target : target + 20,
				t : 20,
				step : 10,
				fn : function () {
					$('#nav .white').animate({
						attr : 'x',
						target : -target
					});
				}
			});
		}, function () {
			$('#nav .nav_bg').animate({
				attr : 'x',
				target : 20,
				t : 20,
				step : 10,
				fn : function () {
					$('#nav .white').animate({
						attr : 'x',
						target : 0
					});
				}
			});
		});



	window.onscroll = function(){
		//alert(document.documentElement.scrollTop)
		//element.style.top = Math.max(topValue, body.scrollTop) + 'px';
	}	
	$().resize(function(){
		var top = $('#share').first().offsetHeight;
		var height = $('#share').first().offsetHeight/2;
		$('#share').first().style.top = document.documentElement.scrollTop+getInner().height/2- top/2+'px';
	});

	$().scroll(function(){
		var top = $('#share').first().offsetHeight;
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		$('#share').first().style.top = scrollTop+getInner().height/2- top/2+'px';
	});

	$('#share').hover(function(){
		$('#share').animate({
			attr: 'x',
			target: 0,
			t : 20,
			step : 10
		});
	},function(){
		$('#share').animate({
			attr: 'x',
			target: -211,
			t : 20,
			step : 10
		});
	});



	showList('.title','height','183');
	function showList(element,attr,value){
		$(element).getElementObj(0).parentNode.style[attr] = value+'px';
		for(var i= 0; i<$(element).getLength(); i++){
			$(element).getElementObj(i).onclick = function(evt){
				getBack(evt);
				$(target(evt).parentNode).animate({
					attr: 'h',
					target: value,
					t : 30,
					step : 10
				});
				//getBack(evt);
				//target(evt).parentNode.style[attr] = value+'px';
			}
		}
		function target(evt){
			var e = evt||window.event;
			var target = e.target||e.srcElement;
			return target;
		}
		function getBack(evt){
			for(var i= 0; i<$(element).getLength(); i++){
					$($(element).getElementObj(i).parentNode).animate({
						attr: 'h',
						target: 30,
						t : 30,
						step : 10
					}); // getStyle(target(evt),'height');
			}
		}
	}


	//验证框刷新
	$('#reg form').first().reset();
	//用户名验证
	$('#reg form').form('user').bind('focus',function(){
		$('#reg .info .info_user').css('display','block');
		$('#reg .info .error_user').css('display','none');
		$('#reg .info .succ_user').css('display','none');
	}).bind('blur',function(){
		$('#reg .info_user').css('display','none');
		if($('#reg form').form('user').value() != ''){
			if( checkUser()){
				$('#reg .info .error_user').css('display','block');
			}else {
				$('#reg .info .succ_user').css('display','block');
			}
		}
	});
	function checkUser(){
		var value = $('#reg form').form('user').value();
		if ( /[^a-zA-Z0-9_]/.test(value)||value.length<2|| value.length>20) return true;
	}

	//密码验证
	$('#reg form').form('pass').bind('focus',function(){
		$('#reg .info_pass').css('display','block');
		$('#reg .error_pass').css('display','none');
		$('#reg .succ_pass').css('display','none');
	}).bind('blur',function(){
		$('#reg .info_pass').css('display','none');
		var value = $('#reg form').form('pass').value();
		if(value != ''){
			if(checkPass()){
				 $('#reg .succ_pass').css('display','block');
			} else {
				$('#reg .error_pass').css('display','block');
			}
		}	
	});

	//安全级别
	$('#reg form').form('pass').bind('keyup',function(){
		check_pass();
	});
	function checkPass(){
		var pass_value = $('#reg form').form('pass').value();
		var pass_length = pass_value.length;
		var code_type= 0;
		var flag1 = true , flag2= true,flag3= true;
		if(pass_length>5 &&pass_length<21){
			$('#reg .info_pass .q1').html('●').css('color','green');	
		}else {
			flag1=false;
			$('#reg .info_pass .q1').html('○').css('color','#555');
		};

		if(/[0-9A-Za-z\S]/.test(pass_value)&& !/\s/.test(pass_value)){
			$('#reg .info_pass .q2').html('●').css('color','green');
		}else{
			flag2=false;
			$('#reg .info_pass .q2').html('○').css('color','#666');
		};

		if (/\d/.test(pass_value))    code_type++;
		if (/[a-z]/.test(pass_value)) code_type++;
		if (/[A-Z]/.test(pass_value)) code_type++;
		if (/[^\w\s]/.test(pass_value))  code_type++;
		if(code_type>1){
			$('#reg .info_pass .q3').html('●').css('color','green');
		}else{
			flag3=false;
			$('#reg .info_pass .q3').html('○').css('color','#666');
		};

		if(pass_length>10 && code_type>3){
			$('#reg .info_pass .s1').css('color','green');
			$('#reg .info_pass .s2').css('color','green');
			$('#reg .info_pass .s3').css('color','green');
			$('#reg .info_pass .s4').html('高').css('color','green');
		}else if (pass_length>7 && code_type>2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#666');
			$('#reg .info_pass .s4').html('中').css('color','#f60');
		}else if (pass_length >5) {
			$('#reg .info_pass .s1').css('color', 'maroon');
			$('#reg .info_pass .s2').css('color', '#666');
			$('#reg .info_pass .s3').css('color', '#666');
			$('#reg .info_pass .s4').html('低').css('color', 'maroon');
		} else {
			$('#reg .info_pass .s1').css('color', '#666');
			$('#reg .info_pass .s2').css('color', '#666');
			$('#reg .info_pass .s3').css('color', '#666');
			$('#reg .info_pass .s4').html(' ');
		}	
		if (flag1 && flag2 &&flag3 )return true;
		return false;
	}

	//密码确认
	$('#reg form').form('confirm').bind('focus',function(){
		$('#reg .info_confirm').css('display','block');
		$('#reg .error_confirm').css('display','none');
		$('#reg .succ_confirm').css('display','none');
	}).bind('blur',function(){
		$('#reg .info_confirm').css('display','none');
		var value = $('#reg form').form('confirm').value();
		if(value != ''){
			if( checkConfirm()){
				$('#reg .error_confirm').css('display','block');
			}else {
				$('#reg .succ_confirm').css('display','block');
			}
		};
	});
	function checkConfirm(){
		var value = $('#reg form').form('confirm').value();
		var pass_value = $('#reg form').form('pass').value();
		if(value != pass_value) return true;
	}
	//问题
	$('#reg form').form('ques').bind('change',function(){
		$('#reg .info .error_ques').css('display','none');
	});
	function checkQues(){
		if($('#reg form').form('ques').value() != 0) return true;
	}
	//回答验证
	$('#reg form').form('answer').bind('focus',function(){
		$('#reg .info_ans').css('display','block');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','none');
	}).bind('blur',function(){
		$('#reg .info_ans').css('display','none');	
		if($('#reg form').form('answer').value() != ''){
			if( checkAns()){
				$('#reg .succ_ans').css('display','block');
			}else {
				$('#reg .error_ans').css('display','block');
			}
		};
	});
	function checkAns(){
		var value = $('#reg form').form('answer').value();
		if (value.length>1 && value.length<32) return true;
	}

	//email验证
	$('#reg form').form('email').bind('focus',function(){
		//email补充
		var value = $('#reg form').form('email').value();
		if (value.indexOf('@') == -1){
			$('#reg .all_email').css('display','block');
		}	
		$('#reg .info_email').css('display','block');
		$('#reg .error_email').css('display','none');
		$('#reg .succ_email').css('display','none');
	}).bind('blur',function(){
		//email补充
		$('#reg .all_email').css('display','none');
		$('#reg .info_email').css('display','none');	
		if($('#reg form').form('email').value() != ''){
			if(checkEmail()){
				$('#reg .succ_email').css('display','block');
			}else {
				$('#reg .error_email').css('display','block');
			}
		};
	});
	function checkEmail(){
		var value = $('#reg form').form('email').value();
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}/.test(value)) return true;
	}
	//email补充
	$('#reg form').form('email').bind('keyup',function(event){
		var value = $('#reg form').form('email').value();
		if (value.indexOf('@') == -1){
			$('#reg .all_email').css('display','block');
			$('#reg .info .all_email li span').html($('#reg form').form('email').value());
		}else{
			$('#reg .all_email').css('display','none');
		}
		// 键盘选择
		
		var length = $('#reg .info .all_email li').getLength();
		if (event.keyCode == 40){
			if(this.index == undefined){
				this.index =0;
			}else{
				this.index++;
			}
		}

		if (event.keyCode == 38){
				this.index--;
		};
		if(this.index != undefined){
			if(this.index < 0) {
				this.index= this.index+length;
			}
			var opt= this.index%length;
			 //this.index%length;
			$('#reg .info .all_email li').css('background','none');
			$('#reg .info .all_email li').css('color', '#555');	
			$('#reg .info .all_email li').getElement(opt).css('background','#e5edf2');
			$('#reg .info .all_email li').getElement(opt).css('color','#369');
			
			if (event.keyCode == 13){
				$('#reg form').form('email').value($('#reg .info .all_email li').getElement(opt).text());
				$('#reg .all_email').css('display','none');
				this.index = undefined;
			}
		}
	});
		//s鼠标选择
		$('#reg .info .all_email li').bind('mousedown',function(){
			$('#reg form').form('email').value($('#reg .info .all_email li').text()) ;
		});

		$('#reg .info .all_email li').hover(function(){
			$(this).css('background','#e5edf2');
			$(this).css('color','#369');
		},function(){
			$('#reg .info .all_email li').css('background','none');
			$('#reg .info .all_email li').css('color', '#555');
		});


	//生日验证
	var year = $('#reg form').form('year');
	var month = $('#reg form').form('month');
	var day = $('#reg form').form('day');

	var days30 = [4,6,9,11];
	var days31 = [1,3,5,7,8,10,12];

	$('#reg form').form('day').bind('change',function(){
		$('#reg .info .error_bir').css('display','none');
	});

	function checkBir(){
		if(year.value()!= 0 && month.value()!= 0 && day.value()!= 0 ) return true;
	}
	//注入年
		for(var i= 2016; i>1966; i--){
			year.first().add(new Option(i,i),undefined);
		}
	//注入月 
		for(var i= 1; i<=12; i++){
			month.first().add(new Option(i,i),undefined);
		}	
	//注入天
		var curDay = 0;	
		year.bind('change',selectDay);
		month.bind('change',selectDay);

	function selectDay (){
		var monthNum = parseInt(month.value());
		var yearNum = parseInt(year.value());
		day.first().options.length =1;

		if( inArr(days30,monthNum) ){		
			curDay= 30;
		}else if ( inArr(days31,monthNum) ){
			curDay= 31;
		}else {
			curDay= 28;
		}

		for(var i= 1; i<=curDay; i++){
			day.first().add(new Option(i,i),undefined);
		}
		if( monthNum==2 &&(!(yearNum%4) && yearNum%100 || !(yearNum%400))){
			day.first().add(new Option(29,29),undefined);
		}
	}



	//剩余字符串长度
	$('#reg form').form('ps').bind('keyup',checkPs).bind('paste',function(){
		setTimeout(checkPs,50)
	});
	function checkPs(){
		$('#count').text(200-parseInt($('#reg form').form('ps').value().length)) ;
		if (parseInt($('#reg form').form('ps').value().length) == 200){
			$('#count').css('background','red');
		}
	}

	//提交注册框
	$('#reg form .submit').bind('click',function(){
		var flag =true;
		if (checkUser() ){
			$('#reg .info .error_user').css('display','block');
			flag = false;
		}
		if (!checkPass() ){
			$('#reg .info .error_pass').css('display','block');
			flag = false;
		}
		if (checkConfirm() ){
			$('#reg .info .error_confirm').css('display','block');
			flag = false;
		}
		if (!checkQues() ){
			$('#reg .info .error_ques').css('display','block');
			flag = false;
		}
		if (!checkAns() ){
			$('#reg .info .error_ans').css('display','block');
			flag = false;
		}
		if (!checkEmail() ){
			$('#reg .info .error_email').css('display','block');
			flag = false;
		}
		if (!checkBir() ){
			$('#reg .info .error_bir').css('display','block');
			flag = false;
		}

		if(flag){
			$('#reg form').first().submit();
		}
	});

	//轮播器
		$('#banner strong').html($('#banner a img').getElement(0).attr('alt'));
		$('#banner ul li').getElement(0).css('color','#333');
	var bannerType =3;	
		if(bannerType == 1){
			$('#banner a').css('display','none');
			$('#banner a').getElement(0).css('display','block');
		}else {			
			$('#banner a').opacity(0);
			$('#banner a').getElement(0).opacity('100').css('zIndex','1');
		}
	var bannerIndex = 0;
	var bannerLength = $('#banner ul li').getLength();
	var bannerClick = 3000;
	var bannerTimer = setInterval(function(){
						changeImg((++bannerIndex)%bannerLength)
					},bannerClick );

	$('#banner ul li').hover(function(){
		clearInterval(bannerTimer);
		if ($(this).css('color') != 'rgb(51, 51, 51)' && $(this).css('color') != '#333'){
			this.index= $(this).index();
			changeImg(this.index);
		}
	},function(){
		bannerIndex = this.index;
		bannerTimer = setInterval(function(){
							changeImg((++bannerIndex)%bannerLength)
						},bannerClick );
	});

	function changeImg(num){	
		$('#banner ul li').css('color','#fff');
		$('#banner a').css('zIndex','1');
		$('#banner ul li').getElement(num).css('color','#333');
		$('#banner strong').html($('#banner a img').getElement(num).attr('alt'));

		var prev = num -1;
			if ( prev < 0 ) prev = bannerLength-1;
		var next = num +1;
			if ( next > bannerLength-1) next = 0;

		if(bannerType == 1){
			$('#banner a').css('display','none');
			$('#banner a').getElement(num).css('display','block');		
		}else if (bannerType == 2){
			$('#banner a').getElement(prev).animate({
				attr : 'o',
				target: 0,
				t: 100,
				step: 10
			});

			$('#banner a').getElement(num).animate({
				attr : 'o',
				target: 100,
				t: 100,
				step: 10
			}).css('zIndex','2');
		}else if (bannerType == 3){
			$('#banner a').getElement(num).opacity('100');
			$('#banner a').getElement(prev).animate({
				attr : 'y',
				target: 150,
				t: 100,
				step: 10
			}).css('zIndex',1);
			$('#banner a').getElement(num).css('top','-150px').animate({
				attr : 'y',
				target:0,
				t: 100,
				step: 10
			}).css('zIndex','2');
		}
	}
	// 延时加载

	var wait_load = $('.photoes');
	var photoes = $('.photoes').getLength();

	$(window).bind('scroll', function () {
		
			for (var i = 0; i < wait_load.getLength(); i ++) {
				var _this = wait_load.getElementObj(i);
				if (getInner().height + getScroll().top >= offsetTop(_this)) {
					$(_this).attr('src', $(_this).attr('xsrc'));
				}
			}

	});

	//预加载
	$('#photo_big').resize();
	$('.photoes').click(function(){
		$('#photo_big').css('display','block').center();
		$('#lock').lock();	

		//预加载大图片
		var tempImg = new Image();
		tempImg.xsrc= $(this).attr('xsrc');
		$('#photo_big .bigimg img').attr('src',tempImg.xsrc).childCenter();

		$(tempImg).bind('load', function () {
			$('#photo_big .bigimg img').attr('src', tempImg.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).css('left',0).css('top',0).opacity(0);			
		});

			tempImg.src = $(this).attr('bigsrc');
			var children = this.parentNode.parentNode;
			perv_next(children)
		});
		
		
	$('#photo_big .close').click(function(){
		$('#photo_big').css('display','none');
		$('#lock').unlock();
		$('#photo_big .bigimg img').attr('src','');
	});
	$('#photo_big').drag($('#photo_big h2').first());	

	//前一张
		$('#photo_big .bigimg .left').hover(function(){
			$('#photo_big .bigimg .sl').animate({
				attr : 'o',
				target : 50,
				t :30,
				step : 5
			})
		},function(){
				$('#photo_big .bigimg .sl').animate({
				attr : 'o',
				target : 0,
				t :30,
				step : 5
			})
		})

	$('#photo_big .bigimg .left').click(function(){
		var currentImg = new Image();
		$(currentImg).bind('load',function(){
			$('#photo_big .bigimg img').attr('src', currentImg.src);
		})
		currentImg.src = $(this).attr('prevSrc');

		var index = $('#photo_big dl dt img').attr('index');
			if(-- index <0) index= photoes-1;
		var children = $('.photoes').getElementObj(index).parentNode.parentNode;
			perv_next(children)
			
	})
	//后一张图
	$('#photo_big .bigimg .right').hover(function(){
			$('#photo_big .bigimg .sr').animate({
				attr : 'o',
				target : 50,
				t :30,
				step : 5
			})
		},function(){
				$('#photo_big .bigimg .sr').animate({
				attr : 'o',
				target : 0,
				t :30,
				step : 5
			})
		})
	$('#photo_big .bigimg .right').click(function(){
		var currentImg = new Image();
		$(currentImg).bind('load',function(){
			$('#photo_big .bigimg img').attr('src', currentImg.src);
		})
		currentImg.src = $(this).attr('nextSrc');

		var index = $('#photo_big dl dt img').attr('index');
			if(++ index >photoes-1) index= 0;
		var children = $('.photoes').getElementObj(index).parentNode.parentNode;
			perv_next(children)
			
	})


	function perv_next(children){
			var current = $(children).index();
			$('#photo_big .bigimg em').html(current+1+'/'+photoes)
			var prev= current - 1;
			if (prev <0) prev =  children.parentNode.children.length-1;
			var next = current + 1;
			if (next >children.parentNode.children.length-1) next = 0;

			var prevImg	= new Image();
			var nextImg = new Image();
			prevImg.src = $('#photo_big dl dt img').getElement(prev).attr('bigsrc');
			nextImg.src = $('#photo_big dl dt img').getElement(next).attr('bigsrc');
			
			$('#photo_big .bigimg .left').attr('prevSrc',prevImg.src);
			$('#photo_big .bigimg .right').attr('nextSrc',nextImg.src);
			$('#photo_big dl dt img').attr('index',$(children).index());
	}













})