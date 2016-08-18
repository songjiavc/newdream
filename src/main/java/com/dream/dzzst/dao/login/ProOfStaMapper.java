package com.dream.dzzst.dao.login;

import java.util.List;

import com.dream.dzzst.model.login.ProAndGoods;
import com.dream.dzzst.model.login.ProductDto;
import com.dream.dzzst.model.login.StationAndProduct;

public interface ProOfStaMapper {

	/**
	 * 获取当前站点的购买的有效的产品列表
	 * @param stationId
	 * @return
	 */
	public List<StationAndProduct> getProducts(String stationId);
	
	/**
	 * 根据产品id获取产品详情
	 * @param productId
	 * @return
	 */
	public ProductDto getDetailProduct(String productId);
	
	/**
	 * 根据id获取产品和商品关联数据
	 * @param id
	 * @return
	 */
	public ProAndGoods getProAndGoods(String id);
}
