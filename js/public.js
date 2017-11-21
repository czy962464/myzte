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
//获取随机验证码
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
//右上角购物车
function fengz(){
	var numb = $(".fulllist").find("li").length;
	$(".cartcount").html(numb);
	if(numb == 0){
		$(".cartcount").css("display","none");
	}
	//top版块购物车商品删除
	$(".shopfullrem").mouseenter(function(){
		$(this).find("a").css("color","#333");
	}).mouseleave(function(){
		$(this).find("a").css("color","#787878");
	}).click(function(){
		$(this).parent().parent().remove();
		numb--;
		$(".cartcount").html(numb);
		if(numb == 0){
			$(".cartcount").css("display","none");
		}
	})
	//判断购物车是否有商品，没有显示null版块，有则显示full版块
	$(".isgwc").mouseover(function(){
		if(numb == 0){
			$(".shopcart-null").css("display","block");
		}else{
			$(".shopcart-full").css("display","block");
			$(".shopcart-null").css("display","none");
		}
	}).mouseout(function(){
		$(".shopcart-null").css("display","none");
		$(".shopcart-full").css("display","none");
	})
}