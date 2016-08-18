/**
 * @author songj
 * @description 时代枫公用js类,提供基础方法和
 * @since 2014-12-11
 */
      
    /*
     * @description 整型从小到大排序
     * @since 2014-12-11
     * @author songj
     * */
    Array.prototype.numSort = function(){
    	this.sort(function(a,b){return a - b});
    }
    var dataArr = [];
    /*
     * 
     * 
     * 
     * */
    function changeOverCss(obj){
        $(obj).attr("src", "img/util/"+obj.id+"_mouseOver.png");
    }
    function changeOutCss(obj){
        $(obj).attr("src", "img/util/"+obj.id+".png");
    }
    
    /*
     * @author songj
     * @desc 移动函数，所有页面通用
     * @since 2014-12-27
     * tableId为数组类型，传入需要滚动的tableid
     * 
     * */
    function moveUp(obj,tableIds){
    	/*模拟翻页功能 */
    	if(paramObj.isFinish){
        	//var tableArr = tableIds.split(',');
            if(paramObj.currentNum > 8){
            	//alert("对不起,系统只提供最近160期的查看！");
            	paramObj.isFinish = true;
            	return false;
            }
            if(paramObj.utilFlag=='jlhappy3vertical'){
            	$('#last_ten').addClass("last_tenClass");
            	$('#show_font').removeClass("show_font");
            	$('#show_font').addClass("show_fontClass");
            	paramObj.isFinish = false;
            	paramObj.currentNum++;
            	$('#numData,#analyseData,#canvasMain').css('marginTop',-paramObj.clientPix*(160-(paramObj.currentNum-1)*20)); 
            	layoutControlDiv(['#numData','#analyseData','#canvasMain']);
            	paramObj.isFinish=true;
            }
            if(paramObj.utilFlag=='yingkou'){
            	$('#dataTableTMain').css('display','');
            	paramObj.isFinish = false;
                paramObj.currentNum++;
                $('#dataTable').css('marginTop',-paramObj.clientPix*(160-(paramObj.currentNum-1)*20)); 
                layoutControlDiv(['#dataTable']);
                paramObj.isFinish=true;
            }
         
    	}
    }
    /*设置一个定时返回最初状态*/
    function getInterval(timer){
    	 setInterval("getMoveLast()", timer);	
    };
    
    /*鼠标悬停90秒自动跳到最初状态*/
    function getMoveLast(){
    	if(paramObj.utilFlag=='jlhappy3vertical'){
    		$('#last_ten').removeClass("last_tenClass");
       	 	$('#show_font').removeClass("show_fontClass");
       	 	$('#show_font').addClass("show_font");
       	 	$('#numData,#analyseData,#canvasMain').css('marginTop',-paramObj.clientPix*160);
       	 	layoutControlDiv(['#numData','#analyseData','#canvasMain']);
    	}
    	if(paramObj.utilFlag=='yingkou'){
    		$('#dataTableTMain').css('display','none');
    		$('#dataTable').css('marginTop',-paramObj.clientPix*160);
       	 	layoutControlDiv(['#dataTable']);
    	} 
    	
    }
    
    /*获取指定的翻页记录内容*/
   // function getShowData(currentNum,dataArr){
   // 	var startIndex = dataArr.length - paramObj.recordCount-20*currentNum;
   // 	return dataArr.slice(startIndex,startIndex+20);
  //  }
    /**
     * 
     * @param {} tableId
     */
    /*
     * @author songj
     * @desc 移动函数，所有页面通用
     * @since 2014-12-27
     * 
     * */
    function moveDown(tableId){
    	if(paramObj.isFinish){
        	if(paramObj.currentNum == 1){
        	   //alert("已经显示为最新数据，不能进行下翻！");
        	   return false;
        	}
        	//paramObj.timer=90000;
    		paramObj.isFinish = false;
        	paramObj.currentNum--;
        	if(paramObj.utilFlag=='jlhappy3vertical'){
        		$('#numData,#analyseData,#canvasMain').css('marginTop',-paramObj.clientPix*(160-(paramObj.currentNum-1)*20));
                layoutControlDiv(['#numData','#analyseData','#canvasMain']);
            	//$(tableId).animate({ marginTop : parseInt($(tableId).css('marginTop')) - paramObj.clientPix*20 }, "fast",function(){
            		paramObj.isFinish=true;
                //});
            		if(paramObj.currentNum == 1){
            			$('#last_ten').removeClass("last_tenClass");
            			$('#show_font').removeClass("show_fontClass");
            	    	$('#show_font').addClass("show_font");
                 	}
        	}
        	if(paramObj.utilFlag=='yingkou'){
        		$('#dataTableTMain').css('display','');
        		$('#dataTable').css('marginTop',-paramObj.clientPix*(160-(paramObj.currentNum-1)*20));
                layoutControlDiv(['#dataTable']);
            	paramObj.isFinish=true;
            	if(paramObj.currentNum == 1){
            		$('#dataTableTMain').css('display','none');
            	}
        	}
        	
        }
    	
    }
    /*
     * @author songj
     * @desc 还原按钮
     * @since 2014-12-27
     * 
     * */
    function moveLast(tableId){
    	if(paramObj.isFinish){
        	if(paramObj.currentNum == 1){
        	   //alert("已经显示为最新数据，不需要还原！");
        	   return false;
        	}
        	if(paramObj.utilFlag=='jlhappy3vertical'){
        		$('#last_ten').removeClass("last_tenClass");
            	$('#show_font').removeClass("show_fontClass");
           	 	$('#show_font').addClass("show_font");
        		paramObj.isFinish = false;
        		$('#numData,#analyseData,#canvasMain').css('marginTop',-paramObj.clientPix*160);
                layoutControlDiv(['#numData','#analyseData','#canvasMain']);
                paramObj.isFinish=true;
                paramObj.currentNum = 1;
        	}
        	if(paramObj.utilFlag=='yingkou'){
        		paramObj.isFinish = false;
        		$('#dataTable').css('marginTop',-paramObj.clientPix*160);
                layoutControlDiv(['#dataTable']);
                paramObj.isFinish=true;
                paramObj.currentNum = 1;
                if(paramObj.currentNum == 1){
            		$('#dataTableTMain').css('display','none');
            	}
        		
        	}
        	
    	}
    }
    function insertBeforeFirstTr(tableId){
        var trJo = $("<tr></tr>");
        trJo.insertBefore($(tableId+' tr:first'));
        return trJo.get(0);
    }
    /*   
     *   @desc : 浮动功能框
     *   @author : songj
         @date 2014-12-18
     */
    function layoutControlDiv(tableIds){
        var divJo = $("<div></div>");
        divJo.addClass("controlDiv");
        $("body").append(divJo);
        divJo.offset({
            left : 720/2 - divJo.width()/2,
            top : window.screen.height/2 - divJo.height()/2
        });
	   /*
         $("body").mousemove(function(){
             divJo.show();
         });
         */
         divJo.hover(	 
             function(){
             	divJo.css({
                    opacity:'0.8'
             	});
             },
             function () {
                 divJo.css({
                    opacity:'0.0'
                });
             }
         );


         var tbJo = $("<table style='position: absolute; table-layout: fixed;' width='100%' height='100%'></table>");
         divJo.append(tbJo);
         var trUpJo = $("<tr></tr>");
         var trCenterJo = $("<tr></tr>");
         var trDownJo = $("<tr></tr>");
         tbJo.append(trUpJo);
         tbJo.append(trCenterJo);
         tbJo.append(trDownJo);
         trUpJo.append($("<td></td>")).append($("<td><img src='img/util/up.png' id='up' onMouseOut='changeOutCss(this)'  width='80' height='80' onclick='moveUp(this,\""+tableIds+"\")' onmouseover='changeOverCss(this)' /></td>")).append($("<td></td>"));
         trCenterJo.append($("<td><img src='img/util/left.png' id='left' onMouseOut='changeOutCss(this)' width='80' height='80' onmouseover='changeOverCss(this)' /></td>")).append($("<td><img src='img/util/center.png' id='center' onMouseOut='changeOutCss(this)' width='80' height='80' onclick='moveLast(\""+tableIds+"\")' onmouseover='changeOverCss(this)' /></td>")).append($("<td><img src='img/util/right.png' id='right' onMouseOut='changeOutCss(this)' width='80' height='80' onmouseover='changeOverCss(this)' /></td>"));
         trDownJo.append($("<td></td>")).append($("<td><img src='img/util/down.png' id='down' onMouseOut='changeOutCss(this)' width='80' height='80' onclick='moveDown(\""+tableIds+"\")' onmouseover='changeOverCss(this)' /></td>")).append($("<td></td>"));
         
     }
