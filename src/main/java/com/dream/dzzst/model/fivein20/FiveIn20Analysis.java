package com.dream.dzzst.model.fivein20;


/** 
  * @ClassName: Fast3Analysis 
  * @Description:  
  * @author songjia
  * @date Feb 25, 2016 1:42:50 PM 
  *  
  */
public class FiveIn20Analysis implements Comparable<FiveIn20Analysis> {

	private String issueNumber;
	
	private String groupNumber;
	 
	private Integer currentMiss;
	
	private int maxMiss;
	
	private int type;

	public String getIssueNumber() {
		return issueNumber;
	}

	public void setIssueNumber(String issueNumber) {
		this.issueNumber = issueNumber;
	}

	public String getGroupNumber() {
		return groupNumber;
	}

	public void setGroupNumber(String groupNumber) {
		this.groupNumber = groupNumber;
	}

	public Integer getCurrentMiss() {
		return currentMiss;
	}

	public void setCurrentMiss(Integer currentMiss) {
		this.currentMiss = currentMiss;
	}

	public int getMaxMiss() {
		return maxMiss;
	}

	public void setMaxMiss(int maxMiss) {
		this.maxMiss = maxMiss;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	@Override
	public int compareTo(FiveIn20Analysis fast3) {
		return fast3.getCurrentMiss().compareTo(this.getCurrentMiss());
	}
	
}