
function scroll (ele) {
    var inside = ele;
    // using the event helper
    var _top = parseInt( inside.css("top") ),
        windowHeight = parseInt( $("body").css("height") ),
        insideHeight = parseInt( inside.css("height") );
    inside.mousewheel(function(event, delta, deltaX, deltaY) {
        pageUp();
        function pageUp(){
            if(deltaY > 0){
                _top += 20;
            }else{
                _top -= 20;
            }
            if( _top >= 0 ){
                _top = 0;
            }else if(_top <= windowHeight - insideHeight ) {
                _top= windowHeight - insideHeight;
            }
            inside.css("top",_top +"px");
        }
    });
}

scroll( $("#about-me"));

