package com.blog.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by talenttan on 12/3/16.
 */
public class HttpServletUtil {

    /**
     * 从session中获取指定属性值
     * @param request   httpServletRequest实例
     * @param attName   指定属性key
     * @return
     */
    public static  Object getSessionAttribute(HttpServletRequest request,String attName){
        Object obj = null;
        HttpSession session = request.getSession();
        if(session!=null){
            obj = session.getAttribute(attName);
        }
        return obj;
    }
}
