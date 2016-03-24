package com.blog.controller.ctrl;

import com.blog.model.UserInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by Blink on 3/15/2016 AD.
 */
@RequestMapping(value = "/ctrl/user/")
public interface UserInfoController {

    /**
     * 登录
     * @param username
     * @param password
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    Object login(String username, String password);

    /**
     * 注册
     * @param name
     * @param username
     * @param password
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    Object register(String name, String username, String password);

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    @ResponseBody
    Object logout(HttpServletRequest request);
}
