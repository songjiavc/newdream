package com.dream.dzzst.service.fivein20;

import java.util.List;
import java.util.Map;

import com.dream.dzzst.model.fivein20.FiveIn20Analysis;
import com.dream.dzzst.model.fivein20.FiveIn20Number;


/**
  * @ClassName: JlHappy3Service 
  * @Description:  
  * @author songjia
  * @date Feb 22, 2016 1:43:35 PM 
  *  
  */
public interface FiveIn20Vr3Service {

    public List<FiveIn20Analysis> getTopNAllMiss(Map<String, String> paramMap,int n);
    
} 

