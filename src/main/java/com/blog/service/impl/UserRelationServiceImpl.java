package com.blog.service.impl;

import com.blog.dao.UserInfoDAO;
import com.blog.dao.UserRelationDAO;
import com.blog.model.UserInfo;
import com.blog.model.UserRelation;
import com.blog.service.UserInfoService;
import com.blog.service.UserRelationService;
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
public class UserRelationServiceImpl implements UserRelationService {

    @Resource
    private UserRelationDAO userRelationDAO;

    @Override
    public int addFollow(UserRelation userRelation) {

        return userRelationDAO.insert(userRelation);
    }

    @Override
    public int removeFollow(Long id) {

        return userRelationDAO.delete(id);
    }

    @Override
    public List<Map> selectFollowByType(UserRelation userRelation) {

        return userRelationDAO.selectFollow(userRelation);
    }
}
