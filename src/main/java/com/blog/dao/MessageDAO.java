package com.blog.dao;

import com.blog.dao.base.BaseDAO;
import com.blog.model.Message;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by Blink on 3/24/2016 AD.
 */
@Repository
public interface MessageDAO extends BaseDAO<Message, Long> {

    /**
     * 根据ID获取
     * @param id
     * @return
     */
    List<Map> selectById(Long id);

    /**
     * 获取所有
     * @return
     */
    List<Map> list();
}
