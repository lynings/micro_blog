package com.blog.service;

import com.blog.model.MessageRelation;

/**
 * Created by Blink on 3/23/2016 AD.
 */
public interface MessageRelationService {


    /**
     * 发表相关的信息
     * @param message
     * @return
     */
    int addLike(MessageRelation message);

}
