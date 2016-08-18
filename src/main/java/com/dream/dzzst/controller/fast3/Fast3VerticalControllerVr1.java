package com.dream.dzzst.controller.fast3;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.dream.dzzst.service.fast3.Fast3Service;



@Controller
@RequestMapping("/fast3VerticalControllerVr1")
public class Fast3VerticalControllerVr1 {
	
	@Autowired
	private Fast3Service fast3VerticalService;
	
	@RequestMapping("/getInitData")
	public @ResponseBody Map<String,Object> getInitData(HttpServletRequest request) {
		Map<String,Object> returnMap = new HashMap<String,Object>();
		String pcode = request.getParameter("provinceDm");
		String recordCount=(String)request.getParameter("count");
		returnMap = fast3VerticalService.getInitContext(recordCount,pcode);
		return returnMap;
	}
	@RequestMapping("/getLastData")
	public @ResponseBody Map<String,Object> getLastData(HttpServletRequest request) {
		String issueID=(String)request.getParameter("lastIssueId");
		String lastRecord = (String)request.getParameter("lastRecord");
		String missLastIssueId=(String)request.getParameter("missLastIssueId");
		String todayTimes = (String)request.getParameter("todayTimes");
		String pcode = request.getParameter("provinceDm");
		JSONObject jo = JSONArray.parseObject(todayTimes);
		int[] winNumDist = getJsonToIntArray(jo.getJSONArray("winNumDist"));
		int[] skipNumDist = getJsonToIntArray(jo.getJSONArray("skipNumDist"));
		int[] sumNumDist = getJsonToIntArray(jo.getJSONArray("sumNumDist"));
		int[] groupNumDist = getJsonToIntArray(jo.getJSONArray("groupNumDist"));
		
		JSONObject joLastRecord = JSONArray.parseObject(lastRecord);
		int[] numArray = getJsonToIntArray(joLastRecord.getJSONArray("numArray"));
		int[] groupLose = getJsonToIntArray(joLastRecord.getJSONArray("groupLose"));
        int[] skipArray = getJsonToIntArray(joLastRecord.getJSONArray("skipArray"));
		int[] sumLose = getJsonToIntArray(joLastRecord.getJSONArray("sumLose"));
        Map<String,Object> returnMap = new HashMap<String,Object>();
		Map<String,int[]> paramMap = new HashMap<String,int[]>();
		paramMap.put("winNumDist", winNumDist);
		paramMap.put("sumNumDist", sumNumDist);
		paramMap.put("skipNumDist", skipNumDist);
		paramMap.put("groupNumDist", groupNumDist);
		paramMap.put("numArray", numArray);
		paramMap.put("groupLose", groupLose);
		paramMap.put("skipArray", skipArray);
		paramMap.put("sumLose", sumLose);
		returnMap = fast3VerticalService.getIntervalContext(issueID,missLastIssueId,paramMap,pcode);
        return returnMap;
	}
	/**
	  * 将json数组转化为Double型
	  * @param str
	  * @return
    */
    public static int[] getJsonToIntArray(JSONArray ja) {
       int[] arr=new int[ja.size()];
       for(int i=0;i<ja.size();i++){
	       arr[i]=ja.getIntValue(i);
       }
       return arr;
    }
	@RequestMapping("/fast3verticalvr1")
    public String showChart(HttpServletRequest request) {
        request.setAttribute("provinceDm", request.getParameter("provinceDm").toString());
		return "/fast3/fast3verticalvr1";
    }
}
