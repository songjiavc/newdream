package com.dream.dzzst.listener;

import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.dream.dzzst.model.util.DictDto;
import com.dream.dzzst.service.cache.GlobalCacheService;
import com.dream.dzzst.service.util.DictInitService;

/**
 * @author songjia
 * 类加载完毕后直接调用监听执行
 */
public class InitDictListener implements ServletContextListener {

	 public void contextInitialized(ServletContextEvent sce) {
		    //spring 上下文
		    ApplicationContext	 appContext = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
		    /**
		     * 数据字典加载器
		     */
		    DictInitService dictInitService = (DictInitService) appContext.getBean("dictInitService");
		    GlobalCacheService globalCacheService = (GlobalCacheService) appContext.getBean("globalCacheService");
		    List<DictDto> dtoList =  dictInitService.getCpzlName();
		    for(DictDto dto : dtoList){
		    	globalCacheService.setCpzlMap(dto.getCode(), dto.getName());
		    }
	 }
	 
		  public void contextDestroyed(ServletContextEvent sce) {
		  }
}