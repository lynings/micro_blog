package com.blog.controller.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;

/**
 * Created by mac on 14/12/10.
 */
@Controller
public abstract class BaseWebController extends BaseController {
    protected SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    protected static final Logger logger = LoggerFactory.getLogger(BaseWebController.class);

}
