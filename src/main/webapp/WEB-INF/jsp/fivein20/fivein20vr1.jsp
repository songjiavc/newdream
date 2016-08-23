<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    String lastDataUrl = basePath+"fiveIn20Vr1Controller/";
    String provinceDm = request.getAttribute("provinceDm").toString();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <base href="<%=basePath%>">
        <title>电子走势图</title>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="expires" content="0">
        <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
        <meta http-equiv="description" content="This is my page">
         <script type="text/javascript" src="js/jquery-1.7.2.js"></script>
        <script type="text/javascript" src="js/fivein20/fivein20vr1.js"></script> 
        <link rel="stylesheet" type="text/css" href="css/fivein20/baseLayout.css">
        <link rel="stylesheet" type="text/css" href="css/fivein20/styles.css">
         <link rel="stylesheet" type="text/css" href="css/graph.css">
    </head>
	<script type="text/javascript">
		
		$(function (){        //初始化内容
	    	initData('<%=lastDataUrl%>','<%=provinceDm%>');
	    });
		
		
	</script>
	<body style="margin: 0 auto; padding: 0px;">
        <div id="groupTwo">
        	<!--    所有的遗漏统计表格将在这里展示 -->
        	<div id = "type2" class="typeGroup" >
        		<div width = "130" height="50px" style="margin:10 10 10 10;color:black;font-family:晴圆;;  font-size:18pt;" >当前期号：</div>
        		<table id="type2Table" class="missTable">
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        	<div id = "type2or3" class="typeGroup">
        		<div width = "130" height="50px" style="margin:10 10 10 10;color:black;font-family:晴圆;;  font-size:18pt;" >当前期号：</div>
        		<table id="type2Table" class="missTable">
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        	<div id = "type2or4" class="typeGroup">
        		<div width = "130" height="50px" style="margin:10 10 10 10;color:black;font-family:晴圆;;  font-size:18pt;" >当前期号：</div>
        		<table id="type2Table" class="missTable">
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        	<div id = "type2or5" class="typeGroup" >
        		<div width = "130" height="50px" style="margin:10 10 10 10;color:black;font-family:晴圆;;  font-size:18pt;" >当前期号：</div>
        		<table id="type2Table" class="missTable">
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        	<div id = "type3" class="typeGroup">
        	    <div width = "130" height="50px" style="margin:10 10 10 10;color:black;font-family:晴圆;;  font-size:18pt;" >当前期号：</div>
        		<table id="type2Table" class="missTable">
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        	<div id = "type3or4" class="typeGroup">
        		<div width = "130" height="50px" style="margin:10 10 10 10;color:black;font-family:晴圆;;  font-size:18pt;" >当前期号：</div>
        		<table id="type2Table" class="missTable">
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        	<div id = "type3or5" class="typeGroup">
        		<div width = "130" height="50px" style="margin:10 10 10 10;color:black;font-family:晴圆;;  font-size:18pt;" >当前期号：</div>
        		<table id="type2Table" class="missTable">
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        	<div id = "type3or6" class="typeGroup">
        		<div width = "130" height="50px" style="margin:10 10 10 10;color:black;font-family:晴圆;;  font-size:18pt;" >当前期号：</div>
        		<table width = "100%" height="100%" style="background: yellow;position: relative;">
	        		<tr class="tdOddCls" class="missTable">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdOddCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        			<tr class="tdEvenCls">
        				<td></td><td></td><td></td><td></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        </div>
        <div id="groupOne">
            <div class = "headDiv">
                <table class = "headTable" cellpadding="0px" cellspacing="0px" rules="all">
                    <tr >
                        <td colspan="3" rowspan=2 align="center">期号</td>
                        <td colspan="10" align="center">开奖号码</td>
                        <td colspan="40" align="center">号码分布</td>
                        <td colspan="6"  align="center">指标</td>
                    </tr>
                    <tr>
                       <td colspan="2"  align="center" >1</td>
                       <td colspan="2"  align="center" >2</td>
                       <td colspan="2"  align="center" >3</td>
                       <td colspan="2"  align="center" >4</td>
                       <td colspan="2"  align="center" >5</td>
                       <td colspan="2"  align="center" >1</td>
                       <td colspan="2"  align="center" >2</td>
                       <td colspan="2"  align="center" >3</td>
                       <td colspan="2"  align="center" >4</td>
                       <td colspan="2"  align="center">5</td>
                       <td colspan="2"  align="center">6</td>
                       <td colspan="2"  align="center">7</td>
                       <td colspan="2"  align="center">8</td>
                       <td colspan="2"  align="center">9</td>
                       <td colspan="2"  align="center">10</td>
                       <td colspan="2"  align="center">11</td>
                       <td colspan="2"  align="center">12</td>
                       <td colspan="2"  align="center">13</td>
                       <td colspan="2"  align="center">14</td>
                       <td colspan="2"  align="center">15</td>
                       <td colspan="2"  align="center">16</td>
                       <td colspan="2"  align="center">17</td>
                       <td colspan="2"  align="center">18</td>
                       <td colspan="2"  align="center">19</td>
                       <td colspan="2"  align="center">20</td>
                       <td colspan="3"  align="center">五行</td>
                       <td colspan="3"  align="center">方位</td>

                    </tr>
                </table>

            </div>
            <div class = "contentDiv">
                 <table id = "dataTable" class = 'headTable' cellpadding="0px" cellspacing="0px"  rules="all">

                 </table>
            </div>
            <div class = "bottomDiv">
                <table id="bottomTable"  class = 'headTable' cellpadding="0px" cellspacing="0px" rules="all">
                    <tr >
                       <td colspan="3"  align="center"></td>
                       <td id = "countDown" style="color:black;" colspan="10"  align="center"></td>
                       <td colspan="2"  align="center" ></td>
                       <td colspan="2"  align="center" ></td>
                       <td colspan="2"  align="center" ></td>
                       <td colspan="2"  align="center" ></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="2"  align="center"></td>
                       <td colspan="6"  rowspan="3" align="center">版本<br>1.0</td>
                   </tr>
                   <tr >
                      <td colspan="13"  align="center">出现次数</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                      <td colspan="2"  align="center" >0</td>
                  </tr>
                  <tr class="trHead">
                        <td colspan="13"  align="center">当前遗漏</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                        <td colspan="2"  align="center" >0</td>
                   </tr>
                </table>
            </div>
        </div>
	</body>

</html>