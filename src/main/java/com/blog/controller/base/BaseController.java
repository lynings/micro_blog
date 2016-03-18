package com.blog.controller.base;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.blog.enums.ResultCode;
import com.blog.utils.HttpTookit;
import com.blog.utils.JSONPropertyFilter;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.servlet.ModelAndView;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by mac on 14/12/10.
 */
@Controller
public abstract class BaseController {

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    /**
     * 下载头像
     *
     * @param url
     * @param dir
     */
    protected void downloadImage(final String url, final String dir) {
        Thread thread = new Thread() {
            @Override
            public void run() {
                HttpTookit.downloadFromUrl(url, dir);
            }
        };
        thread.start();
    }

    protected ModelAndView sendErrorJSP(String message) {
        ModelAndView model = new ModelAndView();
        model.addObject("message", message);
        model.setViewName("/views/error.jsp");
        return model;
    }

    /**
     * 发送回复给客户端
     *
     * @param params
     */
    protected Object sendResult(int code, String message, Map<String, Object> params, String... str) {
        return sendResult(code, message, params, false, str);
    }

    /**
     * 发送回复给客户端
     *
     * @param params
     */
    protected Object sendResult(int code, String message, Map<String, Object> params, boolean sendToken, String... str) {
        if (params == null)
            params = new HashMap<>();
        params.put("code", code);
        params.put("message", message);
        List<String> strings = new ArrayList<>(Arrays.asList(str));
        if (!sendToken) {
            strings.add("token");
            strings.add("password");
        }
        JSONPropertyFilter filter = new JSONPropertyFilter(strings);
        return JSON.parse(JSON.toJSONString(params, filter, SerializerFeature.WriteMapNullValue));
    }

    /**
     * 发送回复给客户端
     *
     * @param params
     */
    protected Object sendResult(int code, String message, Map<String, Object> params, Map<Class, String[]> filters) {
        if (params == null)
            params = new HashMap<>();
        params.put("code", code);
        params.put("message", message);
        String paramsJSON = JSON.toJSONString(params);
        for (Map.Entry<Class, String[]> entry : filters.entrySet()) {
            JSONPropertyFilter filter = new JSONPropertyFilter(entry.getKey(), entry.getValue());
            paramsJSON = JSON.toJSONString(paramsJSON, filter, SerializerFeature.WriteMapNullValue);
        }
        return JSON.parse(paramsJSON);
    }

    /**
     * 发送回复给Web客户端
     *
     * @param params
     */
    protected ModelAndView sendResult(int code, String view, String message, Map<String, Object> params) {
        if (params == null)
            params = new HashMap<>();
        ModelAndView model = new ModelAndView();
        params.put("code", code);
        params.put("message", message);
        model.addAllObjects(params);
        model.setViewName(view);
        return model;
    }

    /**
     * 发送回复给Web客户端
     *
     * @param params
     */
    protected ModelAndView sendResult(String view, Map<String, Object> params) {
        if (params == null)
            params = new HashMap<>();
        ModelAndView model = new ModelAndView();
        model.addAllObjects(params);
        model.setViewName(view);
        return model;
    }

    /**
     * 非空参数检测 当存在非空参数为空时返回 401
     *
     * @param arg
     */
    protected boolean checkParaNULL(Object... arg) {
        if (arg != null) {
            for (int i = 0; i < arg.length; i++) {
                if (null == arg[i] || "".equals(arg[i])) {
                    return false;
                }
            }
        }
        return true;
    }

    protected boolean stringIsNull(String arg) {
        if (null == arg || "".equals(arg)) {
            return true;
        }
        return false;
    }

    /**
     * 判断获取的数字是否为-1
     *
     * @param num
     * @return
     */
    protected boolean checkNum(int... num) {
        if (num != null) {
            for (int i = 0; i < num.length; i++) {
                if (num[i] == -1) {
                    sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 将对象转换为Json格式的字符串
     *
     * @param obj        要转换的对象
     * @param resultName 当传入的是list时, resultName为返回Json格式字符串的最外层名字
     * @return Json String
     */
    public static String pojoFormat(Object obj, String resultName) {
        Map map = null;
        String className = obj.getClass().getName().toString();
        StringBuffer jsonResult = new StringBuffer("");
        if (className.equals("java.util.ArrayList")) {//obj为集合
            List<Object> list = (List) obj;
            boolean hasNext = false;
            jsonResult.append("{");
            jsonResult.append("\"");
            jsonResult.append(resultName);
            jsonResult.append("\":");
            if (list.size() > 1) {
                jsonResult.append("[");
            }
            for (int i = 0; i < list.size(); i++) {
                if (hasNext) {
                    jsonResult.append(",");
                }
                map = pojoToMap(list.get(i));
                jsonResult.append(mapFormat(map));
                hasNext = true;
            }
            if (list.size() > 1) {
                jsonResult.append("]");
            }
            jsonResult.append("}");
        } else {
            map = pojoToMap(obj);
            jsonResult.append(mapFormat(map).toString());
        }
        return jsonResult.toString();
    }

    /**
     * 将Map集合转换为Json格式的字符串
     *
     * @param map 要转换为Json格式的map集合
     * @return Json格式的字符串
     */
    public static String mapFormat(Map<Object, Object> map) {
        StringBuffer jsonResult = new StringBuffer("{");
        Set<Object> keySet = map.keySet();
        Iterator<Object> iterator = keySet.iterator();
        boolean hasNext = false;
        while (iterator.hasNext()) {
            if (hasNext) {
                jsonResult.append(",");
            }
            String key = iterator.next().toString();
            jsonResult.append("\"");
            jsonResult.append(key);
            jsonResult.append("\":");
            String className = map.get(key).getClass().toString();
            if (className.equals("class java.util.ArrayList")) {
                List<Object> list = (List) map.get(key);
                if (list.size() > 1) {
                    jsonResult.append("[");
                }
                boolean next = false;
                for (Object object : list) {
                    if (next) {
                        jsonResult.append(",");
                    }
                    Map childMap = pojoToMap(object);
                    jsonResult.append(mapFormat(childMap));
                    next = true;
                }
                if (list.size() > 1) {
                    jsonResult.append("]");
                }
            } else {
                String value = map.get(key).toString();
                if (value.contains("{")) {
                    jsonResult.append(value);
                } else {
                    jsonResult.append("\"");
                    jsonResult.append(value);
                    jsonResult.append("\"");
                }
            }
            hasNext = true;
        }
        jsonResult.append("}");
        return jsonResult.toString();
    }

    /**
     * pojo对象转换为map集合
     *
     * @param object
     * @return
     */
    public static Map<String, Object> pojoToMap(Object object) {
        Map<String, Object> map = new HashMap<String, Object>();
        Field[] filed = object.getClass().getDeclaredFields();
        for (int j = 0; j < filed.length; j++) {
            String filedName = filed[j].getName();
            String getFiledNameMethod = "get" + filedName.substring(0, 1).toUpperCase() + filedName.substring(1);
            Method method;
            try {
                method = object.getClass().getMethod(getFiledNameMethod);
                Object value = method.invoke(object);
                if (value == null) {
                    value = "";
                }
                String className = value.getClass().getName();
                if (className.equals("java.util.ArrayList")) {
                    List<Object> list = (List) value;
                    StringBuffer str = new StringBuffer("");
                    if (list.size() > 1) {
                        str.append("[");
                    }
                    boolean hasNext = false;
                    for (int i = 0; i < list.size(); i++) {
                        if (hasNext) {
                            str.append(",");
                        }
                        str.append(pojoFormat(list.get(i), null));
                        hasNext = true;
                    }
                    if (list.size() > 1) {
                        str.append("]");
                    }
                    value = str;
                } else if (className.split("\\.").length > 1 && className.split("\\.")[1].equals("lyq")) {
                    StringBuffer str = new StringBuffer("");
                    Class c = Class.forName(className);
                    Object entity = c.newInstance();
                    entity = value;
                    str.append(pojoFormat(entity, null));
                    value = str;
                }
                map.put(filedName, value.toString());
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return map;
    }

    public static Map<String, Object> pojoToMapReflect(Object obj) {
        Map hashMap = new HashMap();
        try {
            Class c = obj.getClass();
            Method m[] = c.getDeclaredMethods();
            for (int i = 0; i < m.length; i++) {
                if (m[i].getName().indexOf("get") == 0) {
                    hashMap.put(m[i].getName().substring(3, m[i].getName().length()).toLowerCase(), m[i].invoke(obj));
                }
            }
        } catch (Throwable e) {
            System.err.println(e);
        }
        return hashMap;
    }
}
