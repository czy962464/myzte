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