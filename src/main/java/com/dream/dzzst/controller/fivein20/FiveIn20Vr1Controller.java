package com.dream.dzzst.controller.fivein20;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.dream.dzzst.model.fivein20.FiveIn20Analysis;
import com.dream.dzzst.model.fivein20.FiveIn20Number;
import com.dream.dzzst.service.fivein20.FiveIn20Vr1Service;



@Controller
@RequestMapping("/fiveIn20Vr1Controller")
public class FiveIn20Vr1Controller {
	
	@Autowired
	private FiveIn20Vr1Service fiveIn20Vr1Service;
	
	@RequestMapping("/getInitData")
	public @ResponseBody Map<String,Object> getInitData(@RequestParam(value="provinceDm",required=true) String provinceDm,@RequestParam(value="count",required=true) String count) {
		Map<String,Object> returnMap = fiveIn20Vr1Service.getInitContext(count,provinceDm);
		return returnMap;
	}
	@RequestMapping("/getLastData")
	public @ResponseBody Map<String,Object> getLastData(@RequestParam(value="provinceDm",required=true) String provinceDm,@RequestParam(value="lastIssueNumber",required=true) String lastIssueNumber,@RequestParam(value="todayTimes",required=true) String todayTimes,@RequestParam(value="missTimes",required=true) String missTimes,@RequestParam(value="shun1Miss",required=true) String shun1Miss,@RequestParam(value="shun1MaxMiss",required=true) String shun1MaxMiss) {
		JSONArray jaShun1Miss = JSONArray.parseArray(shun1Miss);
		int[] shun1MissArr = getJsonToIntArray(jaShun1Miss);
		JSONArray jaMiss = JSONArray.parseArray(missTimes);
		int[] missTimesArr = getJsonToIntArray(jaMiss);
		JSONArray jaToday = JSONArray.parseArray(todayTimes);
		int[] todayTimesArr = getJsonToIntArray(jaToday);
		JSONArray jaMaxMiss = JSONArray.parseArray(shun1MaxMiss);
		int[] shun1MaxMissArr = getJsonToIntArray(jaMaxMiss);
		Map<String,int[]> paramMap = new HashMap<String,int[]>();
		paramMap.put("todayTimesArr", todayTimesArr);
		paramMap.put("missTimesArr", missTimesArr);
		paramMap.put("shun1MissArr", shun1MissArr);
		paramMap.put("shun1MaxMissArr", shun1MaxMissArr);
		Map<String,Object> returnMap = fiveIn20Vr1Service.getIntervalContext(lastIssueNumber,paramMap,provinceDm);
        return returnMap;
	}
	@RequestMapping("/getLastTopNMissValues")
	public @ResponseBody List<FiveIn20Analysis> getLastTopNMissValues(@RequestParam(value="provinceDm",required=true) String provinceDm,@RequestParam(value="lastIssueNumber",required=true) String lastIssueNumber) {
		Map<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("provinceCode", provinceDm);
		paramMap.put("issueNumber", lastIssueNumber);
        return fiveIn20Vr1Service.getTopNMiss(paramMap,5);
	}

	
	/**
	  * 将json数组转化为Double型
	  * @return
    */
    public static int[] getJsonToIntArray(JSONArray ja) {
       int[] arr=new int[ja.size()];
       for(int i=0;i<ja.size();i++){
	       arr[i]=ja.getIntValue(i);
       }
       return arr;
    }
	@RequestMapping("/initStartPage")
    public String initStartPage(HttpServletRequest request) {
		//在登陆信息中获取两个参数，一个为省级编码一个为登陆账号，账号在更新登陆状态的时候有效
        request.setAttribute("provinceDm", request.getParameter("provinceDm").toString());
		return "/fivein20/fivein20vr1";
    }
	
	
	@RequestMapping("/initStartDataInputPage")
    public String initStartDataInputPage(HttpServletRequest request) {
        request.setAttribute("provinceDm", request.getParameter("provinceDm").toString());
		return "/fivein20/fivein20datainput";
    }
	
	@RequestMapping("/dataInputSubmit")
	public @ResponseBody Map<String,Object> dataInputSubmit(@RequestParam(value="provinceCode",required=true) String provinceCode,@RequestParam(value="issueNumber",required=true) String issueNumber,@RequestParam(value="dataArr",required=true) String dataArr){
		JSONArray dataArr2Json = JSONArray.parseArray(dataArr);
		int[] dataArr2Int = getJsonToIntArray(dataArr2Json);
		return fiveIn20Vr1Service.insertDataInput(provinceCode, issueNumber, dataArr2Int);
	}
	
	@RequestMapping("/getDataInputList")
	public @ResponseBody List<FiveIn20Number> getDataInputList(@RequestParam(value="provinceCode",required=true) String provinceCode){
		return fiveIn20Vr1Service.getRecordsByNumOrderById(provinceCode, 10);
	}
	
	@RequestMapping("/deleteDataInput")
	public @ResponseBody Map<String,Object> deleteDataInput(@RequestParam(value="provinceCode",required=true) String provinceCode,@RequestParam(value="id",required=true) String id){
		return fiveIn20Vr1Service.deleteDataInput(id, provinceCode);
	}
	
	@RequestMapping("/initStartPageVr2")
    public String initStartPageVr2(HttpServletRequest request) {
        request.setAttribute("provinceDm", request.getParameter("provinceDm").toString());
		return "/fivein20/fivein20vr2";
    }
	@RequestMapping("/initStartPageVr3")
    public String initStartPageVr3(HttpServletRequest request) {
        request.setAttribute("provinceDm", request.getParameter("provinceDm").toString());
		return "/fivein20/fivein20vr3";
    }
	
}
