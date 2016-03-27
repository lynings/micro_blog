package com.blog.dao;

import com.blog.dao.base.BaseDAO;
import com.blog.model.UserRelation;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by Blink on 3/16/2016 AD.
 */
@Repository
public interface UserRelationDAO extends BaseDAO<UserRelation, Long> {

    /**
     * 获取粉丝或者关注着信息
     * @param userRelation
     * @return
     */
    List<Map> selectFollow(UserRelation userRelation);
}
