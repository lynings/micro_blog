package com.blog.controller.ctrl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Blink on 3/15/2016 AD.
 */
@RequestMapping(value = "/ctrl/user/")
public interface UserController {

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    @ResponseBody
    Object login(String username, String password);
}
