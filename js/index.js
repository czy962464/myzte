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
	//页面加载获取JSON数据
	window.onload = function(){
		$.ajax({
			type : "get" ,
			url : "js/data.json",
			async : true ,
			success : function(json){
				var title = "" ;
				var conStr = "" ;
				//JSON数据位置
				for(var i = 1 ; i < 4 ; i++){
					if(i == 1){
						cname = "classify00" + i;
						aa();
						$(".shoplist").html(conStr);
					}else if(i == 2){
						cname = "classify00" + i;
						aa();
						$(".peijian").html(conStr);
					}else if(i == 3){
						cname = "classify00" + i;
						aa();
						$(".yingjian").html(conStr);
					}
				}
				//添加数据
				function aa(){
					for(var j = 0 ; j < json[cname].list.length ; j++){
						var product = json[cname].list[j];
						if(j == 0 ){
							conStr = `<li><a href="page.html"><img src="img/${product.src}"></a></li>`
						}else{
							conStr += `<li>
											<a href="page.html">
												<div class="sale-img">
													<img src="img/${product.src}"/>
												</div>
												<div class="sale-miaoshu">
													<h5>${product.name}</h5>
													<h6>￥<strong>${product.price}</strong></h6>
												</div>
											</a>
										</li>`
						}
						
					}
				}
			}
		})
	}
	
	
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
