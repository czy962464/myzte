$("#foot_wrap").load("public.html #footer");
$(".default").click(function(){
	history.go(-1);
})
//获取主页数据
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
		url:"http://127.0.0.1/myzte/js/data.json",
		async:true,
		success : function(json){
			//获取商品信息
			var ctr = "";
			//加入购物车时获取信息
			var dtr = "" ;
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
					dtr += `<li>
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
		}
	});
}
//判断购物车有多少件商品,显示数字
	
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
