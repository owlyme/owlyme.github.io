(function(){
    var _body= $("body"),
        backHome = $(".back-to-home"),
        blades = $(".blade");

    var classNames= "", curEle, _index ;
    var value = 1,
        left=[],
        top=[];
    for(var i =0; i<blades.length; i++){
        left.push($(blades[i]).css("left"));
        top.push($(blades[i]).css("top"));
    }

    $(window).resize(function() {
        _body= $("body");
        backHome = $(".back-to-home");
        blades = $(".blade");
        left=[];
        top=[];
        for(var i =0; i<blades.length; i++){
            left.push($(blades[i]).css("left"));
            top.push($(blades[i]).css("top"));
        }
    });
        blades.hover(function(evt){
            if( $(this).css("transform")=== "matrix(1, 0, 0, 1, 0, 0)" &&
                parseInt(_body.css("width")) >= 720   )return;
            if( parseInt(_body.css("width")) <= 720 && $(this).css("top")==="0px" ){return};
            _index = $(this).index();
            value = _index%2 ? -1 : 1;
            $(this).css("left",(parseInt(left[_index])*.8)+"px");
            $(this).css("top",(parseInt(top[_index])*0.9)+"px");
        },function(evt){
            if( $(this).css("transform")=== "matrix(1, 0, 0, 1, 0, 0)" &&
                parseInt(_body.css("width")) >= 720 )return;
            if( parseInt(_body.css("width")) <= 720 && $(this).css("top")==="0px" ){return};
            $(this).css("left",left[_index]);
            $(this).css("top",top[_index]);
        });

    blades.on("click",function(evt){
        backHome.fadeIn("slow");
        classNames = $(this).prop("className");
        curEle  = $(this);
        $(this).addClass("rotate-back").css("z-index",1);
        blades.not(curEle).addClass("rotate-down");
        curEle.css("left",0);
        curEle.css("top",0);
        setTimeout(function () {
            if(_index === 0 ){};
            if(_index === 1 )window.location.assign("./game-center/index.html");
        },500);
    });
    backHome.on("click",function (evt) {
        _body.css("overflow","hidden");
        backHome.css("display","none");
        blades.removeClass("rotate-back rotate-down").css("z-index",0);
        curEle.css("left",left[_index]);
        curEle.css("top",top[_index]);
    });
})();


