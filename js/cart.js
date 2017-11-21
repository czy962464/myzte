$("#foot_wrap").load("public.html #publ");

//全选按钮
$(".col-check").find("input").click(function(){
	
	$(".cart-check").find("input").prop("checked" , $(this).prop("checked") );
	jiesuan();
})
//删除选中按钮
$(".col-xs4").click(function(){
	$("input[name='chek']:checked").each(function(){
		$(this).parent().parent().parent().remove()
	})
})
//判断用户数据是否存在，即用户是否登录
if(document.cookie){
	var flag = null ;
	var count = 0 ;
	for(var i = 0 ; i <document.cookie.length ; i++){
		if(document.cookie[i].indexOf(";") != -1){
			flag = true ;
			console.log(document.cookie[i]);
			count++;
			var cootr = document.cookie;
			var reg = new RegExp("; ","g")
			var brr  = cootr.replace(reg,"=");
			var arr  = brr.split("=");
			for(var j = 0 ; j < arr.length ; j++){
				if(arr[j] == "shoplist"+count){
					n = j ;
				}
				if(arr[j] == "userlist"){
					m = j ;
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
		}
	}
	if( i == document.cookie.length){
		flag = false;
		var cootr = document.cookie;
		var arr= cootr.split("=");
		/*for(var j = 0 ; j < arr.length ; j++){
			if(arr[j] == "userlist"){
				m = j ;
			}
		}*/
		var usname = JSON.parse(arr[1]).username;
		$(".is-login").css("display","block");
		$(".is-login .usname").html(usname);
		$(".hidden").css("display","none");
	}
	console.log(flag)
}
fengz();
function ysjgwc(){
	var ctr = "" ;
	var str = "" ;
	str += `<div class="goods">
				<div class="col-xs1 cart-check">
					<label>
						<input type="checkbox" name="chek"/>
					</label>
				</div>
				<div class="col-xs5 cart-name">
					<div class="row">
						<div class="row1">
							<a href="#"><img src="img/${src}"/></a>
						</div>
						<div class="row2">
							<h5>${title}</h5>
							<p>${alt}</p>
						</div>
					</div>
				</div>
				<div class="col-xs1 cart-pre">
					￥
					<span>${price}</span>
				</div>
				<div class="col-xs2 cart-num">
					<div class="group-num">
						<div class="jian">
							<button>-</button>
						</div>
						<input type="text" value="1" class="inval"/>
						<div class="jia">
							<button>+</button>
						</div>
					</div>
				</div>
				<div class="col-xs1 cart-sum">
					￥
					<span class="consum">${price}</span>
				</div>
				<div class="col-xs2 cart-opt">
					<ul>
						<li><a href="javascript:;">删除</a></li>
						<li><a href="javascript:;">移到喜欢的商品</a></li>
					</ul>
				</div>
			</div>`;
	ctr += `<li>
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
	$(".cart-body").append(str);
	$(".fulllist").append( ctr );
	//复选框按钮
	$(".cart-check").find("input").click(function(){
		jiesuan();
	})
	//删除按钮
	$(".cart-opt").find("li").click(function(){
		if($(this).index() == 0){
			$(this).parent().parent().parent().remove();
		}
	})
	//数量加减
	$(".jia").click(function(){
		var num = $(this).prev().val();
		var sum = $(this).parent().parent().next().find("span").html();
		var pre = $(this).parent().parent().prev().find("span").html();
		num++;
		sum = pre * num ;
		$(this).prev().val(num);
		$(this).parent().parent().next().find("span").html(sum);
		jiesuan();
	})
	$(".jian").click(function(){
		var num = $(this).next().val();
		var sum = $(this).parent().parent().next().find("span").html();
		var pre = $(this).parent().parent().prev().find("span").html();
		num--;
		if(num <= 1){ num = 1 ; }
		sum = pre * num ;
		$(this).next().val(num);
		$(this).parent().parent().next().find("span").html(sum);
		jiesuan();
	})
	
}

function jiesuan(){
		var numcount = 0 ;
		var sumcount = 0 ;
		$("input[name='chek']:checked").each(function(){
			var index = $(this).index();
			numcount += Number( $(".inval").eq(index).val() );
			sumcount += parseFloat( $(".consum").eq(index).html() );
		})
		$(".colr1 span:first").html( numcount );
		$(".colr1 span:last").html( sumcount );
	}