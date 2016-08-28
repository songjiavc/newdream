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
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="expires" content="0">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta http-equiv="description" content="群英荟录入">
        <script type="text/javascript" src="js/jquery-1.7.2.js"></script>
        <link rel="stylesheet" type="text/css" href="css/fivein20/DataInputLayout.css">
        <link rel="stylesheet" type="text/css" href="css/fivein20/DataInputStyles.css">
        <link rel="stylesheet" type="text/css" href="css/graph.css">
    </head>
    <script>

    	var dataArr = [];
    	function cicleClick(obj){
    		//变色  点击1次是蓝色 两次取消
    		if(!$(obj).attr('selected')){   //如果为非选中状态
    			if(dataArr.length == 5){
    				alert("最多只能选择五个球！");
    				return false;
    			}
    			$(obj).css('background-color','red');
        		$(obj).attr('selected',true);
        		dataArr.push(obj.innerHTML);
        		$(obj).attr('index',dataArr.length);
        		var jqObj = $(obj).clone(true);
        		$(jqObj).css('margin','5 5 5 5');
        		$('#imgSelected').append(jqObj);
    		}else{
    			//当是最后一个元素的时候可以删除
    			if($(obj).attr('index') == dataArr.length){
    				$(obj).css('background-color','#C1C1C1');
            		$(obj).attr('selected',false);
            		$(obj).attr('index',-1);
            		dataArr.splice(dataArr.length-1,1);
            		$('#imgSelected div:last').remove();
    			}
    			
    		}
    		//插入已选列表
    	}
    	//清空期号内容
    	function clearIssueNumber(){
    		$("#issueNumber").attr("value","");
    		$("#issueNumber").focus();
    	}
    	
    	function submitDataForm(){
    		var url="<%=lastDataUrl%>"+"dataInputSubmit.do";
    		var issueNumber = $("#issueNumber").val();
    		if($.isEmptyObject(issueNumber)){
    			alert("补录期号不能为空!");
    			return false;
    		}else if(issueNumber.length != 9){
    			alert("期号位数不对!");
    			return false;
    		}else if(dataArr.length < 5){
    			alert("已选号码要求必须是5个!");
    			return false;
    		}else{
	    		$.ajax({
	    			type:"post",
	    			url: url,
	    			dataType:'JSON',
	    			async:false,
	    			data : {
	    				provinceCode : '<%=provinceDm%>',
	    				dataArr : JSON.stringify(dataArr),
	    				issueNumber : issueNumber
	    			},
	    			success: function(data) {
	    				if(data.status == "success"){
		    				//如果添加成功，刷新下方列表
	    					reflashDataList(data.dataList);
	    				}else{
	    					alert(data.message);
	    				}
	    			}
	    		});
    		}
    	}
    	/*
    		获取最近10期数据防止录入错误进行删除操作
    	*/
    	function getDataList(){
    		var url="<%=lastDataUrl%>"+"getDataInputList.do";
	    		$.ajax({
	    			type:"post",
	    			url: url,
	    			dataType:'JSON',
	    			async:false,
	    			data : {
	    				provinceCode : '<%=provinceDm%>'
	    			},
	    			success: function(data) {
	    					reflashDataList(data);
	    			}
	    		});
    	}
    	
    	
    	
    	function deleteData(){
    		if(confirm("确定要删除数据吗?")){
    			var url="<%=lastDataUrl%>"+"deleteDataInput.do";
        		$.ajax({
        			type:"post",
        			url: url,
        			dataType:'JSON',
        			async:false,
        			data : {
        				provinceCode : '<%=provinceDm%>',
        				id : $(this).children().eq(0).html()
        			},
        			success: function(data) {
        				if(data.status=="success"){
    	    				getDataList();
        				}else{
        					alert(data.message);
        					return false;
        				}
        			}
        		});
    		}else{
    	   		return false;
    		}
    		
    	}
    	
    	function reflashDataList(dataList){
    		//rumove掉所有的数据
    		$('#dataList tr').not('#dataList tr:first').remove();
    		$.each(dataList,function(i,data){
    			var tr = insertTr($('#dataList').get(0));
    			 // 绑定事件
    		    tr.onclick = deleteData;
    			td = insertTd(tr);
    			$(td).css("display","none");
    			td.innerText = data.id;
    			td = insertTd(tr);
    			td.colSpan="3";
    			td.innerText = data.issueNumber;
    			td = insertTd(tr);
    			td.colSpan="3";
    			td.innerText = data.no1+","+data.no2+","+data.no3+","+data.no4+","+data.no5;
    			td = insertTd(tr);
    			if(data.origin == "1"){
    				td.innerText= "机";
    			}else{
    				td.innerText= "人";
    			}
    			td = insertTd(tr);
    			td.colSpan="3";
    			td.innerText = data.createTime;
    			
    		});
    	}
    	
    	//插入一行
    	function insertTr(tableObj){
			var tr = document.createElement("tr");
			tableObj.appendChild(tr);
			return tr;
		}
    	function insertTd(trObj){
			var td = document.createElement("td");
			trObj.appendChild(td);
			return td;
		}
    	
    </script>
	<body style="margin: 0 auto; padding: 0px;" onload="getDataList()">
        <div id="dataInput">
        	<div id="issueDiv">
        		<div style="padding: 5 5 5 5;float:left;" >期号：
        	    	<input type="number" id="issueNumber" style="font-size:14pt;width:128px;"  max="20" />例:160825001
        	    </div>
        	    <div style="padding: 10 5 5 5;">
        	    	<input type="button" name="clearIssueNumber" onclick="clearIssueNumber()" value="清除"/>
        	    </div>
        	</div>
        	<div id="dataSelected">
        		<div style="width:286px;height:25px;float:left;">
	        		<div style="padding: 5 5 5 5;float:left;" >已选：</div>
	        		<div id = "imgSelected" style="padding: 5 5 5 5;float:left;" ></div>
        		</div>
        		<div style="padding: 5 5 5 5;width:20%;float:left;">
        	    	<input type="button" name="submit" onclick="submitDataForm()" value="提交"/>
        	    	<input type="button" name="reflash" onclick="getDataList()" value="刷新"/>
        	    </div>
        	</div>
        	<div id="dataSelect">
        		<div class="imgGroup">
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">1</div>
	        		</div>
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">2</div>
	        		</div>
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">3</div>
	        		</div>
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">4</div>
	        		</div>
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">5</div>
	        		</div>
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">6</div>
	        		</div>
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">7</div>
	        		</div>
	        		</div>
	        	<div class="imgGroup">
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">8</div>
	        		</div>
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">9</div>
	        		</div>
	        		<div class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)" >10</div>
	        		</div>
        			<div width="10%" class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">11</div>
	        		</div>
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">12</div>
	        		</div>
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)">13</div>
	        		</div>
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass"  onclick="cicleClick(this)" >14</div>
	        		</div>
	        	</div>
	        	<div class="imgGroup">
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass" onclick="cicleClick(this)">15</div>
	        		</div>
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass" onclick="cicleClick(this)">16</div>
	        		</div>
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass" onclick="cicleClick(this)">17</div>
	        		</div>
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass" onclick="cicleClick(this)">18</div>
	        		</div>
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass" onclick="cicleClick(this)">19</div>
	        		</div>
	        		<div width="10%" class="baseStyle">
	        			<div class="circle imgClass" onclick="cicleClick(this)">20</div>
	        		</div>
        		</div>
        	</div>
        </div>
        <div id="dataView">
          <table id="dataList" cellpadding="0px" cellspacing="0px" rules="all">
        	<th style="display:none" >ID</th>
        	<th colspan="3">期号</th>
        	<th colspan="3">号码</th>
        	<th>源</th>
        	<th colspan="3">时间</th>
        </table>
        </div>
	</body>

</html>