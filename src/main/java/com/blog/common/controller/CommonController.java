package com.blog.common.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Blink on 3/23/2016 AD.
 */
@RequestMapping
public interface CommonController {

    /**
     * 错误页面
     * @return
     */
    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public Object error();

    @RequestMapping(value = "/goIndex", method = RequestMethod.GET)
    public Object index();

}
