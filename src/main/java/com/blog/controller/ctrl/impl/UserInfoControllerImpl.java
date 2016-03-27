package com.blog.controller.ctrl.impl;

import com.blog.controller.base.BaseWebController;
import com.blog.controller.ctrl.UserInfoController;
import com.blog.enums.ResultCode;
import com.blog.model.UserInfo;
import com.blog.model.UserRelation;
import com.blog.service.UserInfoService;
import com.blog.service.UserRelationService;
import com.blog.utils.FileUploadUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Blink on 3/15/2016 AD.
 */
@Controller
public class UserInfoControllerImpl extends BaseWebController implements UserInfoController {

    @Resource
    private UserInfoService userInfoService;
    @Resource
    private UserRelationService userRelationService;
    @Autowired(required = true)
    private HttpServletRequest request;
    @Override
    public Object login(String username, String password) {
        if (checkParaNULL(username, password)) {
            Subject currentUser = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password, false, "ctrl");
            try {
                currentUser.login(token);
                // 登录成功后跳转至此
                return sendResult("redirect:/home.html/", null);
            } catch (ExcessiveAttemptsException eax){
                return sendResult(ResultCode.CODE_708.code, "index.jsp", ResultCode.CODE_708.msg, null);
            } catch (UnknownAccountException uae) {
                return sendResult(ResultCode.CODE_700.code, "index.jsp", ResultCode.CODE_700.msg, null);
            } catch (IncorrectCredentialsException ice) {
                return sendResult(ResultCode.CODE_700.code, "index.jsp", ResultCode.CODE_700.msg, null);
            } catch (LockedAccountException lae) {
                return sendResult(ResultCode.CODE_701.code, "index.jsp", ResultCode.CODE_701.msg, null);
            } catch (AuthenticationException ae) {
                ae.printStackTrace();
                return sendResult(ResultCode.CODE_703.code, "index.jsp", ResultCode.CODE_703.msg, null);
            } catch (IllegalArgumentException iae) {
                iae.printStackTrace();
                return sendResult(ResultCode.CODE_703.code, "index.jsp", ResultCode.CODE_703.msg, null);
            }
        }else {
            // 未登录时跳转至此
            return sendResult("index.jsp", null);
        }
    }

    @Override
    public Object register(String name, String username, String password) {

        int effectCount; // 受影响行数
        if(checkParaNULL(name, username, password)) {
            effectCount = userInfoService.register(name, username, password);
            if(effectCount > 0) {
                return sendResult(ResultCode.CODE_200.code, "index.jsp", "注册成功", null);
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
    public Object uploadImage(HttpServletRequest request) throws IOException {

        String image = FileUploadUtil.uploadImages(request);
        if(checkParaNULL(image, request.getSession().getAttribute("id"))) {
            Long id = Long.valueOf(request.getSession().getAttribute("id").toString());
            UserInfo userInfo = new UserInfo();
            userInfo.setId(id);
            userInfo.setImage(image);
            int i = userInfoService.uploadImage(userInfo);
            if(i > 0) {
                return sendResult("redirect:/home.html/", null);
            }
            return sendResult("redirect:/home.html/", null);
        }
        return sendResult("redirect:/index.jsp/", null);
    }

    @Override
    public Object getFollow(UserRelation userRelation) {

        if(checkParaNULL(userRelation.getUid(), userRelation.getType())) {
            Map result = new HashMap();
            List<Map> dataList = userRelationService.selectFollowByType(userRelation);
            result.put("result", dataList);
            return sendResult(ResultCode.CODE_200.code,  ResultCode.CODE_200.msg, result);
        }
        return sendResult(ResultCode.CODE_401.code,  ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object removeFollow(Long id) {
        if(checkParaNULL(request.getSession().getAttribute("id"))) {
            if(checkParaNULL(id)) {
                userRelationService.removeFollow(id);
                return sendResult(ResultCode.CODE_200.code,  ResultCode.CODE_200.msg, null);
            }else {
                return sendResult(ResultCode.CODE_401.code,  ResultCode.CODE_401.msg, null);
            }
        }else {
            return sendResult(ResultCode.CODE_402.code,  ResultCode.CODE_402.msg, null);
        }
    }

    @Override
    public Object getOnlyUserMessage(Long id) {

        if(checkParaNULL(request.getSession().getAttribute("id"))) {
            if(checkParaNULL(id)) {
                Map result = new HashMap();
                List userInfo = userInfoService.getOnlyUserMessage(id);
                result.put("userMessages", userInfo);
                return sendResult(ResultCode.CODE_200.code,  ResultCode.CODE_200.msg, null);
            }else {
                return sendResult(ResultCode.CODE_401.code,  ResultCode.CODE_401.msg, null);
            }
        }else {
            return sendResult(ResultCode.CODE_402.code,  ResultCode.CODE_402.msg, null);
        }
    }


    @Override
    public Object logout(HttpServletRequest request) {
        if(request.getSession().getAttribute("id") != null) {
            String username = request.getSession().getAttribute("id").toString();
            request.getSession().removeAttribute(username);
            request.getSession().removeAttribute("id");
            return sendResult(ResultCode.CODE_200.code, "index.jsp", ResultCode.CODE_200.msg, null);
        }else {
            return sendResult(ResultCode.CODE_402.code, "index.jsp", ResultCode.CODE_402.msg, null);
        }
    }

    @Override
    public Object getUserInfo(HttpServletRequest request) {
        if(checkParaNULL(request.getSession().getAttribute("id"))) {
            Map result = new HashMap();
            Long id = Long.valueOf(request.getSession().getAttribute("id").toString());
            UserInfo userInfo = userInfoService.getUserInfo(id);
            result.put("userInfo", userInfo);
            return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, result);
        }
        return sendResult(ResultCode.CODE_402.code, "index.jsp", ResultCode.CODE_402.msg, null);
    }

}
