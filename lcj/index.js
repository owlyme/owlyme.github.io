$(document).ready(function(){
(function(){
	var component = $('.component-box .content>div');
	var ad = $('.ad-banner');
	  $('.component-box ul.nav li').on('click',function () {
	  		var index = $(this).index();
	  		if( index >2 ) return ;
	  		component.css('display','none').eq(index).css('display','block');
	  		$(this).addClass('nav-select').siblings().removeClass();
	  		ad.css('display','none');


	  });

})();
  









});