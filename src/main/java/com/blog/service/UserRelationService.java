package com.blog.service;

import com.blog.model.UserInfo;
import com.blog.model.UserRelation;

import java.util.List;
import java.util.Map;

/**
 * Created by Blink on 3/23/2016 AD.
 */
public interface UserRelationService {

    /**
     * 关注
     * @param userRelation
     * @return
     */
    int addFollow(UserRelation userRelation);

    /**
     * 取消关注
     * @param id
     * @return
     */
    int removeFollow(Long id);

    /**
     * 根据类型获取粉丝或者是关注着信息
     * @param userRelation
     * @return
     */
    List<Map> selectFollowByType(UserRelation userRelation);
}
