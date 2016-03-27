package com.blog.controller.ctrl;

import com.blog.model.UserRelation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

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

    /**
     * 退出
     * @param request
     * @return
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    @ResponseBody
    Object logout(HttpServletRequest request);

    /**
     * 获取用户信息
     * @param request
     * @return
     */
    @RequestMapping(value = "/getUserInfo", method = RequestMethod.GET)
    @ResponseBody
    Object getUserInfo(HttpServletRequest request);

    /**
     * 上传头像
     * @param request
     * @return
     */
    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
    @ResponseBody
    public Object uploadImage(HttpServletRequest request) throws IOException;

    /**
     * 获取关注 (粉丝或者关注者)
     * @param userRelation
     * @return
     */
    @RequestMapping(value = "/getFollow", method = RequestMethod.GET)
    @ResponseBody
    public Object getFollow(UserRelation userRelation);

    /**
     * 取消关注
     * @param id
     * @return
     */
    @RequestMapping(value = "/removeFollow", method = RequestMethod.GET)
    @ResponseBody
    public Object removeFollow(Long id);

    /**
     * 只获取用户的推文信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/getOnlyUserMessage", method = RequestMethod.GET)
    @ResponseBody
    public Object getOnlyUserMessage(Long id);
}

