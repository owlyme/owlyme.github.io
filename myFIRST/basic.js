
//前台调用
var $ =function (element){
	return new Base(element);
}
//基础库
function Base(element){
	this.elements  = [];
	if(typeof element == 'string'){
		if(element.indexOf(' ')!= -1){
				var elements = element.split(' ');
				var childElements = [];
				var node = [];
				for (var i=0; i<elements.length; i++){
					if(node.length == 0) node.push(document);
					switch(elements[i].charAt(0)){
						case '#':
							childElements = [];
							childElements.push(this.getId(elements[i].substring(1)));
							node = childElements;	
							break;
						case '.':
							childElements = [];
							for(var j=0; j<node.length; j++){
								var temps = this.getClassName(elements[i].substring(1),node[j]);
								for(var k=0; k<temps.length; k++){
									childElements.push(temps[k]);
								}
							}
							node = childElements;
							break;
						default:
							childElements = [];
							for (var j = 0; j < node.length; j ++) {
								var temps = this.getTagName(elements[i], node[j]);
								for (var k = 0; k < temps.length; k ++) {
									childElements.push(temps[k]);
								}
							}
							node = childElements;
					}
				}
				this.elements =childElements;
		}else {
			switch (element.charAt(0)) {
				case '#' :
					this.elements.push(this.getId(element.substring(1)));
					break;
				case '.' : 
					this.elements = this.getClassName(element.substring(1));
					break;
				default : 
					this.elements = this.getTagName(element);
			}
		}
	}else if (typeof element == 'object'){
		if( element != undefined){
			this.elements[0] = element;
		}
	}else if(typeof element == 'function'){
		addDomLoaded(element);
	}
}

Base.prototype.getId = function(id){
	return document.getElementById(id);
}

Base.prototype.getTagName = function(tagName,parentNode){
	var node = null;
	var temp = [];
	if(parentNode != undefined){
		node = parentNode;
	}else {
		node = document;
	}
	var tag = node.getElementsByTagName(tagName);
	for(var i=0;i<tag.length;i++){
		temp.push(tag[i]);
	}
	return temp;
}

Base.prototype.getClassName = function(className,parentNode){
	var node = null;
	var temp = [];
	if(parentNode != undefined){
		node = parentNode;
	}else {
		node = document;
	}
	var classNames = node.getElementsByTagName('*');
	for(var i=0;i<classNames.length;i++){
		if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(classNames[i].className)) {
			temp.push(classNames[i]);
		}
	}	
	return temp;
}
//获取表单内元素
Base.prototype.form = function(name){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i] =this.elements[i][name];
	}
	return this;
}
//获取表单内元素value
Base.prototype.value = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return this.elements[i].value;
		}
		this.elements[i].value = str;
	}
	return this;
}
//获取某一个节点
Base.prototype.getElement = function(value){
	var element = this.elements[value];
	this.elements = [];
	this.elements[0]= element;
	return this;
}
//获取一类节点的总个数
Base.prototype.getLength = function(){
	return this.elements.length;
}
//获取某一个节点，并返回这个节点对象
Base.prototype.getElementObj = function (num) {	
	return this.elements[num];
};
//获取第一个节点
Base.prototype.first = function () {	
	return this.elements[0];
};
Base.prototype.find = function (str) {
	var childElements = [];
	for (var i = 0; i < this.elements.length; i ++) {
		switch (str.charAt(0)) {
			case '#' :
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.' : 
				var temps = this.getClassName(str.substring(1), this.elements[i]);
				for (var j = 0; j < temps.length; j ++) {
					childElements.push(temps[j]);
				}
				break;
			default : 
			//alert(this.elements[0].innerHTML)
				var temps = this.getTagName(str, this.elements[i]);
				for (var j = 0; j < temps.length; j ++) {
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
}
//设置行内css样式
Base.prototype.css = function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments,length == 1){
			return getStyle(this.elements[i], attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}
//获取某一对象的属性值
Base.prototype.attr = function(attr,value){
	for(var i=0;i<this.elements.length;i++){	
		if(arguments.length == 1){
 			return this.elements[i].getAttribute(attr);
		}else if (arguments.length == 2){
			this.elements[i].setAttribute(attr,value)
		}
	}
	return this;
}
////添加Class
Base.prototype.addClass = function(className){
	for (var i=0;this.elements[i];i++){
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className = ' '+className;
		}
	}
}
//移除Class
Base.prototype.removeClass = function(className){
	for (var i=0;this.elements[i];i++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
		}
	}
}
//添加link或style的CSS规则
Base.prototype.addRule = function(num,selectorText,cssText,position){
	var sheet = document.styleSheets[num];
		insertRule(sheet, selectorText, cssText, position);
	return this;
}
//移除link或style的CSS规则
Base.prototype.removeRule = function (num, index){
	var sheet = document.styleSheets[num];
	deleteRule(sheet,index);
	return this;
}
//设置和获取innerHTML
Base.prototype.html = function(str){
	for(var i=0;i<this.elements.length;i++){
		if (arguments.length == 0){
			return this.elements[i].innerHTML;
		}
			this.elements[i].innerHTML = str;
	}
	return this;
}
//设置和获取innerText
Base.prototype.text = function(str){
	for(var i=0;i<this.elements.length;i++){
		if (arguments.length == 0){
			return getText(this.elements[i]);
		}else{
			setText(this.elements[i],str);
		}		
	}
	return this;
}

//获取一组对象中某一个的索引在值
Base.prototype.index = function(){
	var children = this.elements[0].parentNode.children;
	for(var i=0;i<children.length;i++){
		if(this.elements[0] ==children[i]) return i;
		}
	return ;	
}
//设置显示
Base.prototype.show = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'block';
	}
	return this;
}
//设置隐藏
Base.prototype.hide= function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
	}
	return this;
}
//设置元素的透明度
Base.prototype.opacity= function(num){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.opacity = num/100;
		this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
	}
	return this;
}

//hover 效果  设置鼠标移入移出方法
Base.prototype.hover = function(over,out){
	for(var i=0;i < this.elements.length;i++){	
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
}
//设置物体居中
Base.prototype.center = function(){	
	if (arguments.length == 0) {
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style.left = (getInner().width-parseInt(getStyle(this.elements[i],'width')))/2+getScroll().left+'px';
			this.elements[i].style.top =(getInner().height- parseInt(getStyle(this.elements[i],'height')))/2+getScroll().top+'px';
		}
	}else {
		if(arguments[0] == 'x'){
			for(var i=0;i<this.elements.length;i++){
				this.elements[i].style.left = (getInner().width-parseInt(getStyle(this.elements[i],'width')))/2+'px';			
			}
		}
		if(arguments[0] == 'y'){
			for(var i=0;i<this.elements.length;i++){
				this.elements[i].style.left = (getInner().width-parseInt(getStyle(this.elements[i],'width')))/2+'px';			
			}
		}
	}
	return this;
}
//xiao 居中
Base.prototype.childCenter = function(){	
	if (arguments.length == 0) {
		for(var i=0;i<this.elements.length;i++){
		var parent = this.elements[i].parentNode;
			this.elements[i].style.left = (parseInt(getStyle(parent,'width'))-parseInt(getStyle(this.elements[i],'width')))/2+'px';
			this.elements[i].style.top =(parseInt(getStyle(parent,'height'))-parseInt(getStyle(this.elements[i],'height')))/2+'px';
		}
	}
	return this;
}
//锁屏功能
Base.prototype.lock = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.width = getInner().width+getScroll().left + 'px';
		this.elements[i].style.height = getInner().height +getScroll().top + 'px';
		this.elements[i].style.display = 'block';
	parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'hidden' : document.documentElement.style.overflow = 'hidden';
	addEvent(document, 'mousedown', predef);
	addEvent(document, 'mouseup', predef);
	addEvent(document, 'selectstart', predef);
	}
	
	return this;
}
//解屏功能
Base.prototype.unlock = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
		parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'auto' : document.documentElement.style.overflow = 'auto';
		removeEvent(document, 'mousedown', predef);
		removeEvent(document, 'mouseup', predef);
		removeEvent(document, 'selectstart', predef);
	}
	
	return this;
}
//触发点击事件
Base.prototype.click = function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
	return this;
}
//触发浏览器窗口事件
Base.prototype.resize =function(fn){

	for(var i=0;i<this.elements.length;i++){
		var element = this.elements[i];
		addEvent(window,'resize',function(){
			fn;
			if (element.offsetLeft > getInner().width+ getScroll().left - element.offsetWidth){
				element.style.left = (getInner().width-parseInt(getStyle(element,'width')))/2+getScroll().left+'px';
				if ( element.style.left < getScroll().left){
					element.style.left = getScroll().left+'px';
				}
			}
			if(element.offsetTop > getInner().height+ getScroll().top - element.offsetHeight){
				element.style.top =(getInner().height- parseInt(getStyle(element,'height')))/2+getScroll().top+'px';
				if ( element.style.top < getScroll().top){
					element.style.top = getScroll().top+'px';
				}
			}
		})
	}
	return this;
}
//窗口垂直滚动事件
Base.prototype.scroll = function(fn) {
	window.onscroll= fn;
	return this;
}
//top工具条
Base.prototype.toolbar =function(topValue){
	var body = document.getElementsByTagName('body')[0];
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
		var top = element.offsetTop;
		window.onscroll = function(){
			//if(body.scrollTop>top){
				//element.style.top = body.scrollTop+'px';
			//}
			element.style.top = Math.max(topValue, document.documentElement.scrollTop) + 'px';
		}
	}
	return this;	
}
//当对象得、失焦点是动作
Base.prototype.focus = function(fn1,fn2){
	var element= this.first();
	if(arguments.length== 1){
		element.onfocus = function(){
			element.running = setInterval(fn1,100);
		};
		element.onblur =function(){
			clearInterval(element.running);
		};
	}else {
		element.onfocus = fn1;
		element.onblur = fn2;
	}
}

//事件绑定
Base.prototype.bind = function(event,fn){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
	}
	return this;
}


//annimation
Base.prototype.animate = function(obj){
	for(var i=0;i<this.elements.length;i++){
		var element= this.elements[i];
		// 默认为向左偏移
		var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y'? 'top':
					obj['attr'] == 'w'? 'width': obj['attr'] == 'h'? 'height':
					obj['attr'] == 'o'? 'opacity': obj['attr'] == undefined ? obj['attr'] : 'left';

		//默认其实值
		var start = obj['start'] != undefined? obj['start'] :
							attr == 'opacity' ? parseFloat(getStyle(element,attr))*100: 
														parseInt(getStyle(element,attr)) ;
		//内部循环时间
		var t = obj['t'] != undefined ? obj['t'] :10;

		var step = obj['step'] != undefined ? obj['step']: 20;

		var alter = obj['alter'];
		var target = obj['target'];
		var mul = obj['mul'];

		var speed = obj['speed'] != undefined ? obj['speed'] : 6;
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';

		if (alter != undefined && target == undefined){
			target = alter + start ;
		} else if (alter == undefined && target == undefined && mul == undefined){
			throw new Error ('alter增量或target目标量必须传一个！' )
		}

		if (start > target) step = -step ;

		if (attr == 'opacity'){
			element.style.opacity = parseInt(start) / 100;
			element.style.filter = 'alpha(opacity=' + parseInt(start) + ')';
		} else {

			element.style[attr] = start + 'px';
		}

		if (mul == undefined){
			mul = {};
			mul[attr] = target;
		}

		clearInterval(element.timer);
		element.timer = setInterval(function(){
			var flag = true;
			for (var j in mul ){
				attr = j == 'x' ? 'left' : j == 'y' ? 'top' : j == 'w' ? 'width' : j== 'h' ? 'height' : j == 'o' ? 'opacity' : j != undefined ? j : 'left';
				target = mul[j];

				if(type == 'buffer'){
					step = attr == 'opacity' ? (target - parseFloat(getStyle(element,attr))*100)/speed:
							(target - parseInt(getStyle(element,attr)))/speed;
					step = step > 0 ?Math.ceil(step) : Math.floor(step);
				}

				if (attr == 'opacity'){
					if(step == 0 ){
						setOpacity();
					}else if (step>0 && Math.abs(parseFloat(getStyle(element,attr))*100 - target) <=step){
						setOpacity();
					}else if (step<0 && (parseFloat(getStyle(element,attr))*100 - target) <= Math.abs(step)){
						setOpacity();
					}else {
						var temp = parseFloat(getStyle(element,attr))*100;
						element.style.opacity = parseInt(temp + step) /100;
						element.style.filter = 'alpha(opacity=' + parseInt(temp + step)+')';
					}
					if (parseInt(target) != parseInt(parseFloat(getStyle(element,attr))*100)) flag = false;
				} else {
					if(step == 0){
						setTarget();
					}else if (step > 0 && Math.abs(parseInt(getStyle(element,attr)) - target) <=step){
						setTarget();
					}else if (step<0 && (parseInt(getStyle(element,attr)) - target ) <=Math.abs(step)){
						setTarget();
					}else {
						element.style[attr] = parseInt(getStyle(element,attr))+step +'px';
					}
					if (parseInt(target) != parseInt(getStyle(element,attr))) flag = false;
				}
				//document.getElementById('test').innerHTML += i + '--' + parseInt(target) + '--' + parseInt(getStyle(element, attr)) + '--' + flag + '<br />';
			}
			if (flag){
				clearInterval(element.timer);
				if (obj.fn != undefined) obj.fn();
			}
		},t);
		function setTarget(){
			element.style[attr] = target+'px';
		}
		function setOpacity(){
			element.style.opacity = parseInt(target)/100;
			element.style.filter = 'alpha(opacity=' + parseInt(target)+ ')';
		}
	}
	return this;
}

//插件入口
Base.prototype.extend = function (name,fn){
	Base.prototype[name] = fn;
}

/*





win.onmousedown =function(evt) {
	document.removeEventListener(type, fn, false)
}

win.onclick = function(evt){
	target(evt);
}
var width = document.documentElement.innerWidth||document.body.clientWidth;
		var height = document.documentElement.innerHeight||document.body.clientHeight;
*/


