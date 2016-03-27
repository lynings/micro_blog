package com.blog.controller.ctrl;

import com.blog.model.Review;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by Blink on 3/24/2016 AD.
 */
@RequestMapping("/ctrl/home/")
public interface HomeController {

    /**
     * 发表推文
     * @param content
     * @param request
     * @return
     */
    @RequestMapping(value = "/publishMessage", method = RequestMethod.POST)
    @ResponseBody
    Object publishMessage(String content, HttpServletRequest request) throws IOException;

    /**
     * 增加关注
     * @param type
     * @param worship_id
     * @return
     */
    @RequestMapping(value = "/follow", method = RequestMethod.GET)
    @ResponseBody
    Object follow(Integer type, Long worship_id);

    /**
     * 取消关注
     * @param id
     * @return
     */
    @RequestMapping(value = "/removeFollow", method = RequestMethod.GET)
    @ResponseBody
    Object removeFollow(Long id);

    /**
     * 添加喜欢
     * @param type
     * @param mid
     * @return
     */
    @RequestMapping(value = "/like", method = RequestMethod.GET)
    @ResponseBody
    Object like(Integer type, Long mid);

    /**
     * 添加喜欢
     * @param id
     * @return
     */
    @RequestMapping(value = "/removeLike", method = RequestMethod.GET)
    @ResponseBody
    Object removeLike(Long id);

    /**
     * 评论
     * @param review
     * @return
     */
    @RequestMapping(value = "/comment", method = RequestMethod.GET)
    @ResponseBody
    public Object comment(Review review);

    /**
     * 回复
     * @param review
     * @return
     */
    @RequestMapping(value = "/review", method = RequestMethod.GET)
    @ResponseBody
    public Object review(Review review);

    /**
     * 获取用户信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/getUserDetailInfo", method = RequestMethod.GET)
    @ResponseBody
    public Object getUserDetailInfo(Long id);

    /**
     * 获取用户相关推文信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/getUserMessage", method = RequestMethod.GET)
    @ResponseBody
    public Object getUserMessage(Long id);

    /**
     * 获取用户推荐信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/getRecommend", method = RequestMethod.GET)
    @ResponseBody
    public Object getRecommend(Long id);
}
