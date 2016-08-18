package com.dream.dzzst.dao.login;

import java.util.List;
import java.util.Map;

import com.dream.dzzst.model.login.StationDto;
import org.springframework.beans.factory.annotation.Autowired;

public interface LoginMapper {
	@Autowired
	List<StationDto> getLoginUser(Map loginInfo);
}
