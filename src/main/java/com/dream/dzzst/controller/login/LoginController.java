package com.dream.dzzst.controller.login;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dream.dzzst.model.login.ProductDto;
import com.dream.dzzst.model.login.StationAndProduct;
import com.dream.dzzst.service.login.LoginService;
import com.dream.dzzst.util.login.LoginUtils;


@Controller
@RequestMapping("/loginController")
public class LoginController {

	@Autowired
	private LoginService loginservice;
	
	private static final String CPDL_DM = "02";//产品大类--软件的code
	
	/**
	 * 获取当前登录站点的有效产品列表
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getProOfSta", method = RequestMethod.GET)
	public @ResponseBody List<ProductDto> getProOfSta(HttpSession session,HttpServletRequest request,HttpServletResponse response) {
		
		List<StationAndProduct> stationAndProducts = new ArrayList<StationAndProduct>();
		
		List<ProductDto>  productDtos = new ArrayList<ProductDto>();
		
		//##测试数据
		String stationId = LoginUtils.getLoginUserId(session, request, response);//TODO:根据当前登录信息获取当前登录的站点id,
		Object obj = request.getSession().getAttribute("currentUser");//获取session数据
		if (null == obj) {
			try {
				request.getRequestDispatcher("/login.jsp").forward(request,
						response);
			} catch (ServletException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
//			stationId = obj.get//从session中获取站点id
			stationAndProducts = loginservice.getProducts(stationId);
			ProductDto dto = null;
			for (StationAndProduct sap : stationAndProducts) {
				//获取的是商品和产品关联表的id,要根据这个id找到产品id
				dto = this.getDetailProductDto(sap.getProductId());
				
				if(LoginController.CPDL_DM.equals(dto.getCpdlDm()))//前台显示只显示软件产品
				{
					productDtos.add(dto);
				}
				
			}
			
		}
		return productDtos;
		
	}
	
	
	
	
	/**
	 * 根据产品id获取产品详情
	 * @param productId
	 * @return
	 */
	private ProductDto getDetailProductDto(String productId)
	{
		ProductDto dto = loginservice.getDetailProduct(productId);
		
		return dto;
	}
}
