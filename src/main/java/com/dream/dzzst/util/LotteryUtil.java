package com.dream.dzzst.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.lang.StringUtils;

public class LotteryUtil {

       public  static String getLastNIssueNumber(String currentIssueNumber,int n,int dayCount){
		String rtnIssueNumber = null;
		if(StringUtils.isNotEmpty(currentIssueNumber)){
			int issueCode = Integer.parseInt(currentIssueNumber.substring(currentIssueNumber.length()-2,currentIssueNumber.length()));
			if((issueCode+79-101 ) >=  0){
				//reutrn  issueCode+79-100
				if( (issueCode+79-101) < 10 ){
					return getNextNDay(-1) + "00" + (issueCode+79-101);
				}else{
					return getNextNDay(-1) + "0"+ (issueCode+79-101);
				}
			}else{
				return getNextNDay(-2) +  "0" + (issueCode+79*2-100);
			}
		}else{
			return rtnIssueNumber;
		}
	}
	
       
       public static void main(String[] args){
    	  System.out.println(getLastNIssueNumber("160924022",100,Constants.QYH_DAY_COUNT));
       }
	/**
	 * @param n
	 * @return获取N天后日期
	 */
	public static String getNextNDay(int n){
		 Calendar calendar = new GregorianCalendar();
		 Date date = new Date();
		 calendar.setTime(date);
		 calendar.add(calendar.DATE,n);//把日期往后增加一天.整数往后推,负数往前移动
		 date=calendar.getTime(); //这个时间就是日期往后推一天的结果
		 SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
		 String dateString = formatter.format(date);
		 return dateString;
	}
}
