

/**
  *    系统所有页面共有的函数，当页面加载完毕调用，该函数用来每隔10s确认更新一下登陆状态，为了防止同一账号可多次登陆
  *    引用页面加载完毕直接执行
  *
  */
	$(document).ready(function()
	{
		loginStatus(basePath);
	});
	
    function loginStatus(basePath){
    	 var url = basePath +"loginController/loginStatus.do";
    	 $.ajax({
 			type:"post",
 			url: url,
 			dataType:'JSON',
 			async:false,
 			success: function(data) {
 				
 			},
 			failure : function(){
 				
 			}
 		});
    	setTimeout('loginStatus(\'' + basePath + '\')',10000);
     }