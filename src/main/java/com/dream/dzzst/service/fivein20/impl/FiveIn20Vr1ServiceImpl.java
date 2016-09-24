package com.dream.dzzst.service.fivein20.impl;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dream.dzzst.dao.fivein20.FiveIn20TMapper;
import com.dream.dzzst.model.fivein20.FiveIn20Analysis;
import com.dream.dzzst.model.fivein20.FiveIn20Number;
import com.dream.dzzst.service.cache.GlobalCacheService;
import com.dream.dzzst.service.fivein20.FiveIn20Vr1Service;

/**
 * Created by Administrator on 2014/8/8.
 */
@Service("fiveIn20Vr1Service")
public class FiveIn20Vr1ServiceImpl implements FiveIn20Vr1Service {
    
	@Autowired
	private FiveIn20TMapper fiveIn20TMapper;
	
	@Autowired
	private GlobalCacheService globalCacheService;
	@Override
	public FiveIn20Number getLastRecord(Map<String,Object> paramMap){
		return fiveIn20TMapper.getLastRecord(paramMap);
	}
	@Override
	public List<FiveIn20Number>  getAllData(Map<String,Object> paramMap){
		return fiveIn20TMapper.getAllData(paramMap);
	}

	@Override
	public List<FiveIn20Number> getRecordsByNum(String provinceCode,int count) {
		Map<String,Object> paramMap = new HashMap<String,Object>();
        paramMap.put("mainTable", globalCacheService.getCacheMap(provinceCode)[3]);
        paramMap.put("count",count);
		return fiveIn20TMapper.getRecordsByNum(paramMap);
	}
	
	@Override
	public List<FiveIn20Number> getRecordsByNumOrderById(String provinceCode,int count) {
		Map<String,Object> paramMap = new HashMap<String,Object>();
        paramMap.put("mainTable", globalCacheService.getCacheMap(provinceCode)[0]);
        paramMap.put("count",count);
		return fiveIn20TMapper.getRecordsByNumOrderById(paramMap);
	}
	
	@Override
	public List<FiveIn20Number> getTodayDatas(Map<String,Object> paramMap) {
		return fiveIn20TMapper.getTodayDatas(paramMap);
	}
	
	@Override
    public Map<String, Object> getInitContext(String recordCount,String pcode) {
    	Map<String,Object> returnMap = new HashMap<String,Object>();
        Map<String,Object> paramMap = new HashMap<String,Object>();
        paramMap.put("mainTable", globalCacheService.getCacheMap(pcode)[0]);
        //获取今日出现数据
        List<FiveIn20Number> initTodayDataList = this.getRecordsByNum(pcode, 100);
        returnMap.put("todayTimes",getTodayTimesArr(initTodayDataList));
        //遗漏值从这里取出
        List<FiveIn20Number> initMissList = this.getAllData(paramMap);
        paramMap.put("count", Integer.parseInt(recordCount));
        List<FiveIn20Number> initIssueList = initMissList.subList(0, Integer.parseInt(recordCount));
        //顺一遗漏统计
        Map<String,int[]> shun1Miss = getshun1MissArr(initMissList);
        returnMap.put("shun1Miss", shun1Miss.get("shun1Miss"));
        returnMap.put("shun1MaxMiss", shun1Miss.get("shun1MaxMiss"));
        //顺一maxMiss统计
        returnMap.put("missTimes", getInitMissArr(initMissList));
        //返回结果记录
        returnMap.put("records", initIssueList);
        return returnMap;
    }
    @Override
    public Map<String, Object> getIntervalContext(String issueID,Map<String,int[]> paramMap,String provinceCode) {
        Map<String,Object> returnMap = new HashMap<String,Object>();
        //获取最后一期内容
        Map<String,Object> selMap = new HashMap<String,Object>();
        selMap.put("mainTable",  globalCacheService.getCacheMap(provinceCode)[0]);
        FiveIn20Number fiveIn20Number  = this.getLastRecord(selMap);
        if(!fiveIn20Number.getIssueNumber().equals(issueID)){
        	//获取上一百期开奖号码
        	
        	int[] todayIntArr = getIntervalTodayTimesArr(fiveIn20Number,paramMap.get("todayTimesArr"));
               //今日出现次数
             returnMap.put("todayTimes", todayIntArr);
        	int[] shun1MissIntArr = getIntervalShun1MissArr(fiveIn20Number,paramMap.get("shun1MissArr"));
            //顺一遗漏
            returnMap.put("shun1Miss", shun1MissIntArr);
            //顺一历史最大遗漏
            returnMap.put("shun1MaxMiss", getIntervalMaxShun1MissArr(shun1MissIntArr,paramMap.get("shun1MaxMissArr")));
            //遗漏值
            int[] missIntArr = getIntervalMissTimesArr(fiveIn20Number,paramMap.get("missTimesArr"));
            returnMap.put("missTimes", missIntArr);
            //返回结果记录
            returnMap.put("record", fiveIn20Number);
        }
        return returnMap;
    };

    private String getLastNIssueNumber(String currentIssueNumber){
    	String rtn = null;
    	
    	return rtn;
    }
    
    /** 
      * @Description: 获取初始化遗漏值结果
      * @author songj@sdfcp.com
      * @date 2014年11月17日 下午3:11:20 
      * 
      * @return
      */
    private Map<String,int[]> getshun1MissArr(List<FiveIn20Number> fiveIn20NumberList){
    	Map<String,int[]> rtnMap = new HashMap<String,int[]>();
    	int[] tempShun1Miss = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
    	int[] tempShun1MaxMiss = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
    	for(int j = fiveIn20NumberList.size()-1;j>=0;j--){
    		for(int i = 0;i < tempShun1Miss.length;i++){
    			tempShun1Miss[i]++;
    			if(tempShun1Miss[i] > tempShun1MaxMiss[i]){
    				tempShun1MaxMiss[i] = tempShun1Miss[i];
    			}
        	}
    		tempShun1Miss[fiveIn20NumberList.get(j).getNo1()-1] = 0;
    	}
    	rtnMap.put("shun1Miss",tempShun1Miss);
    	rtnMap.put("shun1MaxMiss",tempShun1MaxMiss);
    	return rtnMap;
    }
    /** 
     * @Description: 获取顺一的历史最大遗漏
     * @author songjiavc@126.com
     * @date 2014年11月17日 下午3:11:20 
     * 
     * @return
     */
   private int[] getshun1MaxMissArr(List<FiveIn20Analysis> fiveIn20NumberList){
   	int[] numTemp = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
   	for(int i = 0;i < numTemp.length;i++){
   		numTemp[i] = fiveIn20NumberList.get(i).getMaxMiss();
   	}
   	return numTemp;
   }

    /** 
      * @Description: 根据周期函数获取今日出现次数 
      * @author songj@sdfcp.com
      * @date 2014年11月18日 上午8:35:57 
      * 
      * @return
      */
    private int[] getIntervalShun1MissArr(FiveIn20Number fiveIn20Number,int[] shun1Miss){
    	int[] missRtnArr = shun1Miss;
        for(int i = 0;i < missRtnArr.length;i++){
            missRtnArr[i]++;
        }
        missRtnArr[fiveIn20Number.getNo1()-1] = 0;
        return missRtnArr;
    }
    
    
    /** 
     * @Description: 根据周期函数获取今日出现次数 
     * @author songj@sdfcp.com
     * @date 2014年11月18日 上午8:35:57 
     * 
     * @return
     */
   private int[] getIntervalMaxShun1MissArr(int[] shun1Miss,int[] shun1MaxMiss){
   	int[] missRtnArr = shun1MaxMiss;
       for(int i = 0;i < missRtnArr.length;i++){
           if(shun1Miss[i] > shun1MaxMiss[i]){
        	   shun1MaxMiss[i] = shun1Miss[i];
           }
       }
       return missRtnArr;
   }
    
    /**   
     * @Description: 每条记录都要记录一下这些扩展属性 
     * @author songj@sdfcp.com
     * @date 2015年8月18日 上午8:46:40   
     */
    public int[] getInitMissArr(List<FiveIn20Number> numList){
    	int[] numTemp = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
    	for(int j = numList.size()-1;j>=0;j--){
    		for(int i = 0;i < numTemp.length;i++){
        		numTemp[i]++;
        	}
    		numTemp[numList.get(j).getNo1()-1] = 0;
    		numTemp[numList.get(j).getNo2()-1] = 0;
    		numTemp[numList.get(j).getNo3()-1] = 0;
    		numTemp[numList.get(j).getNo4()-1] = 0;
    		numTemp[numList.get(j).getNo5()-1] = 0;
    	}
    	return numTemp;
    }

    public int[] getIntervalMissTimesArr(FiveIn20Number fiveIn20Number,int[] missTimes){
        int[] missRtnArr = missTimes;
        for(int i = 0;i < missRtnArr.length;i++){
            missRtnArr[i]++;
        }
        missRtnArr[fiveIn20Number.getNo1()-1] = 0;
        missRtnArr[fiveIn20Number.getNo2()-1] = 0;
        missRtnArr[fiveIn20Number.getNo3()-1] = 0;
        missRtnArr[fiveIn20Number.getNo4()-1] = 0;
        missRtnArr[fiveIn20Number.getNo5()-1] = 0;
        return missRtnArr;
    }
    
    
    /** 
     * @Description: 获取初始化遗漏值结果
     * @author songj@sdfcp.com
     * @date 2014年11月17日 下午3:11:20 
     * 
     * @return
     */
   private int[] getTodayTimesArr(List<FiveIn20Number> fiveIn20NumberList){
       int[] winNumDist = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};    //开奖号码分布遗漏计算
       for(FiveIn20Number fiveIn20Number : fiveIn20NumberList){
           /*
            * 取出三个值并将它转为整型
            */
           int numOne = fiveIn20Number.getNo1();
           int numTwo = fiveIn20Number.getNo2();
           int numThree = fiveIn20Number.getNo3();
           int numFour = fiveIn20Number.getNo4();
           int numFive = fiveIn20Number.getNo5();
           
           winNumDist[numOne-1] = winNumDist[numOne-1] + 1;
           winNumDist[numTwo-1] = winNumDist[numTwo-1] + 1;
           winNumDist[numThree-1] = winNumDist[numThree-1] + 1;
           winNumDist[numFour-1] = winNumDist[numFour-1] + 1;
           winNumDist[numFive-1] = winNumDist[numFive-1] + 1;
       }
       return winNumDist;
   }

   /** 
     * @Description: 根据周期函数获取今日出现次数 
     * @author songj@sdfcp.com
     * @date 2014年11月18日 上午8:35:57 
     * 
     * @return
     */
   private int[] getIntervalTodayTimesArr(FiveIn20Number fiveIn20Number,int[] todayTimes){

       int[] winNumDist;
       if("01".equals(fiveIn20Number.getIssueNumber().substring(fiveIn20Number.getIssueNumber().length()-2, fiveIn20Number.getIssueNumber().length()))){
           winNumDist = new int[]{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
       }else{
           winNumDist = todayTimes;
       }
       /*
        * 取出三个值并将它转为整型
        */
       int numOne = fiveIn20Number.getNo1();
       int numTwo = fiveIn20Number.getNo2();
       int numThree = fiveIn20Number.getNo3();
		int numFour = fiveIn20Number.getNo4();
		int numFive = fiveIn20Number.getNo5();
       //求合值
       winNumDist[numOne-1] = winNumDist[numOne-1] + 1;
       winNumDist[numTwo-1] = winNumDist[numTwo-1] + 1;
       winNumDist[numThree-1] = winNumDist[numThree-1] + 1;
		winNumDist[numFour-1] = winNumDist[numFour-1] + 1;
		winNumDist[numFive-1] = winNumDist[numFive-1] + 1;
       return winNumDist;
   }
   
    
  
	@Override
	public List<FiveIn20Analysis> getAllMiss(Map<String, String> paramMap) {
		String pcode = paramMap.get("provinceCode");
		String issueNumber = paramMap.get("issueNumber");
		paramMap.put("mainTable", globalCacheService.getCacheMap(pcode)[1]);
		paramMap.put("issueNumber", issueNumber);
		return fiveIn20TMapper.getMissAnalysis(paramMap);
	}
	
	@Override
	public List<FiveIn20Analysis> getTopNMiss(Map<String, String> paramMap,int n) {
		List<FiveIn20Analysis> rtnList = new ArrayList<FiveIn20Analysis>();
		String pcode = paramMap.get("provinceCode");
		String issueNumber = paramMap.get("issueNumber");
		paramMap.put("mainTable", globalCacheService.getCacheMap(pcode)[1]);
		paramMap.put("issueNumber", issueNumber);
		List<FiveIn20Analysis> allMissList = fiveIn20TMapper.getMissAnalysis(paramMap);
		int j = 0;
		int tempType = 0;
		for(FiveIn20Analysis temp : allMissList){
			if(tempType == 0 ||tempType !=  temp.getType() ){
				tempType = temp.getType();
				j = 0;
			}
			if(j < n){
				j++;
				rtnList.add(temp);
			}else{
				continue;
			}
		}
		return rtnList;
	}
	
	
	@Override
	public List<FiveIn20Analysis> getShun1HistoryMaxMiss(Map<String, Object> paramMap) {
		String pcode = (String) paramMap.get("provinceCode");
		String issueNumber = (String) paramMap.get("issueNumber");
		paramMap.put("mainTable", globalCacheService.getCacheMap(pcode)[1]);
		paramMap.put("issueNumber", issueNumber);
		return fiveIn20TMapper.getShun1HistoryMaxMiss(paramMap);
	}

	
	public Map<String,Object> insertDataInput(String provinceCode,String issueNumber,int[] dataArr){
		Map<String,Object> rtnParam = new HashMap<String,Object>();
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("mainTable", globalCacheService.getCacheMap(provinceCode)[0]);
		paramMap.put("issueNumber", issueNumber);
		FiveIn20Number fiveIn20Number = fiveIn20TMapper.getRecordByIssueId(paramMap);
		if(fiveIn20Number == null){
			paramMap.put("no1",dataArr[0]);
			paramMap.put("no2",dataArr[1]);
			paramMap.put("no3",dataArr[2]);
			paramMap.put("no4",dataArr[3]);
			paramMap.put("no5",dataArr[4]);
			fiveIn20TMapper.insertDataInput(paramMap);
			List<FiveIn20Number> dataList = this.getRecordsByNumOrderById(provinceCode, 10);
			rtnParam.put("dataList",dataList);
			rtnParam.put("status", "success");
		}else{
			rtnParam.put("status", "failure");
			rtnParam.put("message", "录入数据已经存在，不能重复录入！");
		}
		return rtnParam;
	}
	
	public Map<String,Object> deleteDataInput(String id,String provinceCode){
		Map<String,Object> rtnMap = new HashMap<String,Object>();
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("mainTable", globalCacheService.getCacheMap(provinceCode)[0]);
		paramMap.put("id",id);
		try{
			fiveIn20TMapper.deleteDataInput(paramMap);
			rtnMap.put("status", "success");
		}catch(SQLException sqlEx){
			rtnMap.put("status", "failure");
		}finally {
			return 	rtnMap;
		}
	}
    
}
