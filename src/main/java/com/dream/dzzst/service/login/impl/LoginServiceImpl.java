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
			request.setAttribute("loginFail", "请输入用户名~");
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
			request.setAttribute("loginFail", "用户名或者密码错误！");
			return false;
		} else {
			//如果拥有用户信息则判断是否已经登陆
			String loginStatus = loginMapper.getLoginStatus(loginInfo.get("code"));
			if("0".equals(loginStatus)){
				StationDto user = usermsg.get(0);
				request.getSession().setAttribute("currentUser", user);
				return true;
			}else if("1".equals(loginStatus)){
				request.setAttribute("loginFail", "该用户已经登陆,不允许重复登陆！");
				return false;
			}else{
				request.setAttribute("loginFail", "该用户不存在登陆信息！");
				return false;
			}
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
	
	
	public String loginStatus(String currentCode){
		loginMapper.loginStatus(currentCode);
		return "success";
	}
	
}
