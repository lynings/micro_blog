package com.blog.controller.ctrl.impl;

import com.blog.controller.base.BaseWebController;
import com.blog.controller.ctrl.HomeController;
import com.blog.enums.ResultCode;
import com.blog.model.Message;
import com.blog.model.MessageRelation;
import com.blog.model.Review;
import com.blog.model.UserRelation;
import com.blog.service.*;
import com.blog.utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

/**
 * Created by Blink on 3/24/2016 AD.
 */
@Controller
public class HomeControllerImpl extends BaseWebController implements HomeController {

    @Resource
    private UserInfoService userInfoService;
    @Resource
    private MessageService messageService;
    @Resource
    private MessageRelationService messageRelationService;
    @Resource
    private UserRelationService userRelationService;
    @Resource
    private ReviewService reviewService;
    @Autowired(required = true)
    private HttpServletRequest request;

    @Override
    public Object publishMessage(String content, HttpServletRequest request) throws IOException {
        if(checkParaNULL(request.getSession().getAttribute("id"))) {
            String images = FileUploadUtil.uploadImages(request);
            Long uid = Long.valueOf(request.getSession().getAttribute("id").toString());
            Message message = new Message();
            message.setUid(uid);
            message.setContent(content);
            message.setImages(images);
            messageService.publish(message);
            return sendResult("redirect:/home.html/", null);
        }
        return sendResult(ResultCode.CODE_600.code, ResultCode.CODE_600.msg, null);
    }

    @Override
    public Object follow(Integer type, Long worship_id) {
        if(checkParaNULL(request.getSession().getAttribute("id"))) {
            Long uid = Long.valueOf(request.getSession().getAttribute("id").toString());
            if (checkParaNULL(uid, type, worship_id)) {
                UserRelation user = new UserRelation();
                user.setUid(uid);
                user.setType(type);
                user.setWorship_id(worship_id);
                userRelationService.addFollow(user);
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
        }
        return sendResult(ResultCode.CODE_600.code, ResultCode.CODE_600.msg, null);
    }

    @Override
    public Object removeFollow(Long id) {
        return null;
    }

    @Override
    public Object like(Integer type, Long mid) {
        if(checkParaNULL(request.getSession().getAttribute("id"))) {
            Long sid = Long.valueOf(request.getSession().getAttribute("id").toString());
            if (checkParaNULL(mid, type, sid)) {
                MessageRelation relation = new MessageRelation();
                relation.setMid(mid);
                relation.setSid(sid);
                relation.setType(type);
                messageRelationService.addLike(relation);
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
        }
        return sendResult(ResultCode.CODE_600.code, ResultCode.CODE_600.msg, null);
    }

    @Override
    public Object removeLike(Long id) {
        return null;
    }

    @Override
    public Object comment(Review review) {
        Long mid = review.getMid(); // 推文ID
        Long rid = review.getRid(); // 评论者ID
        Long notify_id = review.getNotify_id(); // 被通知者id
        String content = review.getContent();   // 内容
        if(checkParaNULL(mid, review, notify_id, content)) {
            Review r = new Review();
            r.setMid(mid);
            r.setRid(rid);
            r.setNotify_id(notify_id);
            r.setContent(content);
            r.setStatus(1); // 状态(0:已读; 1:未读)
            int effectFlag = reviewService.addComment(r);
            if (effectFlag > 0) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object review(Review review) {
        Long mid = review.getMid(); // 推文ID
        Long notify_id = review.getNotify_id(); // 被通知者id
        String content = review.getContent();   // 内容
        if(checkParaNULL(mid, review, notify_id, content, request.getSession().getAttribute("id"))) {
            Long rid = Long.valueOf(request.getSession().getAttribute("id").toString()); // 评论者ID
            Review r = new Review();
            r.setMid(mid);
            r.setRid(rid);
            r.setNotify_id(notify_id);
            r.setContent(content);
            r.setStatus(1); // 状态(0:已读; 1:未读)
            int effectFlag = reviewService.addComment(r);
            if (effectFlag > 0) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
        }
        return sendResult(ResultCode.CODE_401.code, "index.jsp", ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object getUserDetailInfo(Long id) {

        Long uid = null;
        if(checkParaNULL(id)) {
            uid = id;
        }else if(checkParaNULL(request.getSession().getAttribute("id"))) {
            uid = Long.valueOf(request.getSession().getAttribute("id").toString());
        }else {
            return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
        }
        Map result = new HashMap();
        List<Map<String, Object>> userInfos = userInfoService.getUserDetailInfo(uid);
        result.put("userInfos", userInfos);
        return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, result);
    }

    @Override
    public Object getUserMessage(Long id) {

        Long uid = null;
        if(checkParaNULL(id)) {
            uid = id;
        }else if(checkParaNULL(request.getSession().getAttribute("id"))) {
            uid = Long.valueOf(request.getSession().getAttribute("id").toString());
        }else {
            return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
        }
        Map result = new HashMap();
        List<Map<String,Object>> userInfos = userInfoService.getUserMessage(uid);
        result.put("userMessages", userInfos);
        return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, result);
    }

    @Override
    public Object getRecommend(Long id) {

        Long uid = null;
        if(checkParaNULL(id)) {
            uid = id;
        }else if(checkParaNULL(request.getSession().getAttribute("id"))) {
            uid = Long.valueOf(request.getSession().getAttribute("id").toString());
        }else {
            return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
        }
        Map result = new HashMap();
        List<Map<String, Object>> userInfos = userInfoService.getRecommend(uid);
        result.put("recommends", userInfos);
        return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, result);
    }

}
