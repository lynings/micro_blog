package com.blog.service.impl;

import com.blog.dao.ReviewDAO;
import com.blog.model.Review;
import com.blog.service.ReviewService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Blink on 3/24/2016 AD.
 */
@Service
public class ReviewServiceImpl implements ReviewService {

    @Resource
    private ReviewDAO reviewDAO;

    @Override
    public int addComment(Review review) {

        return reviewDAO.insert(review);
    }

    @Override
    public int addReview(Review review) {

        return reviewDAO.insert(review);
    }
}
