package com.blog.model;

import java.util.Date;

/**
 * 评论实体
 * Created by Blink on 3/23/2016 AD.
 */
public class Review implements java.io.Serializable {

    private Long id;
    private Long mid;       // 对应的推文id
    private Long rid;       // 评论者id
    private Long notify_id; // 被通知者ID
    private String content; // 内容
    private Integer status; // 状态(0:已读; 1:未读)
    private Date reviewDate;// 评论时间

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMid() {
        return mid;
    }

    public void setMid(Long mid) {
        this.mid = mid;
    }

    public Long getRid() {
        return rid;
    }

    public void setRid(Long rid) {
        this.rid = rid;
    }

    public Long getNotify_id() {
        return notify_id;
    }

    public void setNotify_id(Long notify_id) {
        this.notify_id = notify_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }
}
