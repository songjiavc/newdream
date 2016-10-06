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
        <meta name="format-detection" content="telephone=no">
        <meta http-equiv="expires" content="0">
        <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
        <meta http-equiv="description" content="This is my page">
         <script type="text/javascript" src="js/jquery-1.7.2.js"></script>
         <script type="text/javascript" src="js/echartUtil.js"></script>
         <script type="text/javascript" src="js/fivein20/control.js"></script>
        <script type="text/javascript" src="js/fivein20/fivein20vr2.js"></script> 
        <link rel="stylesheet" type="text/css" href="css/util/chartControl.css">
        <link rel="stylesheet" type="text/css" href="css/fivein20/vr2styles.css">
        <link rel="stylesheet" type="text/css" href="css/graph.css">
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
				$(obj).css("background-color","#8B0000");
				$(obj).css("font-size","12pt");
			}
		}
		
	</script>
	<body style="margin: 0 auto; padding: 0px;">
        <div id="groupTwo">
        	<!--    所有的遗漏统计表格将在这里展示 -->
        	<div class="typeGroup" >
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">任二</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">任三</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="4">任二三码</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="4">任三四码</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="4">任二四码</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        	  <table  class="missTable" cellpadding="0px" cellspacing="0px" rules="all">
        			<th colspan="4">任三五码</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        	<div class="typeGroup" >
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">任四</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">任五</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px" rules="all" >
        			<th colspan="4">任四五码</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">围二</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">任四六码</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        		<table  class="missTable" cellpadding="0px" cellspacing="0px"  rules="all">
        			<th colspan="4">任十</th>
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
        			<tr  class="tdMissCls">
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        			<tr >
        				<td colspan="4"></td><td></td><td></td>
        			</tr>
        		</table>
        	</div>
        </div>
         <div id="groupOne">
            <div class = "headDiv">
                <table class = "headTable" cellpadding="0px" cellspacing="0px"  rules="all">
                    <tr >
                        <td colspan="3" rowspan=2 align="center">期号</td>
                        <td colspan="10" align="center">开奖号码</td>
                        <td colspan="40" align="center">号码分布</td>
                        <td colspan="4"  align="center">指标</td>
                    </tr>
                    <tr>
                       <td colspan="2"  id="reference" align="center" >1</td>
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
                       <td colspan="2"  align="center">行</td>
                       <td colspan="2"  align="center">位</td>

                    </tr>
                </table>

            </div>
            <div id="Content">
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
                        <td colspan="2"  align="center"></td>
                        <td colspan="2"  align="center"></td>
                   </tr>
                   <tr >
                      <td colspan="13"  align="center">次/100期</td>
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
                      <td colspan="4"  rowspan="2" align="center" onclick="location.href='<%=lastDataUrl %>initStartPage.do?provinceDm=<%=provinceDm%>' "  onMouseOut="changeCss(this,'move')" onmouseover="changeCss(this,'on')">
                      	基础<br>版本
                      </td>
                  </tr>
                  <tr class="trHead">
                        <td colspan="13"  align="center">任一遗漏</td>
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
                        <td colspan="13"  align="center">顺一遗漏</td>
                        <td colspan="2"  align="center"  class="smallFontSize">0</td>
                        <td colspan="2"  align="center"  class="smallFontSize">0</td>
                        <td colspan="2"  align="center"  class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                  		 <td colspan="4"  rowspan="2" align="center" onclick="location.href='<%=lastDataUrl %>/initStartPageVr3.do?provinceDm=<%=provinceDm%>' "  onMouseOut="changeCss(this,'move')" onmouseover="changeCss(this,'on')">
                      	整版<br>遗漏
                      </td>
                   </tr>
                   <tr class="trHead">
                        <td colspan="13"  align="center">顺一最大遗漏</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                        <td colspan="2"  align="center"class="smallFontSize">0</td>
                   </tr>
                </table>
            </div>
        </div>
	</body>

</html>