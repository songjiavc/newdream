<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    String lastDataUrl = basePath+"Common5In11Controller/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta name="viewport" content="width=device-width">
<base href="<%=basePath%>">
<title>电子走势图</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script type="text/javascript" src="js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="js/liaoning/5In11Vertical/echartUtil.js"></script>
<link rel="stylesheet" type="text/css" href="css/liaoning/ln11xuan5V.css">
<link rel="stylesheet" type="text/css" href="css/util/chartControl.css">
</head>
<script type="text/javascript">
    /*  
        desc : 参数配置,不同分辨率不同玩法参数定义部分
        author : songj
        date : 2014-10-28
    */
    var paramObj = {
        poolNum : 11,        // 球池数量
        recordCount : 0,     // 记录条数
        width : 720,
        height : 720,     //分辨率高度
        clientPix : 25,
        intervalTime : 30000,
        adTime : 10000,//广告停留时间
        addCount : 0,//记录增加翻页数量
        currentNum : 1,//上下滚屏次数
        isFinish : true,//判断滚屏状态
        timer : 9000//翻页悬停时间90秒
    };
    //定义五个字符串用来存放遗漏值当前值
    var top3MissStr,top5MissStr,todayTimesTop3,todayTimes;
    var allDataArray = [];
    var cvsObj,cvs; //画布存储变量
    var lastIssueId;
    $(function (){
        initData();
    });
    /*
        add by songj
        since 2014-10-22 16:21
    */
    function initData(){
        var lastDataUrl = '<%=lastDataUrl%>';
        var url=lastDataUrl+"getInitData.do?provinceDm="+$("#provinceDm").val()+"&cityDm="+$("#cityDm").val();
        $('#Content').width(paramObj.width);

        if(paramObj.recordCount == 0){
            paramObj.recordCount = div(window.screen.height-paramObj.clientPix*8,paramObj.clientPix);
        }
        $('#Content').height((paramObj.recordCount+1)*paramObj.clientPix);
        $('#dataTableMain').css('display','none');
        $.ajax({
            type:"post",
            url: url,
            dataType:'JSON',
            async:false,
            data : {
                //传入后台的参数列表,预计传入的查询记录条数限制，保证不同分辨率的记录数
                count : paramObj.recordCount+160
            },
            success: function(data) {   
                if(data == null){
                    //如果数据库开始记录为0
                    lastIssueId = 0;
                }else{
                    var jsonObj = $.parseJSON(data);
                    var dataArr = jsonObj.initIssueList;
                    var paramArr = [];
                    lastIssueId = dataArr[dataArr.length-1].issueId*1;
                    //initTableHead($('#dataTable').get(0));
                    $.each(dataArr,function(i,data){
                        paramArr.push(data.no1);
                        paramArr.push(data.no2);
                        paramArr.push(data.no3);
                        paramArr.push(data.no4);
                        paramArr.push(data.no5);
                        var tr = insertTr($('#dataTable').get(0));
                        insertNumTd(tr,paramArr,data.issueId);
                        paramArr.length = 0;
                    });
                    $('#dataTable').css('marginTop',-paramObj.clientPix*(dataArr.length-paramObj.recordCount));
                	paramObj.addCount = dataArr.length-paramObj.recordCount;
                    //获取table最后一行
                    //var lastTr = $('#dataTable tr:last').get(0);
                    var tr = insertTr($('#dataTable').get(0)); 
                    insertBlankTd(tr,lastIssueId+1);
                    todayTimesTop3 = jsonObj.todayTimesTop3;
                    todayTimes = jsonObj.todayTimes;
                    var tr = insertTr($('#bottomNumData').get(0));
                    insertTodayTimes(tr,jsonObj.todayTimesTop3,jsonObj.todayTimes);
                    
                    top3MissStr = jsonObj.top3Miss;
                    top5MissStr = jsonObj.top5Miss;
                    var tr = insertTr($('#bottomNumData').get(0));
                    insertMissingValue(tr,lastIssueId,jsonObj.top3Miss,jsonObj.top5Miss);
                    insertBottomDiv($('#Content').height()+paramObj.clientPix*6,720);
                    getInitLastData(dataArr);
                }
                
                layoutControlDiv(['#dataTable']);
                setInterval("getLastData()",paramObj.intervalTime);//3秒一次执行
               // var tdWidth = $(document).width()/57;
               // $("td").width(tdWidth);
            }
        });
        function div(exp1, exp2)
        {
            var n1 = Math.round(exp1); //四舍五入
            var n2 = Math.round(exp2); //四舍五入
            
            var rslt = n1 / n2; //除
            
            if (rslt >= 0)
            {
                rslt = Math.floor(rslt); //返回值为小于等于其数值参数的最大整数值。
            }
            else
            {
                rslt = Math.ceil(rslt); //返回值为大于等于其数字参数的最小整数。
            }
            
            return rslt;
        }
    }
    /*   
     *   @desc : 插入底端提示信息内容
     *   @author : songj
         @date 2014-11-11
     */
     function insertBottomDiv(top,width){
         var div = document.createElement("div");
         document.body.appendChild(div);
         $(div).css('position','absolute');
         $(div).css('background',"#f49800");
        // $(div).css('background','url(<%=request.getContextPath()%>/img/heilongjiang/bottom.jpg)');
         $(div).css('text-align','center');
         $(div).css('vertical-align','middle');
         $(div).css('line-height',2);
         $(div).css('top',top);
         $(div).width(720);
         $(div).height(window.screen.height-top);
         $(div).html("本数据仅供参考,开奖号码请以官方数据为准.");
         
        
     }

    /*
        add by songj
        since 2014-10-22 16:23
        desc 按照时间间隔后台读取最新数据
    */
    function getLastData(){
        var lastDataUrl = '<%=lastDataUrl%>';
        var url=lastDataUrl+"getLastData.do?provinceDm="+$("#provinceDm").val()+"&cityDm="+$("#cityDm").val();
            $.ajax({
            type:"post",
            url: url,
            dataType:'JSON',
            async:false,
            data : {
                //传入后台的参数列表,传入页面中显示的最后一期id
                lastIssueId : lastIssueId,
                todayTimesTop3 : todayTimesTop3,
                todayTimes : todayTimes,
                top3MissStr : top3MissStr,
                top5MissStr : top5MissStr
            },
            success: function(data) {
                if(data == null){
                }else{
                    var returnObj = $.parseJSON(data);
                    var dataObj= returnObj.lastIssueList;
                    //对返回数据进行画图
                    var paramArr = [];
                    paramArr.push(dataObj.no1);
                    paramArr.push(dataObj.no2);
                    paramArr.push(dataObj.no3);
                    paramArr.push(dataObj.no4);
                    paramArr.push(dataObj.no5);
                    var tr = insertBeforeLastTr();
                    insertNumTd(tr,paramArr,dataObj.issueId);
                    lastIssueId = dataObj.issueId*1;
                    //当table的一行被删除后，删除alldata数组中的一行元素
                   // debugger;
                    //$("#dataTable tr").eq(4).remove();
                    $('#dataTable tr:first').remove();
                    $('#dataTable tr:last').remove();
                    $('#bottomNumData tr:last').remove();
                    $('#bottomNumData tr:last').remove();
                    
                    var tr = insertTr($('#dataTable').get(0)); 
                    insertBlankTd(tr,lastIssueId + 1);
                    todayTimesTop3 = returnObj.todayTimesTop3;
                    todayTimes = returnObj.todayTimes;
                    var tr = insertTr($('#bottomNumData').get(0));
                    insertTodayTimes(tr,returnObj.todayTimesTop3,returnObj.todayTimes);
                    var tr = insertTr($('#bottomNumData').get(0));
                    top3MissStr = returnObj.top3Miss;
                    top5MissStr = returnObj.top5Miss;
                    insertMissingValue(tr,lastIssueId,returnObj.top3Miss,returnObj.top5Miss);
                    $('#dataTable').css('marginTop',-paramObj.clientPix*(paramObj.addCount));
                    getDataLast(paramArr,dataObj.issueId);
                }
            }
        });
    }
    /*
        add by songj
        since 2014-10-22 15:09
        desc 插入一大行内容（该函数分四种插入方法）insert
    */
    function insertNumTd(trObj,dataArr,issueNum){
        printIssueNum(trObj,issueNum);
        insertThreePart(trObj,dataArr,issueNum);
        insertTop3Part(trObj,dataArr);
        insertFourPart(trObj,dataArr,issueNum);
    }
    /*
        add by songj
        since 2014-10-22 15:09
        desc 插入一大行内容（该函数分四种插入方法）insert
    */
    function insertBlankTd(trObj,issueNum){
        printIssueNumBlank(trObj,issueNum);
        insertThreePartBlank(trObj,issueNum);
        insertTop3PartBlank(trObj);
        insertFourPartBlank(trObj,issueNum);
    }
    /*
        打印期号
    */
    function printIssueNumBlank(trObj,issueNum){
        var td = document.createElement("td");
        td.className = "issueClassOdd";
        trObj.appendChild(td);
    }
    /*
    	获取期号改变颜色日期 
    */
    function GetDateStr(AddDayCount) {
		var dd = new Date();
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		var y = dd.getFullYear();
		var m = ((dd.getMonth()+1)<10?"0":"")+(dd.getMonth()+1);//获取当前月份的日期
		var d = ((dd.getDate())<10?"0":"")+(dd.getDate());//dd.getDate();
		return y+m+d;
	}
    /*
        打印期号
    */
    function printIssueNum(trObj,issueNum){
        var td = document.createElement("td");
        td.className = "issueClassOdd";
        td.innerHTML = issueNum.toString().substring(6,8);
        trObj.appendChild(td);
        var issTemp = issueNum.toString().substring(0,issueNum.length-2);//截取期号150119
    	//取得当天日期
		var allDateNameT = GetDateStr(0);
		//取得昨天日期
		var allDateNameZ =GetDateStr(-1);
		//取得前天日期
		var allDateNameQ = GetDateStr(-2);
		var adnT = allDateNameT.toString().substring(allDateNameT.length-6,allDateNameT.length);
		var adnZ = allDateNameZ.toString().substring(allDateNameZ.length-6,allDateNameZ.length);
		var adnQ = allDateNameQ.toString().substring(allDateNameQ.length-6,allDateNameQ.length);
		if(issTemp==adnZ){
			$(td).css('background-color','#CCE5A3');
		}
		if(issTemp==adnQ){
			$(td).css('background-color','#F9D193');
		}
    }
    
    /*
        add  by songj
        since 2014-10-22 16:04
        desc 插入第三部分内容
    */
    function insertThreePartBlank(trObj,issueNum){
        for(var i = 1;i<paramObj.poolNum+1;i++){
            var td = document.createElement('td');
            if(issueNum%2){
                td.className = "tdOddCls";
            }else{
                td.className = "tdEven";
            }
            trObj.appendChild(td);
        }
    }
    /*
        add  by songj
        since 2014-10-22 16:04
        desc 插入第三部分内容
    */
    function insertThreePart(trObj,dataArr,issueNum){
        for(var i = 1;i<paramObj.poolNum+1;i++){
            var td = document.createElement('td');
            if(isInArr(dataArr,i)){
                td.innerHTML = '<img src="img/haoma/'+ i*1 +'.png" width="23px" height="23px"/>';
            }
            if(issueNum%2){
                td.className = "tdOddCls";
            }else{
                td.className = "tdEven";
            }
            trObj.appendChild(td);
        }
        /*
            打印跨度
        */
        //定义内部函数处理数组存在问题
        function isInArr(dataArr,data){
            for(var i=0;i<dataArr.length;i++){
                if(data == dataArr[i]){
                    return true;
                }
            }
            return false;           
        }
    }
    /*
        add by songj
        since 2014-10-28
        desc 求跨度
    */
    function getSkip(paramArray){
        var tempArr = [];
        $.each(paramArray,function(i,param){
            tempArr.push(param);
        });
        tempArr.sort(function(a,b){return a>b?1:-1});
        return tempArr[tempArr.length-1] -  tempArr[0];
    }
    /*
        add  by songj
        since 2014-10-22 16:04
        desc 插入前三个数
    */
    function insertTop3PartBlank(trObj){
        for(var i = 0;i < 3;i++){
            var td = document.createElement('td');
            td.className = 'statistics';
            trObj.appendChild(td);
        }
    }
    /*
        add  by songj
        since 2014-10-22 16:04
        desc 插入前三个数
    */
    function insertTop3Part(trObj,dataArr){
        var sumValue=0;
        for(var i = 0;i < 3;i++){
            var td = document.createElement('td');
            td.className = 'statistics';
            td.innerHTML = dataArr[i]*1;
            trObj.appendChild(td);
        }
    }
        
    /*
        add  by songj
        since 2014-10-22 16:04
        desc 插入第三部分内容
    */
    function insertFourPartBlank(trObj,issueNum){
        var sumValue=0;
        for(var i = 1;i<paramObj.poolNum+1;i++){
            var td = document.createElement('td');
            if(issueNum%2){
                td.className = "tdOddCls";
            }else{
                td.className = "tdEven";
            }
            trObj.appendChild(td);
        }
        /*
            打印跨度
        */
        var td = document.createElement('td');
        td.className = 'statistics';
        trObj.appendChild(td);
        /*
            打印和值
        */
        var td = document.createElement('td');
        td.className = 'statistics';
        trObj.appendChild(td);
    }
    /*
        add  by songj
        since 2014-10-22 16:04
        desc 插入第三部分内容
    */
    function insertFourPart(trObj,dataArr,issueNum){
        var tempArr = new Array();
        var sumValue=0;
        for(var i = 0;i < 3;i++){
            tempArr.push(dataArr[i]);
            sumValue = sumValue + dataArr[i]*1;
        }
        for(var i = 1;i<paramObj.poolNum+1;i++){
            var td = document.createElement('td');
            if(issueNum%2){
                td.className = "tdOddCls";
            }else{
                td.className = "tdEven";
            }
            if(isInArr(tempArr,i)){
                td.innerHTML = '<img src="img/qiansan/'+ i*1 +'.png" width="23px" height="23px" />';
            }
            trObj.appendChild(td);
        }
        /*
            打印跨度
        */
        var td = document.createElement('td');
        td.className = 'statistics';
        trObj.appendChild(td);
        td.innerHTML = getSkip(tempArr);
        /*
            打印和值
        */
        var td = document.createElement('td');
        td.className = 'statistics';
        trObj.appendChild(td);
        td.innerHTML = sumValue;
        //定义内部函数处理数组存在问题
        function isInArr(dataArr,data){
            for(var i=0;i<dataArr.length;i++){
                if(data == dataArr[i]){
                    return true;
                }
            }
            return false;           
        }
    }
    
    /*
        desc : 插入今天次数单元格
        since : 2014-10-29
        author ： songj
        paramType : '10,20,30....'
    */
    function insertTodayTimes(trObj,dataStrTop3,dataStr){
        trObj.className = "trHead";
        var dataArrTop3 = dataStrTop3.split(',');
        var dataArr = dataStr.split(',');
        var td = document.createElement("td");
        td.innerHTML = "<font size='1px'>次/日</font>";
        $(td).width(45);
        trObj.appendChild(td);
        $.each(dataArr,function(i,temp){
            td = document.createElement("td");
            $(td).width(24);
            td.className = "select5VerticalLastTr";
            td.innerHTML = temp;
            trObj.appendChild(td);
        });
        var td = document.createElement("td");
        td.className = "select5VerticalLastTr";
        $(td).width(74);
        td.innerHTML = "--";
        trObj.appendChild(td);
        
        $.each(dataArrTop3,function(i,temp){
            td = document.createElement("td");
            $(td).width(24);
            td.innerHTML = temp;
            trObj.appendChild(td);
        });
        var td = document.createElement("td");
        td.innerHTML = "--";
        trObj.appendChild(td);
    }
    /*
        desc : 插入今天次数单元格
        since : 2014-10-29
        author ： songj
        paramType : '10,20,30....'
    */
    function insertMissingValue(trObj,lastIssueId,top3Miss,top5Miss){
        trObj.className = "trHead";
        var top3MissArr = top3Miss.split(',');
        var top5MissArr = top5Miss.split(',');
        var td = document.createElement("td");
        td.className = "select5VerticalLastTr";
        td.innerHTML = "<font size='1px'>遗漏</font>";
        trObj.appendChild(td);
        
        $.each(top5MissArr,function(i,temp){
            td = document.createElement("td");
            td.className = "select5VerticalLastTr";
            if(temp == "init"){
                td.innerHTML = "--";
            }else{
                td.innerHTML = temp;
            }
            trObj.appendChild(td);
        });
        var td = document.createElement("td");
        td.className = "select5VerticalLastTr";
        td.innerHTML = "--";
        trObj.appendChild(td);
        $.each(top3MissArr,function(i,temp){
            td = document.createElement("td");
            td.className = "select5VerticalLastTr";
            if(temp == "init"){
                td.innerHTML = "--";
            }else{
                td.innerHTML = temp;
            }
            trObj.appendChild(td);
        });
        var td = document.createElement("td");
        td.className = "select5VerticalLastTr";
        td.innerHTML = "--";
        trObj.appendChild(td);
    }
    /*
        add by songj
        since 2014-10-22 15:21
        desc 插入tr内容
    */
    function insertTr(tableObj){
        var tr = document.createElement("tr");
        tableObj.appendChild(tr);
        return tr;
    }
    /*
        add by songj
        since 2014-10-22 15:21
        desc 在最后一行前插入一行
    */
    function insertBeforeLastTr(){
        var tr = document.createElement("tr");
        $(tr).insertBefore($('#dataTable tr:last'));
            //tableObj.appendChild(tr);
        return tr;
    }
    
    /*
     * 最后10条不动数据行 
    */
    function insertLastDataTr(){
        var tr = document.createElement("tr");
        $(tr).insertBefore($('#dataTableLast tr:last'));
        return tr;
    }
  
    /* 
    *	初始化打印最后10条不动数据
     */
    function getInitLastData(dataArr){
    	var dataArrDown = new Array();
		for (var j = dataArr.length - 10; j < dataArr.length; j++) {
			dataArrDown.push(dataArr[j]);
		}
    	 $.each(dataArrDown,function(i,data){
    	   var paramArr =[];
           paramArr.push(data.no1);
           paramArr.push(data.no2);
           paramArr.push(data.no3);
           paramArr.push(data.no4);
           paramArr.push(data.no5);
           var tr = insertTr($('#dataTableLast').get(0));
           insertNumTd(tr,paramArr,data.issueId);
         });
         var tr = insertTr($('#dataTableLast').get(0)); 
         insertBlankTd(tr,lastIssueId+1);
         $("#dataTableLast tr").each(function(index,eleMe){
         	if(index % 2 ==0){
         		$(this).find("td").css("background-color","#A6D15C");
         	}else{
         		$(this).find("td").css("background-color","#C8C8C8");
         	}
			//$(this).find("td").addClass("lastBackGroundClass");
		});
         
         $('#dataTableMain').css('marginTop',
				paramObj.clientPix * (paramObj.recordCount - 10));
    
    }
    /* 
    *	跳期打印最后不动数据 
    */
    function getDataLast(paramArr,issueId){
    	var tr = insertLastDataTr(); 
        insertNumTd(tr,paramArr,issueId);
        $('#dataTableLast tr:first').remove();
        $('#dataTableLast tr:last').remove();
        var tr = insertTr($('#dataTableLast').get(0));
        insertBlankTd(tr,lastIssueId+1);
        $("#dataTableLast tr").each(function(index,eleMe){
         	if(index % 2 ==0){
         		$(this).find("td").css("background-color","#A6D15C");
         	}else{
         		$(this).find("td").css("background-color","#C8C8C8");
         	}
		});
		$('#dataTableMain').css('marginTop',
				paramObj.clientPix * (paramObj.recordCount - 10));
		$('#dataTableMain').css('display','none');			
				
    }
    
    
    </script>
<body style="margin: 0 auto; padding: 0px;background-color: #2E8B57">
	<input type="hidden" name="provinceDm" id="provinceDm" value="${provinceDm}">
	<input type="hidden" name="cityDm" id="cityDm" value="${cityDm}">

    <div class="Container">
    	<div style="width: 720px;height: 50px">
           <img src="img/beijing/ln11xuan5V.png" />
        </div>
        <div>
        <table id='dataTableHead' cellpadding="0px"
            cellspacing="0px" rules="all"
            style="border-color: Gray;width: 720px">
            <tr class="trHead" >
                <th  rowspan="2" width="45px">期数</th>
                <th colspan="11" width="264px" >五码分布</th>
                <th  rowspan="2" width="24px" >一位</th>
                <th  rowspan="2" width="24px">二位</th>
                <th  rowspan="2" width="24px">三位</th>
                <th  colspan="11" width="264px" >前三分布</th>
                <th   rowspan="2" width="24px">跨度</th>
                <th  rowspan="2"  width="24px">和值</th>
            </tr>
            <tr id="firstTr" class="trHead" >
                <th width="24px">1</th>
                <th width="24px">2</th>
                <th width="24px">3</th>
                <th width="24px">4</th>
                <th width="24px">5</th>
                <th width="24px">6</th>
                <th width="24px">7</th>
                <th width="24px">8</th>
                <th width="24px">9</th>
                <th width="24px">10</th>
                <th width="24px">11</th>
                
                <th width="24px">1</th>
                <th width="24px">2</th>
                <th width="24px">3</th>
                <th width="24px">4</th>
                <th width="24px">5</th>
                <th width="24px">6</th>
                <th width="24px">7</th>
                <th width="24px">8</th>
                <th width="24px">9</th>
                <th width="24px">10</th>
                <th width="24px">11</th>
            </tr>
        </table>
        </div>
    </div>
    <div id="Content">
    	<div >
    		<table id='dataTable' cellpadding="0px"
            	cellspacing="0px" rules="all"
           	 	style="position: absolute; border-color: Gray;">
    		</table>
    	</div>
    	<div style="z-index:2" id='dataTableMain'>
    		<table id="dataTableLast" cellpadding="0px"
            	cellspacing="0px" rules="all"
           	 	style="position: absolute; border-color: Gray;border-top:Gray; 1px">
    		</table>
    	</div>  
    </div> 
    <div style="height:50px;">
			<div class="Content-Left">
				<table id="bottomNumData"
					style="border-top: 1pt;border-color: Gray;width: 720px"
					cellpadding="0px" cellspacing="0px" rules="all">
				</table>
			</div>
		</div>      
</body>
</html>
