package com.dream.dzzst.service.fivein20;

import com.dream.dzzst.model.fast3.Fast3;
import com.dream.dzzst.model.fast3.Fast3Analysis;
import com.dream.dzzst.model.fivein20.FiveIn20Analysis;
import com.dream.dzzst.model.fivein20.FiveIn20Number;

import java.util.List;
import java.util.Map;


/**
  * @ClassName: JlHappy3Service 
  * @Description:  
  * @author songjia
  * @date Feb 22, 2016 1:43:35 PM 
  *  
  */
public interface FiveIn20Vr1Service {

    /** 
      * @Description: 根据
      * @author songjia
      * @date 2014年11月13日 上午9:18:02 
      * 
      * @param issueID
      * @return 
      */
    public FiveIn20Number getLastRecord(Map<String, Object> paramMap);
    
    /** 
      * @Description: 获取全部数据
      * @author songjia
      * @date 2014年11月13日 上午9:22:31 
      * 
      * @return 
      */
    public List<FiveIn20Number>  getAllData(Map<String, Object> paramMap);
   
    /** 
      * @Description: 获取指定数量的数据
      * @author songjia
      * @date 2014年11月13日 上午9:22:45 
      * 
      * @param count
      * @return 
      */
    public List<FiveIn20Number> getRecordsByNum(String provinceCode,int count);
    
    
    public List<FiveIn20Number> getRecordsByNumOrderById(String provinceCode,int count);
    /** 
      * @Description: 获取当天数据内容
      * @author songjia
      * @date 2014年11月13日 上午9:23:02 
      * 
      * @return 
      */
    public List<FiveIn20Number> getTodayDatas(Map<String, Object> paramMap);
    
    /** 
      * @Description: controller initData方法主函数
      * @author songjia
      * @date 2014年11月17日 下午3:09:02 
      * 
      * @param recordCount
      * @return 
      */
    public Map<String,Object> getInitContext(String recordCount, String pcode);
    
    public FiveIn20Number getRecordByIssueNumber(Map<String,Object> paramMap,String issueNumber);
    
    /** 
      * @Description: 根据指定周期计算函数
      * @author songjia
      * @date 2014年11月18日 上午8:41:22 
      * 
      * @param paramMap
      * @return 
      */
    public Map<String,Object> getIntervalContext(String issueID, Map<String, int[]> paramMap, String pcode);
    
    
    public Map<String,Object> deleteDataInput(String id,String pcode);
    /** 
      * @Description: 获取前几名遗漏的统计值
      * @author songjia
      * @date Feb 25, 2016 1:57:24 PM 
      * @param n
      * @param analysisList
      * @return 
      */
    public List<FiveIn20Analysis> getTopNMiss(Map<String, String> paramMap,int n);
    
    /**
     * @param paramMap
     * 获取顺一历史最大遗漏统计
     * @return
     */
    public List<FiveIn20Analysis> getShun1HistoryMaxMiss(Map<String, Object> paramMap);
    
    /**将补录数据插入
     * @param issueNumber
     * @param dataArr
     * @return
     */
    public Map<String,Object> insertDataInput(String provinceCode,String issueNumber,int[] dataArr);
} 

