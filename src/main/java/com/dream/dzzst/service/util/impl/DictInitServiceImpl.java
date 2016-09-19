package com.dream.dzzst.service.util.impl;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dream.dzzst.dao.fast3.Fast3TMapper;
import com.dream.dzzst.dao.login.ProOfStaMapper;
import com.dream.dzzst.model.fast3.Fast3;
import com.dream.dzzst.model.fast3.Fast3Analysis;
import com.dream.dzzst.model.util.DictDto;
import com.dream.dzzst.service.cache.GlobalCacheService;
import com.dream.dzzst.service.util.DictInitService;

/**
 * Created by Administrator on 2014/8/8.
 */
@Service("dictInitService")
public class DictInitServiceImpl implements DictInitService{

	@Autowired
	private ProOfStaMapper proOfStaMapper;
	
	
	@Override
	 public List<DictDto> getCpzlName(){
	    	List<DictDto> dtoList = proOfStaMapper.getCPZLnameList();
	    	return dtoList;
	    }
}
