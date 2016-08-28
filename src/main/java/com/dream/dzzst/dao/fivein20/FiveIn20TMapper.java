package com.dream.dzzst.dao.fivein20;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.dream.dzzst.model.fivein20.FiveIn20Analysis;
import com.dream.dzzst.model.fivein20.FiveIn20Number;

/** 
  * @ClassName: Fast3TMapper 
  * @Description: 安徽快3dao
  * @author songjia
  * @date 2014年11月17日 下午2:14:20 
  *  
  */
public interface FiveIn20TMapper {
	
    /** 
      * @Description: 获取最后一条数据
      * @author songjia
      * @date 2014年11月17日 下午2:14:43 
      * 
      * @return 
      */
    FiveIn20Number getLastRecord(Map<String, Object> paramMap);
    
    /** 
      * @Description: 根据期号获取记录
      * @author songjia
      * @date 2014年11月17日 下午2:15:09 
      * 
      * @param issueID
      * @return 
      */
    FiveIn20Number getRecordByIssueId(Map<String, Object> paramMap);
    
    /** 
      * @Description: 根据传入数量获取指定数量的记录数
      * @author songjia
      * @date 2014年11月13日 上午9:14:24 
      * 
      * @param count
      * @return List<Bj5In11>
      */
    List<FiveIn20Number> getRecordsByNum(Map<String, Object> paramMap);
    
    List<FiveIn20Number>  getRecordsByNumOrderById(Map<String, Object> paramMap);
    
    /** 
      * @Description: 获取表中全部记录
      * @author songjia
      * @date 2014年11月13日 上午9:14:55 
      * 
      * @return List<Bj5In11>
      */
    List<FiveIn20Number> getAllData(Map<String, Object> paramMap);
    
    /** 
      * @Description: 获取今天记录总数,为了统计今日出现次数设计
      * @author songjia
      * @date 2014年11月13日 上午9:15:11 
      * 
      * @return List<Bj5In11>
      */
    List<FiveIn20Number> getTodayDatas(Map<String, Object> paramMap);
    
    
    /** 
      * @Description: TODO(这里用一句话描述这个类的作用)
      * @author songjia
      * @date Feb 25, 2016 1:53:35 PM 
      * @param issueNumber
      * @return 
      */
    List<FiveIn20Analysis> getMissAnalysis(Map<String, String> paramMap);
    
    /**补录数据插入
     * @param paramMap
     */
    void insertDataInput(Map<String,Object> paramMap);
    
    /**补录数据插入
     * @param paramMap
     */
    void deleteDataInput(Map<String,Object> paramMap) throws SQLException;
}
