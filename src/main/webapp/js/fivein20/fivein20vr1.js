


	/*  desc : 参数配置,不同分辨率不同玩法参数定义部分
	 author : songj
	 date : 2014-10-28
	 */
	var paramObj = {
		poolNum : 11,        // 球池数量
		recordCount : 0,     // 记录条数
		width : 720,
		clientPix : 25,
		intervalTime : 30000,
		adTime : 10000,  //广告停留时间
		addCount : 160,//记录增加翻页数量
		currentNum : 1,//上下滚屏次数
		isFinish : true,//判断滚屏状态
		backGroundColorFlag : false //判断是否是最后10期的背景色标识
	};
	//用来存放今日出现次数和遗漏值
	var missValues,todayTimes;
	var lastIssueId;

	/*
	 add by songj
	 since 2014-10-22 16:21
	 */
	function initData(lastDataUrl,provinceDm){
		initLayoutHeight(window.screen.height);
		var url=lastDataUrl+"getInitData.do";
		if(paramObj.recordCount == 0){
			paramObj.recordCount = div($('#Content').height(),paramObj.clientPix);
		}
		if(paramObj.recordCount == 0){
			paramObj.recordCount = div(window.screen.height-paramObj.clientPix*5,paramObj.clientPix);
		}
		$('#Content').height((paramObj.recordCount+1)*paramObj.clientPix);
		//$('#dataTableMain').css('display','none');
		$.ajax({
			type:"post",
			url: url,
			dataType:'JSON',
			async:false,
			data : {
				//传入后台的参数列表,预计传入的查询记录条数限制，保证不同分辨率的记录数
				count : paramObj.recordCount+paramObj.addCount
			},
			success: function(data) {
				var jsonObj = $.parseJSON(data);
				var dataArr = jsonObj.records;
				lastIssueId = dataArr[dataArr.length-1].issueId*1;
				$('#dataTable').width(paramObj.width);
				$.each(dataArr,function(i,data){
					var tr = insertTr($('#dataTable').get(0));
					insertNumTd(tr,data);
				});
				$('#dataTable').css('marginTop',-paramObj.clientPix*(dataArr.length-paramObj.recordCount));
				paramObj.addCount = dataArr.length-paramObj.recordCount;
				//打印一个空行
				var tr = insertTr($('#dataTable').get(0));
				insertBlankTd(tr);
				var tr = insertTr($('#bottomNumData').get(0));
				todayTimes = jsonObj.todayTimes;
				insertTodayTimes(tr,jsonObj.todayTimes);
				var tr = insertTr($('#bottomNumData').get(0));
				missValues = jsonObj.missValues;
				insertMissValue(tr,jsonObj.missValues);
				insertBottomDiv($('#Content').height()+paramObj.clientPix*6,720);
				layoutControlDiv(['#dataTable']);
				getInitLastData(dataArr);
				setInterval("getLastData()",paramObj.intervalTime);//3秒一次执行
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
		//testPrintTdFromLast5();
	}
	/*
	 add by songj
	 since 2014-10-22 16:23
	 desc 按照时间间隔后台读取最新数据
	 */
	function getLastData(){
		var lastDataUrl = 'http://www.timemaple.com:80/sd5In20VerticalController/';
		var url=lastDataUrl+"getLastData.do";
		$.ajax({
			type:"post",
			url: url,
			dataType:'JSON',
			async:false,
			data : {
				//传入后台的参数列表,传入页面中显示的最后一期id
				lastIssueId : lastIssueId,
				todayTimes : JSON.stringify(todayTimes),
				missValues : JSON.stringify(missValues)
			},
			success: function(data) {
				////////////////////////////////////////
				if(data == null){
				}else{
					var jsonObj = $.parseJSON(data);
					var data = jsonObj.record;
					lastIssueId = data.issueId*1;
					var tr = insertBeforeLastTr($('#dataTable tr:last'));
					insertNumTd(tr,data);
					$('#dataTable tr:first').remove();
					$('#bottomNumData tr:last').remove();
					$('#bottomNumData tr:last').remove();
					var tr = insertTr($('#bottomNumData').get(0));
					todayTimes = jsonObj.todayTimes;
					insertTodayTimes(tr,jsonObj.todayTimes);
					var tr = insertTr($('#bottomNumData').get(0));
					missValues = jsonObj.missValues;
					insertMissValue(tr,jsonObj.missValues);
					$('#dataTable').css('marginTop',-paramObj.clientPix*(paramObj.addCount));
					getDataLast(data);
				}
			}
		});
	}
	/*
	 add by songj
	 since 2014-10-22 15:09
	 desc 插入一大行内容（该函数分四种插入方法）insert
	 */
	function insertNumTd(trObj,data){
		printIssueNum(trObj,data.issueId);
		printLuckyNum(trObj,data);
		printLuckyDist(trObj,data);
		printBigEven(trObj,data);
	}
	/*
	 打印期号
	 */
	function printIssueNum(trObj,issueNum){
		var td = document.createElement("td");
		td.colSpan = '3';
		if(issueNum%5 == 0){
			td.className = "issueClassOddBlackLine";
		}else{
			td.className = "issueClassOdd";
		}
		td.innerHTML = issueNum.toString().substring(7,9);
		trObj.appendChild(td);
		var issTemp = issueNum.toString().substring(0,issueNum.length-3);//截取期号150119
		var now = new Date();

		//取得当天日期
		var allDateNameT = now.getFullYear()+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+(now.getDate()<10?"0":"")+now.getDate();
		//取得昨天日期
		var allDateNameZ = now.getFullYear()+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+((now.getDate()-1)<10?"0":"")+(now.getDate()-1);
		//取得前天日期
		var allDateNameQ = now.getFullYear()+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+((now.getDate()-2)<10?"0":"")+(now.getDate()-2);
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
	 打印开奖号码
	 */
	function printLuckyNum(trObj,data){
		var imgSrc,lineColor;
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			td.className = "statisticsBlackLine";
		}else{
			td.className = "statistics";
		}
		imgSrc = 'img/darkblue/';
		td.innerHTML=addZero(data.no1);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			td.className = "statisticsBlackLine";
		}else{
			td.className = "statistics";
		}
		td.innerHTML=addZero(data.no2);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			td.className = "statisticsBlackLine";
		}else{
			td.className = "statistics";
		}
		td.innerHTML=addZero(data.no3);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			td.className = "statisticsBlackLine";
		}else{
			td.className = "statistics";
		}
		td.innerHTML=addZero(data.no4);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			td.className = "statisticsBlackLine";
		}else{
			td.className = "statistics";
		}
		td.innerHTML=addZero(data.no5);
		trObj.appendChild(td);
		function addZero(data){
			var rv;
			if(data < 10){
				rv = "0" + data;
			}else{
				rv = data;
			}
			return rv;
		}
	}

	/*
	 add  by songj
	 since 2014-10-22 16:04
	 desc 打印lucky分布
	 */
	function printLuckyDist(trObj,data){
		var tempArr = new Array();
		var imgSrc;
		tempArr = convertToArr(data.no1,data.no2,data.no3,data.no4,data.no5);
		for(var i = 1;i<21;i++){
			var td = document.createElement('td');
			trObj.appendChild(td);
			td.colSpan = 2;
			if(i < 6){
				if(data.issueId%5 == 0){
					td.className = "tdOddBlackLine";
				}else{
					td.className = "tdOddCls";
				}
			}else if(i < 11){
				if(data.issueId%5 == 0){
					td.className = "tdEvenBlackLine";
				}else{
					td.className = "tdEven";
				}
			}else if(i < 16){
				if(data.issueId%5 == 0){
					td.className = "tdOddBlackLine";
				}else{
					td.className = "tdOddCls";
				}
			}else{
				if(data.issueId%5 == 0){
					td.className = "tdEvenBlackLine";
				}else{
					td.className = "tdEven";
				}
			}

			if(isInArr(tempArr,i)){
				if(data.no1 == i){
					imgSrc = 'img/darkred/';
					td.innerHTML = '<img src="'+ imgSrc +i+'.png"  width="23px" height="23px" />';
				}else{
					imgSrc = 'img/darkblue/';
					td.innerHTML = '<img src="'+ imgSrc +i+'.png"  width="23px" height="23px" />';
				}
			}else{
				td.innerHTML = '';
			}
		}
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
	 add  by songj
	 since 2014-10-22 16:04
	 desc printBigEven
	 */
	function printBigEven(trObj,data){
		var td = document.createElement('td');
		td.colSpan = 3;
		if(data.issueId%5 == 0){
			td.className = "statisticsBlackLine";
		}else{
			td.className = "statistics";
		}
		if(data.no1==1 || data.no1==2){
			td.innerHTML = "木";
			$(td).css("background","#6FB7FF");
		}else if(data.no1==3 || data.no1==4){
			td.innerHTML = "火";
			$(td).css("background","#FF9797");
		}else if(data.no1==5 || data.no1==6){
			td.innerHTML = "土";
			$(td).css("background","#FFFF75");
		}else if(data.no1==7 || data.no1==8){
			td.innerHTML = "金";
			$(td).css("background","#FFFFFF");
		}else if(data.no1==9 || data.no1==10){
			td.innerHTML = "水";
			$(td).css("background","#CCCCCC");
		}else if(data.no1==11 || data.no1==12){
			td.innerHTML = "仁";
			$(td).css("background","#6FB7FF");
		}else if(data.no1==13 || data.no1==14){
			td.innerHTML = "智";
			$(td).css("background","#FF9797");
		}else if(data.no1==15 || data.no1==16){
			td.innerHTML = "信";
			$(td).css("background","#FFFF75");
		}else if(data.no1==17 || data.no1==18){
			td.innerHTML = "义";
			$(td).css("background","#FFFFFF");
		}else if(data.no1==19 || data.no1==20){
			td.innerHTML = "礼";
			$(td).css("background","#CCCCCC");
		}
		trObj.appendChild(td);
		var td = document.createElement('td');
		td.colSpan = 3;
		if(data.issueId%5 == 0){
			td.className = "statisticsBlackLine";
		}else{
			td.className = "statistics";
		}
		if(data.no1==1 || data.no1==2 || data.no1==11 || data.no1==12){
			td.innerHTML = "东";
			$(td).css("background","#6FB7FF");
		}else if(data.no1==3 || data.no1==4 || data.no1==13 || data.no1==14){
			td.innerHTML = "南";
			$(td).css("background","#FF9797");
		}
		else if(data.no1==5 || data.no1==6 || data.no1==15 || data.no1==16){
			td.innerHTML = "中";
			$(td).css("background","#FFFF75");
		}
		else if(data.no1==7 || data.no1==8 || data.no1==17 || data.no1==18){
			td.innerHTML = "西";
			$(td).css("background","#FFFFFF");
		}
		else if(data.no1==9 || data.no1==10 || data.no1==19 || data.no1==20){
			td.innerHTML = "北";
			$(td).css("background","#CCCCCC");
		}
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
	 三数转换为数组
	 */
	function convertToArr(a,b,c,d,e){
		var tempArr = [];
		tempArr.push(a);
		tempArr.push(b);
		tempArr.push(c);
		tempArr.push(d);
		tempArr.push(e);
		return tempArr;
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
		$(div).css('text-align','center');
		$(div).css('vertical-align','middle');
		$(div).css('line-height',2);
		$(div).css('top',top);
		$(div).width(720);
		$(div).height(window.screen.height-top);
		$(div).html("本数据仅供参考,开奖号码请以官方数据为准.");
	}
	function insertBeforeLastTr(lastTr){
		var tr = document.createElement("tr");
		$(tr).insertBefore(lastTr);
		return tr;
	}
	/*
	 desc : 插入今天次数单元格
	 since : 2014-10-29
	 author ： songj
	 paramType : '10,20,30....'
	 */
	function insertTodayTimes(trObj,data){
		trObj.className = "trHead";
		var td = document.createElement("td");
		td.className = "tdHead";
		td.height = paramObj.clientPix;
		td.colSpan = 13;
		$(td).width(156);
		td.innerHTML = "出现次数";
		trObj.appendChild(td);
		$.each(data.winNumDist,function(i,temp){
			td = document.createElement("td");
			td.colSpan = 2;
			td.className = "tdHead";
			td.innerHTML = temp;
			trObj.appendChild(td);
		});
		var td = document.createElement("td");
		td.colSpan = 6;
		td.rowSpan = 2;
		td.className = "tdHead";
		td.height = paramObj.clientPix+paramObj.linePx;
		trObj.appendChild(td);
	}
	/*
	 desc : 插入今天次数单元格
	 since : 2014-10-29
	 author ： songj
	 paramType : '10,20,30....'
	 */
	function insertMissValue(trObj,data){
		trObj.className = "trHead";
		var td = document.createElement("td");
		td.className = "select5LastTr";
		td.height = paramObj.clientPix;
		td.colSpan = 13;
		td.className = "tdHead";
		td.innerHTML = "当前遗漏";
		trObj.appendChild(td);
		$.each(data.winNumMiss,function(i,temp){
			td = document.createElement("td");
			td.colSpan = 2;
			td.className = "tdHead";
			td.innerHTML = temp;
			//循环判断内容
			trObj.appendChild(td);
		});
	}

	/*
	 add by songj
	 since 2014-10-22 15:09
	 desc 插入一大行内容（该函数分四种插入方法）insert
	 */
	function insertBlankTd(trObj){
		printBlankIssue(trObj);
		printBlankNum(trObj);
		printLuckyBlankDist(trObj);
		printBigEvenBlank(trObj);
	}
	/*
	 打印期号
	 */
	function printBlankIssue(trObj){
		var td = document.createElement("td");
		td.id = "lastIssue";
		td.colSpan = '3';
		td.height = paramObj.clientPix;
		td.className = "issueClassOddBlackLine";
		trObj.appendChild(td);
	}
	/*
	 打印开奖号码
	 */
	function printBlankNum(trObj){
		for(var i=0;i<5;i++){
			var td = document.createElement('td');
			td.colSpan = 2;
			td.className = "statistics";
			trObj.appendChild(td);
		}
	}
	/*
	 add  by songj
	 since 2014-10-22 16:04
	 desc 打印lucky分布
	 */
	function printLuckyBlankDist(trObj){
		for(var i = 1;i<=20;i++){
			var td = document.createElement('td');
			td.colSpan = 2;
			if(i < 6){
				td.className = "tdOddCls";
			}else if(i < 11){
				td.className = "tdEven";
			}else if(i < 16){
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
	 desc print skip
	 */
	function printBigEvenBlank(trObj){
		var td = document.createElement('td');
		td.colSpan = 3;
		td.className = "statistics";
		trObj.appendChild(td);
		var td = document.createElement('td');
		td.colSpan = 3;
		td.className = "statistics";
		trObj.appendChild(td);
	}

	/*
	 初始化打印最后不动10期数据
	 */
	function getInitLastData(dataArr){
		$('#dataTableLast').width(paramObj.width);
		var dataArrDown = new Array();
		for (var j = dataArr.length - 10; j < dataArr.length; j++) {
			dataArrDown.push(dataArr[j]);
		}
		$.each(dataArrDown,function(i,data){
			var tr = insertTr($('#dataTableLast').get(0));
			insertNumTd(tr,data);
		});
		var tr = insertTr($('#dataTableLast').get(0));
		insertBlankTd(tr,lastIssueId+1);
		$('#dataTableMain').css('marginTop',
			paramObj.clientPix * (paramObj.recordCount - 10));
		$("#dataTableLast tr").each(function(){
			$(this).find("td").eq(0).css("background-color","#ABB5BA");
			for(var i=1;i<6;i++){
				$(this).find("td").eq(i).css("background-color","#FFFF75");
			}
			for(var i=6;i<11;i++){
				$(this).find("td").eq(i).css("background-color","#B5D7D7");
			}
			for(var i=11;i<16;i++){
				$(this).find("td").eq(i).css("background-color","#B6DA7A");
			}
			for(var i=16;i<21;i++){
				$(this).find("td").eq(i).css("background-color","#B5D7D7");
			}
			for(var i=21;i<26;i++){
				$(this).find("td").eq(i).css("background-color","#B6DA7A");
			}
		});
	}

	/*
	 跳期打印最后10期数据
	 */
	function getDataLast(data){
		var tr = insertBeforeLastTr($('#dataTableLast tr:last'));
		insertNumTd(tr,data);
		$('#dataTableLast tr:first').remove();
		$('#dataTableMain').css('marginTop',
			paramObj.clientPix * (paramObj.recordCount - 10));
		$('#dataTableMain').css('display','none');
		$("#dataTableLast tr").each(function(){
			$(this).find("td").eq(0).css("background-color","#ABB5BA");
			for(var i=1;i<6;i++){
				$(this).find("td").eq(i).css("background-color","#FFFF75");
			}
			for(var i=6;i<11;i++){
				$(this).find("td").eq(i).css("background-color","#B5D7D7");
			}
			for(var i=11;i<16;i++){
				$(this).find("td").eq(i).css("background-color","#B6DA7A");
			}
			for(var i=16;i<21;i++){
				$(this).find("td").eq(i).css("background-color","#B5D7D7");
			}
			for(var i=21;i<26;i++){
				$(this).find("td").eq(i).css("background-color","#B6DA7A");
			}
		});
	}
