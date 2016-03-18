package com.blog.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class ClassAnalysis {
    //JSONObject就是个Map，它实现了Map接口
    public static Map toMap(Object object) {
        JSONObject jsonObject = (JSONObject)JSON.toJSON(object);
        return jsonObject;
    }

    //去掉null
    public static Map toMaps(Object object) {
        Map<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = (JSONObject) JSON.toJSON(object);
        for (Map.Entry<String, Object> entry : jsonObject.entrySet()) {
            if (entry.getValue() != null) {
                map.put(entry.getKey(), entry.getValue());
            }
        }
        return map;
    }
}
