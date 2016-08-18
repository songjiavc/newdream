<%@ page pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    String lastDataUrl = basePath+"twelveSelectFiveController/";
%>
<html>
<head>
<base href="<%=basePath%>">
<title>电子走势图</title>
<meta http-equiv="Content-Language" content="zh-CN">
<meta name="viewport" content="width=device-width">
<meta content="0.2;">
<link rel="stylesheet" type="text/css" href="css/imgdisplay.css">
<script type="text/javascript" src="js/echartUtil.js"></script>
<script type="text/javascript" src="js/jquery-1.7.2.js"></script>

 <script type="text/javascript">
		 var contextPath = '<%=request.getContextPath() %>';
</script>
<script type="text/javascript" src="js/proList.js"></script>


 <style type="text/css">
         .menuDivT{
        	width : 300px;
        	height : 150px;
        	background-color: #cd272e;
            cursor:hand;
            float : left;
            overflow: hidden;
            position: relative;
            margin-left: 40px;
            margin-right: 10px;
            margin-top: 10px;
            border-radius:5px;
        }
        .menuDivTa{
        	    line-height: 4;
			    font-family: "隶书";
			    font-weight: bolder;
			    font-size: 25;
			    color:white;
			    text-align: left;
			    margin-left: 5px;
			    margin-top: -20px;
			    position: absolute;
			    z-index: 2;
        }
        .menuDivTb{
        	line-height : 4;
            font-family : "Arial";
            font-weight : bolder; 
            font-size : 32;
            color:white;
        	text-align:center;
        	margin-left: 70px;
        	margin-top: 15px;
        	position: absolute;
        	z-index: 2;
        }
        .menuDivTc{
        	line-height : 4;
            font-family : "Arial";
            font-weight : bolder; 
            font-size : 24;
            color:white;
        	text-align:center;
        	margin-left: 80px;
        	margin-top: 60px;
        	position: absolute;
        	z-index: 2;
        }
    </style>
    
   
    
</head>
<body >
	<%--background-image:url(<%=request.getContextPath() %>/img/login/zixitongditu.png) --%>
	<div id="context">
		 <div class="menuDivT" onclick="location.href='<%=request.getContextPath() %>/ln5In11VerticalController/ln5in11vertical.do' ">
	        <div class="menuDivTa">体彩11选5</div>
	     	<div class="menuDivTb">综合走势图</div>	
	     	<div class="menuDivTc">【竖屏-球】</div>
	    </div>
	</div>
	
   
</body>
</html>