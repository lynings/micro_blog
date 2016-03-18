package com.blog.controller.base;

import com.blog.utils.mybatis.PageEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by virgilyan on 12/10/14.
 */
public interface BaseWebControllerInterface<T> {
    /**
     * 根据主键删除数据
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    Object delete(long id);

    /**
     * 增加数据
     *
     * @param object
     * @return
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    Object add(@RequestBody T object);

    /**
     * 删除数据
     *
     * @param object
     * @return
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    Object update(@RequestBody T object);

    /**
     * 查询数据
     *
     * @param type       0，不分页查询所有数据；1，分页查询所有数据；2，根据主键ID查询数据；3，根据关键字查询数据
     * @param pageEntity
     * @param id
     * @param object
     * @return
     */
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    @ResponseBody
    Object search(int type, @ModelAttribute PageEntity pageEntity, Long id, @ModelAttribute T object);
}