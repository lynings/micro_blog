package com.blog.service;

import com.blog.model.UserInfo;

import java.util.List;
import java.util.Map;

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

    /**
     * 查询用户详细信息
     * @param id
     * @return
     */
    List<Map<String,Object>> getUserDetailInfo(Long id);

    /**
     * 获取用户和用户关注者的推文信息
     * @param id
     * @return
     */
    List<Map<String,Object>> getUserMessage(Long id);

    /**
     * 获取推荐关注
     * @param id
     * @return
     */
    List<Map<String,Object>> getRecommend(Long id);

    /**
     * 获取用户信息
     * @param id
     * @return
     */
    UserInfo getUserInfo(Long id);

    /**
     *
     * @param userInfo
     * @return
     */
    int uploadImage(UserInfo userInfo);

    /**
     * 获取用户和用户关注者的推文信息
     * @param id
     * @return
     */
    List<Map<String,Object>> getOnlyUserMessage(Long id);
}
