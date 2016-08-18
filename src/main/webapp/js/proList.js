$(document).ready(function()
		{
			getProductList();
		});



//获取当前登录站点的所购买的有效站点列表
function getProductList()
{
	var url = contextPath+"/loginController/getProOfSta.do";
	$.ajax({
		async: false,   //设置为同步获取数据形式
        type: "get",
        cache:false,
        url: url,
        dataType: "json",
        success: function (data) {
        	
        	//清空容器
        	$("#context").html("");
        	
        	//加载数据
        	var html = "";
        	var prourl = '';//产品url
        	var proName = '';//产品名称
        	var product;
        	var provinceDm = '';
        	var cityDm ='';
        	for(var i=0;i<data.length;i++)
        		{
        			product = data[i];
        			prourl = product.prourl;
        			proName = product.name;
        			provinceDm = product.provinceDm;//产品所属省份编码	
        			cityDm = product.cityDm;//产品所属城市编码
        			
        			html += ' <div class="menuDivT" ' +
        					'	onclick="location.href=&quot;'+contextPath+prourl+'?provinceDm='+provinceDm+'&cityDm='+cityDm+'&quot;">'+
	        				'   <div class="menuDivTa">走势图</div>' +
	        				' 	<div class="menuDivTb">'+proName+'</div>' +
//	        				' 	<div class="menuDivTc">'+proName+'</div>' +
	        				' 	</div>';
	        			
        		}
        	
        	$("#context").html(html);//向容器中放置显示产品内容
			
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
	});
}









