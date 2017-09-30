var userList;
$(function(){
	obj.loadUserList()
	$("#loadUserList").click(function(){
		obj.loadUserList()
	})
	$("#loadRoleList").click(function(){
		return;
	})
	$("#logout").click(function(){
		$.get("logout",function(data){
			if(data.code==200){
				location.href="login.html"
			}
		})
	})
})
var obj={
	loadUserList:function(){
		$.get("/getUser",function(data){
			if(data.code==200){
				userList=data.data
				$(".user_name").html(data.me.name)
				$.ajax({
					url : "user-list.html",
					dataType : "html",
					success : function(html){
						var $html=$(html)
						for(var n=0;n<data.data.length;n++){
							var $li=$('<tr class="tr_elm">\
					              <td class="tr_td_elm_name" >'+data.data[n].name+'</td>\
					              <td class="tr_td_elm_pwd" >'+data.data[n].password+'</td>\
					              <td class="tr_td_elm" style="color:red">传输</td>\
					            </tr>')
							$html.find("tbody").append($li)
						}
						$(".content-wrapper").html($html);
						$(".sidebar-menu").find("li").removeClass("active")
						$("#loadUserList").addClass("active")
						obj.bindUserList()
					}
				});
			}else if(data.code==401){
				$.tip(data.info)
				setTimeout(function(){
					location.href="login.html"
				},1000)
			}
		})
	},
	bindUserList:function(){
		$("body").on("click",".tr_td_elm",function(){
			var userobj={
				name:$(this).parent(".tr_elm").find(".tr_td_elm_name").html(),
				password:$(this).parent(".tr_elm").find(".tr_td_elm_pwd").html()
			}
			obj.loadRoleList(userobj)
		})
	},
	loadRoleList:function(userobj){
		$.ajax({
			url : "role-list.html",
			dataType : "html",
			success : function(html){
				var $html=$(html)
				if(userobj){
					var $li=$('<tr class="tr_elm">\
		              <td class="tr_td_elm_name" >'+userobj.name+'</td>\
		              <td class="tr_td_elm_pwd" >'+userobj.password+'</td>\
		            </tr>')
					$html.find("tbody").append($li)
				}
				$(".content-wrapper").html($html);
				$(".sidebar-menu").find("li").removeClass("active")
				$("#loadRoleList").addClass("active")
			}
		});
	}
}