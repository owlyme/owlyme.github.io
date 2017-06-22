$(document).ready(function () {
(function(){
	var  Chatroom = function(){
		return new chatroom.fn();
	};
	Chatroom.fn = function(){
   
	};
	Chatroom.fn.prototype = {
		constructor : Chatroom.fn,
		signInAccount : "visitor",
		titleList : [],
		accounts : {
			xuyuan : {
				name : "xuyuan",
				secret : "abc"
			}
		},
		addAccount: function(arg){
			var self = this;
			var account   = arg.account,
				password  = arg.password,
				repassword  = arg.repassword,
				submitBtn = arg.submitBtn,
				cancleBtn = arg.cancleBtn,
				fn = arg.fn;
			submitBtn.on('click',check);
			cancleBtn.on('click',function(evt){
				evt.preventDefault();
				clearInput()});
			function check(evt){
				evt.preventDefault();
				var newAccount = account.val().trim(),
					_password = password.val().trim(),
					_repassword = repassword.val().trim();
				if( _password == ""){
					alert('need password');
					return;
				}else if(_repassword == ""){
					alert("need repassword");
					return;
				}else if(_password != _repassword){
					alert("Twice inputs are not same;");
					return;
				}
				for( var name in self.accounts){
					if(newAccount == name){
						alert(newAccount+" is exsit!");
						return;
					}
				};
				self.signInAccount = newAccount;
				self.accounts[newAccount] = {};
				self.accounts[newAccount].name = newAccount;
				self.accounts[newAccount].secret = _password;
				clearInput();
			}
			function clearInput(evt){
				account.val("");
				password.val("");
				repassword.val("");
				if(fn) fn();
			}
		},
		checkAccount : function(arg){
			var self = this;
			var account   = arg.account,
				password  = arg.password,
				submitBtn = arg.submitBtn,
				cancleBtn = arg.cancleBtn,
				fn = arg.fn;
			submitBtn.on('click',check);
			cancleBtn.on('click',function(evt){
				evt.preventDefault();
				clearInput()});

			function check(evt){
				evt.preventDefault();
				var newAccount = account.val().trim(),
					_password = password.val().trim();
				if( _password == "" || newAccount =="" ){
					alert('need a account or password');
					return;
				}
				for( var name in self.accounts){
					if(newAccount == name && _password == self.accounts[newAccount].secret){
						self.signInAccount = newAccount;
						clearInput();
						return;
					}
				};
				alert("please enter correct name and password!")			
			}
			function clearInput(evt){
				account.val("");
				password.val("");
				if(fn) fn();
			}
		},
		signOutAccount : function(arg){
			var self = this;
			arg.btn.on("click",function(evt){
				self.signInAccount = "visitor";
				arg.fn();
			})			
		},
		creatTitleList : function(arg){
			var string = "";
			for(var i =0 ;i <this.titleList.length; i++ ){
				string +="<h4><span>"+(i+1)+"、</span> <a>"+this.titleList[i]+"</a></h4>";
			}
			arg.html(string);
		},
		activeList : function(arg){
			//arg.
		},
		beginChatroom : function(arg){
			var self = this;
			var title = arg.title,
				list  = arg.list,
				submitBtn = arg.submitBtn;
			submitBtn.on("click",function(evt){
				evt.preventDefault();
				self.titleList.push(title.val().trim());
				list.append("<h4><span>"+(self.titleList.length)+"、</span> <a>"+title.val()+"</a></h4>");
				//send to service
			});
		},
		msgSetting : function(arg){
			var self = this,
				msg       = arg.msg,
				contentBox= arg.content,
				submitBtn = arg.submitBtn,
				cancleBtn = arg.cancleBtn;

			submitBtn.on("click",function(evt){
				evt.preventDefault();
				sendLocal(evt);
				//send to service
			});
			cancleBtn.on("click",function(evt){
				evt.preventDefault();
				clear(evt);
			});
			function sendLocal(evt){
				var string = "<div class='send-msg clearfix'><h4>"+msg.val()+"</h4><span>"+self.signInAccount+"</span></div>";
				contentBox.append(string);
				clear(evt);
			}
			function sendService(evt){

			}
			function clear(evt){
				msg.val("");
			}
		}
	};


	window.chatroom = Chatroom;
})();


var signIn    = $("#sign-in"),
	signUp    = $("#sign-up"),
	signOut   = $("#sign-out"),
	creatNew  = $("#creat-new-chatroom"),
	formLogin = $(".login"),
	formLogup = $(".logup"),
	chatBox   = $(".chat-box"),
	chatList  = $(".chat-list"),
	closeBtn  = $(".close"),
	signInandUp= $(".sign-in-up"),
	newAndOut = $(".new-or-out"),
	chattingContent =$(".chatting-content"),
	title     = $(".chatting-title input"),
	msg       = $("textarea[name='msg']");

	signIn.on("click",function(){
		formLogin.fadeIn('slow');
		formLogup.fadeOut('slow');
	});
	signUp.on("click",function(){
		formLogup.fadeIn('slow');
		formLogin.fadeOut('slow');
	});	
	signOut.on("click",function(){
		signInandUp.show();
		newAndOut.hide();
	});
	closeBtn.on("click",function(){
		chatList.show();
		chatBox.hide();
	});


var curAccount = $(".logo span.account");
var Chatroom = chatroom();
	Chatroom.titleList = [
	"花朵，Flower ['flauə] ，inflorescence，指的是已经开放的花。",
	"花,以它鲜艳的色彩、婀娜多姿的体态和芳香的气味吸引着人们",
	"花,实际上是缩短了的变态枝。花瓣的结构也像叶子一样,可分表皮、基本薄壁组织和维管束三部分"
	];

	Chatroom.creatTitleList(chatList);
	Chatroom.addAccount({
		account   : $("input[name='new-account']"),
		password  : $("input[name='new-password']"),
		repassword: $("input[name='new-repassword']"),
		submitBtn : $("button[name='submit-btn1']"),
		cancleBtn : $("button[name='cancle-btn1']"),
		fn        : function(){
			curAccount.html(Chatroom.signInAccount);			
			if(Chatroom.signInAccount == "visitor") return;
			$(".logup").fadeOut();
			signInandUp.hide();
			newAndOut.show();
		}
	});
	Chatroom.checkAccount({
		account   : $("input[name='account']"),
		password  : $("input[name='password']"),
		submitBtn : $("button[name='submit-btn']"),
		cancleBtn : $("button[name='cancle-btn']"),
		fn        : function(){
			$(".login").fadeOut();
			signInandUp.hide();
			if(Chatroom.signInAccount == "visitor") return;
			newAndOut.show();
			curAccount.html(Chatroom.signInAccount);
		}
	});
	Chatroom.signOutAccount({
		btn : signOut, 
		fn  : function(){
			curAccount.html(Chatroom.signInAccount);
		}
	});
	Chatroom.beginChatroom({
		title : $(".chatting-title input"),
		list : chatList,
		submitBtn : $(".chatting-title button")
	});
	Chatroom.msgSetting({
		msg       : $("textarea[name='msg']"),
		content   : $(".chatting-content"),
		submitBtn : $("button[name='submit-btn2']"),
		cancleBtn : $("button[name='cancle-btn2']")
	});
	

	creatNew.on("click",function(){
		if(Chatroom.signInAccount == "visitor") return;
		chatBox.show();
		chatList.hide();
	});



})