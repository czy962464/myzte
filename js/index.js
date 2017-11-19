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
	$("#foot_wrap").load("public.html #publ");
	//页面加载获取JSON数据
	window.onload = function(){
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
	
