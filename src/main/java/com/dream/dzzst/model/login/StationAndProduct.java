package com.dream.dzzst.model.login;

import java.sql.Timestamp;

public class StationAndProduct {

	private String id;
	
	private String stationId;//站点id
	
	private String productId;//产品id
	
	private String goodsId;//商品id
	
	private Timestamp startTime;//开始时间
	
	private Timestamp endTime;//结束时间（根据购买时间自动计算）
	
	private String type;//类型（0：试用;1:正式使用
	
	private String orderId;//关联当前关联数据的订单
	
	private String status;//站点<-->产品管理关系状态位，在订单形成时置status=0无效，订单审批通过完成后置为1
	
	private String probation;//代理设置试用期天数
	
	private String durationOfUse;//站点使用当前产品的使用期限
	
	private String creater;
	
	private Timestamp createrTime;
	
	private String 	modify;
	
	private Timestamp modifyTime;
	
	private String 	isDeleted;
	
	

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

	public Timestamp getCreaterTime() {
		return createrTime;
	}

	public void setCreaterTime(Timestamp createrTime) {
		this.createrTime = createrTime;
	}

	public String getModify() {
		return modify;
	}

	public void setModify(String modify) {
		this.modify = modify;
	}

	public Timestamp getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Timestamp modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(String isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStationId() {
		return stationId;
	}

	public void setStationId(String stationId) {
		this.stationId = stationId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getProbation() {
		return probation;
	}

	public void setProbation(String probation) {
		this.probation = probation;
	}

	public String getDurationOfUse() {
		return durationOfUse;
	}

	public void setDurationOfUse(String durationOfUse) {
		this.durationOfUse = durationOfUse;
	}
	
	
}
