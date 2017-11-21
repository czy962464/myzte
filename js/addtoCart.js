$("#foot_wrap").load("public.html #publ");

//判断用户数据是否存在，即用户是否登录
if(document.cookie.length>9){
	var s= 1 ;
	var flag = null ;
	for(var i = 0 ; i <document.cookie.length ; i++){
		if(document.cookie[i].indexOf(";") != -1){
			flag = true ;
			var cootr = document.cookie;
			console.log(document.cookie);
			var reg = new RegExp("; ","g")
			var brr  = cootr.replace(reg,"=");
			var arr  = brr.split("=");
			for(var j = 0 ; j < arr.length ; j++){
				if(arr[j] == "userlist"){
					m = j ;
				}
				if(arr[j] == "shoplist"+s){
					n = j ;
				}
			}
			var usname = JSON.parse(arr[m+1]).username;
			title = JSON.parse(arr[n+1]).title;
			src = JSON.parse(arr[n+1]).src;
			price = JSON.parse(arr[n+1]).price;
			alt = JSON.parse(arr[n+1]).alt;
			ysjgwc();
			s++;
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
	console.log(flag)
}else{
	$("#sontainer").css("display","block");
	$("#container").css("display","none");
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
	//http://127.0.0.1/myzte/page.html?pid=shop01&cname=classify001
	//获取路径信息
	var btr = location.href;
		//如果路径没有参数   ？   就说明没有传递数据
		if( btr.indexOf( "?" ) == -1){
			return;
		}
		btr = btr.split("?")[1];//"pid=shop01&cname=classify001"
	var brr = btr.split("&");//["pid=shop01","cname=classify001"]
	var bid = brr[0].split("=")[1];
	var bname = brr[1].split("=")[1];
	//请求ajax  获取数据  根据cname确定要遍历的数组
	//  根据pid 确定要显示的数组中哪一个商品的详情
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/myzte/js/data2.json",
		async:true,
		success : function(json){
			//获取商品信息
			var ctr = "";
			//加入购物车时获取信息
			var dtr = "" ;
			var now = new Date();
				now.setDate( now.getDate() + 1 );
			var shopjson = {} ;
			//确定操作的数组  json[cname].list
			for( var i = 0 ; i < json[bname].list.length ; i++ ){
				var mation = json[bname].list[i];//每一个商品
				if( mation.id == bid ){
					ctr = `<div class="message">
								<div class="goodimg">
									<img src="img/${mation.src}"/>
								</div>
								<div class="detail">
									<h6 class="goodname">${mation.title}</h6>
									<span class="goodprice">￥${mation.price} x 1</span>
								</div>
							</div>`;
					dtr = `<li>
              					<a href="page.html" class="shopfull" target="_blank">
              						<div class="shopfullimg">
              							<img src="img/${mation.src}"/>
              						</div>
              						<div class="shopfullname">
              							${mation.title}
              							<br />
              							${mation.alt}
              						</div>
              					</a>
              					<div class="shopprice">
              						<div class="shopfullpre">
              							<span>￥${mation.price}</span>
              						</div>
              						<div class="shopfullrem">
              							<a href="#">删除</a>
              						</div>
              					</div>
              				</li>`;
					break;
				}
			}
			
			$(".addtocart").prepend( ctr );
			$(".fulllist").append( dtr );
			fengz();
			$(".default").click(function(){
				location.replace("page.html?pid="+bid+"&cname="+bname);
			})
			alert($(".fulllist").find("li").length)
			
			shopjson.src = mation.src ;
			shopjson.title = mation.title ;
			shopjson.alt = mation.alt ;
			shopjson.price = mation.price ;
			
			document.cookie = "shoplist"+s+"=" + JSON.stringify( shopjson ) + ";expires=" + now;
		}
		
	});
}
fengz()
//判断购物车有多少件商品,显示数字
	/*function fengz(){
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
	}*/
