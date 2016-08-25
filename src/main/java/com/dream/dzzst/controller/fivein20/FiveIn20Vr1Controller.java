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
	public @ResponseBody Map<String,Object> getLastData(@RequestParam(value="provinceDm",required=true) String provinceDm,@RequestParam(value="lastIssueId",required=true) String lastIssueId,@RequestParam(value="missTimes",required=true) String missTimes,@RequestParam(value="todayTimes",required=true) String todayTimes) {
		JSONArray jaToday = JSONArray.parseArray(todayTimes);
		int[] todayTimesArr = getJsonToIntArray(jaToday);
		JSONArray jaMiss = JSONArray.parseArray(missTimes);
		int[] missTimesArr = getJsonToIntArray(jaMiss);
		Map<String,int[]> paramMap = new HashMap<String,int[]>();
		paramMap.put("todayTimesArr", todayTimesArr);
		paramMap.put("missTimesArr", missTimesArr);
		Map<String,Object> returnMap = fiveIn20Vr1Service.getIntervalContext(lastIssueId,paramMap,provinceDm);
        return returnMap;
	}
	@RequestMapping("/getLastMissValues")
	public @ResponseBody List<FiveIn20Analysis> getLastMissValues(@RequestParam(value="provinceDm",required=true) String provinceDm,@RequestParam(value="lastIssueId",required=true) String lastIssueId) {
		Map<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("provinceCode", provinceDm);
		paramMap.put("issueNumber", lastIssueId);
        return fiveIn20Vr1Service.getTopNMiss(paramMap);
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
        request.setAttribute("provinceDm", request.getParameter("provinceDm").toString());
		return "/fivein20/fivein20vr1";
    }
}
