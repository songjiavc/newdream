


	/*  desc : 参数配置,不同分辨率不同玩法参数定义部分
	 author : songj
	 date : 2014-10-28
	 */
	var paramObj = {
		poolNum : 20,        // 球池数量
		recordCount : 0,     // 记录条数
		width : 720,
		clientPix : 28,
		
		//获取数据的时间函数参数
		intervalCycle : 1000*10,    // 每隔10秒执行一次
		timeCycle : 1000*60*9,     // 每隔9分钟执行一次
		//获取遗漏的时间参数
		missTimeCycle : 1000*60*9,
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
	var lastMissIssueNumber;
	///////////////////////////////////////////
	function initLayoutHeight(windowHeight){
		paramObj.clientPix = div(windowHeight,38);
		paramObj.fontSize = getFontSizeByClientPix(paramObj.clientPix);
		//debugInfo();
		initTrHeight(paramObj.clientPix);
		initTdFontSize(paramObj.fontSize);
		$('#header').height(windowHeight-paramObj.clientPix*36);
		$('#Content').height(paramObj.clientPix*36);
	}
	function debugInfo(){
		alert("paramObj.clientPix:" + paramObj.clientPix);
		alert("paramObj.fontSize:" + paramObj.fontSize);
		
	}
	  /**
     * 初始化所有tr的高度
     */
	function initTrHeight(height){
		$.each($('tr'),function(i,tr){
			$(tr).height(height);
		});
	}
	
	function initTdFontSize(fontSize){
		$.each($('td'),function(i,table){
			$(table).css("font-size",fontSize);
		});
		$.each($('th'),function(j,th){
			$(th).css("font-size",fontSize);
		});
	}
	
	/**
	 * 创建响应性字体大小
	 */
	function getFontSizeByClientPix(clientPix){
		if(clientPix <= 10){
			return "5";
		}
		if(clientPix <= 13){
			return "6";
		}
		if(clientPix <=15){
			return "8";
		}
		if(clientPix <=20){
			return "10";
		}
		if(clientPix <=25){
			return "14";
		}
		if(clientPix <=35){
			return "18";
		}
		if(clientPix <=50){
			return "22";
		}
	}
	
	function div(exp1, exp2)
	{
		var n1 = Math.round(exp1); //四舍五入
		var n2 = Math.round(exp2); //四舍五入

		var rslt = n1 / n2; //除

		if (rslt >= 0)
		{
			rslt = Math.floor(rslt); //返回值为小于等于其数值参数的最大整数值。
		}

		return rslt;
	}
	/*
	 add by songj
	 since 2014-10-22 16:21
	 */
	
	
	function initData(lastDataUrl,provinceDm){
		initLayoutHeight(window.screen.height);
		var url=lastDataUrl+"getTopNAllMissValues.do";
		$.ajax({
			type:"post",
			url: url,
			dataType:'JSON',
			async:false,
			data : {
				//传入后台的参数列表,预计传入的查询记录条数限制，保证不同分辨率的记录数
				provinceDm : provinceDm
			},
			success: function(data) {
				lastMissIssueNumber = data[0].issueNumber*1;
				//初始化获取遗漏统计数据
				createMissIntervalFunc("getLastMissValues('"+lastDataUrl+"','"+provinceDm+"')",paramObj.intervalCycle);
			    timer();
				updateMissLayout(data);
	            setInterval("timer()",1000);//1秒一次执行
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
					rtn = rtn + ' ' + char;
				}else{
					rtn = rtn + ' ' + translate(char);
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
	function getLastMissValues(lastDataUrl,provinceDm){
		var url=lastDataUrl+"getTopNAllMissValues.do";
		$.ajax({
			type:"post",
			url: url,
			dataType:'JSON',
			async:false,
			data : {
				lastMissIssueNumber : lastMissIssueNumber,
				provinceDm : provinceDm
			},
			success: function(data) {
				////////////////////////////////////////
				if(!$.isEmptyObject(data)){
					//清除time函数并重新创建
					lastMissIssueNumber =  data[0].issueNumber*1;
					if(paramObj.getMissValuesTimeId != 0){
						clearTimeout(paramObj.getMissValuesTimeId);
					}
					if(paramObj.getMissValuesIntervalId != 0){
						clearInterval(paramObj.getMissValuesIntervalId);
					}
					//更新遗漏统计表数据
					updateMissLayout(data);
					paramObj.mm = 10;
	           		paramObj.ss = 0;
	           		if(lastMissIssueNumber.toString().substring(7,9) != paramObj.maxTodayIssueNum){
	           			createMissValuesTimeFunction(lastDataUrl,provinceDm);
					}
				}
			}
		});
	}
	
	function updateMissLayout(missValues){
		//更新期号
		$('#missIssueNumber').html("期号:"+lastMissIssueNumber);
		//获取div下面所有table
		var tds = $('.typeGroup td');
		var temp = 0;
		$.each(tds,function(i,td){
			temp = i + 1;
			if(temp%3 == 1){
				$(td).html(translateGroup(missValues[parseInt(i/3)].groupNumber));
			}else if(temp%3 == 2){
				$(td).html(missValues[parseInt(i/3)].maxMiss);
			}else{
				$(td).html(missValues[parseInt(i/3)].currentMiss);
			}
		});
		//获取table下所有td
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
	   			$("#countDown").html("倒计时:" + "0" + paramObj.mm + ":" + "0" + paramObj.ss);
	   		}else{
	   			$("#countDown").html("倒计时:" + "0" + paramObj.mm + ":" + paramObj.ss);
	   		}
   		}else{
   			$("#countDown").html("统计中...");
   		}
   	}


   	//循环显示遗漏div方法
   	function showMissDiv(div){
   		if($.isEmptyObject(div)){
			i=0;
			div = missDivs[0];
		}
   		$(div).css('display','inline');
   		i++;
   		paramObj.showMissDivTimeId = setTimeout('showMissDiv(missDivs[i])',10000);
   	}
   	
	/* ***********************定时任务设置区域*********************************** */
	//设置time方法 用于间隔调用获取最新数据周期函数
	
	function createMissValuesTimeFunction(lastDataUrl,provinceDm){
		var func = "createMissIntervalFunc('getLastMissValues(\""+lastDataUrl+"\",\""+provinceDm+"\")','"+paramObj.intervalCycle+"')";
		paramObj.getMissValuesTimeId = setTimeout(func,paramObj.missTimeCycle);
	}
	function createMissIntervalFunc(func,time){
		paramObj.getMissValuesIntervalId = setInterval(func,time);
	}

	
	
	