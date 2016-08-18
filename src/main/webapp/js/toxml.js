/**
 * 兼容IE和FireFox的转化String成doc的方法
 * 
 * @param {}
 *            sXML
 * @return {}
 */
function getDocByXMLStr(sXML) {
 
	var doc;
	if ($.browser.msie) {
		doc = new ActiveXObject("Msxml2.DOMDocument");
		 doc.createProcessingInstruction("xml","version=\"1.0\" encoding=\"UTF-8\"");
		 doc.loadXML(sXML);
		// 添加文件头
		 
	} else if ($.browser.mozilla) {
		var oParser = new DOMParser();
		doc = oParser.parseFromString(sXML, "text/xml");
	} else {
		var oParser = new DOMParser();
		doc = oParser.parseFromString(sXML, "text/xml");
	}
	return doc;
}
/**
 * 兼容IE和FireFox的转化doc成String的方法
 * 
 * @param {}
 *            el
 */
function getElementXMLStr(el) {
	var sXML;
	if (!el)
		return;
	if ($.browser.msie) {
		sXML = el.xml;
	} else {
		sXML = new XMLSerializer().serializeToString(el, "text/xml");
	}
	return sXML;
}
/****
 * xml添加节点
 * @param {} personDoc xml对象
 * @param {} base 父节点
 * @param {} name 节点名称
 * @param {} value 节点值
 * @return {}
 */
function creatNode(personDoc, base, name, field) {
	// ar elNodeItems = personDoc.createElement('Items');
	var item = personDoc.createElement(name);
	 
	 if(field!=undefined&&field.length>0){
		
			  var c = personDoc.createCDATASection(name);
              c.text = field.val();
              item.appendChild(c);
		 
	}
	base.appendChild(item);
	return item;
}
function creatNodeValue(personDoc, base, name, value) {
	// ar elNodeItems = personDoc.createElement('Items');
	var item = personDoc.createElement(name);
	if(value!=null&&value.length>0){	 
			item.text = value;	 
	}
	base.appendChild(item);

	return item;
}
/****
 * 生成合同号和动态添加行的行号
 * @param {} personDoc
 * @param {} parentNode
 * @param {} cindex
 * @param {} lineindex
 */
createContrateIndex=function(personDoc,parentNode,cindex,lineindex){
	 
   if(cindex!=undefined ) creatNodeValue(personDoc,parentNode,"APPERTAIN", cindex+"");
   if(lineindex!=undefined ) creatNodeValue(personDoc,parentNode,"ORDER_NUM",lineindex+"");
}
$.getNowTime=function(){
	var d=new Date();
	var m=(d.getMonth()+1)>9?(d.getMonth()+1):("0"+(d.getMonth()+1));
	var dd=d.getDate()>9?d.getDate():"0"+d.getDate();
	 
	var hh=d.getHours()>9?d.getHours():"0"+d.getHours();
	 
	var mm=d.getMinutes()>9?d.getMinutes():"0"+d.getMinutes();
	 
	var ss=d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds();
	return d.getYear()+"-"+m+"-"+dd+" "+hh+":"+mm+":"+ss;
}
$.replaceAll=function(s0,s1,s2){    
	return s0.replace(new RegExp(s1,"gm"),s2);    
}