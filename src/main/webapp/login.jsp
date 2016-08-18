<%@ page pageEncoding="UTF-8"%>
<html>
<head>
    <link href="bootstrap3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/login/baseLayout.css" rel="stylesheet">
</head>

<body >
   	<div id="Header" align="left" >
   		<font size="12px" style="margin:30 30 30 30">辽宁彩乐宝科技有限公司</font>
    </div>
    <div id="Content" align = "center" >
    <form action="<%=request.getContextPath() %>/login.login" method="post" class="form-horizontal">
    	<div id = "login">
    		<div id = "head" align = "center">
    				<font color="white" size = "6px">登&nbsp;&nbsp;录</font>
    		</div>
    		<div id = "center">
  				<div class="form-group layout" style="margin:40 0 0 0;">
	    			<label for="inputPassword" class="col-sm-2 control-label">用户名:</label>
	    			<div class="col-sm-8">
	      				<input type="input" class="form-control" name="username" placeholder="用户名">
	    			</div>
  				</div>
  				
  				<div class="form-group layout" style="margin:40 0 0 0;">
	    			<label for="inputPassword" class="col-sm-2 control-label">密码:</label>
	    			<div class="col-sm-8">
	      				<input type="password" class="form-control" name="password" placeholder="密码">
	    			</div>
  				</div>
    		</div>
    		<div id = "warning">
    		<%
				String loginFail=(String)request.getAttribute("loginFail");
				if("noUsername".equals(loginFail)){
				%>
				请输入用户名
				<%
				}
				if("validateFail".equals(loginFail)){
				%>
				验证失败，用户名或密码错误！
				<%  
				}
				%>
  			</div>
    		<div id = "bottom">
    			<button type="button" class="btn btn-primary btn-lg btn-block" style="height: 100%;" onclick="document.forms[0].submit()">确&nbsp;&nbsp;定</button>
    		</div>
    	</div>
    	</form>
    </div>
    <div id = "Footer"  align = "left">
    		<font size="12px" style="margin:30 30 30 30" >诚招代理 TEL:18740027660
    </div>
</div>
</form>
</body>
</html>