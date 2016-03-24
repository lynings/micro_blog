package com.blog.service;

import com.blog.model.UserInfo;

/**
 * Created by Blink on 3/23/2016 AD.
 */
public interface UserInfoService {

    /**
     * 登录
     * @param username
     * @param password
     * @return
     */
    UserInfo login(String username, String password);

    /**
     * 注册
     * @param name
     * @param username
     * @param password
     * @return
     */
    int register(String name, String username, String password);
}
