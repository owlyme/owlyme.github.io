(function(){
    var _body= $("body"),
        backHome = $(".back-to-home"),
        content = $(".content"),
        blades = $(".blade");

    var curEle,
        _index ,
        done = 1,
        left=[],
        top=[];

    for(var i =0; i<blades.length; i++){
        left.push( $(blades[i]).css("left") );
        top.push( $(blades[i]).css("top") );
    }
    $(window).resize(function(evt) {
        left=[];
        top=[];
        for(var i =0; i<blades.length; i++){
            left.push( $(blades[i]).css("left") );
            top.push( $(blades[i]).css("top") );
        }
        if( parseInt( _body.css("width") ) >= 720 ){
            top = ["300px","300px","400px","400px"];
        }else {
            top = ["300px","350px","400px","450px"];
        };
        for(var i =0; i<blades.length; i++){
            if( parseInt($(blades[i]).css("top")) === 0 ){
                continue;
            }
            $(blades[i]).css("top",top[i]);
        }
    });

    blades.hover(function(evt){
        _index = $(this).index();
        if( !done ) return;
         $(this).css("left",(parseInt(left[_index])*.8)+"px");
         $(this).css("top",(parseInt(top[_index])*0.9)+"px");
        },function(evt){
        if( !done ) return;
            $(this).css("left",left[_index]);
            $(this).css("top",top[_index]);
    });

    blades.on("click",function(evt){
       // content.css("overflow","scroll");
        done = 0;
        curEle  = $(this);
        backHome.fadeIn("slow");
        $(this).addClass("rotate-back").css("z-index",1);
        blades.not(curEle).addClass("rotate-down");
        curEle.css("left","0px");
        curEle.css("top","0px");
        setTimeout(function () {
            if(_index === 0 )window.location.assign("./blog/index.html");
            if(_index === 1 )window.location.assign("./game-center/index.html");
        },500);
    });
    backHome.on("click",function (evt) {
        //content.css("overflow","auto");
        _body.css("overflow","hidden");
        backHome.css("display","none");
        blades.removeClass("rotate-back rotate-down").css("z-index",0);
        curEle.css("left",left[_index]);
        curEle.css("top",top[_index]);
    });
})();


