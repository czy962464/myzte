$("#foot_wrap").load("public.html #publ");
//导航栏效果
$(".show1").mouseenter(function(){
	$(".show1 .box").show()
}).mouseleave(function(){
	$(".show1 .box").hide()
});
$(".show2").mouseenter(function(){
	$(".show2 .box").show()
}).mouseleave(function(){
	$(".show2 .box").hide()
});
$(".box li").mouseenter(function(){
	var index = $(this).index();
	$(this).stop().animate({"margin-top":-10},300)
			.siblings()
			.stop().animate({"margin-top":0},300)
})
$(".box li").mouseleave(function(){
	$(".box li").stop().animate({"margin-top":0},300)
})

//扫码购买
$(".buysao").mouseenter(function(){
	$(".emwimg").stop().animate({"height":100},500)
}).mouseleave(function(){
	$(".emwimg").stop().animate({"height":0},500)
})

//用户评论
$("label").click(function(){
	$(this).addClass("yhplcolor")
			.siblings()
			.removeClass("yhplcolor")
})
//选项卡：商品详情
$(".navtab li").click(function(){
	var index = $(this).index();
	$(this).addClass("listactive")
			.siblings()
			.removeClass("listactive")
	$(".tabpane").eq(index).addClass("tabactive")
			.siblings()
			.removeClass("tabactive")
})
var n = 0;
var count = 0 ;
//判断用户数据是否存在，即用户是否登录
if(document.cookie.length>9){
	var flag = null ;
	for(var i = 0 ; i <document.cookie.length ; i++){
		if(document.cookie[i] == ";"){
			count++;
		}
	}
	for(var i = 0 ; i <document.cookie.length ; i++){

		if(document.cookie[i] == ";"){
		
			flag = true ;
			var cootr = document.cookie;
			var reg = new RegExp("; ","g")
			var brr  = cootr.replace(reg,"=");	
			var arr  = brr.split("=");
			console.log(brr)
			for(var j = 0 ; j < arr.length ; j++){
				
				if(arr[j] == "userlist"){
					m = j ;
					
				}
				if(arr[j] == "shoplist"+count){
					n = j ;
				}
			}
			var usname = JSON.parse(arr[m+1]).username;
			title = JSON.parse(arr[n+1]).title;
			src = JSON.parse(arr[n+1]).src;
			price = JSON.parse(arr[n+1]).price;
			alt = JSON.parse(arr[n+1]).alt;
			ysjgwc();
			
			$(".is-login").css("display","block")
			$(".is-login .usname").html(usname);
			$(".hidden").css("display","none");
			
			break;
		}
	}
	if( i == document.cookie.length){
		flag = false;
		var cootr = document.cookie;
		var arr= cootr.split("=");
		var usname = JSON.parse(arr[1]).username;
		$(".is-login").css("display","block");
		$(".is-login .usname").html(usname);
		$(".hidden").css("display","none");
	}
}
function ysjgwc(){
	var dtr = "" ;
	dtr = `<li>
				<a href="page.html" class="shopfull" target="_blank">
					<div class="shopfullimg">
						<img src="img/${src}"/>
					</div>
					<div class="shopfullname">
						${title}
						<br />
						${alt}
					</div>
				</a>
				<div class="shopprice">
					<div class="shopfullpre">
						<span>￥${price}</span>
					</div>
					<div class="shopfullrem">
						<a href="#">删除</a>
					</div>
				</div>
			</li>`;
	$(".fulllist").append( dtr );
}
$(".is-login").mouseenter(function(){
	$(".dropdown-menu").css("display","block")
}).mouseleave(function(){
	$(".dropdown-menu").css("display","none")
})
$(".dropdown-menu li:last").click(function(){
	$(".is-login").css("display","none")
	$(".hidden").css("display","block");
})
//获取主页数据
window.onload = function(){
	
	console.log(document.cookie)
	//http://127.0.0.1/myzte/page.html?pid=shop01&cname=classify001
	//获取路径信息
	var str = location.href;
		//如果路径没有参数   ？   就说明没有传递数据
		if( str.indexOf( "?" ) == -1){
			return;
		}
		str = str.split("?")[1];//"pid=shop01&cname=classify001"
	var arr = str.split("&");//["pid=shop01","cname=classify001"]
	var pid = arr[0].split("=")[1];
	var cname = arr[1].split("=")[1];
	//请求ajax  获取数据  根据cname确定要遍历的数组
	//  根据pid 确定要显示的数组中哪一个商品的详情
	$.ajax({
		type:"get",
		url:"js/data2.json",
		async:true,
		success : function(json){
			//获取商品信息
			var html = "";
			//加入购物车时获取信息
//			var ktr = "" ;
			//确定操作的数组  json[cname].list
			for( var i = 0 ; i < json[cname].list.length ; i++ ){
				var pro = json[cname].list[i];//每一个商品
				if( pro.id == pid ){
					html = `<h2>
			                    ${pro.title}<br />
								<small>
									${pro.alt}
								</small>
							</h2>
							<p>${pro.message}</p>
							<div class="price">
								<span>￥<strong>${pro.price}</strong></span>
								<del>￥${pro.oldprice}</del>
							</div>`;
					break;
				}
			}
			$(".all-block").prepend( html );
		}
	});
	
}


//左右箭头查看小图片
$(".prev").click(function(){
	$(".pic-list ul").css("margin-left",-86)
					.find("li:last")
					.prependTo( $(".pic-list ul") );
	$(".img-slide").find("img:last")
 			   .prependTo( $(".img-slide") );
 	$(".bigimg").find("img:last")
 			   .prependTo( $(".bigimg") );
	$(".pic-list ul").animate({marginLeft:0},1000);
})
$(".next").click(function(){
	$(".pic-list ul").animate({marginLeft:-86},1000,function(){
 		$(".pic-list ul").css("margin-left",0)
 			   .find("li:first")
 			   .appendTo( $(".pic-list ul") );
 		$(".img-slide").find("img:first")
 			   .appendTo( $(".img-slide") );
 		$(".bigimg").find("img:first")
 			   .appendTo( $(".bigimg") );
 	})
})
//小图移入查看大图
var index = 0;
$(".pic-list ul").find("li").mouseenter(function(){
	index = $(this).index();
	$(".img-slide img").eq(index)
					.show()
					.siblings()
					.hide()
	$(this).find("img")
			.css("border","1px solid #fc6628")
}).mouseleave(function(){
	$(this).find("img")
			.css("border",0)
})
//放大镜
$(".bigimg").mouseover(function(){
	$(".zzc").css("display","block");
	$(".bigimg img").eq(index)
					.show()
					.siblings()
					.hide();
}).mouseout(function(){
	$(".zzc").css("display","none");
	$(".bigimg img").hide();
}).mousemove(function(e){
	var e = e || event;
	var x = e.pageX - $(".img-slide").offset().left - $(".zzc").outerWidth()/2;
	var y = e.pageY - $(".img-slide").offset().top - $(".zzc").outerHeight()/2;
	var maxL = $(".img-slide").outerWidth() - $(".zzc").outerWidth();
	var maxT = $(".img-slide").outerHeight() - $(".zzc").outerHeight();
	x = Math.min( maxL , Math.max(0,x) );
	y = Math.min( maxT , Math.max(0,y) );
	$(".zzc").css({
		"left":x,
		"top":y
	});
	//大图/小图 = 大图left / zzc . left = 大图显示区 /小图显示区zzc
	var bigImgX = x*$(".bigimg img").width()/$(".img-slide").width();
	var bigImgY = y*$(".bigimg img").height()/$(".img-slide").height();
	$(".bigimg img").css({
		"left" : -bigImgX,
		"top" : -bigImgY
	})
})
$(".buycar").click(function(){
	var str = location.href;
	//如果路径没有参数   ？   就说明没有传递数据
	if( str.indexOf( "?" ) == -1){
		return;
	}
	str = str.split("?")[1];//"pid=shop01&cname=classify001"
	var arr = str.split("&");//["pid=shop01","cname=classify001"]
	var pid = arr[0].split("=")[1];
	var cname = arr[1].split("=")[1];
	location.href = "http://127.0.0.1/myzte/addtoCart.html?pid="+pid+"&cname="+cname;	
})

//判断购物车有多少件商品,显示数字
var numb = $(".fulllist").find("li").length;
$(".cartcount").html(numb);
if(numb == 0){
	$(".cartcount").css("display","none");
}
//top版块购物车商品删除
$(".shopfullrem").mouseenter(function(){
	$(this).find("a").css("color","#333");
	console.log($(this).index())
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