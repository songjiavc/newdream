


	/*  desc : 参数配置,不同分辨率不同玩法参数定义部分
	 author : songj
	 date : 2014-10-28
	 */
	var paramObj = {
		poolNum : 20,        // 球池数量
		recordCount : 0,     // 记录条数
		width : 720,
		clientPix : 25,
		intervalCycle : 1000*10,    // 每隔10秒执行一次
		timeCycle : 1000*60*9,     // 每隔9分钟执行一次
		adTime : 10000,  //广告停留时间
		addCount : 160,//记录增加翻页数量
		currentNum : 1,//上下滚屏次数
		maxTodayIssueNum : 78,    //该彩种一天一共多少期
		isFinish : true,//判断滚屏状态
		////////////////////
		getLastRecordIntervalId : 0,
		getLastRecordTimeId : 0,
		////////////////////
		ss : 0,
    	mm : 10
    	
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
			paramObj.recordCount = div($('.contentDiv').height(),paramObj.clientPix);
		}
		//$('#dataTableMain').css('display','none');
		$.ajax({
			type:"post",
			url: url,
			dataType:'JSON',
			async:false,
			data : {
				//传入后台的参数列表,预计传入的查询记录条数限制，保证不同分辨率的记录数
				count : paramObj.recordCount+paramObj.addCount,
				provinceDm : provinceDm
			},
			success: function(data) {
				var dataArr = data.records;
				lastIssueId = dataArr[0].issueNumber*1;
				$.each(dataArr,function(i,data){
					var tr = insertBeforeLastTr($('#dataTable tr:first'));
					insertNumTd(tr,data);
				});
				$('#dataTable').css('marginTop',-paramObj.clientPix*paramObj.addCount+($('.contentDiv').height() - paramObj.clientPix*paramObj.recordCount)-1);
				//更新今日出现次数
				
				updateBlankIssue(lastIssueId);
				todayTimes = data.todayTimes;
				updateTodayTimes(data.todayTimes);
				//更新当前遗漏值
				missValues = data.missTimes;
				updateCurrentMiss(data.missTimes);
				createIntervalFunc("getLastData('"+lastDataUrl+"','"+provinceDm+"')",paramObj.intervalCycle);
				// setInterval("getLastData()",paramObj.intervalTime);//3秒一次执行
				  timer();
	              setInterval("timer()",1000);//1秒一次执行
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
	
	///////////////////////////////////////////
	function initLayoutHeight(windowHeight){
		$('.headDiv').height(paramObj.clientPix*2);
		$('.bottomDiv').height(paramObj.clientPix*3);
		$('.contentDiv').height(window.screen.height-paramObj.clientPix*5);
		
	}

	function updateBlankIssue(lastIssueNumber){
		var tds =  $("#bottomTable tr").eq(0).find("td");
		var nextIssueNumber = lastIssueNumber.toString().substring(7,9)*1+1;
		$.each(tds,function(i,td){
			if(i == 0){
//				$(td).css('background-color','#CCE5A3');
				$(td).css('color' ,'black');
				$(td).html(nextIssueNumber%100);
			}
			if(i == 22){
				return true;
			}
			$(td).css('background-color','#EEEEEC');
		});
	}
	
	function updateTodayTimes(todayTimes){
		var winNumTodayTimes =  $("#bottomTable tr").eq(1).find("td");
		$.each(winNumTodayTimes,function(i,td){
			if(i == 0 || i >= todayTimes.length){
				return true;
			}
			$(td).html(todayTimes[i-1]);
		});
	}

	function updateCurrentMiss(missValues){
		var winNummissValues =  $("#bottomTable tr").eq(2).find("td");
		$.each(winNummissValues,function(i,td){
			if(i == 0 || i >= missValues.length){
				return true;
			}
			$(td).html(missValues[i-1]);
		});
	}



	/*
	 add by songj
	 since 2014-10-22 16:23
	 desc 按照时间间隔后台读取最新数据
	 */
	function getLastData(lastDataUrl,provinceDm){
		var url=lastDataUrl+"getLastData.do";
		$.ajax({
			type:"post",
			url: url,
			dataType:'JSON',
			async:false,
			data : {
				lastIssueId : lastIssueId,
				todayTimes : JSON.stringify(todayTimes),
				missTimes : JSON.stringify(missValues),
				provinceDm : provinceDm
			},
			success: function(data) {
				////////////////////////////////////////
				if(!$.isEmptyObject(data)){
					//清除time函数并重新创建
					if(paramObj.getLastRecordTimeId != 0){
						clearTimeout(paramObj.getLastRecordTimeId);
					}
					alert(paramObj.getLastRecordIntervalId);
					if(paramObj.getLastRecordIntervalId != 0){
						clearInterval(paramObj.getLastRecordIntervalId);
					}
					//重启一个新的任务
					//当每天到最后一期后，则不在重新创建心的任务，等明天开机再一次正常进行
					var record = data.record;
					lastIssueId = record.issueNumber*1;
					if(record.issueNumber.substring(7,9) != paramObj.maxTodayIssueNum){
						createTimeFunction(lastDataUrl,provinceDm);
					}
					var tr = insertTr($('#dataTable').get(0));
					insertNumTd(tr,record);
					$('#dataTable tr:first').remove();
					todayTimes = data.todayTimes;
					missValues = data.missTimes;
					updateBlankIssue(lastIssueId);
					updateTodayTimes(todayTimes);
					updateCurrentMiss(missValues);
					paramObj.mm = 10;
	           		paramObj.ss = 0;
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
		printIssueNum(trObj,data.issueNumber);
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
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			$(td).addClass('blackLine');
		}
		td.innerHTML=addZero(data.no1);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			$(td).addClass('blackLine');
		}
		td.innerHTML=addZero(data.no2);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			$(td).addClass('blackLine');
		}
		td.innerHTML=addZero(data.no3);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			$(td).addClass('blackLine');
		}
		td.innerHTML=addZero(data.no4);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		if(data.issueId%5 == 0){
			$(td).addClass('blackLine');
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
				if(data.issueNumber%2 == 0){
					$(td).addClass('tdOddCls');
				}
			}else if(i < 11){
				if(data.issueNumber%2 == 0){
					$(td).addClass('tdEvenCls');
				}
			}else if(i < 16){
				if(data.issueNumber%2 == 0){
					$(td).addClass('tdOddCls');
				}
			}else{
				if(data.issueNumber%2 == 0){
					$(td).addClass('tdEvenCls');
				}
			}

			if(isInArr(tempArr,i)&&i <= 18 ){
				if(data.no1 == i ){
					td.innerHTML='<img src="img/fivein20/red/' +i+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" />';
				}else{
					 td.innerHTML='<img src="img/fivein20/black/' +i+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" />';
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


	function insertBeforeLastTr(lastTr){
		var tr = document.createElement("tr");
		if(lastTr.length == 0){
			$('#dataTable').append(tr);
		}else{
			$(tr).insertBefore(lastTr);
		}
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

  	//倒计时方法
   	function timer(){
   		if(paramObj.ss == 0){
   			paramObj.mm--;
   			paramObj.ss = 59;
   		}else{
   			paramObj.ss--;
   		}
   		if(paramObj.mm >= 0){
	   		if(paramObj.ss < 10){
	   			$("#countDown").html("开奖时间:" + "0" + paramObj.mm + ":" + "0" + paramObj.ss);
	   		}else{
	   			$("#countDown").html("开奖时间:" + "0" + paramObj.mm + ":" + paramObj.ss);
	   		}
   		}else{
   			$("#countDown").html("开奖中...");
   		}
   	}


	/* ***********************定时任务设置区域*********************************** */
	//设置time方法 用于间隔调用获取最新数据周期函数

	function createTimeFunction(lastDataUrl,provinceDm){
		var func = "createIntervalFunc('getLastData(\""+lastDataUrl+"\",\""+provinceDm+"\")','"+paramObj.intervalCycle+"')";
		paramObj.getLastRecordTimeId = setTimeout(func,paramObj.timeCycle);
	}

	function createIntervalFunc(func,time){
		paramObj.getLastRecordIntervalId = setInterval(func,time);
	}