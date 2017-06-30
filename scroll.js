(function(){
    var scroll = function(ele){
        //obj instanceof jQuery
        ele =  $(ele);
        ele.on("mouseover",function(evt){
            var wheel = evt.wheelDelta;
            
        });
        ele.on("mouseout",function(evt){
            evt.preventDefault();

        });
         $(window).scroll(function(){
         	console.log('wheel');
         })

    };
    scroll(document);
})();