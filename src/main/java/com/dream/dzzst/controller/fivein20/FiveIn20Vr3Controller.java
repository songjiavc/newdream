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
import com.dream.dzzst.service.fivein20.FiveIn20Vr3Service;



@Controller
@RequestMapping("/fiveIn20Vr3Controller")
public class FiveIn20Vr3Controller {
	
	@Autowired
	private FiveIn20Vr3Service fiveIn20Vr3Service;
	
	@RequestMapping("/getTopNAllMissValues")
	public @ResponseBody List<FiveIn20Analysis> getTopNAllMissValues(@RequestParam(value="provinceDm",required=true) String provinceDm,@RequestParam(value="lastMissIssueNumber",required=false) String lastMissIssueNumber) {
		Map<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("provinceCode", provinceDm);
		paramMap.put("lastMissIssueNumber", lastMissIssueNumber);
        return fiveIn20Vr3Service.getTopNAllMiss(paramMap,2);
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
	@RequestMapping("/initStartPageVr3")
    public String initStartPageVr3(HttpServletRequest request) {
        request.setAttribute("provinceDm", request.getParameter("provinceDm").toString());
		return "/fivein20/fivein20vr3";
    }
	
}
