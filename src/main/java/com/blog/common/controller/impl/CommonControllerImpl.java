package com.blog.common.controller.impl;

import com.blog.common.controller.CommonController;
import com.blog.controller.base.BaseWebController;
import com.blog.enums.ResultCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Blink on 3/23/2016 AD.
 */
@Controller
public class CommonControllerImpl extends BaseWebController implements CommonController {

    @Override
    public Object error() {

        return sendResult("redirect:/error.jsp",null);
    }

    @Override
    public Object index() {

        return sendResult("redirect:/index.html",null);
    }
}
