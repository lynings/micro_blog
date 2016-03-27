package com.blog.service;

import com.blog.model.Review;

/**
 * Created by Blink on 3/26/2016 AD.
 */
public interface ReviewService {

    /**
     * 增加评论
     * @param review
     * @return
     */
    public int addComment(Review review);

    /**
     * 增加回复
     * @param review
     * @return
     */
    public int addReview(Review review);
}
