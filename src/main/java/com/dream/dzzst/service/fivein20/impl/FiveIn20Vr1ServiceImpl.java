package com.dream.dzzst.service.fivein20.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public List<FiveIn20Number> getRecordsByNum(Map<String,Object> paramMap) {
		return fiveIn20TMapper.getRecordsByNum(paramMap);
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
    		//今日出现次数
        List<FiveIn20Number> todayTimesList = this.getTodayDatas(paramMap);
        		//遗漏值从这里取出
        List<FiveIn20Number> initMissList = this.getAllData(paramMap);
        paramMap.put("count", Integer.parseInt(recordCount));
        List<FiveIn20Number> initIssueList = initMissList.subList(0, Integer.parseInt(recordCount));
        		//今日出现次数
        returnMap.put("todayTimes", getTodayTimesArr(todayTimesList));
        //号码分布遗漏统计
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
            int[] todayIntArr = getIntervalTodayTimesArr(fiveIn20Number,paramMap.get("todayTimesArr"));
            //今日出现次数
            returnMap.put("todayTimes", todayIntArr);
            //遗漏值
            int[] missIntArr = getIntervalMissTimesArr(fiveIn20Number,paramMap.get("missTimesArr"));
            returnMap.put("missTimes", missIntArr);
            //返回结果记录
            returnMap.put("record", fiveIn20Number);
        }
        return returnMap;
    };

    /** 
      * @Description: 获取初始化遗漏值结果
      * @author songj@sdfcp.com
      * @date 2014年11月17日 下午3:11:20 
      * 
      * @return
      */
    private int[] getTodayTimesArr(List<FiveIn20Number> FiveIn20NumberList){
        int[] winNumDist = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};    //开奖号码分布遗漏计算
        for(FiveIn20Number FiveIn20Number : FiveIn20NumberList){
            /*
             * 取出三个值并将它转为整型
             */
            int numOne = FiveIn20Number.getNo1();
            int numTwo = FiveIn20Number.getNo2();
            int numThree = FiveIn20Number.getNo3();
            winNumDist[numOne-1] = winNumDist[numOne-1] + 1;
            winNumDist[numTwo-1] = winNumDist[numTwo-1] + 1;
            winNumDist[numThree-1] = winNumDist[numThree-1] + 1;
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
    
    //复制数组并计算遗漏值给数组中所有元素加'1'
    private void addLoseForAllArray(int[] numArray,int[] numTemp){
    	if(numArray.length>0){
    		for(int i=0;i<numArray.length;i++){
    			numTemp[i] = numArray[i];
    			numTemp[i]++;
    		}
    	}
    }
	@Override
	public List<FiveIn20Analysis> getTopNMiss(Map<String, String> paramMap) {
		String pcode = paramMap.get("provinceCode");
		String issueNumber = paramMap.get("issueNumber");
		paramMap.put("mainTable", globalCacheService.getCacheMap(pcode)[1]);
		paramMap.put("issueNumber", issueNumber);
		return fiveIn20TMapper.getMissAnalysis(paramMap);
	}
    
}
