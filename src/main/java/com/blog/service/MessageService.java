package com.blog.service;

import com.blog.model.Message;

import java.util.List;
import java.util.Map;

/**
 * Created by Blink on 3/23/2016 AD.
 */
public interface MessageService {

    /**
     * 获取所有
     * @return
     */
    List<Map> getAll();

    /**
     * 发表推文
     * @param message
     * @return
     */
    int publish(Message message);

}
