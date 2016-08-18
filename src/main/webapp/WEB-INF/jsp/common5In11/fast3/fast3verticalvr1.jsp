<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    String lastDataUrl = basePath+"fast3VerticalControllerVr1/";
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
        <script type="text/javascript" src="js/echartUtil.js"></script>
        <script type="text/javascript" src="js/fast3/fast3verticalvr1.js"></script>
        <script type="text/javascript" src="js/fast3/fast3downline.js"></script>
        <script type="text/javascript" src="js/fast3/control.js"></script>
        <script type="text/javascript" src="js/fast3/missanalysis.js"></script>
        <link rel="stylesheet" type="text/css" href="css/fast3/styles2.css">
        <link rel="stylesheet" type="text/css" href="css/util/chartControl.css">
        <link rel="stylesheet" type="text/css" href="css/fast3/baseLayout.css">
    </head>
	<script type="text/javascript">
		
		$(function (){        //初始化内容
	    	initData('<%=lastDataUrl%>','<%=provinceDm%>');
	    });
	</script>
	<body style="margin: 0 auto; padding: 0px;">
	    <div id="Container">
	        <div id="Header">
	        	<div id="logo">
	        		<img src="img/fast3/head2.png" style="height:100%;width: 100%;"/>
	        	</div>
	        	<div id= "tableHead">
	        		<div id="baseTableHead">
	        			<div id="headOne">
	        				<table id="dataTableHead" cellpadding="0px" cellspacing="0px" rules="all">
			        			<tr >
				        			<td rowspan=2 colspan=1>期<br>号</td>
				        			<td rowspan=1 colspan=3>开奖号</td>
				        			<td rowspan=1 colspan=6>号码分布</td>
				        			<td rowspan=2 colspan=1>形<br>态</td>
			        			</tr>
			        			<tr>
				        			<td rowspan=1 colspan=1>一</td>
				        			<td rowspan=1 colspan=1>二</td>
				        			<td rowspan=1 colspan=1>三</td>
				        			<td rowspan=1 colspan=1>1</td>
				        			<td rowspan=1 colspan=1>2</td>
				        			<td rowspan=1 colspan=1>3</td>
				        			<td rowspan=1 colspan=1>4</td>
				        			<td rowspan=1 colspan=1>5</td>
				        			<td rowspan=1 colspan=1>6</td>
			        			</tr>
		        			</table>
	        			</div>
	        		</div>
	        			<div id="adTableHead">
	        				<div id="adHeadOne" group="1">
	        					<table id="analysisTableHead" cellpadding="0px" cellspacing="0px" rules="all">
				        			<tr>
					        			<td rowspan=1 colspan=16>和值走势图</td>
					        			<td rowspan=1 colspan=6>跨度走势图</td>
				        			</tr>
				        			<tr>
					        			<td rowspan=1 colspan=1>3</td>
					        			<td rowspan=1 colspan=1>4</td>
					        			<td rowspan=1 colspan=1>5</td>
					        			<td rowspan=1 colspan=1>6</td>
					        			<td rowspan=1 colspan=1>7</td>
					        			<td rowspan=1 colspan=1>8</td>
					        			<td rowspan=1 colspan=1>9</td>
					        			<td rowspan=1 colspan=1>10</td>
					        			<td rowspan=1 colspan=1>11</td>
					        			<td rowspan=1 colspan=1>12</td>
					        			<td rowspan=1 colspan=1>13</td>
					        			<td rowspan=1 colspan=1>14</td>
					        			<td rowspan=1 colspan=1>15</td>
					        			<td rowspan=1 colspan=1>16</td>
					        			<td rowspan=1 colspan=1>17</td>
					        			<td rowspan=1 colspan=1>18</td>
					        			<td rowspan=1 colspan=1>0</td>
					        			<td rowspan=1 colspan=1>1</td>
					        			<td rowspan=1 colspan=1>2</td>
					        			<td rowspan=1 colspan=1>3</td>
					        			<td rowspan=1 colspan=1>4</td>
					        			<td rowspan=1 colspan=1>5</td>
					        		</tr>
		        				</table>
	        				</div>
	        				<div id="adHeadTwo" group="2">
	        					<table id="analysisGroup" cellpadding="0px" cellspacing="0px" rules="all">
				        			<tr>
					        			<td rowspan=1 colspan=21>两码组合分布</td>
				        			</tr>
				        			<tr>
					        			<td rowspan=1 colspan=1>11</td>
					        			<td rowspan=1 colspan=1>22</td>
					        			<td rowspan=1 colspan=1>33</td>
					        			<td rowspan=1 colspan=1>44</td>
					        			<td rowspan=1 colspan=1>55</td>
					        			<td rowspan=1 colspan=1>66</td>
					        			<td rowspan=1 colspan=1>12</td>
					        			<td rowspan=1 colspan=1>13</td>
					        			<td rowspan=1 colspan=1>14</td>
					        			<td rowspan=1 colspan=1>15</td>
					        			<td rowspan=1 colspan=1>16</td>
					        			<td rowspan=1 colspan=1>23</td>
					        			<td rowspan=1 colspan=1>24</td>
					        			<td rowspan=1 colspan=1>25</td>
					        			<td rowspan=1 colspan=1>26</td>
					        			<td rowspan=1 colspan=1>34</td>
					        			<td rowspan=1 colspan=1>35</td>
					        			<td rowspan=1 colspan=1>36</td>
					        			<td rowspan=1 colspan=1>45</td>
					        			<td rowspan=1 colspan=1>46</td>
					        			<td rowspan=1 colspan=1>56</td>
					        		</tr>
		        				</table>
	        				</div>
	        			</div>
	        		
	        	</div>
	        </div>
	        <div id = "Content">
	        	<div id = "mainDiv">
		        	<div id="base">
		        		<div id="one">
		        			<table id="dataTable" cellpadding="0px" cellspacing="0px" rules="all">
		        			</table>
		        		</div>
		        	</div>
		        	<div id="advance">
		        		<div id="adone" group="1">
		        			<div id="canvasMain" style="position: absolute;z-index: 2">
	                			<canvas id="canvas_main"></canvas>
	            			</div>
		        			<table id="adDataTable" cellpadding="0px" cellspacing="0px" rules="all">
		        			</table>
		        		</div>
		        		<div id="adtwo" group="2">
		        			<table id="groupDataTable" cellpadding="0px" cellspacing="0px" rules="all">
		        			</table>
		        		</div>
		        	</div>
	        	</div>
	        </div>
	        <div id = "Footer">
	        	<div id="missOne">
	        		<div id = "simpleMissBase">
		        		<div id = "simpleMissOne">
			        		<table id='simpleMissTableBase' cellpadding="0px" cellspacing="0px" rules="all">
		        				<tr bgcolor = "#E4A474" >
			        				<td colspan="4">今日出现次数</td><td></td><td></td><td></td><td></td><td></td><td></td><td>--</td>
			        			</tr>
		        				<tr bgcolor = "#E4A474" >
			        				<td colspan="4">当前遗漏次数</td><td></td><td></td><td></td><td></td><td></td><td></td><td>--</td>
			        			</tr>
			        		</table>
		        		</div>
	        		</div>
	        		<div id = "simpleMissAd">
	        			<div id = "simpleAdMissOne" group="1">
		        			<table id='simpleMissTableAd' cellpadding="0px" cellspacing="0px" rules="all">
			        			<tr bgcolor = "#E4A474" >
			        				<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		        					<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		        					<td></td><td></td><td></td>
			        			</tr>
			        			<tr bgcolor = "#E4A474">
			        				<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		        					<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		        					<td></td><td></td><td></td>
			        			</tr>
		        			</table>
	        			</div>
	        			<div id = "simpleAdMissTwo" group="2">
		        			<table id='simpleMissGroupAd' cellpadding="0px" cellspacing="0px" rules="all">
			        			<tr bgcolor = "#E4A474" >
			        				<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		        					<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		        					<td></td><td></td>
			        			</tr>
			        			<tr bgcolor = "#E4A474">
			        				<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		        					<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		        					<td></td><td></td>
			        			</tr>
		        			</table>
	        			</div>
	        		</div>
	        	</div>
	        	<div id="missTwo">
	        		<table id='missTable' cellpadding="0px" cellspacing="0px" rules="all">
	        			<thead style="color:white;" >
	        					<td >所有号码</td><td>三不同</td><td>二同</td><td>三同</td><td>组合</td><td>四码复式</td>
	        			</thead>
	        			<tr bgcolor = "#FEE7EF" style="color : #A2063D;font-size:20pt;">
	        				<td ></td><td></td><td></td><td></td><td></td><td></td>
	        			</tr>
	        			<tr bgcolor = "#FEE7EF" style="color : #A2063D;font-size:20pt;">
	        				<td ></td><td></td><td></td><td></td><td></td><td></td>
	        			</tr>
	        			<tr bgcolor = "#FEE7EF" style="color : #A2063D;font-size:20pt;">
	        				<td></td><td></td><td></td><td></td><td></td><td></td>
	        			</tr>
	        		</table>
	        	</div>
	        </div>
	    </div>
	</body>

</html>