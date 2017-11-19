$("#foot_wrap").load("public.html #publ");
//页面加载显示验证码
$(".yz-img").html( yzm() );
//点击更换验证码
$(".btn-yz").click(function(){
	$(".yz-img").html( yzm() );
	$(".yz-img").css( "background-color" , getColor() );
});
//验证码验证方法
function checkYz(yz , yzimg){
	if( yz == yzimg ){
		return true ;
	}else{
		return false ;
	}
};
//验证码失去焦点验证
var  flagYz = null;
$(".yz").blur(function(){
	if( checkYz( $(".yz-img").html() , $(this).val() ) ){
		flagYz = true;	
	}else{
		flagYz = false;
	}
});

$("form").submit(function(){
	if( flagYz && login_yz()){
		return true;
	}else{
		if(!flagYz){
			$(".pduan").html("验证码错误");
			pduan();
		}else if(!login_yz()){
			$(".pduan").html("用户名和密码错误");
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
//获取cookie数据,验证用户名和密码
var flag = null ;
function login_yz(){
	var str = document.cookie;
	var arr  = str.split("=");
	var uname =  JSON.parse(arr[1]).username;
	var upwd =  JSON.parse(arr[1]).userpwd;
	if(uname == $(".use").val() && upwd == $(".pwd").val()){
		flag = true ;
	}else{
		flag = false ;
	}
	return flag ;
}