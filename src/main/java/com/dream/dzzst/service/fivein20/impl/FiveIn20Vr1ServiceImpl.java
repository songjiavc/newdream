package com.dream.dzzst.service.fivein20.impl;


import com.dream.dzzst.dao.fivein20.FiveIn20TMapper;
import com.dream.dzzst.model.fivein20.FiveIn20Analysis;
import com.dream.dzzst.model.fivein20.FiveIn20Number;
import com.dream.dzzst.service.cache.GlobalCacheService;
import com.dream.dzzst.service.fivein20.FiveIn20Vr1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
        		//遗漏值从这里取出
        paramMap.put("count", Integer.parseInt(recordCount));
        		//遗漏分析值在这里取出
        Map<String,String> paMap = new HashMap<String,String>();
        paMap.put("mainTable", globalCacheService.getCacheMap(pcode)[1]);
        paMap.put("issueNumber", "");
        List<FiveIn20Analysis> analysisList = this.getTopNMiss(3, paMap);
        List<Map<String, int[]>> initIssueList = getResultExtendList(initMissList,Integer.parseInt(recordCount));
        		//今日出现次数
        returnMap.put("todayTimes", getTodayTimesArr(todayTimesList));
        		//返回结果记录
        returnMap.put("records", initIssueList);
        returnMap.put("top3Miss", analysisList);
        return returnMap;
    }
    @Override
    public Map<String, Object> getIntervalContext(String issueID,String missLastIssueId,Map<String,int[]> paramMap,String pcode) {
        Map<String,Object> returnMap = new HashMap<String,Object>();
        		//获取最后一期内容
        Map<String,Object> selMap = new HashMap<String,Object>();
        selMap.put("mainTable",  globalCacheService.getCacheMap(pcode)[0]);
        Map<String,String> paMap = new HashMap<String,String>();
        paMap.put("mainTable",  globalCacheService.getCacheMap(pcode)[1]);
        paMap.put("issueNumber", missLastIssueId);
        List<FiveIn20Analysis> analysisList = this.getTopNMiss(3, paMap);
        FiveIn20Number FiveIn20Number  = this.getLastRecord(selMap);
        if(FiveIn20Number.getIssueNumber().equals(issueID)){
        	FiveIn20Number = null;
        	returnMap.put("record", FiveIn20Number);
        }else{
        	 returnMap.put("record", getOnlyOneResultExtendList(FiveIn20Number,paramMap));
        	 Map<String,int[]> todayIntArr = getIntervalTodayTimesArr(FiveIn20Number,paramMap);
             			//今日出现次数
             returnMap.put("todayTimes", todayIntArr);
             			//遗漏值
        }
        
        returnMap.put("top3Miss", analysisList);
        return returnMap;
    };

    /** 
      * @Description: 获取初始化遗漏值结果
      * @author songj@sdfcp.com
      * @date 2014年11月17日 下午3:11:20 
      * 
      * @param selectFiveList
      * @return 
      */
    private Map<String,int[]> getTodayTimesArr(List<FiveIn20Number> FiveIn20NumberList){
        Map<String,int[]> returnMap = new HashMap<String,int[]>();
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
        returnMap.put("winNumDist", winNumDist);
        return returnMap;
    }

    /** 
      * @Description: 根据周期函数获取今日出现次数 
      * @author songj@sdfcp.com
      * @date 2014年11月18日 上午8:35:57 
      * 
      * @param FiveIn20NumberList
      * @return 
      */
    private Map<String,int[]> getIntervalTodayTimesArr(FiveIn20Number fiveIn20Number,Map<String,int[]> paramMap){
        Map<String,int[]> returnMap = new HashMap<String,int[]>();
        int[] winNumDist;
        if("01".equals(fiveIn20Number.getIssueNumber().substring(fiveIn20Number.getIssueNumber().length()-2, fiveIn20Number.getIssueNumber().length()))){
            winNumDist = new int[]{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
        }else{
            winNumDist = paramMap.get("winNumDist");
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
        returnMap.put("winNumDist", winNumDist);
        return returnMap;
    }
    
    
    /* (非 Javadoc) 
     * <p>Title: getTopNMiss</p> 
     * <p>Description: </p> 
     * @param n   取前n名遗漏传到前台
     * @param analysisList
     * @return 
     */
    @Override
    public List<FiveIn20Analysis> getTopNMiss(int n,Map<String,String> paramMap){
    	List<FiveIn20Analysis> rtnList = null;
    		//定义list  全部分组list
    	List<FiveIn20Analysis> allNumber = new ArrayList<FiveIn20Analysis>();
    	List<FiveIn20Analysis> noSameNumber = new ArrayList<FiveIn20Analysis>();
    	List<FiveIn20Analysis> twoSameNumber = new ArrayList<FiveIn20Analysis>();
    	List<FiveIn20Analysis> threeSameNumber = new ArrayList<FiveIn20Analysis>();
    	List<FiveIn20Analysis> allGroup = new ArrayList<FiveIn20Analysis>();
    	List<FiveIn20Analysis> fourNumber = new ArrayList<FiveIn20Analysis>();
    	List<FiveIn20Analysis> analysisList = fiveIn20TMapper.getMissAnalysis(paramMap);
    	if(null != analysisList && analysisList.size() > 0){
    		int a = 0,b = 0,c=0,d=0;
    		rtnList = new ArrayList<FiveIn20Analysis>();
    		for(FiveIn20Analysis FiveIn20Analysis : analysisList){
    			if(FiveIn20Analysis.getType() == 2 || FiveIn20Analysis.getType() == 3 || FiveIn20Analysis.getType() == 4){
    				allNumber.add(FiveIn20Analysis);
    			}
    			if(FiveIn20Analysis.getType() == 6 || FiveIn20Analysis.getType() == 7){
    				allGroup.add(FiveIn20Analysis);
    			}
    			if(FiveIn20Analysis.getType() == 2&&a<n){
    				twoSameNumber.add(FiveIn20Analysis);
    				a++;
    			}else if(FiveIn20Analysis.getType() == 3 && b<n){
    				threeSameNumber.add(FiveIn20Analysis);
    				b++;
    			}else if(FiveIn20Analysis.getType()==4&&c<n){
    				noSameNumber.add(FiveIn20Analysis);
    				c++;
    			}else if(FiveIn20Analysis.getType()==5&&d<n){
    				fourNumber.add(FiveIn20Analysis);
    				d++;
    			}
    		}
    		Collections.sort(allNumber);
    		Collections.sort(allGroup);
    		allNumber = allNumber.subList(0, n);
    		allGroup = allGroup.subList(0, n);
    		rtnList.addAll(allNumber);
    		rtnList.addAll(noSameNumber);
    		rtnList.addAll(twoSameNumber);
    		rtnList.addAll(threeSameNumber);
    		rtnList.addAll(allGroup);
    		rtnList.addAll(fourNumber);
    		
    	}
    	return rtnList;
    }
    /**   
     * @Description: 获取记录的相关信息集合
     * @author songj@sdfcp.com
     * @date 2015年8月17日 上午10:51:32   
     */
    public List<Map<String,int[]>> getResultExtendList(List<FiveIn20Number> ahHappy3List,int recordCount){
    	int[] numArray = {0,0,0,0,0,0,0};
    	int[] skipArray = {0,0,0,0,0,0};
    	int[] groupLose = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
    	int[] sumLose = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
    	Map<String,int[]> paramMap = new HashMap<String,int[]>();
    	paramMap.put("numArray", numArray);
    	paramMap.put("sumLose", sumLose);
    	paramMap.put("groupLose", groupLose);
    	paramMap.put("skipArray", skipArray);
    	List<Map<String,int[]>> list = new ArrayList<Map<String,int[]>>();
    	for(int i = ahHappy3List.size()-1;i>=0;i--){
    		list.add(getOnlyOneResultExtendList(ahHappy3List.get(i),paramMap));
    	}
    	if(list != null && list.size() > recordCount){
    		list.subList(0, list.size()-recordCount).clear();
    	}
    	return list;
    }
    
    /**   
     * @Description: 每条记录都要记录一下这些扩展属性 
     * @author songj@sdfcp.com
     * @date 2015年8月18日 上午8:46:40   
     */
    public Map<String,int[]> getOnlyOneResultExtendList(FiveIn20Number FiveIn20Number,Map<String,int[]> paramMap){
    	Map<String,int[]> rtnMap = new HashMap<String,int[]>();
    	int[] sumLose = paramMap.get("sumLose");
    	int[] skipArray = paramMap.get("skipArray");
    	int[] groupLose = paramMap.get("groupLose");
    	int[] numArray = paramMap.get("numArray");
    	int[] sumTemp = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
    	int[] skipTemp = {0,0,0,0,0,0};
    	int[] groupLoseTemp = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
    	int[] numTemp = {0,0,0,0,0,0,0};
    	addLoseForAllArray(skipArray,groupLose,numArray,sumLose,skipTemp,groupLoseTemp,numTemp,sumTemp);
    	//三组中第一组号码分布
    	int issueId = Integer.parseInt(FiveIn20Number.getIssueNumber());
    	int one = FiveIn20Number.getNo1();
    	int two = FiveIn20Number.getNo2();
    	int three = FiveIn20Number.getNo3();
    	numTemp[0]=issueId;
    	numTemp[one]=0;
    	numTemp[two]=0;
    	numTemp[three]=0;
    	sumTemp[FiveIn20Number.getThreeSum()-3] = 0;
    	int[] luckyNum = {one,two,three,FiveIn20Number.getNumStatus()};
    	int[] luckyNumOrder = {one,two,three};
    	Arrays.sort(luckyNumOrder);
    	int groupOne = luckyNumOrder[0]*10+luckyNumOrder[1];
    	int groupTwo = luckyNumOrder[1]*10+luckyNumOrder[2];
    	int groupThree = luckyNumOrder[0]*10+luckyNumOrder[2];
    	for(int i=0;i<groupReference.length;i++){
    		if(groupReference[i] == groupOne || groupReference[i] == groupTwo || groupReference[i] == groupThree){
    			groupLoseTemp[i] = 0;
    		}
    	}
    	skipTemp[luckyNumOrder[2]-luckyNumOrder[0]] = 0;
    	rtnMap.put("numArray", numTemp);
    	rtnMap.put("groupLose", groupLoseTemp);
    	rtnMap.put("skipArray", skipTemp);
    	rtnMap.put("luckyNum", luckyNum);
    	rtnMap.put("sumLose", sumTemp);
    	paramMap.put("numArray", numTemp);
    	paramMap.put("groupLose", groupLoseTemp);
    	paramMap.put("skipArray", skipTemp);
    	paramMap.put("sumLose", sumTemp);
    	return rtnMap;
    }
    
    //复制数组并计算遗漏值给数组中所有元素加'1'
    private void addLoseForAllArray(int[] skipArray,int[] groupLose,int[] numArray,int[] sumLose,int[] skipTemp,int[] groupLoseTemp,int[] numTemp,int[] sumTemp){
    	if(skipArray.length>0){
    		for(int i=0;i<skipArray.length;i++){
    			skipTemp[i] = skipArray[i];
    			skipTemp[i]++;
    		}
    	}
    	if(groupLose.length>0){
    		for(int i=0;i<groupLose.length;i++){
    			groupLoseTemp[i] = groupLose[i];
    			groupLoseTemp[i]++;
    		}
    	}
    	if(numArray.length>0){
    		for(int i=0;i<numArray.length;i++){
    			numTemp[i] = numArray[i];
    			numTemp[i]++;
    		}
    	}
    	if(sumLose.length>0){
    		for(int i=0;i<sumLose.length;i++){
    			sumTemp[i] = sumLose[i];
    			sumTemp[i]++;
    		}
    	}
    }
    
}
