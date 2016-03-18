package com.blog.utils;

import java.util.Map;

/**
 * Created by huanghf on 25/6/15.
 */
public class MapUtils {
    //为空时，返回空串
    public static String getEmptyParam(Map map,String param){
        if(null==map){
            return "";
        }

        if(null==param||"".equals(param)){
            return "";
        }

        if(null==map.get(param)){
            return "";
        }

        return map.get(param).toString();

    }
}
