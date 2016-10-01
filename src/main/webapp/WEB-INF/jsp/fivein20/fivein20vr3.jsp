<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    String lastDataUrl = basePath+"fiveIn20Vr3Controller/";
    String otherDataUrl = basePath+"fiveIn20Vr1Controller/";
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
        <meta name="format-detection" content="telephone=no">
        <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
        <meta http-equiv="description" content="This is my page">
         <script type="text/javascript" src="js/jquery-1.7.2.js"></script>
        <script type="text/javascript" src="js/fivein20/fivein20vr3.js"></script> 
        <link rel="stylesheet" type="text/css" href="css/fivein20/vr3styles.css">
    </head>
	<script type="text/javascript">
		
		$(function (){        //初始化内容
	    	initData('<%=lastDataUrl%>','<%=provinceDm%>');
	    });
		function changeCss(obj,event){
			if(event == "on"){
				$(obj).css("background-color","red");
				$(obj).css("font-size","13pt");
			}else{
				$(obj).css("background-color","#EE9572");
				$(obj).css("font-size","12pt");
			}
		}
		
	</script>
	<body style="margin: 0 auto; padding: 0px;">
		<div id = "header">
			<div class="top">群英会遗漏统计图</div>
			<div class="bottom">
			<div id="missIssueNumber" class="left">统计当前期:</div>
			<div id="countDown" class="center">统计倒计时:</div>
			<div class="right">   <!-- 	 <td colspan="3"  rowspan="2" align="center" onclick="location.href='<%=lastDataUrl %>initStartPageVr3.do?provinceDm=<%=provinceDm%>' "  onMouseOut="changeCss(this,'move')" onmouseover="changeCss(this,'on')">
                      	整版<br>遗漏 -->
				<div style="float:left;width:49%;height:100%;text-align:center;background:#EE9572;margin: 1 0 0 0;"  onclick="location.href='<%=otherDataUrl %>initStartPage.do?provinceDm=<%=provinceDm%>' " onMouseOut="changeCss(this,'move')" onmouseover="changeCss(this,'on')">基础版本</div>
				<div style="float:left;width:2%;height:100%;"></div>
				<div style="float:left;width:49%;height:100%;text-align:center;background:#EE9572;margin: 1 0 0 0;" onclick="location.href='<%=otherDataUrl %>initStartPageVr2.do?provinceDm=<%=provinceDm%>' " onMouseOut="changeCss(this,'move')" onmouseover="changeCss(this,'on')">遗漏弹出</div>
			</div>
			</div>
			</div>
        <div id="content">
        	<!--    所有的遗漏统计表格将在这里展示 -->
        	<div class="typeGroup" >
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">任二</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth"  cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">任三</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable rightwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">顺一</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="3">任二三码</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="3">任三四码</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable rightwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">顺二</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="3">任二四码</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        	  <table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="3">任三五码</th>
        				<th>最大</th>
        			    <th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        			<table  class="missTable rightwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">顺三</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="3">任二五码</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="3">任三六码</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable rightwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">围二</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">任四</th>
        				<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">任五</th>
        				<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		
        		<table  class="missTable rightwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">围三</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px" rules="all" >
        			<th colspan="3">任四五码</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable centerwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">任六</th>
        			<th>最大</th>
        			<th>当前</th>
        		    <tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable rightwidth" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">围四</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">任四六码</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">任七</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">任四七码</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">任八</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="3">任九</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="3"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="5">任十</th>
        			<th>最大</th>
        			<th>当前</th>
        			<tr >
        				<td colspan="5"></td><td></td><td></td>
        			</tr>
        			<tr class="tdMissCls" >
        				<td colspan="5"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="5"></td><td></td><td></td>
        			</tr>
        		</table>
        </div>
	</body>

</html>