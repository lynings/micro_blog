package com.blog.dao;

import com.blog.dao.base.BaseDAO;
import com.blog.model.UserInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by Blink on 3/16/2016 AD.
 */
@Repository
public interface UserInfoDAO extends BaseDAO<UserInfo, Long> {

    UserInfo login(@Param("username")String username, @Param("password")String password);

}
