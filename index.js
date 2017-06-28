(function(){
    var _body= $("body"),
        backHome = $(".back-to-home"),
        blades = $(".blade");

    var curEle,
        _index ,
        done = 1,
        left=[],
        top=[];

    for(var i =0; i<blades.length; i++){
        left.push($(blades[i]).css("left"));
        top.push($(blades[i]).css("top"));
    }

    $(window).resize(function() {
        left=[];
        top=[];
        for(var i =0; i<blades.length; i++){
            left.push($(blades[i]).css("left"));
            top.push($(blades[i]).css("top"));
        }
    });

    blades.hover(function(evt){
        _index = $(this).index();
        if( !done ) return;
         console.log("hover: "+_index);
         value = _index%2 ? -1 : 1;
         $(this).css("left",(parseInt(left[_index])*.8*value)+"px");
         $(this).css("top",(parseInt(top[_index])*0.9)+"px");
        },function(evt){
        if( !done ) return;
            $(this).css("left",left[_index]);
            $(this).css("top",top[_index]);
    });

    blades.on("click",function(evt){
        done = 0;
        curEle  = $(this);
        backHome.fadeIn("slow");
        $(this).addClass("rotate-back").css("z-index",1);
        blades.not(curEle).addClass("rotate-down");
        setTimeout(function () {
            done = 0;
            curEle.css("left","0px");
            curEle.css("top","0px");
        },0);
        setTimeout(function () {
            if(_index === 0 ){};
            if(_index === 1 )window.location.assign("./game-center/index.html");
        },500);
    });
    backHome.on("click",function (evt) {
        _body.css("overflow","hidden");
        backHome.css("display","none");
        blades.removeClass("rotate-back rotate-down").css("z-index",0);
        console.log("click: "+_index);
        curEle.css("left",left[_index]);
        curEle.css("top",top[_index]);
    });
})();


