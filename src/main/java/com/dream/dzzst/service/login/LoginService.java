package com.dream.dzzst.service.login;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.dream.dzzst.model.login.ProAndGoods;
import com.dream.dzzst.model.login.ProductDto;
import com.dream.dzzst.model.login.StationAndProduct;

public interface LoginService {
	public boolean userLogin(HttpServletRequest request);
	
	public List<StationAndProduct> getProducts(String stationId);
	
	public ProductDto getDetailProduct(String productId);
	
	public ProAndGoods getProAndGoods(String id);
}
