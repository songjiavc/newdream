/**
 * @author songj@sdfcp.com
 * @since  2015-8-28
 * @desc   测试脚本
 */
	function test(fn,param){
		var s,d;
		//记录开始时间 
		s = new Date().getTime();
		//执行待测试的方法
		fn(param);
		//记录结束时间
		d = new Date().getTime();
		//print
		alert("result:"+(d-s)+"毫秒。");
	}
	
