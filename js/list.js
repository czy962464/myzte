$("#foot_wrap").load("public.html #publ");
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
show();
//切换视图
var sindex = 0 ;
$(".switch a").click(function(){
	sindex = $(this).index();
	$(this).find("i").addClass("iconcolor")
	.end().siblings().find("i").removeClass("iconcolor");
	show()
})
$(".moren").click(function(){
	$(this).addClass("teshu")
		.siblings()
		.removeClass("teshu");
})
$(".moren").eq(0).click(function(){
	show();
})
function show(){
	//获取JSON请求数据
	$.ajax({
		type:"get",
		url:"js/data2.json",
		async:true,
		success:function(json){
			var str = "" ;
			var ctr = "" ;
			var ktr = "" ;
			tpr = [] ;
			var col = "price";
			var asc = function(x,y){  
		        return x[col] - y[col]  
		  	};
			for(var attr in json){
				for(var i = 0; i < json[attr].list.length ; i++){
					var product = json[attr].list[i];
					str += `<div class="collist">
						<a href="page.html?pid=${product.id}&cname=${attr}">
							<div class="colitem">
								<div class="colimg">
									<img src="img/${product.src}"/>
								</div>
								<div class="caption">
									<h3><a href="#">${product.title}</a></h3>
									<ul>
										<li>¥${product.price}</li>
									</ul>
								</div>
							</div>
						</a>
					</div>`;
					ctr += `<div class="thnumb">
								<a href="page.html?pid=${product.id}&cname=${attr}">
									<div class="giimg">
										<img src="img/${product.src}"/>
									</div>
									<div class="giname">
										<h3>${product.title}</h3>
										<p>${product.message}</p>
									</div>
									<div class="giprice">
										<ul>
											<li>¥${product.price}</li>
										</ul>
									</div>
								</a>
							</div>`;
				}
			}
			if(sindex == 0){
				$(".goodlist").html(str);
			}else{
				$(".goodlist").html(ctr);
			}
			for(var j = 0 ; j < $(".collist").length ; j++){
				if(j%4==3){
					$(".collist").eq(j).css("margin-right",0);
				}
			}
			$(".goodlist").css({
				"height":730,
				"overflow":"hidden"
			});
			$(".collist").mouseenter(function(){
				$(this).stop().animate({"top":-3},100)
						.siblings()
						.stop().animate({"top":0},100);	
				$(this).find(".colitem").css("box-shadow","#333 0 0 1px")
			}).mouseleave(function(){
				$(this).stop().animate({"top":0},100);
				$(this).find(".colitem").css("box-shadow","0 0 0")
			})
			
		}
		
					
	});
}

$(".moren").eq(2).click(function(){
	$.ajax({
		type:"get",
		url:"js/data2.json",
		async:true,
		success:function(json){
			var str = "" ;
			var ctr = "" ;
			var ktr = "" ;
			tpr = [] ;
			var col = "price";
			var asc = function(x,y){  
		        return x[col] - y[col]  
		    };
			for(var attr in json){
				for(var i = 0; i < json[attr].list.length ; i++){
						var tprice = json[attr].list[i];
						tpr.push(tprice);
						tpr.sort(asc);
						product = tpr ;
				}
			}
			for(var attr in product){
					var pudct = product[0]
					console.log(product[attr].price)
					str += `<div class="collist">
						<a href="page.html">
							<div class="colitem">
								<div class="colimg">
									<img src="img/${product[attr].src}"/>
								</div>
								<div class="caption">
									<h3><a href="#">${product[attr].title}</a></h3>
									<ul>
										<li>¥${product[attr].price}</li>
									</ul>
								</div>
							</div>
						</a>
					</div>`;
					ctr += `<div class="thnumb">
								<a href="page.html?pid=${product.id}&cname=${attr}">
									<div class="giimg">
										<img src="img/${product[attr].src}"/>
									</div>
									<div class="giname">
										<h3>ZTE中兴 Blade A2S 超值大内存-3G+32G</h3>
										<p>3G+32G超值大内存、新一代指纹解锁，5.2英寸1080P FHD屏，金属机身！</p>
									</div>
									<div class="giprice">
										<ul>
											<li>¥699.0</li>
										</ul>
									</div>
								</a>
							</div>`;
			
			}
			$(".goodlist").html(str);
			for(var j = 0 ; j < $(".collist").length ; j++){
				if(j%4==3){
					$(".collist").eq(j).css("margin-right",0);
				}
			}
			$(".goodlist").css({
				"height":800,
				"overflow":"hidden"
			});
		}			
	});
})
var m = 0 ;
var n = 0 ;
var sub = 0 ;
//点击页码
$(".panum").click(function(){
	var index = $(this).index();
	$(this).addClass("yema")
			.siblings()
			.removeClass("yema");
	$(".collist").show();
	$(".thnumb").show();
	$(".collist").eq((index-1)*8).prevAll().hide();
	$(".thnumb").eq((index-1)*4).prevAll().hide();
})
//下一页
$(".next").click(function(){
	m += 8 ;
	n += 4 ;
	sub ++ ;
	if(sub == 5){
		sub = 4 ;
	}
	$(".collist").eq(m).prevAll().hide();
	$(".thnumb").eq(n).prevAll().hide();
	$(".panum").eq(sub).addClass("yema")
				.siblings()
				.removeClass("yema");
})
//上一页
$(".prev").click(function(){
	sub -- ;
	if(sub == -1){
		sub = 0 ;
		
	}
	$(".panum").eq(sub).addClass("yema")
				.siblings()
				.removeClass("yema");
	for(var i = m ; i >= m-8 ; i--){
		$(".collist").eq(i).show();
	}
	m -= 8;
	for(var i = n ; i >= n-4 ; i--){
		$(".collist").eq(i).show();
	}
	n -= 4;
})
