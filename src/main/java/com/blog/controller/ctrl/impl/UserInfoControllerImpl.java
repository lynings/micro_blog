package com.blog.controller.ctrl.impl;

import com.blog.controller.base.BaseWebController;
import com.blog.controller.ctrl.UserInfoController;
import com.blog.enums.ResultCode;
import com.blog.model.UserInfo;
import com.blog.service.UserInfoService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by Blink on 3/15/2016 AD.
 */
@Controller
public class UserInfoControllerImpl extends BaseWebController implements UserInfoController {

    @Resource
    protected UserInfoService userInfoService;

    @Override
    public Object login(String username, String password) {
        if (checkParaNULL(username, password)) {
            Subject currentUser = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password, false, "ctrl");
            try {
                currentUser.login(token);
                // 登录成功后跳转至此
                return sendResult("redirect:/home.html", null);
            } catch (ExcessiveAttemptsException eax){
                return sendResult(ResultCode.CODE_708.code, "login", ResultCode.CODE_708.msg, null);
            } catch (UnknownAccountException uae) {
                return sendResult(ResultCode.CODE_700.code, "login", ResultCode.CODE_700.msg, null);
            } catch (IncorrectCredentialsException ice) {
                return sendResult(ResultCode.CODE_700.code, "login", ResultCode.CODE_700.msg, null);
            } catch (LockedAccountException lae) {
                return sendResult(ResultCode.CODE_701.code, "login", ResultCode.CODE_701.msg, null);
            } catch (AuthenticationException ae) {
                ae.printStackTrace();
                return sendResult(ResultCode.CODE_703.code, "login", ResultCode.CODE_703.msg, null);
            } catch (IllegalArgumentException iae) {
                iae.printStackTrace();
                return sendResult(ResultCode.CODE_703.code, "login", ResultCode.CODE_703.msg, null);
            }
        }else {
            // 未登录时跳转至此
            return sendResult("login", null);
        }
    }

    @Override
    public Object register(String name, String username, String password) {

        int effectCount; // 受影响行数
        if(checkParaNULL(name, username, password)) {
            effectCount = userInfoService.register(name, username, password);
            if(effectCount > 0) {
                return sendResult(ResultCode.CODE_200.code, "login", "注册成功", null);
            }else if (effectCount == -1){
                return sendResult(ResultCode.CODE_710.code, ResultCode.CODE_710.msg, null);
            }else {
                return sendResult(ResultCode.CODE_712.code, ResultCode.CODE_712.msg, null);
            }
        }else {
            return sendResult(ResultCode.CODE_711.code, ResultCode.CODE_711.msg, null);
        }
    }



    @Override
    public Object logout(HttpServletRequest request) {

        String username = request.getSession().getAttribute("username").toString();
        request.getSession().removeAttribute(username);
        request.getSession().removeAttribute("username");
        return sendResult(ResultCode.CODE_200.code, "index", ResultCode.CODE_200.msg, null);
    }

}
