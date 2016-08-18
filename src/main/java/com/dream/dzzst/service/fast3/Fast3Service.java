package com.dream.dzzst.service.fast3;

import java.util.List;
import java.util.Map;

import com.dream.dzzst.model.fast3.Fast3;
import com.dream.dzzst.model.fast3.Fast3Analysis;




/** 
  * @ClassName: JlHappy3Service 
  * @Description:  
  * @author songjia
  * @date Feb 22, 2016 1:43:35 PM 
  *  
  */
public interface Fast3Service {
    
    /** 
      * @Description: 根据
      * @author songjia
      * @date 2014年11月13日 上午9:18:02 
      * 
      * @param issueID
      * @return 
      */
    public Fast3 getLastRecord(Map<String,Object> paramMap);
    
    /** 
      * @Description: 获取全部数据
      * @author songjia
      * @date 2014年11月13日 上午9:22:31 
      * 
      * @return 
      */
    public List<Fast3>  getAllData(Map<String,Object> paramMap);
   
    /** 
      * @Description: 获取指定数量的数据
      * @author songjia
      * @date 2014年11月13日 上午9:22:45 
      * 
      * @param count
      * @return 
      */
    public List<Fast3> getRecordsByNum(Map<String,Object> paramMap);
    
    /** 
      * @Description: 获取当天数据内容
      * @author songjia
      * @date 2014年11月13日 上午9:23:02 
      * 
      * @return 
      */
    public List<Fast3> getTodayDatas(Map<String,Object> paramMap);
    
    /** 
      * @Description: controller initData方法主函数
      * @author songjia
      * @date 2014年11月17日 下午3:09:02 
      * 
      * @param recordCount
      * @return 
      */
    public Map<String,Object> getInitContext(String recordCount,String pcode);
    
    /** 
      * @Description: 根据指定周期计算函数
      * @author songjia
      * @date 2014年11月18日 上午8:41:22 
      * 
      * @param paramMap
      * @return 
      */
    public Map<String,Object> getIntervalContext(String issueID,String missLastIssueId,Map<String,int[]> paramMap,String pcode);
    
    /** 
      * @Description: 获取前几名遗漏的统计值
      * @author songjia
      * @date Feb 25, 2016 1:57:24 PM 
      * @param n
      * @param analysisList
      * @return 
      */
    public List<Fast3Analysis> getTopNMiss(int n,Map<String,String> paramMap);
} 

