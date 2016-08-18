package com.dream.dzzst.filter.login;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class LoginFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String uri = request.getRequestURI();
		if (uri.indexOf(request.getContextPath() + "/zccm") == 0) {
			this.doFilter(request, response, filterChain);
		} else {
		    Object obj = request.getSession().getAttribute("currentUser");
			if (null == obj) {
				request.getRequestDispatcher("/login.jsp").forward(request,
						response);
			} else {
				this.doFilter(request, response, filterChain);
			}
		}
	}
}