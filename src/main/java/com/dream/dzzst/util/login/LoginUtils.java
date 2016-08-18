package com.dream.dzzst.util.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.dream.dzzst.model.login.StationDto;

public class LoginUtils {
	
	private static final  Logger logger = Logger.getLogger(LoginUtils.class);

	public static String getLoginUserCode(HttpSession session,HttpServletRequest request,HttpServletResponse response)
	{
		String code = "";
		
		StationDto user = null;
		

		try{
			user = (StationDto) session.getAttribute("currentUser");
			code = user.getCode();
		}
		catch(Exception e)
		{
			logger.error("无法获取到登录站点的session数据!");
		}
		
		return code;
	}
	
	public static String getLoginUserProvinceCode(HttpSession session,HttpServletRequest request,HttpServletResponse response)
	{
		String provincecode = "";
		
		StationDto user = null;
		

		try{
			user = (StationDto) session.getAttribute("currentUser");
			provincecode = user.getProvinceCode();
		}
		catch(Exception e)
		{
			logger.error("无法获取到登录站点的session数据!");
		}
		
		return provincecode;
	}
	
	
	public static String getLoginUserCityCode(HttpSession session,HttpServletRequest request,HttpServletResponse response)
	{
		String citycode = "";
		
		StationDto user = null;
		

		try{
			user = (StationDto) session.getAttribute("currentUser");
			citycode = user.getCityCode();
		}
		catch(Exception e)
		{
			logger.error("无法获取到登录站点的session数据!");
		}
		
		return citycode;
	}
	
	public static String getLoginUserId(HttpSession session,HttpServletRequest request,HttpServletResponse response)
	{
		String id = "";
		
		StationDto user = null;
		

		try{
			user = (StationDto) session.getAttribute("currentUser");
			id = user.getId();
		}
		catch(Exception e)
		{
			logger.error("无法获取到登录站点的session数据!");
		}
		
		return id;
	}
}
