package com.blog.model;

import java.util.Date;

/**
 * 推文实体
 * Created by Blink on 3/23/2016 AD.
 */

public class Message implements java.io.Serializable {

    private Long id;
    private Long uid;           // 对应用户表id
    private String content;     // 发表的内容
    private String images;      // 发表的图片
    private Date createDate;    // 发表的日期

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
