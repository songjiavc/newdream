package com.dream.dzzst.enums;

/** 
  * @ClassName: BizExceptionEnum 
  * @Description: 存放异常信息 
  * @author songj@sdfcp.com
  * @date 2014年11月24日 下午3:03:45 
  *  
  */
public enum BizExceptionEnum {  
    //所有业务异常描述放在这里
    ECHART_NO_DATA(1001, "走势图不存在基础数据支撑!"),
    ECHART_NO_TEST(1002, "走势图不存在基础数据支撑!");  
    // 成员变量  
    private int index;  
    private String name;  
    // 构造方法  
    private BizExceptionEnum(int index,String name) {  
        this.index = index;  
        this.name = name;  
    }
    // 构造方法  
    private BizExceptionEnum(BizExceptionEnum bizExceptionEnum) {  
        this.index = bizExceptionEnum.getIndex();  
        this.name = bizExceptionEnum.getName();  
    }
    //覆盖方法  
    @Override  
    public String toString() {  
        return this.index+"_"+this.name;  
    }
    
    private int getIndex(){
        return this.index;
    }
    private String getName(){
        return this.name();
    }
    
    public static String getName(int index) {
        for (BizExceptionEnum temp : BizExceptionEnum.values()) {
            if (temp.getIndex() == index) {
                return temp.name;
            }
        }
        return null;
    }
}  