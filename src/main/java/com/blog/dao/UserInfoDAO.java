package com.blog.dao;

import com.blog.dao.base.BaseDAO;
import com.blog.model.UserInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by Blink on 3/16/2016 AD.
 */
@Repository
public interface UserInfoDAO extends BaseDAO<UserInfo, Long> {

    UserInfo login(@Param("username")String username, @Param("password")String password);

    /**
     *
     * @param id
     * @return
     */
    List<Map<String,Object>> selectUserDetailInfo(Long id);

    /**
     * 获取用户和用户关注者的推文信息
     * @param id
     * @return
     */
    List<Map<String,Object>> selectUserMessage(Long id);

    /**
     * 只获取用户和用户关注者的推文信息
     * @param id
     * @return
     */
    List<Map<String,Object>> selectOnlyUserMessage(Long id);

    /**
     * 获取推荐关注
     * @param id
     * @return
     */
    List<Map<String,Object>> selectRecommend(Long id);

    /**
     * 更新照片
     * @param userInfo
     * @return
     */
    int updateImage(UserInfo userInfo);

}
