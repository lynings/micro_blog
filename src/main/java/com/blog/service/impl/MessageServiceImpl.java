package com.blog.service.impl;

import com.blog.dao.MessageDAO;
import com.blog.model.Message;
import com.blog.service.MessageService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Blink on 3/24/2016 AD.
 */
@Service
public class MessageServiceImpl implements MessageService {

    @Resource
    private MessageDAO messageDAO;

    @Override
    public List<Map> getAll() {

        return messageDAO.list();
    }

    @Override
    public int publish(Message message) {

        return messageDAO.insert(message);
    }
}
