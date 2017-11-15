define(function(){
	return {
		checkName : function(name){
			var reg = /^1[3578]\d{9}$/;
			if(reg.test(name)){
				return true ;
			}else{
				return false ;
			}
		},
		checkPwd : function(pwd){
			var reg = /^\w{6,}$/;
			if( reg.test( pwd ) ){
				return true ;
			}else{
				return false ;
			}
		},
		checkQpwd : function(opwd , npwd){
			if( opwd == npwd ){
				return true ;
			}else{
				return false ;
			}
		},
		checkYz : function(yz , yzimg){
			if( yz == yzimg ){
				return true ;
			}else{
				return false ;
			}
		}
	}
})