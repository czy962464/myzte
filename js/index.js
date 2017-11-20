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

var n = 0;
var count = 0 ;
if(document.cookie){
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
	dtr += `<li>
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
	//吸顶效果
	$(window).scroll(function(){
		var h = 40 ;
		var stop = $(document).scrollTop();
		var floor = $(".zx-block").filter(function(){
			return Math.abs( $(this).offset().top - stop ) < $(this).outerHeight()/2 ;
		})
		var louindex = floor.index();
		/*$(this).addClass("louactive")
				.siblings()
				.removeClass("louactive")*/
		$("#LoutiNav li").eq(louindex-5).addClass("louactive")
				.siblings()
				.removeClass("louactive")
		if(louindex==-1){
			$("#LoutiNav li").removeClass("louactive")
		}
		if(stop > h){
			$("#nav").css({"position":"fixed","top":0,"z-index":999});
		}else{
			$("#nav").css("position","");
		}
	});
	$(".last").click(function(){
		$("body,html").animate( {scrollTop : 0 },1000);
	})
	$("#LoutiNav li").click(function(){
		var index = $(this).index();
		
		var _top = $(".zx-block").eq(index).offset().top;
		$("body,html").animate({"scrollTop":_top-85},1000)
	})
	//页面加载获取JSON数据
	window.onload = function(){
		$("#foot_wrap").load("public.html #publ");
		$.ajax({
			type : "get" ,
			url : "js/data2.json",
			async : true ,
			success : function(json){
				var conStr = "" ;
				//JSON数据位置
				for(var i = 1 ; i < 4 ; i++){
					if(i == 1){
						conStr = "";
						cname = "shop" + i;
						aa();
						$(".shoplist").append(conStr);
					}else if(i == 2){
						conStr = "";
						cname = "shop" + i;
						aa();
						$(".peijian").append(conStr);
					}else if(i == 3){
						conStr = "";
						cname = "shop" + i;
						aa();
						$(".yingjian").append(conStr);
					}
				}
				//添加数据
				function aa(){
					for(var j = 0 ; j < json[cname].list.length ; j++){
						var product = json[cname].list[j];
						if(product.name){
							conStr += `<li>
										<a href="page.html?pid=${product.id}&cname=${cname}" target="_blank">
											<div class="sale-img">
												<img src="img/${product.src}"/>
											</div>
											<div class="sale-miaoshu">
												<h5>${product.name}</h5>
												<h6>￥<strong>${product.price}</strong></h6>
											</div>
										</a>
									</li>`;
						}
						
					}
				}
			}
		})
	}
	var now = new Date();
		now.setDate( now.getDate() + 1 );
	var jjson = {"username":17862981182};
	document.cookie = "userlist=" + JSON.stringify( jjson ) + ";expires=" + now;
	//判断用户数据是否存在，即用户是否登录



	$(".is-login").mouseenter(function(){
		$(".dropdown-menu").css("display","block")
	}).mouseleave(function(){
		$(".dropdown-menu").css("display","none")
	})
	$(".dropdown-menu li:last").click(function(){
		$(".is-login").css("display","none")
		$(".hidden").css("display","block");
	})
	//轮播图
	var timer = null ;
	timer = setInterval(autoPlay ,2000);
	var index = 0 ;
	$(".small li").click(function(){
		clearInterval(timer);
		index = $(this).index();
		$(".small li").eq(index)
						.addClass("active")
   				   	  	.siblings()
   				  	    .removeClass("active");
   		$(".banner").animate({"marginLeft":-1260*index},1000,function(){
   			if( index == 5 ){
   				$(".banner").css("margin-left",0);
 				index = 0;
				$(".small li").eq(index)
							  .addClass("active")
   				   	  	   	  .siblings()
   				  	          .removeClass("active");
 			}
   		})
	})
	function autoPlay(){
		index++;
		
		$(".small li").eq(index)
					  .addClass("active")
   				   	  .siblings()
   				  	  .removeClass("active");
   		$(".banner").animate({"marginLeft":-1260*index},1000,function(){
   			if( index == 5 ){
   				$(".banner").css("margin-left",0);
 				index = 0;
				$(".small li").eq(index)
							  .addClass("active")
   				   	  	   	  .siblings()
   				  	          .removeClass("active");
 				
 			}
   		})
	}
	$(".banner").mouseenter(function(){
		clearInterval(timer);
	})
	$(".banner").mouseleave(function(){
		timer = setInterval(autoPlay ,2000);
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
	
$(".zx-title-more ul li").mouseenter(function(){
	$(this).addClass("zxactive")
		.siblings()
		.removeClass("zxactive")	
	
	if($(this).index() == 0){
		$(".peijian").find("li").css("display","block");
	}
	if($(this).index() == 1){
		$(".peijian").find("li").css("display","none");
		$.ajax({
		type : "get" ,
		url : "js/data2.json",
		async : true ,
		success : function(json){
			var zxStr = "" ;
			//JSON数据位置
			var cname = "shop2";
			for(var j = 0 ; j < json[cname].list.length ; j++){
				var product = json[cname].list[j];
				console.log(product.id)
				for(var s = 1 ; s <= 4 ; s++){
					if(product.id == "ej0"+s){
						
						zxStr+= `<li>
									<a href="page.html?pid=${product.id}&cname=${cname}" target="_blank">
										<div class="sale-img">
											<img src="img/${product.src}"/>
										</div>
										<div class="sale-miaoshu">
											<h5>${product.name}</h5>
											<h6>￥<strong>${product.price}</strong></h6>
										</div>
									</a>
								</li>`;
						}
					}
				}
				$(".peijian").append(zxStr);
			}
		})
	}
})
$(".more").click(function(){
	location.href = "list.html";
})
