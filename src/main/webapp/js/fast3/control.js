/**
 * @author songj
 * @since 2014-12-11
 */
	var controlParam = {
    	currentNum : 1,
    	currentAd : 1,
    	scrollCount : 20,
    	addCount : 160,
    	isFinish : true,
    	intervalId : 0,
    	timer : 90000
    };
      
    /*
     * @description 整型从小到大排序
     * @since 2014-12-11
     * @author songj
     * */
    Array.prototype.numSort = function(){
    	this.sort(function(a,b){return a - b});
    }
    //var dataArr = [];
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
    function moveUp(){
    		/*翻页功能 */
    	if(controlParam.isFinish){
    		var numTemp = parseInt(controlParam.addCount /20);
            if(controlParam.currentNum > numTemp){
            	alert("对不起,系统只提供最近"+controlParam.addCount+"期的记录！");
            	controlParam.isFinish = true;
            	return false;
            }
        	controlParam.isFinish = false;
        	clearInterval(controlParam.intervalId);
        	getInterval(controlParam.timer);
        	controlParam.currentNum++;
        	$('#mainDiv').eq(0).animate({marginTop : parseInt($('#mainDiv').eq(0).css('marginTop'))+controlParam.scrollCount*paramObj.clientPix},'slow');
          //  $('#mainDiv').eq(0).css('marginTop',parseInt($('#mainDiv').eq(0).css('marginTop'))+controlParam.scrollCount*paramObj.clientPix);
            controlParam.isFinish=true;
    	}
    }
    
    /**
     	  *    向左切换附图
     * @param obj
     */
    function moveLeft(obj){
    	$("div[group='"+controlParam.currentAd+"']").css('display','none');
    	controlParam.currentAd--;
		if(controlParam.currentAd < 1){   // 超过了附表数量则直接返回
			controlParam.currentAd = 2;
			$("div[group='"+(controlParam.currentAd)+"']").css('display','block');
		}else{
			$("div[group='"+(controlParam.currentAd)+"']").css('display','block');
		}
		//切换到需要划线的部分重新划线
		if(controlParam.currentAd == 1){
			sumDataArray = [];
			skipDataArray = [];
			initDownLineArray();
			downLine();
		}
    }
    
    /**
	  *    向左切换附图
	* @param obj
	*/
	function moveRight(obj){
		$("div[group='"+controlParam.currentAd+"']").css('display','none');
		controlParam.currentAd++;
		if(controlParam.currentAd > 2){   // 超过了附表数量则直接返回
			controlParam.currentAd = 1;
			$("div[group='"+(controlParam.currentAd)+"']").css('display','block');
		}else{
			$("div[group='"+(controlParam.currentAd)+"']").css('display','block');
		}
	}

    /*设置一个定时返回最初状态*/
    function getInterval(timer){
    	controlParam.intervalId = setInterval("moveLast()", timer);
    };
    
    /*
     * @author songj
     * @desc 移动函数，所有页面通用
     * @since 2014-12-27
     * 
     * */
    function moveDown(tableId){
    	if(controlParam.isFinish){
        	if(controlParam.currentNum == 1){
        	   alert("已经显示为最新数据，不能进行下翻！");
        	   return false;
        	}
    		controlParam.isFinish = false;
        	controlParam.currentNum--;
        	$('#mainDiv').eq(0).animate({marginTop : parseInt($('#mainDiv').eq(0).css('marginTop'))-controlParam.scrollCount*paramObj.clientPix},'slow');
        	if(controlParam.currentNum == 1){
    			clearInterval(controlParam.intervalId);
    		}else{
    			clearInterval(controlParam.intervalId);
        		getInterval(controlParam.timer);
    		}
        	controlParam.isFinish=true;
        }
    	
    }
    /*
     * @author songj
     * @desc 还原按钮
     * @since 2014-12-27
     * 
     * */
    function moveLast(){
    	if(controlParam.isFinish){
        	if(controlParam.currentNum == 1){
        	   //alert("已经显示为最新数据，不需要还原！");
        	   return false;
        	}
        	controlParam.isFinish = false;
        	$('#mainDiv').eq(0).css('marginTop',-paramObj.clientPix*(controlParam.addCount));
        	clearInterval(controlParam.intervalId);
            controlParam.isFinish=true;
            controlParam.currentNum = 1;
    	}
    }
    /*   
     *   @desc : 浮动功能框
     *   @author : songj
         @date 2014-12-18
     */
    function layoutControlDiv(){
        var divJo = $("<div></div>");
        divJo.addClass("controlDiv");
        $("body").append(divJo);
        divJo.offset({
            left : $('#Content').width()/2 - divJo.width()/2,
            top : window.screen.height/2 - divJo.height()/2
        });
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

         var tbJo = $("<table class='controlTable'></table>");
         divJo.append(tbJo);
         var trUpJo = $("<tr></tr>");
         var trCenterJo = $("<tr></tr>");
         var trDownJo = $("<tr></tr>");
         tbJo.append(trUpJo);
         tbJo.append(trCenterJo);
         tbJo.append(trDownJo);
         trUpJo.append($("<td></td>")).append($("<td><img src='img/util/up.png' id='up' onMouseOut='changeOutCss(this)'  width='80' height='80' onclick='moveUp(this)' onmouseover='changeOverCss(this)' /></td>")).append($("<td></td>"));
         trCenterJo.append($("<td><img src='img/util/left.png' id='left' onMouseOut='changeOutCss(this)' onclick='moveLeft(this)' width='80' height='80' onmouseover='changeOverCss(this)' /></td>")).append($("<td><img src='img/util/center.png' id='center' onMouseOut='changeOutCss(this)' width='80' height='80' onclick='moveLast()' onmouseover='changeOverCss(this)' /></td>")).append($("<td><img src='img/util/right.png' id='right' onMouseOut='changeOutCss(this)' width='80' height='80' onclick='moveRight()' onmouseover='changeOverCss(this)' /></td>"));
         trDownJo.append($("<td></td>")).append($("<td><img src='img/util/down.png' id='down' onMouseOut='changeOutCss(this)' width='80' height='80' onclick='moveDown()' onmouseover='changeOverCss(this)' /></td>")).append($("<td></td>"));
         
     }