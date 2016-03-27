package com.blog.service.impl;

import com.blog.dao.MessageRelationDAO;
import com.blog.model.MessageRelation;
import com.blog.service.MessageRelationService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Blink on 3/24/2016 AD.
 */
@Service
public class MessageRelationServiceImpl implements MessageRelationService {

    @Resource
    private MessageRelationDAO messageRelationDAO;

    @Override
    public int addLike(MessageRelation message) {
        return messageRelationDAO.insert(message);
    }

}
