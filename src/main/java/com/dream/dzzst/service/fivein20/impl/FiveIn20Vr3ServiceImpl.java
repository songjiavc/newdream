package com.dream.dzzst.service.fivein20.impl;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dream.dzzst.dao.fivein20.FiveIn20TMapper;
import com.dream.dzzst.model.fivein20.FiveIn20Analysis;
import com.dream.dzzst.service.cache.GlobalCacheService;
import com.dream.dzzst.service.fivein20.FiveIn20Vr3Service;

/**
 * Created by Administrator on 2014/8/8.
 */
@Service("fiveIn20Vr3Service")
public class FiveIn20Vr3ServiceImpl implements FiveIn20Vr3Service {
    
	@Autowired
	private FiveIn20TMapper fiveIn20TMapper;
	
	@Autowired
	private GlobalCacheService globalCacheService;
	
   
	@Override
	public List<FiveIn20Analysis> getTopNAllMiss(Map<String, String> paramMap,int n) {
		//遗漏统计展示顺序
				List<FiveIn20Analysis> rtnList = null;
				String pcode = paramMap.get("provinceCode");
				String lastMissIssueNumber = paramMap.get("lastMissIssueNumber");
				paramMap.put("mainTable", globalCacheService.getCacheMap(pcode)[1]);
				String maxMissIssueNumber = fiveIn20TMapper.getMaxIssueNumberFromMiss(paramMap);
				paramMap.put("issueNumber", maxMissIssueNumber);
				if(StringUtils.isNotEmpty(maxMissIssueNumber)&&!maxMissIssueNumber.equals(lastMissIssueNumber)){
					int[] missSort = {2,3,11,17,22,12,18,23,13,19,24,15,4,5,16,25,6,14,26,7,27,8,9,10};
					List<FiveIn20Analysis> allMissList = fiveIn20TMapper.getAllMissAnalysis(paramMap);
					rtnList = new ArrayList<FiveIn20Analysis>();
					for(int i = 0;i < missSort.length*n;i++){
						rtnList.add(new FiveIn20Analysis());
					}
					int j = 0;
					int tempType = 0;
					for(FiveIn20Analysis temp : allMissList){
						if(tempType == 0 ||tempType !=  temp.getType() ){
							tempType = temp.getType();
							j = 0;
						}
						if(j < n){
							rtnList.set(this.getElementInArrayIndex(tempType, missSort)*n+j,temp);
							j++;
						}else{
							continue;
						}
					}
				}
				return rtnList;
	}
	
	private int getElementInArrayIndex(int element,int[] arr){
		if(arr == null || arr.length == 0){
			return -1;
		}else{
			for(int i=0;i<arr.length;i++){
				if(arr[i] == element){
					return i;
				}
			}
			return -1;
		}
	}
}
