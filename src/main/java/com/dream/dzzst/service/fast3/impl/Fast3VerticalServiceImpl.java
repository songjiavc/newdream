package com.dream.dzzst.service.fast3.impl;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dream.dzzst.dao.fast3.Fast3TMapper;
import com.dream.dzzst.model.fast3.Fast3;
import com.dream.dzzst.model.fast3.Fast3Analysis;
import com.dream.dzzst.service.cache.GlobalCacheService;
import com.dream.dzzst.service.fast3.Fast3Service;

/**
 * Created by Administrator on 2014/8/8.
 */
@Service("fast3VerticalService")
public class Fast3VerticalServiceImpl implements Fast3Service{
    
	@Autowired
	private Fast3TMapper fast3TMapper;
	
	private int[] groupReference = {11,22,33,44,55,66,12,13,14,15,16,23,24,25,26,34,35,36,45,46,56};
	
	@Autowired
	private GlobalCacheService globalCacheService;
	@Override
	public Fast3 getLastRecord(Map<String,Object> paramMap){
		return fast3TMapper.getLastRecord(paramMap);
	}
	@Override
	public List<Fast3>  getAllData(Map<String,Object> paramMap){
		return fast3TMapper.getAllData(paramMap);
	}

	@Override
	public List<Fast3> getRecordsByNum(Map<String,Object> paramMap) {
		return fast3TMapper.getRecordsByNum(paramMap);
	}
	@Override
	public List<Fast3> getTodayDatas(Map<String,Object> paramMap) {
		return fast3TMapper.getTodayDatas(paramMap);
	}
    @Override
    public Map<String, Object> getInitContext(String recordCount,String pcode) {
    	Map<String,Object> returnMap = new HashMap<String,Object>();
        Map<String,Object> paramMap = new HashMap<String,Object>();
        paramMap.put("mainTable", globalCacheService.getCacheMap(pcode)[0]);
    		//今日出现次数
        List<Fast3> todayTimesList = this.getTodayDatas(paramMap);
        		//遗漏值从这里取出
        List<Fast3> initMissList = this.getAllData(paramMap);
        		//遗漏值从这里取出
        paramMap.put("count", Integer.parseInt(recordCount));
        		//遗漏分析值在这里取出
        Map<String,String> paMap = new HashMap<String,String>();
        paMap.put("mainTable", globalCacheService.getCacheMap(pcode)[1]);
        paMap.put("issueNumber", "");
        List<Fast3Analysis> analysisList = this.getTopNMiss(3, paMap);
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
        List<Fast3Analysis> analysisList = this.getTopNMiss(3, paMap);
        Fast3 fast3  = this.getLastRecord(selMap);
        if(fast3.getIssueNumber().equals(issueID)){
        	fast3 = null;
        	returnMap.put("record", fast3);
        }else{
        	 returnMap.put("record", getOnlyOneResultExtendList(fast3,paramMap));
        	 Map<String,int[]> todayIntArr = getIntervalTodayTimesArr(fast3,paramMap);
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
    private Map<String,int[]> getTodayTimesArr(List<Fast3> fast3List){
        Map<String,int[]> returnMap = new HashMap<String,int[]>();
        int[] winNumDist = {0,0,0,0,0,0};    //开奖号码分布遗漏计算
        int[] sumNumDist = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};  //开奖号码和值每日出现次数
        int[] skipNumDist = {0,0,0,0,0,0};
        int[] groupNumDist = new int[]{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
        for(Fast3 fast3 : fast3List){
            /*
             * 取出三个值并将它转为整型
             */
            int numOne = fast3.getNo1();
            int numTwo = fast3.getNo2();
            int numThree = fast3.getNo3();
            //求合值
            int sum = numOne+numTwo+numThree;
            int skip = getSkip(numOne,numTwo,numThree);
            winNumDist[numOne-1] = winNumDist[numOne-1] + 1;
            winNumDist[numTwo-1] = winNumDist[numTwo-1] + 1;
            winNumDist[numThree-1] = winNumDist[numThree-1] + 1;
            sumNumDist[sum-3] = sumNumDist[sum-3] + 1;
            skipNumDist[skip] = skipNumDist[skip] + 1;
            int[] numOrder = {numOne,numTwo,numThree};
	    	Arrays.sort(numOrder);
	    	int groupOne = numOrder[0]*10+numOrder[1];
	    	int groupTwo = numOrder[1]*10+numOrder[2];
	    	int groupThree = numOrder[0]*10+numOrder[2];
	    	for(int i=0;i<groupReference.length;i++){
	    		if(groupReference[i] == groupOne || groupReference[i] == groupTwo || groupReference[i] == groupThree){
	    			groupNumDist[i]++;
	    		}
	    	}
        }
        returnMap.put("groupNumDist", groupNumDist);
        returnMap.put("sumNumDist", sumNumDist);
        returnMap.put("winNumDist", winNumDist);
        returnMap.put("skipNumDist", skipNumDist);
        return returnMap;
    }
    /** 
     * @Description: 求跨度 
     * @author songj@sdfcp.com
     * @date 2014年11月17日 下午3:55:30 
     * 
     * @param a
     * @param b
     * @param c
     * @return 
     */
    private int getSkip(int a,int b,int c){
        int skipValue = 0;
        int[] intArr = {a,b,c};
        Arrays.sort(intArr);  //进行排序
        skipValue = intArr[intArr.length-1] - intArr[0];
        return skipValue;
    }
    /** 
      * @Description: 根据周期函数获取今日出现次数 
      * @author songj@sdfcp.com
      * @date 2014年11月18日 上午8:35:57 
      * 
      * @param fast3List
      * @return 
      */
    private Map<String,int[]> getIntervalTodayTimesArr(Fast3 fast3,Map<String,int[]> paramMap){
        Map<String,int[]> returnMap = new HashMap<String,int[]>();
        int[] winNumDist,sumNumDist,skipNumDist,groupNumDist;
        if("01".equals(fast3.getIssueNumber().substring(fast3.getIssueNumber().length()-2, fast3.getIssueNumber().length()))){
            winNumDist = new int[]{0,0,0,0,0,0};
            skipNumDist = new int[]{0,0,0,0,0,0};
            sumNumDist = new int[]{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
            groupNumDist = new int[]{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
        }else{
            winNumDist = paramMap.get("winNumDist");
            skipNumDist = paramMap.get("skipNumDist");
            sumNumDist = paramMap.get("sumNumDist");
            groupNumDist = paramMap.get("groupNumDist");
        }
        /*
         * 取出三个值并将它转为整型
         */
        int numOne = fast3.getNo1();
        int numTwo = fast3.getNo2();
        int numThree = fast3.getNo3();
        //求合值
        int sum = numOne+numTwo+numThree;
        int[] numOrder = {numOne,numTwo,numThree};
    	Arrays.sort(numOrder);
    	int groupOne = numOrder[0]*10+numOrder[1];
    	int groupTwo = numOrder[1]*10+numOrder[2];
    	int groupThree = numOrder[0]*10+numOrder[2];
    	for(int i=0;i<groupReference.length;i++){
    		if(groupReference[i] == groupOne || groupReference[i] == groupTwo || groupReference[i] == groupThree){
    			groupNumDist[i]++;
    		}
    	}
    	skipNumDist[numOrder[2]-numOrder[0]]++;
        winNumDist[numOne-1] = winNumDist[numOne-1] + 1;
        winNumDist[numTwo-1] = winNumDist[numTwo-1] + 1;
        winNumDist[numThree-1] = winNumDist[numThree-1] + 1;
        sumNumDist[sum-3] = sumNumDist[sum-3] + 1;
        returnMap.put("sumNumDist", sumNumDist);
        returnMap.put("winNumDist", winNumDist);
        returnMap.put("skipNumDist", skipNumDist);
        returnMap.put("groupNumDist", groupNumDist);
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
    public List<Fast3Analysis> getTopNMiss(int n,Map<String,String> paramMap){
    	List<Fast3Analysis> rtnList = null;
    		//定义list  全部分组list
    	List<Fast3Analysis> allNumber = new ArrayList<Fast3Analysis>();
    	List<Fast3Analysis> noSameNumber = new ArrayList<Fast3Analysis>();
    	List<Fast3Analysis> twoSameNumber = new ArrayList<Fast3Analysis>();
    	List<Fast3Analysis> threeSameNumber = new ArrayList<Fast3Analysis>();
    	List<Fast3Analysis> allGroup = new ArrayList<Fast3Analysis>();
    	List<Fast3Analysis> fourNumber = new ArrayList<Fast3Analysis>();
    	List<Fast3Analysis> analysisList = fast3TMapper.getMissAnalysis(paramMap);
    	if(null != analysisList && analysisList.size() > 0){
    		int a = 0,b = 0,c=0,d=0;
    		rtnList = new ArrayList<Fast3Analysis>();
    		for(Fast3Analysis fast3Analysis : analysisList){
    			if(fast3Analysis.getType() == 2 || fast3Analysis.getType() == 3 || fast3Analysis.getType() == 4){
    				allNumber.add(fast3Analysis);
    			}
    			if(fast3Analysis.getType() == 6 || fast3Analysis.getType() == 7){
    				allGroup.add(fast3Analysis);
    			}
    			if(fast3Analysis.getType() == 2&&a<n){
    				twoSameNumber.add(fast3Analysis);
    				a++;
    			}else if(fast3Analysis.getType() == 3 && b<n){
    				threeSameNumber.add(fast3Analysis);
    				b++;
    			}else if(fast3Analysis.getType()==4&&c<n){
    				noSameNumber.add(fast3Analysis);
    				c++;
    			}else if(fast3Analysis.getType()==5&&d<n){
    				fourNumber.add(fast3Analysis);
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
    public List<Map<String,int[]>> getResultExtendList(List<Fast3> ahHappy3List,int recordCount){
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
    public Map<String,int[]> getOnlyOneResultExtendList(Fast3 fast3,Map<String,int[]> paramMap){
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
    	int issueId = Integer.parseInt(fast3.getIssueNumber());
    	int one = fast3.getNo1();
    	int two = fast3.getNo2();
    	int three = fast3.getNo3();
    	numTemp[0]=issueId;
    	numTemp[one]=0;
    	numTemp[two]=0;
    	numTemp[three]=0;
    	sumTemp[fast3.getThreeSum()-3] = 0;
    	int[] luckyNum = {one,two,three,fast3.getNumStatus()};
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
