requirejs.config({
	paths : {
		jquery : "jquery-1.11.1.min" ,
		zc : "register"
	}
});
requirejs(["jquery","zc"],function($,zc){
	$("#foot_wrap").load("public.html #footer");
	var now = new Date();
		now.setDate( now.getDate() + 1 );
	var json = {};
	$("form").submit(function(){
		if( flagName && flagPwd && flagQpwd && flagYz){
			json.username = $(".use").val();
			json.userpwd = $(".pwd").val();
			document.cookie = "userlist=" + JSON.stringify( json ) + ";expires=" + now;
			return true;
		}else{
			if(!flagName){
				$(".pduan").html("仅支持手机号注册");
				pduan();
			}else if(!flagPwd){
				$(".pduan").html("密码不能少于6位");
				pduan();
			}else if(!flagQpwd){
				$(".pduan").html("前后两次密码不一致");
				pduan();
			}else if(!flagYz){
				$(".pduan").html("验证码错误");
				pduan();
			}
			return false;
		}
	});
	function pduan(){
		$(".pduan").animate({"opacity":1},300,function(){
			setTimeout(function(){
				$(".pduan").css("opacity",0);
			},3000)
		})
	};
	//用户名失去焦点验证
	var  flagName = null;
	$(".use").blur(function(){
		if( zc.checkName( $(this).val() ) ){
			$(".use").css("border-color","green");
			$(".use-yz").css("display","none");
			flagName = true;	
		}else{
			$(".use-yz").css("display","block");
			$(".use").css("border-color","darkred");
			$(".usetit").html( "请输入用户名" );
			flagName = false;
		}
	});
	//用户名聚焦
	$(".use").focus(function(){
		$(".use-yz").css("display","none");
		$(".use").css("border-color","");
	});
	//密码失去焦点验证
	var  flagPwd = null;
	$(".pwd").blur(function(){
		if( zc.checkPwd( $(this).val() ) ){
			flagPwd = true;	
		}else{
			flagPwd = false;
		}
	});
	//确认密码失去焦点验证
	var  flagQpwd = null;
	$(".qpwd").blur(function(){
		if( zc.checkQpwd( $(".pwd").val() , $(this).val() ) ){
			flagQpwd = true;	
		}else{
			flagQpwd = false;
		}
	});
	//验证码失去焦点验证
	var  flagYz = null;
	$(".yz").blur(function(){
		if( zc.checkYz( $(".yz-img").html() , $(this).val() ) ){
			flagYz = true;	
		}else{
			flagYz = false;
		}
	})
	$(".yz-img").html( yzm() );
	$(".btn-yz").click(function(){
		$(".yz-img").html( yzm() );
		$(".yz-img").css( "background-color" , getColor() );
	})
	function yzm(){
	 	var arr = [];//存放验证码
	 	for( var i = 0 ; i < 4 ; i ++ ){
	 		var code = getRand(48,122);
	 		if( code >= 58 && code <= 64 || code >= 91 && code <= 96 ){
	 			i--;//重复循环当前i的值一次  
	 		}else{
	 			arr.push( String.fromCharCode(code) );
	 		}
	 	}
	 	return arr.join("");
	}
	//获取任意区间值函数
	function getRand(min,max){
		return Math.round( Math.random()*(max-min) + min );
	}
	//获取颜色
	function getColor(){
		var str = "0123456789abcdef";
		var color = "#";
		for( var i = 0; i < 6 ; i++ ){
			color +=  str.charAt(getRand(0,15));
		}
		return color;
	}
});