	
	/**
	 		* 初始化要画线的部分
	 */
	function updateSimpleMissTable(data){
		//合并数组  undo  遗漏的内容我直接取消了
		var temp = ['-'];
		var concatTodaySumSkipArr = data.todayTimes.sumNumDist.concat(data.todayTimes.skipNumDist);
		var concatMissSumSkipArr = lastRecord.sumLose.concat(lastRecord.skipArray);
		//获取最后一期的遗漏值
		
		var winNumDistTds =  $("#simpleMissTableBase tr").eq(0).find("td");
		var winNumMissTds =  $("#simpleMissTableBase tr").eq(1).find("td");
		var sumDistTds =  $("#simpleMissTableAd tr").eq(0).find("td");
		var sumMissTds =  $("#simpleMissTableAd tr").eq(1).find("td");
		//获取组合内容的遗漏td
		var groupTodayTds = $("#simpleMissGroupAd tr").eq(0).find("td");
		var groupMissTds = $("#simpleMissGroupAd tr").eq(1).find("td");
		
		//var missArr = $("#simpleMissTable #simpleMissTableAd tr").eq(1).find("td");   	  //今日出现次数
		setWinNumDist(data.todayTimes.winNumDist,winNumDistTds);
		setWinNumDist(lastRecord.numArray.slice(1),winNumMissTds);
		setSumSkipDist(concatTodaySumSkipArr,sumDistTds);
		setSumSkipDist(concatMissSumSkipArr,sumMissTds);
		//打印组合当日出现次数
		setSumSkipDist(data.todayTimes.groupNumDist,groupTodayTds);
		//打印遗漏值
		setSumSkipDist(lastRecord.groupLose,groupMissTds);
		
   	}
	
	
	/**简单遗漏赋值方法
	 * @param textArr
	 * @param tdArr
	 */
	function setWinNumDist(textArr,tdArr){
		$.each(tdArr,function(i,td){
			if(i == 0 || i == tdArr.length){
				return true;
			}
			$(td).html(textArr[i-1]);
		});
	}
	/**简单遗漏赋值方法
	 * @param textArr
	 * @param tdArr
	 */
	function setSumSkipDist(textArr,tdArr){
		$.each(tdArr,function(i,td){
			$(td).html(textArr[i]);
		});
	}
	
	
	/**更新遗漏表格
	 * @param data
	 */
	function updateMissTable(data){
		//合并数组
		//var objArr = data.
		setMissValues(data.top3Miss);
   	}
	function setMissValues(textArr){
		for(var i=0;i<textArr.length/3;i++){
			var j = i*3;
			$('#missTable tr').each(function(p,tr){
				if(p==0){
					return true;
				}
				$(tr).find('td').eq(i).html(textArr[j+p-1].groupNumber+"-"+textArr[j+p-1].currentMiss+"期");
			});
		}
	}