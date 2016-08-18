/**
 * jsNumber.js
 * @author 卫飞
 * @version v1.0
 * @fileCode UTF-8
 * Created on 2010-7-12
 * Company: Mocha Software
 * Copyright @ Mocha Software Co.,Ltd.
 * Email:weifei@mochasoft.com.cn
 * @description 浮点数加减乘除封装
 **/
function jsNumber(){
	
}
/****
 * 浮点数相加
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
jsNumber.prototype.accAdd=function(arg1,arg2){   
    var r1,r2,m;   
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}   
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}   
    m=Math.pow(10,Math.max(r1,r2))   
    return (arg1*m+arg2*m)/m   
}   
/*****
 * 浮点数相减
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
//返回值：arg1减上arg2的精确结果   
jsNumber.prototype.accSub=function(arg1,arg2){       
    return accAdd(arg1,-arg2);   
}   
/***
 * 乘法计算
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
jsNumber.prototype.accMul=function(arg1,arg2)   
{   
    var m=0,s1=arg1.toString(),s2=arg2.toString();   
    try{m+=s1.split(".")[1].length}catch(e){}   
    try{m+=s2.split(".")[1].length}catch(e){}   
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)   
} 
/***
 * 除法计算
 * @param {} arg1
 * @param {} arg2
 * @return {}
 */
jsNumber.prototype.accDiv=function(arg1,arg2){   
    var t1=0,t2=0,r1,r2;   
    try{t1=arg1.toString().split(".")[1].length}catch(e){}   
    try{t2=arg2.toString().split(".")[1].length}catch(e){}   
    with(Math){   
        r1=Number(arg1.toString().replace(".",""))   
        r2=Number(arg2.toString().replace(".",""))   
        return (r1/r2)*pow(10,t2-t1);   
    }   
}   
/**
 * 四舍五入
 * @param {} v
 * @param {} e
 * @return {}
 */
jsNumber.prototype.accRound=function(v,e)   
  {   
    var   t=1;   
    for(;e>0;t*=10,e--);   
    for(;e<0;t/=10,e++);   
    return   Math.round(v*t)/t;   
  } 
/****
 * 计算百分比
 * @param {} arg1
 * @param {} arg2
 * @param {} arg3
 */
jsNumber.prototype.accRatio=function(arg1,arg2,arg3){
	return this.accRound(this.accDiv(arg1,arg2)*100,arg3);
}
jsNumber.prototype.strLength=function(str){
	return str.replace(/[^\x00-\xff]/g, 'xx').length;   
}

  
 
    