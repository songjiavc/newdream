	
	
	var cvsObj,cvs;
	/**
	 		* 初始化要画线的部分
	 */
	function initDownLineArray(){
	   	$("#adDataTable tr td").each(function (){
	   		intValueToArray(this);
	   	});
   	}
	
	/**
		给数组负值
	*/
	function intValueToArray(obj){
		if(obj.kind == 'sum'){
			sumDataArray.push({
	           	pageX : obj.offsetLeft+paramObj.clientPix/2, //获取横纵坐标offsetLeft+15
	           	pageY : obj.offsetTop+paramObj.clientPix/2,
	           	color : obj.color
			});
	   	}else if(obj.kind == 'skip'){
	   		skipDataArray.push({
	           	pageX : obj.offsetLeft+paramObj.clientPix/2, //获取横纵坐标offsetLeft+15
	           	pageY : obj.offsetTop+paramObj.clientPix/2,
	           	color : obj.color
	        });
	   	}else{
	   		//
	   	}
	}
	
	function initDownLineParam(){
		cvsObj = document.getElementById("canvas_main");
        cvsObj.globalCompositeOperation = 'source-atop';
        cvsObj.width  = $('#adDataTable').width();
       	cvsObj.height = $('#adDataTable').height();
        cvs = cvsObj.getContext('2d');
        cvs.lineWidth=2;
	}
	/**
		画图方法
	*/
	function downLine(){
        /////////////////////////////////////////////////////////////////////
        cvs.clearRect(0, 0, cvsObj.width, cvsObj.height);
        $.each(sumDataArray,function(i,newData){
            cvs.strokeStyle = getLineColorByStatus(newData.color);
            cvs.lineTo(newData.pageX,newData.pageY,6);
            cvs.stroke();
            cvs.beginPath();
            cvs.moveTo(newData.pageX,newData.pageY);
        });
        cvs.beginPath();
        $.each(skipDataArray,function(i,newData){
        	cvs.strokeStyle = getLineColorByStatus(newData.color);
            if(i == 0){
                cvs.moveTo(newData.pageX,newData.pageY);
            }
            cvs.lineTo(newData.pageX,newData.pageY,6);
            cvs.stroke();
            cvs.beginPath();
            cvs.moveTo(newData.pageX,newData.pageY);
        });
        cvs.beginPath();
    }
	
	
	/** 根据状态获取线体的颜色
	 * @param numStatus
	 * @returns {String}
	 */
	function getLineColorByStatus(numStatus){
		switch(numStatus){
		case 1 : 
			return "#18597D";
			break;
		case 2 :
			return "#9A0506";
			break;
		case 3 : 
			return "black";
			break;
		}
	}