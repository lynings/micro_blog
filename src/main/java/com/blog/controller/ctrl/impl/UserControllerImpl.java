package com.blog.controller.ctrl.impl;

import com.blog.controller.base.BaseWebController;
import com.blog.controller.ctrl.UserController;
import com.blog.enums.ResultCode;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Blink on 3/15/2016 AD.
 */
@Controller
public class UserControllerImpl extends BaseWebController implements UserController {

    @Override
    public Object login(String username, String password) {

        Map result = new HashMap();
        return sendResult(ResultCode.CODE_200.code, "登录成功", result);
    }
}
