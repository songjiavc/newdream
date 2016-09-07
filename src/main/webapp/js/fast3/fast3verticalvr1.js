	///////////////////////////////////////////
    var paramObj = {
        recordCount : 0,     // 记录条数
        clientPix : 25,		//单元格大小
        intervalTime : 3000
	    };
	var missValues,todayTimes;   //存放当前遗漏和今日出现次数内容
	var lastIssueId,lastRecord;
	var missLastIssueId;
	var sumDataArray = [],skipDataArray = [];  //存放上期开奖号码和和值数组内容
	
	///////////////////////////////////////////
	function initLayoutHeight(windowHeight){
		$('#Header').height(paramObj.clientPix*2);
		$('#Content').height(window.screen.height-paramObj.clientPix*8);
		$('#Footer').height(window.screen.height - $('#Content').height() - $('#Header').height());
		
	}

	/*
        add by songj
        since 2014-10-22 16:21
    */
    function initData(lastDataUrl,provinceDm){
    	//初始化页面布局
    	initLayoutHeight(window.screen.height);
    	var url=lastDataUrl+"getInitData.do";
        if(paramObj.recordCount == 0){
        	paramObj.recordCount = div($('#Content').height(),paramObj.clientPix);
        }
        $.ajax({
            type:"post",
            url: url,
            dataType:'JSON',
            async:false,
            data : {
                //传入后台的参数列表,预计传入的查询记录条数限制，保证不同分辨率的记录数
                count : paramObj.recordCount + controlParam.addCount,
                provinceDm : provinceDm
            },
            success: function(data) {
                var jsonObj = data;
                var dataArr = jsonObj.records;
                lastRecord = dataArr[dataArr.length-1];
                lastIssueId = lastRecord.numArray[0];
                $.each(dataArr,function(i,data){
                    var tr = insertTr($('#dataTable').get(0));
                    insertBaseNumTd(tr,data);
                    var adTr = insertTr($('#adDataTable').get(0));
                    insertAdNumTd(adTr,data);
                    var groupTr = insertTr($('#groupDataTable').get(0));
                    insertGroupNumTd(groupTr,data);
                });
                initDownLineParam();
                initDownLineArray();
                downLine();
                missLastIssueId = jsonObj.top3Miss[0].issueNumber;   //初始化完毕后前端存放最新的遗漏统计结果 。
                updateSimpleMissTable(jsonObj);
                updateMissTable(jsonObj);
                //setvalue to miss and todays
                missValues = jsonObj.missValues;
                todayTimes = jsonObj.todayTimes;
                layoutControlDiv();
                $('#mainDiv').css('marginTop',-paramObj.clientPix*(controlParam.addCount)+($('#Content').height() - paramObj.clientPix*paramObj.recordCount));
                setInterval("getLastData('"+lastDataUrl+"','"+provinceDm+"')",paramObj.intervalTime);//3秒一次执行
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
                //传入后台的参数列表,传入页面中显示的最后一期id
                lastIssueId : lastIssueId,
                missLastIssueId : missLastIssueId,
                todayTimes : JSON.stringify(todayTimes),
                lastRecord : JSON.stringify(lastRecord),
                provinceDm : provinceDm
            },
            success: function(data) {
            	if(data.record != null){
            		lastRecord = data.record;
	                lastIssueId = lastRecord.numArray[0];
	                var tr = insertTr($('#dataTable').get(0));
                    insertBaseNumTd(tr,lastRecord);
                    var adTr = insertTr($('#adDataTable').get(0));
                    insertAdNumTd(adTr,lastRecord);
                    var groupTr = insertTr($('#groupDataTable').get(0));
                    insertGroupNumTd(groupTr,lastRecord);
                    $("#dataTable tr:first").remove();
                    $("#adDataTable tr:first").remove();
                    $("#groupDataTable tr:first").remove();
                    todayTimes = data.todayTimes;
                    //undo 如果是第一个页面则执行否则不执行，等切换到的时候重新加载一遍。
                    if(controlParam.currentAd == 1){
                    				//将新插入的td 放到downline数组中
                    	$(adTr).find('td').each(function (){
                	   		intValueToArray(this);
            	   		});
                        				//重新定位数组中top坐标值，向上移动tr的高度一次直接拿到数组的上一个高度
                        var lastTop=0;
                        $.each(sumDataArray,function(i,newData){
                        	if(i == 0){
                        		lastdTop = newData.pageY;
                        	}
                        	var currentTop = newData.pageY;
                        	newData.pageY = lastTop;
                        	lastTop = currentTop;
                        });
                        sumDataArray.splice(0,1);
                        
                        $.each(skipDataArray,function(i,newData){
                        	if(i == 0){
                        		lastdTop = newData.pageY;
                        	}
                        	var currentTop = newData.pageY;
                        	newData.pageY = lastTop;
                        	lastTop = currentTop;
                        });
                        skipDataArray.splice(0,1);
    	                downLine();
                    }
                    updateSimpleMissTable(data);
                }
            	if(data.top3Miss != null){
            		missLastIssueId = data.top3Miss[0].issueNumber;   //初始化完毕后前端存放最新的遗漏统计结果 。
            		updateMissTable(data);
            	}
            }
        });
    }
  
    /*
        add by songj
        since 2014-10-22 15:09
        desc 插入一大行内容（该函数分四种插入方法）insert
    */
    function insertBaseNumTd(trObj,data){
        printIssueNum(trObj,data);
        printLuckyNum(trObj,data);
        printLuckyDist(trObj,data);
        printLuckyStatus(trObj,data.luckyNum[3]);   //打印状态
    }
    /*
    打印期号
*/
	function printIssueNum(trObj,data){
		var td = document.createElement("td");
		td.innerHTML = data.numArray[0].toString().substring(7,9);
		//debugger;
		$(td).val(data.numArray[0].toString().substring(7,9));
		$(td).addClass("issueNumberClass");
		trObj.appendChild(td);
		td.colSpan = '1';
	}
	/*
	    打印开奖号码
	*/
	function printLuckyNum(trObj,data){
		var luckyNumArr = data.luckyNum;
		for(var i = 0;i < luckyNumArr.length-1;i++){
			var td = document.createElement("td");
			td.colSpan=1;
			td.innerHTML=luckyNumArr[i];
			trObj.appendChild(td);
			$(td).addClass("luckyNumberClass");
			
		}
	}
	 /*
    add  by songj
    since 2014-10-22 16:04
    desc 打印lucky分布
*/
	function printLuckyDist(trObj,data){
		var numArray = data.numArray;
        var numArr = data.luckyNum;
        var rtnNum = isInArr(numArr);
	    var imgSrc;
	    for(var i = 1;i < numArray.length;i++){
	        var td = document.createElement('td');
	        if(data.numArray[0]%2 == 0){
	        	td.style.background = "#FEE7EF";
	        }
	        if(numArray[i] == 0){
	        	if(rtnNum.sameCount == 1){
	                imgSrc = 'img/fast3/black/';
	                td.innerHTML = '<img src="'+ imgSrc + i+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" />';
	            }else if(rtnNum.sameCount == 2){
	                if(i == rtnNum.sameNum){
	                    imgSrc = 'img/fast3/red/';
	                }else{
	                    imgSrc = 'img/fast3/black/';
	                }
	                td.innerHTML = '<img src="'+ imgSrc + i+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" />';
	            }else if(rtnNum.sameCount == 4){
	                imgSrc = 'img/fast3/blue/';
	                td.innerHTML = '<img src="'+ imgSrc + i+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" />';
	            }
        	}else{
        		// td.innerHTML = luckyNumArr[i];  遗漏暂时不打印
        	}
	        trObj.appendChild(td);
	    }
	  //定义内部函数处理数组存在问题
	    function isInArr(dataArr){
            var returnObj = {
                sameCount : 1,
                sameNum : 0
            };
            for(var j = 0;j < dataArr.length-2;j++){
                for(var i=j+1;i<dataArr.length-1;i++){
                    if(dataArr[j] == dataArr[i]){
                        returnObj.sameCount++;
                        returnObj.sameNum = dataArr[j];
                    }
                }
            }
            return returnObj;
        }
	    return rtnNum.sameCount;
}
	/*
	 * 打印附表内容
	 * */
	function insertAdNumTd(trObj,data){
		printLuckySumDist(trObj,data);  //和值分布
		printLuckySkipDist(trObj,data); //跨度分布
    }
	
	function insertGroupNumTd(trObj,data){
		printGroupNumDist(trObj,data);
	}
	
    function printLuckyStatus(trObj,sameCount){
        var td = document.createElement('td');
        td.style.color = "black";
        if(sameCount == 3){  //三不同
			td.style.background = "#999999";
	        td.innerHTML = '不';
        }else if(sameCount == 2){//两相同
        	td.style.background = "#FF6666";
            td.innerHTML = '二';
        }else if(sameCount == 1){//全相同
        	td.style.background = "#2D96FF";
            td.innerHTML = '三';
        }
        trObj.appendChild(td);
    }
    
    /*
                    三数转换为数组
    */
    function convertToArr(a,b,c){
        var tempArr = [];
        tempArr.push(a);
        tempArr.push(b);
        tempArr.push(c);
        return tempArr.sort();
    }
    /*
    add  by songj
    since 2014-10-22 16:04
    desc 打印合值
    */
    function printLuckySumDist(trObj,data){
    	var imgPath = getImgPathByStatus(data.luckyNum[3]);
    	var sumLoseArr  = data.sumLose;
    	for(var i = 0;i<sumLoseArr.length;i++){
            var td = document.createElement('td');
            trObj.appendChild(td);
            if(data.numArray[0]%2 == 0){
	        	td.style.background = "#eeeeec";
	        }
            if(sumLoseArr[i] == 0){
               var temp = i*1+3;
               td.innerHTML='<div style="position:relative;z-index:3;"><img src="'+ imgPath.color +temp+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" /></div>';
               td.kind = "sum";
               td.color = data.luckyNum[3];
            }
        }
        
    }
   
	/**
	 *    根据不同的号码状态获取
	 * @param status
	 * @returns {String}
	 */
	function getImgPathByStatus(status){
		var path = {};
		switch(status){
			case 1 : 
				path.color = "img/fast3/blue/";
				break;
			case 2 :
				path.color = "img/fast3/red/";
				path.other = "img/fast3/black/";
				break;
			case 3 : 
				path.color = "img/fast3/black/";
				break;
		}
		return path;
	}
  
    /*
    add  by songj
    since 2014-10-22 16:04
    desc print skip
	*/
    /*
    add  by songj
    since 2014-10-22 16:04
    desc 打印跨度分布
	*/
    function printLuckySkipDist(trObj,data){
    	var skipArr  = data.skipArray;
    	var imgSrc = getImgPathByStatus(data.luckyNum[3]);
	    for(var i = 0;i< skipArr.length;i++){
	        var td = document.createElement('td');
	        if(data.numArray[0]%2 == 0){
	        	td.style.background = "#FEE7EF";
	        }
	        trObj.appendChild(td);
	        if(skipArr[i] == 0){
	        	td.kind = "skip";
	        	td.color = data.luckyNum[3];
	        	td.innerHTML='<div style="position:relative;z-index:3;"><img src="'+ imgSrc.color +i+'.png"   width="'+(paramObj.clientPix*1-1)+'" height="'+(paramObj.clientPix*1-1)+'" /></div>';
	        }
	    }
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
     *	@desc : 打印组合分布
     *	@author : songjia
	 *	@since : 2016-03-03 	
	 */
	function printGroupNumDist(trObj,data){
		var groupReference = [11,22,33,44,55,66,12,13,14,15,16,23,24,25,26,34,35,36,45,46,56];
		var groupLoseArr  = data.groupLose;
		var imgSrc;
		for(var i = 0;i<groupLoseArr.length;i++){
			var td = document.createElement("td");
			td.height = paramObj.clientPix;
			if(i < 6){
				if(groupLoseArr[i] == 0){
					if(data.luckyNum[3] == 1){
						imgSrc = 'img/fast3/group/blue/';
					}else{
						imgSrc = 'img/fast3/group/red/';
					}
					td.innerHTML = '<img src="'+ imgSrc + groupReference[i]+'.png"   width="'+(paramObj.clientPix*1-4)+'" height="'+(paramObj.clientPix*1-1)+'" />';
				}else{
					td.style = "background:#eeeeec;";
				}
			}else{
				imgSrc = 'img/fast3/group/black/';
				if(groupLoseArr[i] == 0){
					td.innerHTML = '<img src="'+ imgSrc + groupReference[i]+'.png"   width="'+(paramObj.clientPix*1-4)+'" height="'+(paramObj.clientPix*1-1)+'" />';
				}else{
					td.style = "background:#FEE7EF;";
				}
			}
			trObj.appendChild(td);
		}
	}

