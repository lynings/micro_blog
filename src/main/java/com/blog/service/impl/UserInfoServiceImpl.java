package com.blog.service.impl;

import com.blog.dao.UserInfoDAO;
import com.blog.model.UserInfo;
import com.blog.service.UserInfoService;
import com.blog.utils.PasswordHelper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Blink on 3/23/2016 AD.
 */
@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Resource
    protected UserInfoDAO userInfoDAO;

    @Override
    public UserInfo login(String username, String password) {

        return userInfoDAO.login(username, password);
    }

    @Override
    public int register(String name, String username, String password) {
        Map map = new HashMap();
        map.put("username", username);
        if(userInfoDAO.selectParam(map).size() < 1) {
            String newPassword = PasswordHelper.getEncryptPassword(username, password);
            UserInfo userInfo = new UserInfo();
            userInfo.setName(name);
            userInfo.setUsername(username);
            userInfo.setPassword(newPassword);
            return userInfoDAO.insert(userInfo);
        }else {
            return -1;
        }
    }

    @Override
    public List<Map<String,Object>> getUserDetailInfo(Long id) {

        return userInfoDAO.selectUserDetailInfo(id);
    }

    @Override
    public List<Map<String,Object>> getUserMessage(Long id) {

        return userInfoDAO.selectUserMessage(id);
    }

    @Override
    public List<Map<String,Object>> getRecommend(Long id) {

        return userInfoDAO.selectRecommend(id);
    }

    @Override
    public UserInfo getUserInfo(Long id) {

        return userInfoDAO.selectPk(id);
    }

    @Override
    public int uploadImage(UserInfo userInfo) {

        return userInfoDAO.updateImage(userInfo);
    }

    @Override
    public List<Map<String, Object>> getOnlyUserMessage(Long id) {

        return userInfoDAO.selectOnlyUserMessage(id);
    }


}
