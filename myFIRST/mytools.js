//浏览器检测
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	
	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();

//DOM加载
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	function doReady() {
		if (timer) clearInterval(timer);
		if (isReady) return;
		isReady = true;
		fn();
	}
	
	if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
		//无论采用哪种，基本上用不着了
		/*timer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) { 	//loaded是部分加载，有可能只是DOM加载完毕，complete是完全加载，类似于onload
				doReady();
			}
		}, 1);*/

		timer = setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		}, 1);
	} else if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if (sys.ie && sys.ie < 9){
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
}

//跨浏览器获取窗口大小
function getInner(){
	if (typeof window.innerWidth != 'undefined'){
		return{
			width : window.innerWidth,
			height : window.innerHeight
		}
	}else {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
}
//
function getScroll(){
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	}
}
// 置顶操作
function positionTop(){
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}
// 
function offsetTop (element){
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while(parent != null){
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top ;
}


//跨浏览器获取style属性值
function getStyle(element,attr){
	if (typeof window.getComputedStyle !='undefined'){
		return window.getComputedStyle(element,null)[attr];
	}else if (typeof element.currentStyle!='undefined'){
		return element.currentStyle[attr];
	}
}
//跨浏览器获取对象的innerText
function getText(element){
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}
//跨浏览器设置对象的innerText
function setText(element,str){
	if (typeof element.textContent == 'string'){
		element.textContent = str;
	}else{
		element.innerText = str;
	}
}
//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+ className+'(\\s|$'));
}

//跨浏览器添加link规则,不太需要，通常添加行内的样式就可
function insertRule(selectorText,csstext,position){
	if(typeof sheet.insertRule != 'undefined'){
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule != 'undefined'){
		sheet.addRule(selectorText,cssText,position);
	}
}

//跨浏览器移出link规则
function deleteRule(sheet,index){
	if (typeof sheet.deleteRule != 'undefined'){
		sheet.deleteRule(index);
	}else if (typeof sheet.removeRule != 'undefined'){
		sheet.removeRule(index);
	}
}



function target(evt){
	var e = evt||window.event;
	return e;	
}

//跨浏览器添加事件绑定
function addEvent(obj, type, fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);
	} else {
		//创建一个存放事件的哈希表(散列表)
		if (!obj.events) obj.events = {};
		//第一次执行时执行
		if (!obj.events[type]) {
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储存到第一个位置上
			if (obj['on' + type]) obj.events[type][0] = fn;
		} else {
			//同一个注册函数进行屏蔽，不添加到计数器中
			if (addEvent.equal(obj.events[type], fn)) return false;
		}
		//从第二次开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on' + type] = addEvent.exec;
	}
}

//为每个事件分配一个计数器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function (event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};

//同一个注册函数进行屏蔽
addEvent.equal = function (es, fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
}

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};

//IE取消冒泡
addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};


//跨浏览器删除事件
function removeEvent(obj, type, fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type, fn, false);
	} else {
		if (obj.events) {
			for (var i in obj.events[type]) {
				if (obj.events[type][i] == fn) {
					delete obj.events[type][i];
				}
			}
		}
	}
}

//判断某个元素是否属于某个数组
function inArr(arr,value){
	for (var i in arr){
		if(value === arr[i]) return true;
	}
	return false;
}
////删除左后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, '')
}


//
function addEvent1(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){
		obj.addEventListener(type,fn,false);
	}else {
		if(obj.list== undefined) obj.list = [];
		var flag =true;
		for(var j=0;j<obj.list.length; j++){			
			if(obj.list[j][0] == type && obj.list[j][1] == fn){
				flag = false;
			}
		}
		if (flag) {
			obj.list[addEvent1.ID++]= [type,fn];
			flag =true;
		}
		obj['on'+type] = addEvent1.exce;
		
	}
}
addEvent1.ID = 0;
addEvent1.exce =function(event){
	var evt = event||window.event;
	for(var i in this.list){
		if (this.list[i][0] == evt.type ){
			this.list[i][1].call(this,evt);
		}
	}	
}
function removeEvent1(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){
		obj.removeEventListener(type,fn,false);
	}else {
		for(var i in obj.list){
			if (obj.list[i][0] == type && obj.list[i][1] == fn){
				delete obj.list[i];
			}
		}
	}
}



//阻止默认
function predef(e) {
	e.preventDefault();
}

