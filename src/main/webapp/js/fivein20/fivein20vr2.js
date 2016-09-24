


	/*  desc : 参数配置,不同分辨率不同玩法参数定义部分
	 author : songj
	 date : 2014-10-28
	 */
	var paramObj = {
		poolNum : 20,        // 球池数量
		recordCount : 0,     // 记录条数
		width : 720,
		clientPix : 25,
		
		//获取数据的时间函数参数
		intervalCycle : 1000*10,    // 每隔10秒执行一次
		timeCycle : 1000*60*9,     // 每隔9分钟执行一次
		//获取遗漏的时间参数
		missTimeCycle : 1000*60*2,
		//
		addCount : 160,//记录增加翻页数量
		currentNum : 1,//上下滚屏次数
		maxTodayIssueNum : 78,    //该彩种一天一共多少期
		isFinish : true,//判断滚屏状态
		////////////////////
		getLastRecordIntervalId : 0,
		getLastRecordTimeId : 0,
		//用于获取遗漏数据时间周期
		getMissValuesTimeId : 0,
		getMissValuesIntervalId : 0,
		showMissDivTimeId : 0,
		////////////////////
		ss : 0,
    	mm : 10
    	//循环展示遗漏div使用
    	
    	
	};
	//用来存放今日出现次数和遗漏值
	var missValues,todayTimes,shun1Miss,shun1MaxMiss;
	var lastIssueNumber;
	var missDivs,i = 0;
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
				lastIssueNumber = dataArr[0].issueNumber*1;
				$.each(dataArr,function(i,data){
					var tr = insertBeforeLastTr($('#dataTable tr:first'));
					insertNumTd(tr,data);
				});
				$('#dataTable').css('marginTop',-paramObj.clientPix*paramObj.addCount+($('#Content').height() - paramObj.clientPix*paramObj.recordCount-1));
				//更新今日出现次数
				updateBlankIssue(lastIssueNumber);
				todayTimes = data.todayTimes;
				missValues = data.missTimes;
				shun1Miss = data.shun1Miss;
				shun1MaxMiss = data.shun1MaxMiss;
				updateTodayTimes(data.todayTimes);
				//更新当前遗漏值
				updateCurrentMiss(data.missTimes);
				updateShun1Miss(data.shun1Miss);
				updateShun1MaxMiss(data.shun1MaxMiss);
				//初始化获取新数据
				createIntervalFunc("getLastData('"+lastDataUrl+"','"+provinceDm+"')",paramObj.intervalCycle);
				//初始化获取遗漏统计数据
				createMissIntervalFunc("getLastTopNMissValues('"+lastDataUrl+"','"+provinceDm+"')",paramObj.intervalCycle);
				timer();
	            setInterval("timer()",1000);//1秒一次执行
	            layoutControlDiv();
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
		$('.bottomDiv').height(paramObj.clientPix*5);
		$('#Content').height(window.screen.height-paramObj.clientPix*7);
		
	}

	function updateBlankIssue(lastIssueNumber){
		var tds =  $("#bottomTable tr").eq(0).find("td");
		var nextIssueNumber = lastIssueNumber.toString().substring(7,9)*1+1;
		if(nextIssueNumber == 79){
			nextIssueNumber = "01";
		}else if(nextIssueNumber<10){
			nextIssueNumber = "0" + nextIssueNumber;
		}
		$.each(tds,function(i,td){
			if(i == 0){
				$(td).css('color' ,'black');
				$(td).css('background-color','#d0d5d8');	
				$(td).html(nextIssueNumber);
			}else if(i == 1){
				$(td).css('background-color','#fffacd');
			}else if(i < 7){
				$(td).css('background-color','#E0EEEE');
			}else if(i < 12){
				$(td).css('background-color','#CCE5A3');
			}else if(i < 17){
				$(td).css('background-color','#E0EEEE');
			}else if(i < 22){
				$(td).css('background-color','#CCE5A3');
			}else if(i < 24){
				$(td).css('background-color','white');
			}
		});
	}
	
	function updateTodayTimes(todayTimes){
		var winNumTodayTimes =  $("#bottomTable tr").eq(1).find("td");
		$.each(winNumTodayTimes,function(i,td){
			if(i == 0){
				return true;
			}
			$(td).html(todayTimes[i-1]);
		});
	}

	function updateCurrentMiss(missValues){
		var winNummissValues =  $("#bottomTable tr").eq(2).find("td");
		$.each(winNummissValues,function(i,td){
			if(i == 0 || i > missValues.length){
				return true;
			}
			$(td).html(missValues[i-1]);
		});
	}
    	//更新顺一遗漏
	function updateShun1Miss(shun1Miss){
		var winNummissValues =  $("#bottomTable tr").eq(3).find("td");
		$.each(winNummissValues,function(i,td){
			if(i == 0 || i > shun1Miss.length){
				return true;
			}
			$(td).html(shun1Miss[i-1]);
		});
	}
	//更新顺一最大遗漏
	function updateShun1MaxMiss(shun1MaxMiss){
		var winNummissValues =  $("#bottomTable tr").eq(4).find("td");
		$.each(winNummissValues,function(i,td){
			if(i == 0 || i > shun1MaxMiss.length){
				return true;
			}
			$(td).html(shun1MaxMiss[i-1]);
		});
	}

	function updateMissLayout(missValues){
		//获取div下面所有table
		var tds = $('#groupTwo td');
		var temp = 0;
		$.each(tds,function(i,td){
			temp = i + 1;
			if(temp%3 == 1){
				$(td).html(translateGroup(missValues[parseInt(i/3)].groupNumber));
			}else if(temp%3 == 2){
				$(td).html(missValues[parseInt(i/3)].currentMiss);
			}else{
				$(td).html(missValues[parseInt(i/3)].maxMiss);
			}
		});
		//获取table下所有td
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
				lastIssueNumber : lastIssueNumber,
				todayTimes : JSON.stringify(todayTimes),
				missTimes : JSON.stringify(missValues),
				shun1Miss :  JSON.stringify(shun1Miss),
				shun1MaxMiss : JSON.stringify(shun1MaxMiss),
				provinceDm : provinceDm
			},
			success: function(data) {
				////////////////////////////////////////
				if(!$.isEmptyObject(data)){
					//清除time函数并重新创建
					if(paramObj.getLastRecordTimeId != 0){
						clearTimeout(paramObj.getLastRecordTimeId);
					}
					if(paramObj.getLastRecordIntervalId != 0){
						clearInterval(paramObj.getLastRecordIntervalId);
					}
					//清楚完毕
					//重启一个新的任务
					//当每天到最后一期后，则不在重新创建心的任务，等明天开机再一次正常进行
					var record = data.record;
					lastIssueNumber = record.issueNumber*1;
					if(record.issueNumber.substring(7,9) != paramObj.maxTodayIssueNum){
						createTimeFunction(lastDataUrl,provinceDm);
						createMissValuesTimeFunction(lastDataUrl,provinceDm);
					}
					var tr = insertTr($('#dataTable').get(0));
					insertNumTd(tr,record);
					$('#dataTable tr:first').remove();
					todayTimes = data.todayTimes;
					missValues = data.missTimes;
					shun1Miss = data.shun1Miss;
					shun1MaxMiss = data.shun1MaxMiss;
					updateTodayTimes(data.todayTimes);
					//更新当前遗漏值
					updateCurrentMiss(data.missTimes);
					updateShun1Miss(data.shun1Miss);
					updateShun1MaxMiss(data.shun1MaxMiss);
					updateBlankIssue(lastIssueNumber);
					paramObj.mm = 10;
	           		paramObj.ss = 0;
				}
			}
		});
	}
	
	
	function translateGroup(groupNumber){
		var rtn;
		for(var i = 0;i < groupNumber.length;i++){
			var char = groupNumber.charAt(i);
			if(i == 0){
				rtn = translate(char);
			}else{
				if(char < '10'){
					rtn = rtn + ',' + char;
				}else{
					rtn = rtn + ',' + translate(char);
				}
			}
		}
		return rtn;
		function translate(char){
			switch(char)
			{
			case 'A':
				return '10';
				break;
			case 'B':
				return '11';
				break;
			case 'C':
			  return '12';
			  break;
			case 'D':
				  return '13';
				  break;
			case 'E':
				  return '14';
				  break;
			case 'F':
				  return '15';
				  break;
			case 'G':
				  return '16';
				  break;
			case 'H':
				  return '17';
				  break;
			case 'I':
				  return '18';
				  break;
			case 'J':
				  return '19';
				  break;
			case 'K':
				  return '20';
				  break;
			default:
			  return char;
			}
		}
	}
	
	/**
	 * 
	 * @param trObj
	 * @param data
	 * @returns
	 */
	
	/*
	 add by songj
	 since 2014-10-22 16:23
	 desc 按照时间间隔后台读取最新数据
	 */
	function getLastTopNMissValues(lastDataUrl,provinceDm){
		var url=lastDataUrl+"getLastTopNMissValues.do";
		$.ajax({
			type:"post",
			url: url,
			dataType:'JSON',
			async:false,
			data : {
				lastIssueNumber : lastIssueNumber,
				provinceDm : provinceDm
			},
			success: function(data) {
				////////////////////////////////////////
				if(!$.isEmptyObject(data)){
					//清除time函数并重新创建
					if(paramObj.getMissValuesTimeId != 0){
						clearTimeout(paramObj.getMissValuesTimeId);
					}
					if(paramObj.getMissValuesIntervalId != 0){
						clearInterval(paramObj.getMissValuesIntervalId);
					}
					//更新遗漏统计表数据
					updateMissLayout(data);
					//将遗漏层展示出来
					$('#groupTwo').css('display','inline');
					//循环显示遗漏内容
					missDivs = $('.typeGroup');
					showMissDiv(missDivs[0]);
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
		printIssueNum(trObj,data);
		printLuckyNum(trObj,data);
	    printLuckyDist(trObj,data);
		printBigEven(trObj,data);
	}
	/*
	 打印期号
	 */
	function printIssueNum(trObj,data){
		var td = document.createElement("td");
		var issueNum = data.issueNumber;
		td.colSpan = '3';
		if(isAllOdd(data) == "common"){
			td.innerHTML = issueNum.toString().substring(7,9);
		}else if(isAllOdd(data) == "AllOdd"){
			td.innerHTML = "全奇";
		}else{
			td.innerHTML = "全偶";
		}
		trObj.appendChild(td);
		if(issueNum%5 == 0){
			$(td).addClass('blackLine');
		}
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
		$(td).css('background-color','#D0D5D8');
		if(issTemp==adnZ){
			$(td).css('background-color','#CCE5A3');
		}
		if(issTemp==adnQ){
			$(td).css('background-color','#F9D193');
		}

	}
	function isAllOdd(data){
		if(data.no1%2==1&&data.no2%2==1&&data.no3%2==1&&data.no4%2==1&&data.no5%2==1){
			return "AllOdd";
		}else if(data.no1%2==1&&data.no2%2==1&&data.no3%2==1&&data.no4%2==1&&data.no5%2==1){
			return "AllEven";
		}else{
			return "common";
		}
		
	}
	/*
	 打印开奖号码
	 */
	function printLuckyNum(trObj,data){
		var td = document.createElement("td");
		td.colSpan = 2;
		$(td).css("background-color","#FFFACD");
		
		if(data.issueNumber%5 == 0){
			$(td).addClass('blackLine');
		}
		td.innerHTML=addZero(data.no1);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		$(td).css("background-color","#FFFACD");
		if(data.issueNumber%5 == 0){
			$(td).addClass('blackLine');
		}
		td.innerHTML=addZero(data.no2);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		$(td).css("background-color","#FFFACD");
		if(data.issueNumber%5 == 0){
			$(td).addClass('blackLine');
		}
		td.innerHTML=addZero(data.no3);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		$(td).css("background-color","#FFFACD");
		if(data.issueNumber%5 == 0){
			$(td).addClass('blackLine');
		}
		td.innerHTML=addZero(data.no4);
		trObj.appendChild(td);
		var td = document.createElement("td");
		td.colSpan = 2;
		$(td).css("background-color","#FFFACD");
		if(data.issueNumber%5 == 0){
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
			if(data.issueNumber%5 == 0){
				$(td).addClass('blackLine');
			}
			if(i < 6){
					$(td).addClass('tdOddCls');
			}else if(i < 11){
					$(td).addClass('tdEvenCls');
			}else if(i < 16){
					$(td).addClass('tdOddCls');
			}else{
					$(td).addClass('tdEvenCls');
			}

			if(isInArr(tempArr,i)&&i <= 20 ){
				if(data.no1 == i ){
					td.innerHTML='<img src="img/fivein20/vr1/red/' +i+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" />';
				}else{
					 td.innerHTML='<img src="img/fivein20/vr1/blue/'+i+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" />';
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
		td.colSpan = 2;
		if(data.issueNumber%5 == 0){
			$(td).addClass('blackLine');
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
		td.colSpan = 2;
		if(data.issueNumber%5 == 0){
			$(td).addClass('blackLine');
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


   	//循环显示遗漏div方法
   	function showMissDiv(div){
   		if(!$.isEmptyObject(paramObj.showMissDivTimeId)){
			clearTimeout(paramObj.showMissDivTimeId);
		}
   		if($.isEmptyObject(div)){
			i=0;
			$(missDivs).css('display','none');
			$('#groupTwo').css('display','none');
			return false;
		}
   		$(div).css('display','inline');
   		i++;
   		paramObj.showMissDivTimeId = setTimeout('showMissDiv(missDivs[i])',10000);
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
	
	function createMissValuesTimeFunction(lastDataUrl,provinceDm){
		var func = "createMissIntervalFunc('getLastTopNMissValues(\""+lastDataUrl+"\",\""+provinceDm+"\")','"+paramObj.intervalCycle+"')";
		paramObj.getMissValuesTimeId = setTimeout(func,paramObj.missTimeCycle);
	}
	function createMissIntervalFunc(func,time){
		paramObj.getMissValuesIntervalId = setInterval(func,time);
	}

	
	
	