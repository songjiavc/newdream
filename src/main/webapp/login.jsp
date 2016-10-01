<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta content="yes" name="apple-mobile-web-app-capable">
</head>
<script type="text/javascript">
 
  
  </script>
<body background="<%=request.getContextPath() %>/img/login/EL-background.png">

<div style="height:429px; width:447px; background:url(<%=request.getContextPath() %>/img/login/EL-login.png);position:absolute;top:50%;left:50%;margin:-220px 0 0 -220px;">
     <form action="<%=request.getContextPath() %>/login.login" method="post">
    <div style="position:absolute;left:165px;top:123px">
    <input type="text" name="username" />
    </div>
    <div style="position:absolute;left:165px;top:197px">
    <input type="password" name="password" />
    </div>
    <div style="position:absolute;left:135px;top:237px" align="center">
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
    
    <div style="position:absolute;left:115px;top:312px;width:230px;height:50px;cursor:hand" onclick="document.forms[0].submit()">
    </div>
    </form>
</div>
</body>
</html>