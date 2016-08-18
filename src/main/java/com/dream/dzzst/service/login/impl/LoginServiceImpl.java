package com.dream.dzzst.service.login.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dream.dzzst.dao.login.LoginMapper;
import com.dream.dzzst.dao.login.ProOfStaMapper;
import com.dream.dzzst.model.login.ProAndGoods;
import com.dream.dzzst.model.login.ProductDto;
import com.dream.dzzst.model.login.StationAndProduct;
import com.dream.dzzst.model.login.StationDto;
import com.dream.dzzst.service.login.LoginService;

@Service("loginService")
public class LoginServiceImpl implements LoginService {
	@Autowired
	private LoginMapper loginMapper;
	
	@Autowired
	private ProOfStaMapper proOfStaMapper;

	@Override
	public boolean userLogin(HttpServletRequest request) {
		String username = (String) request.getParameter("username");
		if ("".equals(username)) {
			request.setAttribute("loginFail", "noUsername");
			return false;
		}
		if (username == null) {
			return false;
		}
		Map<String, String> loginInfo = new HashMap<String, String>();
		loginInfo.put("code",request.getParameter("username"));
		loginInfo.put("password",request.getParameter("password"));
		List<StationDto> usermsg = loginMapper.getLoginUser(loginInfo);//判断当前登录用户是否存在
		if (usermsg.size() == 0) {
			request.setAttribute("loginFail", "validateFail");
			return false;
		} else {
			StationDto user = usermsg.get(0);
			request.getSession().setAttribute("currentUser", user);
			return true;
		}

	}

	@Override
	public List<StationAndProduct> getProducts(String stationId) {
		return proOfStaMapper.getProducts(stationId);
	}

	@Override
	public ProductDto getDetailProduct(String productId) {
		return proOfStaMapper.getDetailProduct(productId);
	}

	@Override
	public ProAndGoods getProAndGoods(String id) {
		return proOfStaMapper.getProAndGoods(id);
	}

}
