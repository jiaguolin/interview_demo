$(function(){
	$("#btn_login").click(function(){
		var name=$("input[name='name']").val()
		var password=$("input[name='password']").val()
		if(!$.form.isEmpty(name)){
			$.tip("账号不能为空")
		}else if(!$.form.isEmpty(password)){
			$.tip("密码不能为空")
		}else{
			$.post("/login",{
				name:name,
				password:password
			},function(data){
				if(data.code==200){
					location.href="index.html"
				}else{
					$.tip(data.info)
				}
			})
		}
	})
	$("#btn_regist").click(function(){
		var name=$("input[name='name']").val()
		var password=$("input[name='password']").val()
		if(!$.form.isEmpty(name)){
			$.tip("账号不能为空")
		}else if(!$.form.isEmpty(password)){
			$.tip("密码不能为空")
		}else{
			$.post("/signup",{
				name:name,
				password:password
			},function(data){
				$.tip(data.info)
			})
		}
	})
})

