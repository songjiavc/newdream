package com.dream.dzzst.servlet.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.dream.dzzst.model.login.StationDto;
import com.dream.dzzst.service.login.LoginService;

public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
						 HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
						  HttpServletResponse response) throws ServletException, IOException {
		WebApplicationContext appContext = WebApplicationContextUtils
				.getRequiredWebApplicationContext(getServletContext());
		LoginService bs = (LoginService) appContext.getBean("loginService");
		boolean loginResult = bs.userLogin(request);
		if (loginResult) {
			//返回到动态加载页面
			request.getRequestDispatcher("/WEB-INF/jsp/proList.jsp").forward(request, response);

		} else {
			request.getRequestDispatcher("/login.jsp").forward(request,
					response);
		}
	}
}
